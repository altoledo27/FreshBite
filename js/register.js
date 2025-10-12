const registerForm = document.getElementById('register-form');

      registerForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
          return alert('The passwords don\'t match. Please try again.');
        }
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
          return alert('This email is already registered.');
        }

        users.push({ email: email, password: password });

        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Registration successful! You\'ll be redirected to log in.');
        window.location.href = 'login.html';
      });