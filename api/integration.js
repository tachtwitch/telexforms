import { config } from "dotenv"
config();
export const integration= {
	"data": {
		"author": "Tachtwitch",
		"date": {
			"created_at": "2025-02-18",
			"updated_at": "2025-02-18"
		},
		"descriptions": {
			"app_description": "TelexForms creates custom forms, recieve Form Data and sends formatted data to a telex channel.",
			"app_logo": "https://cdn-icons-png.flaticon.com/512/7915/7915366.png",
			"app_name": "TelexForms",
			"app_url": "https://telexforms.vercel.app/",
			"background_color": "#ffffff"
		},
		"integration_category": "Communication & Collaboration",
		"integration_type": "modifier",
		"is_active": true,
		"key_features": [
			"Receive form data from a server.",
			"Send formatted data to the channel."
		],
		"settings": [
			{
				"default": 200,
				"label": "maxMessageLength",
				"required": true,
				"type": "number"
			},
		],
		"target_url": "https://telexforms.vercel.app/webhook",
		"website": "https://telexforms.vercel.app/"
	}
}