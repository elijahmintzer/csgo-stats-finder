async function getUserInfo(){
    let steamid = document.getElementById('steamidfield').value;
    
    try{
        if(typeof steamid === 'string'){
            steamid = SteamIDConverter.toSteamID64(steamid);
        }
    } catch {
        console.log('using SteamID64 for UserData...');
    }

    const user_api_url = `/steamuserapi/${steamid}`;
    try{
        const response = await fetch(user_api_url);
        const json = await response.json();
        const username = json.response.players[0].personaname;
        const avatar = json.response.players[0].avatarfull;

        document.getElementById('username').textContent = username;
        document.getElementById('avatar').style = 'display:block';
        document.getElementById('avatar').src = avatar;
        document.getElementById('profilelink').href = SteamIDConverter.profileURL(steamid);
        document.getElementById('error-message').style.display = 'none';
    } catch(err){
        console.log('error')
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('username').textContent = 'ERROR'
        document.getElementById('avatar').src = 'https://www.rebornevo.com/uploads/monthly_2019_05/Steam_Question-Mark.thumb.jpg.57b1f0d831926f6e19cd3dcc4d9cd89c.jpg'
        document.getElementById('kdratio').textContent = 'ERROR';
        document.getElementById('totalkills').textContent = 'ERROR';
        document.getElementById('totaldeaths').textContent = 'ERROR';
    }
    
}

async function getStats(){
    let steamid = document.getElementById('steamidfield').value;

    try{
        if(typeof steamid === 'string'){
            steamid = SteamIDConverter.toSteamID64(steamid);
        }
    } catch {
        console.log('using SteamID64 for Stats...');
    }

    console.log('getting stats');
    console.log(steamid);
    
    const game_api_url = `/steamgameapi/${steamid}`;
    try{
        getUserInfo();
        const response = await fetch(game_api_url);
        const json = await response.json();
        const totalkills = json.playerstats.stats[0].value;
        const totaldeaths = json.playerstats.stats[1].value;
        const kdratio = totalkills / totaldeaths;
        const totalwins = json.playerstats.stats[112].value;
        const totalmatchesplayed = json.playerstats.stats[113].value;
        const totalmatcheslost = totalmatchesplayed - totalwins;
        const winlossratio = totalwins / totalmatcheslost;
        
        document.getElementById('kdratio').textContent = kdratio.toFixed(2);
        document.getElementById('totalkills').textContent = totalkills;
        document.getElementById('totaldeaths').textContent = totaldeaths;
        document.getElementById('totalwins').textContent = totalwins;
        document.getElementById('totallost').textContent = totalmatcheslost;
        document.getElementById('totalmatchesplayed').textContent = totalmatchesplayed;
        document.getElementById('winlossratio').textContent = winlossratio.toFixed(2);
        document.getElementById('error-message').style.display = 'none';
        console.log(json);
    } catch(err){
        console.log('error')
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('username').textContent = 'ERROR'
        document.getElementById('kdratio').textContent = 'ERROR';
        document.getElementById('totalkills').textContent = 'ERROR';
        document.getElementById('totaldeaths').textContent = 'ERROR';
        document.getElementById('totalwins').textContent = 'ERROR';
        document.getElementById('totallost').textContent = 'ERROR';
        document.getElementById('totalmatchesplayed').textContent = 'ERROR';
        document.getElementById('winlossratio').textContent = 'ERROR';
    }
}