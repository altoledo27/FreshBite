// HAM MENU
const myButton = document.getElementById('myButton');
const navMenu = document.getElementById('animateme');

myButton.addEventListener('click', () => {
    myButton.classList.toggle('open');
    navMenu.classList.toggle('open');
});
