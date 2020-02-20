// Get the buttons and game cards
const btnList = document.querySelectorAll('button');

// console.log(gameCards);

const resetbtn = document.getElementsByClassName('btn-reset')[0];
resetbtn.addEventListener('click', () => {
    // console.log('Reset')
    gameCards.forEach(game => {
        game.style.display = 'grid';
    });
});


const winBtn = document.getElementsByClassName('btn-win')[0];
winBtn.addEventListener('click', () => {
    gameCards.forEach(game => {
        if(game.children[3].innerText === 'W'){
            game.style.display = 'grid';
        } else {
            game.style.display = 'none';
        }
    });
});

const lossBtn = document.getElementsByClassName('btn-loss')[0];
lossBtn.addEventListener('click', () => {
    gameCards.forEach(game => {
        if(game.children[3].innerText === 'L'){
            game.style.display = 'grid';
        } else {
            game.style.display = 'none';
        }
    }); 
});

const homeBtn = document.getElementsByClassName('btn-home')[0];
homeBtn.addEventListener('click', () => {
    gameCards.forEach(game => {
        if(game.children[4].innerText === 'Home Game'){
            game.style.display = 'grid';
        } else {
            game.style.display = 'none';
        }
    });
});

const awayBtn = document.getElementsByClassName('btn-away')[0];
awayBtn.addEventListener('click', () => {
    gameCards.forEach(game => {
        if(game.children[4].innerText === 'Away Game'){
            game.style.display = 'grid';
        } else {
            game.style.display = 'none';
        }
    });
});

const pastBtn = document.getElementsByClassName('btn-past')[0];
pastBtn.addEventListener('click', () => {
    gameCards.forEach(game => {
        if(game.children[3].innerText != 'TBD'){
            game.style.display = 'grid';
        } else {
            game.style.display = 'none';
        }
    });
});

const futureBtn = document.getElementsByClassName('btn-future')[0];
futureBtn.addEventListener('click', () => {
    gameCards.forEach(game => {
        if(game.children[3].innerText === 'TBD'){
            game.style.display = 'grid';
        } else {
            game.style.display = 'none';
        }
    });
});

const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const input = document.querySelector('input').value;
    const options = document.querySelector('datalist');
    const arr = Array.from(options.children);
    let validInput = false;

    arr.forEach((opt) => {
        if(opt.value === input){
            filterTeam(input);
            validInput = true;
        }
    });

    if(!validInput){
        console.log('Invalid Input');
        searchForm.style.borderColor = 'red';

        setTimeout(() => {
            searchForm.style.borderColor = 'white';
        }, 500);
    } else {
        searchForm.style.borderColor = 'rgb(0,200,0)';

        setTimeout(() => {
            searchForm.style.borderColor = 'white';
        }, 500);
    }
    
});

function filterTeam(teamName){
    for(let i = 0; i < jsonData.length; i++){
        if(jsonData[i]['opponent'] === teamName){
            gameCards[i].style.display = 'grid';
        } else {
            gameCards[i].style.display = 'none';
        }
    }
}

const hamburgerIcon = document.getElementsByClassName('hamburger-wrapper')[0];

let clicked = false;
hamburgerIcon.addEventListener('click', () => {
    clicked = !clicked;
    // console.log(clicked);
    const searchContainer = document.getElementsByClassName('search-container')[0];
    if(clicked){
        searchContainer.style.display = 'flex';
    } else {
        searchContainer.style.display = 'none';

    }
});