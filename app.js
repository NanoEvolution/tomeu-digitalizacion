// app.js
// Configura con tus datos de Firebase:
const firebaseConfig = {
  apiKey: "AIzaSyCNSxAOxsvmEK8ZSfgQ2eOulmuGz9xcw2k",
  authDomain: "tomeu-nota.firebaseapp.com",
  projectId: "tomeu-nota",
  storageBucket: "tomeu-nota.appspot.com",
  messagingSenderId: "384494086325",
  appId: "1:384494086325:web:9e11b28d54104c4ad7b6fc"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Proveedores sociales
const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

// Elementos del DOM
const btnGoogle   = document.getElementById('btn-google');
const btnGitHub   = document.getElementById('btn-github');
const emailForm   = document.getElementById('email-form');
const inputEmail  = document.getElementById('email');
const inputPass   = document.getElementById('password');
const userInfoDiv = document.getElementById('user-info');
const userNameEl  = document.getElementById('user-name');
const btnLogout   = document.getElementById('btn-logout');

// Login con Google
btnGoogle.addEventListener('click', () => {
  auth.signInWithPopup(googleProvider)
      .catch(err => console.error(err));
});

// Login con GitHub
btnGitHub.addEventListener('click', () => {
  auth.signInWithPopup(githubProvider)
      .catch(err => console.error(err));
});

// Registro / Login con email y contraseña
emailForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = inputEmail.value;
  const pass  = inputPass.value;

  auth.createUserWithEmailAndPassword(email, pass)
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          return auth.signInWithEmailAndPassword(email, pass);
        }
        console.error(err);
      });
});

// Observador de estado de autenticación
auth.onAuthStateChanged(user => {
  if (user) {
    userInfoDiv.style.display = 'block';
    userNameEl.textContent = user.displayName || user.email;
  } else {
    userInfoDiv.style.display = 'none';
  }
});

// Cerrar sesión
btnLogout.addEventListener('click', () => {
  auth.signOut();
});
