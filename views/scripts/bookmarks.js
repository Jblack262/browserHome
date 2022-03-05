import {firebaseApp} from './firebase.js';
import { getFirestore, addDoc, collection, getDocs, updateDoc, deleteField, doc  } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js';
// const mongoose = require('mongoose');

const auth = getAuth(firebaseApp);
const db = getFirestore();

const url = "/api/v1/bookmarks";

const bookmarksContainerDOM = document.querySelector('.bookmarksContainer');
const bookmarksTitle = document.querySelector('.bookmarksTitle');
const bookmarksEditBtn = document.querySelector('#bookmarksEditBtn');
const bookmarksLoginBtn = document.querySelector('#bookmarksLoginBtn');
const warningMessage = document.querySelector('.warningMessage');

const showBookmarks = async () => {
warningMessage.innerHTML = "loading...";
warningMessage.style.visibility = "visible";
warningMessage.style.display = "block";
onAuthStateChanged(auth, async (user) => {
    try {
    const dbCollection = await getDocs(collection(db, user.email))  
    warningMessage.style.visibility = "visible";
    warningMessage.style.display = "block";
    let bookmarksHTML = [];
    dbCollection.forEach((doc) => {
        const {icon, name, link} = doc.data();
        name ? bookmarksHTML.push(`
            <a href="${link}" class="bookmark">
                <div>
                    <i class="material-icons">${icon}</i>
                    <h1>${name}</h1>
                </div>
            </a>
        `) : '';
    });

    if (bookmarksHTML.length < 1) {
        warningMessage.innerHTML = "There are currently no bookmarks";
        warningMessage.style.visibility = "visible";
        warningMessage.style.display = "block";
    } else {
        warningMessage.style.visibility = "hidden";
        warningMessage.style.display = "none";
    }
    
    bookmarksContainerDOM.innerHTML = bookmarksHTML.join('');
    } catch (err) {
        console.error(err)
        if (user) {
            warningMessage.innerHTML = "Error, could not fetch bookmarks.";
            warningMessage.style.visibility = "visible";
            warningMessage.style.display = "block";
        } else {
            warningMessage.style.visibility = "hidden";
            warningMessage.style.display = "none";
        }
    }
});
}
showBookmarks();

            // let {icon, link, name} = bookmark;
            // if (!link.includes('http')) {
            //     link = `https://${link}`
            // }
            // return `
            //     <a href="${link}" class="bookmark">
            //         <div>
            //             <i class="material-icons">${icon}</i>
            //             <h1>${name}</h1>
            //         </div>
            //     </a>
            // `

onAuthStateChanged(auth, (user) => {
    if (user) { //if user is logged in bookmarks will be displayed
        showBookmarks()
    } else { //if not logged in they will be prompted to log in
        console.log('not logged in')
        bookmarksTitle.innerHTML = 'Please log in to see bookmarks'
        bookmarksContainerDOM.innerHTML = '';
        bookmarksEditBtn.style.visibility = 'hidden';
        bookmarksEditBtn.style.display = 'none';

        bookmarksLoginBtn.style.visibility = 'visible';
        bookmarksLoginBtn.style.display = 'block';
    }
});