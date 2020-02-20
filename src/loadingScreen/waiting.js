const btn = document.querySelector('button');

btn.addEventListener('click', (event) => {
    btn.innerText = 'Loading...';
    //Create a delay to update the innerText befor POST request
    // setTimeout(1000);
});