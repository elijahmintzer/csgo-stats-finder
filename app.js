const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv-flow').config();

const config = {
    apikey: process.env.APIKEY,
    port: process.env.PORT
}

const port = config.port || 1337;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

app.get('/steamapi/:steamid', async (request, response) => {
    const steamid = request.params.steamid;
    const api_url = `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?appid=730&key=${config.apikey}&steamid=${steamid}`;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    response.json(json);
});