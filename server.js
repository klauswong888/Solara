import "dotenv/config"; 
import express from "express";
import axios from "axios";

const app = express();
const PORT = 5000;

app.get("/maps/autocomplete", async (req, res) => {
    const { input } = req.query;
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
            params: {
                input,
                key: process.env.GOOGLE_MAPS_API_KEY
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
