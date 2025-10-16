
const isLoggedIn = localStorage.getItem('isLoggedIn');

if (isLoggedIn !== 'true') {
    alert('You need to log in to access to this page.');
    
    window.location.href = 'login.html';
}