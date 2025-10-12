const loginForm = document.getElementById('login-form');

      loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const validUser = users.find(user => user.email === email && user.password === password);

        if (!validUser) {
          return alert('Incorrect email or password. Please try again.');
        }

        localStorage.setItem('isLoggedIn', 'true');
        
        alert('Login successful');
        window.location.href = 'index.html';
      });