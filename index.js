// Retrieve stored user data
const email = localStorage.getItem('email');
const name = localStorage.getItem('name');
const storedPattern = localStorage.getItem('graphicalPassword');

// Show welcome section if already logged in
if (name !== null && email !== null && storedPattern !== null) {
  document.getElementById('welcomeSection').style.display = 'block';
  document.getElementById('welcomeName').innerText = name;
  document.getElementById('welcomeEmail').innerText = email;
} else if (name === null || email === null) {
  document.getElementById('registerForm').style.display = 'block';
} else {
  document.getElementById('loginForm').style.display = 'block';
}

// Registration form handling
document.getElementById('registerForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');

  const name = nameField.value;
  const email = emailField.value;
  const password = passwordField.value;

  // Store user data in localStorage
  localStorage.setItem('name', name);
  localStorage.setItem('email', email);
  localStorage.setItem('password', password);

  // Clear form fields and move to graphical password setup
  nameField.value = '';
  emailField.value = '';
  passwordField.value = '';
  document.getElementById('mainContainer').style.display = 'block';
  document.getElementById('registerForm').style.display = 'none';
});

// Login form handling
document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const email = document.getElementById('emailpass').value;
  const password = document.getElementById('password1').value;

  const storedEmail = localStorage.getItem('email');
  const storedPassword = localStorage.getItem('password');

  if (email === storedEmail && password === storedPassword) {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('savePassword').innerText = 'Login';
    document.getElementById('headerText').innerText = 'Enter Graphical Password';
    document.getElementById('mainContainer').style.display = 'block';
  } else {
    alert('Invalid email or password. Please try again.');
  }

  // Optionally clear form fields after login attempt
  document.getElementById('emailpass').value = '';
  document.getElementById('password1').value = '';
});

// Graphical Password handling
const patternPoints = document.querySelectorAll('.patternPoint');
let selectedPattern = [];

// Event listener for pattern points
patternPoints.forEach(point => {
  point.addEventListener('click', () => {
    const index = point.getAttribute('data-index');
    
    // Toggle point selection and update selected pattern
    if (!point.classList.contains('active')) {
      point.classList.add('active');
      selectedPattern.push(index);
    } else {
      point.classList.remove('active');
      selectedPattern = selectedPattern.filter(item => item !== index);
    }
    
    updateColors();
  });
});

// Function to update colors of the points
function updateColors() {
  patternPoints.forEach(point => {
    if (point.classList.contains('active')) {
      point.style.backgroundColor = 'green'; // Selected points are green
    } else {
      point.style.backgroundColor = 'red'; // Unselected points are red
    }
  });
}

// Save Password / Login Button handling
document.getElementById('savePassword').addEventListener('click', () => {
  const buttonText = document.getElementById('savePassword').innerText;
  const storedPattern = JSON.parse(localStorage.getItem('graphicalPassword'));

  if (buttonText === 'Register') {
    if (selectedPattern.length >= 6) {
      // Save graphical password to localStorage
      localStorage.setItem('graphicalPassword', JSON.stringify(selectedPattern));
      alert('Register successful!');
      
      // Clear selected points and show welcome section
      patternPoints.forEach(point => point.classList.remove('active'));
      updateColors();
      selectedPattern = [];
      
      document.getElementById('mainContainer').style.display = 'none';
      document.getElementById('welcomeSection').style.display = 'block';
      document.getElementById('welcomeName').innerText = localStorage.getItem('name');
      document.getElementById('welcomeEmail').innerText = localStorage.getItem('email');
      document.getElementById('savePassword').innerText = 'Login';
    } else {
      alert('Please select at least 6 circles.');
      patternPoints.forEach(point => point.classList.remove('active'));
      updateColors();
    }
  } else if (buttonText === 'Login') {
    if (JSON.stringify(selectedPattern) === JSON.stringify(storedPattern)) {
      alert('Login successful!');
      
      // Clear selected points and show welcome section
      patternPoints.forEach(point => point.classList.remove('active'));
      updateColors();
      
      document.getElementById('mainContainer').style.display = 'none';
      document.getElementById('welcomeSection').style.display = 'block';
      document.getElementById('welcomeName').innerText = localStorage.getItem('name');
      document.getElementById('welcomeEmail').innerText = localStorage.getItem('email');
    } else {
      alert('Incorrect pattern, please try again.');
      selectedPattern = [];
      patternPoints.forEach(point => point.classList.remove('active'));
      updateColors();
    }
  }
});

// Clear Pattern Button handling
document.getElementById('clearPattern').addEventListener('click', () => {
  selectedPattern = [];
  patternPoints.forEach(point => point.classList.remove('active'));
  updateColors();
});

// Logout Button handling
document.getElementById('logoutButton').addEventListener('click', () => {
  document.getElementById('welcomeSection').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
  
  selectedPattern = [];
  patternPoints.forEach(point => point.classList.remove('active'));
  updateColors();
  
  document.getElementById('savePassword').innerText = 'Login';
});

// Clear Storage Button handling
document.getElementById('storageButton').addEventListener('click', () => {
  const res = confirm('You want to clear local storage.');
  if (res) {
    localStorage.clear();
    document.getElementById('welcomeSection').style.display = 'none';
    document.getElementById('headerText').innerText = 'Set Graphical Password';
    document.getElementById('savePassword').innerText = 'Register';
    document.getElementById('registerForm').style.display = 'block';
  }
});
