import {firebaseApp} from './firebase.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js';

const auth = getAuth(firebaseApp);

const timeDOM = document.querySelector('#time');
const loginBtn = document.querySelector('#loginBtn');
const logoutBtn = document.querySelector('#logoutBtn');
const loggedInMsg = document.querySelector('.loginMessage');
const username = document.querySelector('#username');

onAuthStateChanged(auth, (user) => {
    if (user) {

        loginBtn.style.display = 'none';
        loginBtn.style.visibility = 'hidden';

        logoutBtn.style.display = 'block';
        logoutBtn.style.visibility = 'visible';

        loggedInMsg.style.display = 'block';
        loggedInMsg.style.visibility = 'visible';
        user.displayName ? username.innerHTML = user.displayName : username.innerHTML = 'unknown username';
    } else {
        // User is signed out

        logoutBtn.style.display = 'none';
        logoutBtn.style.visibility = 'hidden';
        loggedInMsg.style.display = 'none';
        loggedInMsg.style.visibility = 'hidden';
        username.innerHTML = '';

        loginBtn.style.display = 'block';
        loginBtn.style.visibility = 'visible';
    }
});

const logout = () => {
    console.log('log out')
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('signed out')
    }).catch((error) => {
        // An error happened.
        console.log(error)
    });
}
logoutBtn.addEventListener('click', () => logout())

function startTime() {
    const today = new Date();
    let h = today.getHours() > 12 ? today.getHours() - 12 : today.getHours(); //gets rid of military time
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    timeDOM.innerHTML =  `${h} : ${m} : ${s}`;
    setTimeout(startTime, 1000);
}
startTime();
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

const searchInput = document.querySelector('#search')

const searchOnSubmit = (e) => {
    e.preventDefault();
    console.log(searchInput.value)
    const search = searchInput.value.split(' ').join('+')
    console.log(search)
    window.open(`https://www.google.com/search?q=${search}`, "_blank")
}