import {firebaseApp} from './firebase.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js';

const emailText = document.querySelector('#email');
const passwordText = document.querySelector('#password');
const loginForm = document.querySelector('#loginForm');
const errorMessageDOM = document.querySelector('.form-error');

const auth = getAuth(firebaseApp);

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('click')
  const email = emailText.value;
  const password = passwordText.value;

  signIn(email, password)
})

onAuthStateChanged(auth, (user) => {
  if (user) {
  } else {
      console.log('no user is signed in')
  }
});

const signIn = (email, password) => {
  signInWithEmailAndPassword (auth, email, password)
  .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      console.log(`${user.email} has signed in!`);

      window.location.href = "/";
      // ...
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`)
      errorMessageDOM.innerHTML = errorCode.replace("auth/", "");;
      errorMessageDOM.style.visibility = 'visible';
      errorMessageDOM.style.display = 'block';
      // ..
  });
}