import {firebaseApp} from './firebase.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js';
// const mongoose = require('mongoose');

const auth = getAuth(firebaseApp);

const url = "/api/v1/bookmarks";

const bookmarksContainerDOM = document.querySelector('.bookmarksContainer');
const bookmarksTitle = document.querySelector('.bookmarksTitle');
const bookmarksEditBtn = document.querySelector('#bookmarksEditBtn');
const bookmarksLoginBtn = document.querySelector('#bookmarksLoginBtn');
const warningMessage = document.querySelector('.warningMessage');
const showBookmarks = async () => {
    try {
        const { data: {bookmarks} } = await axios.get(url)
        console.log(bookmarks)

        if (bookmarks.length < 1) {
          warningMessage.innerHTML = "There are currently no bookmarks";
          warningMessage.style.visibility = "visible";
          warningMessage.style.display = "block";
        } else {
          warningMessage.style.visibility = "hidden";
          warningMessage.style.display = "none";
        }

        const bookmarksHTML = bookmarks.map(bookmark => {
            let {icon, link, name} = bookmark;
            if (!link.includes('http')) {
                link = `https://${link}`
            }
            return `
                <a href="${link}" class="bookmark">
                    <div>
                        <i class="material-icons">${icon}</i>
                        <h1>${name}</h1>
                    </div>
                </a>
            `
        }).join('')

        bookmarksContainerDOM.innerHTML = bookmarksHTML;
    } catch (err) {
        console.error(err)
        warningMessage.innerHTML = "Error, could not fetch bookmarks.";
        warningMessage.style.visibility = "visible";
        warningMessage.style.display = "block";
    }
}

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