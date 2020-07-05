
async function getUserInfo(){
    let steamid = document.getElementById('steamidfield').value;

    const user_api_url = `/steamuserapi/${steamid}`;
    try{
        const response = await fetch(user_api_url);
        const json = await response.json();
        const username = json.response.players[0].personaname;
        const avatar = json.response.players[0].avatarfull;

        document.getElementById('username').textContent = username;
        document.getElementById('avatar').src = avatar;
        document.getElementById('error-message').style.display = 'none';
    } catch(err){
        console.log('error')
        document.getElementById('error-message').style.display = 'block';
    }
    
}

async function getStats(){
    getUserInfo();
    let steamid = document.getElementById('steamidfield').value;

    console.log('getting stats');
    console.log(steamid);
    
    const game_api_url = `/steamgameapi/${steamid}`;
    try{
        const response = await fetch(game_api_url);
        const json = await response.json();
        const totalkills = json.playerstats.stats[0].value;
        const totaldeaths = json.playerstats.stats[1].value;
        const kdratio = totalkills / totaldeaths;
        document.getElementById('kdratio').textContent = kdratio.toFixed(2);
        document.getElementById('totalkills').textContent = totalkills;
        document.getElementById('totaldeaths').textContent = totaldeaths;
        document.getElementById('error-message').style.display = 'none';
    } catch(err){
        console.log('error')
        document.getElementById('error-message').style.display = 'block';
    }
}