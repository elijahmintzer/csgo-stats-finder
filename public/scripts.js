async function getStats(){
    let steamid = document.getElementById('steamidfield').value;

    console.log('getting stats');
    console.log(steamid);
    
    const api_url = `/steamapi/${steamid}`;
    const response = await fetch(api_url);
    const json = await response.json();
    const totalkills = json.playerstats.stats[0].value;
    const totaldeaths = json.playerstats.stats[1].value;
    const kdratio = totalkills / totaldeaths;

    document.getElementById('kdratio').textContent = kdratio.toFixed(2);
    document.getElementById('totalkills').textContent = totalkills;
    document.getElementById('totaldeaths').textContent = totaldeaths;
}

