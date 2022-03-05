import {firebaseApp} from './firebase.js';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js';

const nameText = document.querySelector('#name');
const signUpForm = document.querySelector('#signUpForm');
const emailText = document.querySelector('#email');
const passwordText = document.querySelector('#password');
const errorMessageDOM = document.querySelector('.form-error');

const auth = getAuth(firebaseApp);

signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('click')
  const email = emailText.value;
  const password = passwordText.value;
  const displayName = nameText.value;

  signUp(email, password, displayName)
})

const signUp = (email, password, displayName) => {
  createUserWithEmailAndPassword (auth, email, password)
  .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      console.log(`${user.email} has signed in!`);

      updateProfile(auth.currentUser, {
        displayName: displayName
      }).then(() => {
        // Profile updated!
        // ...
        window.location = '/login'
      }).catch((error) => {
        // An error occurred
        // ...
        console.error(error)
      });

      console.log(user)
      // window.location.href = "/login";
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