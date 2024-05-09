document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
  
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Mock user data
      const users = [
        { username: 'varun', password: 'varun123' }
      ];
  
      // Check if username and password match
      const foundUser = users.find(user => user.username === username && user.password === password);
  
      if (foundUser) {
        // Redirect to expenses calculator page
        window.location.href = 'index.html';
      } else {
        errorMessage.textContent = 'Invalid username or password';
      }
    });
  });
  