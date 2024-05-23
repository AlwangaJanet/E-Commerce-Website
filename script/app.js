const form = document.getElementById('signup-form')
    const message = document.getElementById('message')

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value
      const password = document.getElementById('password').value
      const email = document.getElementById('email').value

      if (username.length < 4 || password.length < 8) {
        message.innerText = 'Username must be at least 4 characters long and password must be at least 8 characters long.';
        return
      }

      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: btoa(password),
          email: email
        })
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          message.innerText = 'Signup successful!';
        } else {
          message.innerText = 'Signup failed: ' + (data.message || 'Unknown error')
        }
      })
      .catch((error) => {
        message.innerText = 'An error occurred: ' + error.message
      })
    })
  