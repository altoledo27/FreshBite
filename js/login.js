const loginForm = document.getElementById('login-form');

      loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const validUser = users.find(user => user.email === email && user.password === password);

        if (!validUser) {
          return alert('Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.');
        }

        localStorage.setItem('isLoggedIn', 'true');
        
        alert('¡Inicio de sesión exitoso!');
        window.location.href = 'index.html';
      });