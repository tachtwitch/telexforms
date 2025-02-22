import axios from "axios";
import { config } from "dotenv";

config()

/**
 * Send form data to telex channel using webhooks.
 *
 * @param {Object|FormData} jsonData - JSON data as an object or Json or form data.
 * @returns {json} Telex Response.
 */
export const sendToTelex = async (data,url) => {
    await fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(console.log)
    .catch(console.error);
    
}