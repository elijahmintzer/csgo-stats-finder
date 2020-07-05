async function getStats(){
    let steamid = document.getElementById('steamidfield').value;

    console.log('getting stats');
    console.log(steamid);
    
    const api_url = `/steamapi/${steamid}`;
    const response = await fetch(api_url);
    const json = await response.json();
}