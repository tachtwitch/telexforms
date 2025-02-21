import express from "express";
import { config } from "dotenv";
import { sendToTelex } from "./telex.js";
import { jsonToText } from "./utils.js";
import path from "path"
import { integration } from "./integration.js";
import multer from "multer";
import cors from "cors";

config();

// Serve static files from the public directory

const app = express();
const port = process.env.PORT;
const root = path.resolve('./')
app.use(cors())
app.use(express.static(root+ '/public'));

const upload = multer();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.sendFile(root+"/public/form.html");
});

app.get("/integration.json", (req, res) => {
  res.json(integration);
});

// Reject non-POST requests
const rejectNonPostRequests = (req, res, next) => {
  if (req.method !== "POST") {
    res.status(405).send({ error: "Method Not Allowed" });
  } else {
    next();
  }
};

app.use(rejectNonPostRequests);

//webhook
app.post("/webhook",async (req,res) => {
        const {message, settings} = req.body

        if(!message || !settings){
            return res.status(400).send({ error: "Invalid request" });
            
        }
    try{
        const maxWords = settings.find=((setting) => {
            setting.label = "maxMessageLength"
        });
    
        if(maxWords?.default < message.length){
          const TelexFormat = {
            event_name: "modified",
            message : "",
            status: "success",
            username : "TelexForms-modifier",
          };
            await sendToTelex(TelexFormat)
        }
        const TelexFormat = {
          event_name: "telexForms-response",
          message : message,
          status: "success",
          username : "TelexForms-modifier",
        };
        await sendToTelex(TelexFormat)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
    
})

// Submit form
app.post("/submit-form", upload.none(), async (req, res) => {
  try {
    
    const formData = req.body

    if (!formData || (req.body == null||undefined)) {
      return res.status(400).send({ error: "Invalid request" });
    }

    const TelexFormat = {
      event_name: "telexForms-response",
      message : jsonToText(formData),
      status: "success",
      username : "TelexForms",
    };

    await sendToTelex(TelexFormat);
    res.json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;