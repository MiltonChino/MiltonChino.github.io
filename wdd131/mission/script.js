// pick only the content you need from the DOM
let selectElem = document.querySelector('#theme-select');
let pageContent = document.querySelector('body');
let image = document.querySelector('#content img');
// add event listener to update the DOM
selectElem.addEventListener('change', changeTheme);

// function to update the DOM based on the select value
function changeTheme() {
    let current = selectElem.value;
    if (current === 'dark') {
        document.body.style.backgroundColor = "#000000";
        pageContent.style.color = "white";
        image.src = "byui-logo-white.png";

    } else {
        document.body.style.backgroundColor = "#ffff";
        pageContent.style.color = "#000000";
    }
}