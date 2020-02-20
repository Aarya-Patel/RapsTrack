// //querySelector goes by element tag name not class or id

// let y = document.querySelectorAll("li");
// console.log(y);

// console.log(document.getElementsByClassName("raps-logo"));

// console.log(y[1].children);
// // console.log(document.getElement("li").getElement("div"));

const fileReader = new FileReader();
// document.addEventListener('click', () => {console.log('asda')});

// var fileContent = fileReader.readAsText("data.json");
// console.log(fileContent);

const f = (a,b) => {
    setTimeout(() => console.log(a+b), 2000);
};

function test() {
    return new Promise((resolve, reject) => {

        //Will do return reject first and resolve will never get run
        reject('Something went wrong');
        resolve('Something went right');
        console.log('Hello');


    });
}

// test().then((res) => console.log(res))
// .catch((err) => console.log(`Error ${err}`));
// test().then(f(18,2)).catch((err) => console.log('Error: ' + err));

// let promise1 = new Promise(() => {console.log('Promise 1')});


let data;

async function readFile(){
    let d = await fetch('data.json').then(res => res.json());
    return d;
}

console.log(readFile().then(d => data = d));
// console.log(data);

setTimeout(() => console.log(data), 1000);

// console.log(data);
// setTimeout(() => console.log(data), 2000);






