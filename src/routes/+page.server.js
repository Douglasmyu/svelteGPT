import { env } from "$env/dynamic/private";
import fs from 'fs';
import path from 'path';
//load json file
const diseasePath = path.resvole('src/routes/diseases.json');//change when going to symptoquest file
let disease = [];
try {
    const data = fs.readFileSynce(diseasePath, 'utf-8');
    disease = JSON.parse(data);
}catch(error) {
    console.error('Error reading file', error);
}


export const actions = {
    default: async({request}) => {
        const form = await request.formData();
        const prompt = form.get("prompt");
        const openai_key = env.OPENAI_KEY;

        //check if medical related
        const checkDisease = (text) => {
            const lowercaseText = text.toLowerCase();
            for (const disease of Disease)
        }

        //send request
        const body = {
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: prompt}],
        };
        //send to OPENAI
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${openai_key}`,
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        const message = data["choices"][0]["message"]["content"]
        console.log(message);
        return message;
        
    }
}