import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const quoteAPI = "https://api.animechan.io/v1";
const imageAPI=

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(quoteAPI + "/quotes/random");
        console.log(response.data.data.content);
        const character = response.data.data.character.name;
        const anime = response.data.data.anime.name;
        const result = await axios.get(`https://api.jikan.moe/v4/characters?q=${character}`);
        res.render("index.ejs",{quote: response.data.data.content, image: result.data.data[0].images.jpg.image_url, character: character, anime: anime});
    } catch (error) {
        console.error("Error fetching quote:", error);
        res.status(500).send("Error fetching quote");
    }
    
});

app.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
});