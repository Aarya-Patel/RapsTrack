// Global var stores JSON objects
var jsonData;
const gameCards = document.querySelectorAll('li');


// Store the JSON data as an array
async function readJSON(){
    try{
    let jsonPromise = await fetch('../data.json').then(res => res.json()).then(json => jsonData = json); 
    } catch (err){
        console.log(err);
    }
    //Send a true Promise
    return new Promise((resolve) => resolve());
}

function getTeamLogoLink(teamName){
    switch(teamName){
        case 'Raptors':
            return 'images/tor.png';
        case 'New Orleans':
            return 'images/nop.png';
        case 'Boston':
            return 'images/bos.png';
        case 'Chicago':
            return 'images/chi.png';
        case 'Orlando':
            return 'images/orl.png';
        case 'Detroit':
            return 'images/det.png';
        case 'Milwaukee':
            return 'images/mil.png';
        case 'Sacramento':
            return 'images/sac.png';
        case 'Los Angeles':
            return 'images/lal.png';
        case 'LA':
            return 'images/lac.png';
        case 'Portland':
            return 'images/por.png';
        case 'Dallas':
            return 'images/dal.png';
        case 'Charlotte':
            return 'images/cha.png';
        case 'Atlanta':
            return 'images/atl.png';
        case 'Philadelphia':
            return 'images/phi.png';
        case 'New York':
            return 'images/nyk.png';
        case 'Utah':
            return 'images/uta.png';
        case 'Miami':
            return 'images/mia.png';
        case 'Houston':
            return 'images/hou.png';
        case 'Brooklyn':
            return 'images/bkn.png';
        case 'Cleveland':
            return 'images/cle.png';
        case 'Washington':
            return 'images/was.png';
        case 'Indiana':
            return 'images/ind.png';
        case 'Oklahoma City':
            return 'images/okc.png';
        case 'San Antonio':
            return 'images/sas.png';
        case 'Minnesota':
            return 'images/min.png';
        case 'Phoenix':
            return 'images/phx.png';
        case 'Denver':
            return 'images/den.png';
        case 'Golden State':
            return 'images/gsw.png';
        case 'Memphis':
            return 'images/mem.png';
    }

}

function insertTeamLogos(curJsonData, curGameCardChilds){
    const rapsLogoLink = getTeamLogoLink('Raptors');
    const oppLogoLink = getTeamLogoLink(curJsonData['opponent']);

    const rapsLogo = document.createElement('IMG');
    const oppLogo = document.createElement('IMG');

    rapsLogo.setAttribute('src', rapsLogoLink);
    rapsLogo.setAttribute('class', 'logo');

    oppLogo.setAttribute('src', oppLogoLink);
    oppLogo.setAttribute('class', 'logo');

    curGameCardChilds[0].appendChild(rapsLogo);
    curGameCardChilds[1].appendChild(oppLogo);
}

// Modifies the games that have been played
function modifyPlayedGame(curJsonData, curGameCardChilds){

    insertTeamLogos(curJsonData, curGameCardChilds);

    curGameCardChilds[2].insertAdjacentHTML('beforeend', `<p>${curJsonData['day']}</p>`);

    const gameElem = document.createElement('p');
    gameElem.innerText = `${curJsonData['game_status']}`;
    curGameCardChilds[3].appendChild(gameElem);
    if(curJsonData['game_status'] === 'W'){
        gameElem.style.color = 'rgb(0,200,0)'; 
    } else {
        gameElem.style.color = 'rgb(255,0,0)';
    }

   const locationElem = document.createElement('p');
    curGameCardChilds[4].appendChild(locationElem);
   if(curJsonData['location'] === 'away game'){
    locationElem.innerText = 'Away Game';
   } else {
    locationElem.innerText = 'Home Game';
   }
    
    score = curJsonData['score'].split('-');

    curGameCardChilds[5].insertAdjacentHTML('beforeend', `<p>${score[0]}</p>`);
    curGameCardChilds[6].insertAdjacentHTML('beforeend', `<p>${score[1]}</p>`);


    if(curJsonData['quarter'] != ''){
        curGameCardChilds[7].insertAdjacentHTML('beforeend', `<p>Final-${curJsonData['quarter']}<p>`);

    } else {
        curGameCardChilds[7].insertAdjacentHTML('beforeend', `<p>Final-4th<p>`);
    }

    curGameCardChilds[8]
        .insertAdjacentHTML('beforeend', `<p>${curJsonData['points']}<span class='category'>PTS</span><br><span class='playerName'>${curJsonData['points_leader']}</span></br>`);
    curGameCardChilds[9]
        .insertAdjacentHTML('beforeend', `<p>${curJsonData['rebounds']}<span class='category'>RBD</span><br><span class='playerName'>${curJsonData['rebounds_leader']}</span></br>`);
    curGameCardChilds[10]
        .insertAdjacentHTML('beforeend', `<p>${curJsonData['assists']}<span class='category'>AST</span><br><span class='playerName'>${curJsonData['assists_leader']}</span></br>`);

}

// Modify the future games that will be played
function modifyFutureGame(curJsonData, curGameCardChilds){
    insertTeamLogos(curJsonData, curGameCardChilds);

    curGameCardChilds[2].insertAdjacentHTML('beforeend', `<p>${curJsonData['day']}</p>`);
    curGameCardChilds[3].insertAdjacentHTML('beforeend', `<p>TBD</p>`);

    const locationElem = document.createElement('p');
    curGameCardChilds[4].appendChild(locationElem);
   if(curJsonData['location'] === 'away game'){
    locationElem.innerText = 'Away Game';
   } else {
    locationElem.innerText = 'Home Game';
   }

    curGameCardChilds[5].insertAdjacentHTML('beforeend', `<p>TBD</p>`);
    curGameCardChilds[6].insertAdjacentHTML('beforeend', `<p>TBD</p>`);
    curGameCardChilds[7].insertAdjacentHTML('beforeend', `<p>${curJsonData['time']} ${curJsonData['time_zone']}</p>`);

    curGameCardChilds[8].insertAdjacentHTML('beforeend', `<p>TBD</p>`);
    curGameCardChilds[9].insertAdjacentHTML('beforeend', `<p>TBD</p>`);
    curGameCardChilds[10].insertAdjacentHTML('beforeend', `<p>TBD</p>`);


}


function updateGameCards(){
    // Modify the game-cards
    for(let i = 0; i < gameCards.length; i++){
        const curGameCardChilds = gameCards[i].children;
        const curJsonData = jsonData[i];

        // console.log(jsonData.length, gameCards.length);
        // console.log(curGameCardChilds);
        if(curJsonData['time'] === null){
            modifyPlayedGame(curJsonData, curGameCardChilds);
        } else {
            modifyFutureGame(curJsonData, curGameCardChilds);
        } 
    }
}

// Read the JSON and then update the cards
readJSON().then(resolve => updateGameCards());


