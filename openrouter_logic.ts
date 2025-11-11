import axios from "axios";

export default async function handler(req: any, res: any){

    if(req.method != "POST"){
        return res.status(405).json({error: "Method not allowed"});
    }

    try{
        const { message }= req.body;

        const response= await axios.post(
            process.env.OPENROUTER_BASE_URL!,
            {

                model: "google/gemini-2.0-flash-exp:free",
                messages: [{ role: "user", content: message }],

            },

            {

                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.status(200).json(response.data);
    } catch (error: any){
        res.status(500).json({ error: "Failed to fetch from OpenRouter" });
    }

}