const registerForm = document.getElementById('register-form');

      registerForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
          return alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
        }
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
          return alert('Este correo electrónico ya está registrado.');
        }

        users.push({ email: email, password: password });

        localStorage.setItem('users', JSON.stringify(users));
        
        alert('¡Registro exitoso! Serás redirigido para iniciar sesión.');
        window.location.href = 'login.html';
      });