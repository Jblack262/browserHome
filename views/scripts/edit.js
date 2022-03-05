import {firebaseApp} from './firebase.js';
import { getFirestore, addDoc, collection, getDocs, updateDoc, deleteField, doc  } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js';

const auth = getAuth(firebaseApp);
const db = getFirestore();

const bookmarksContainerDOM = document.querySelector('.bookmarksContainerEdit');
const addIconForm = document.querySelector('.addIcon')
const inputName = document.querySelector('#name');
const inputURL = document.querySelector('#url');
const previewName = document.querySelector('#previewName');
const warningMessage = document.querySelector('.warningMessage');

const showBookmarks = async () => {
  warningMessage.innerHTML = "loading...";
  warningMessage.style.visibility = "visible";
  warningMessage.style.display = "block";
  onAuthStateChanged(auth, async (user) => {
    try {
      const dbCollection = await getDocs(collection(db, user.email));
      let bookmarksHTML = [];
      dbCollection.forEach((doc) => {
        const {icon, name} = doc.data()
        name ? bookmarksHTML.push(`
            <a onClick="deleteBookmark('${doc.id}')" class="bookmark edit">
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
      warningMessage.innerHTML = "Error, could not fetch bookmarks.";
      warningMessage.style.visibility = "visible";
      warningMessage.style.display = "block";
    }
  });
}
showBookmarks();



const addNewBookmark = () => {

  onAuthStateChanged(auth, async (user) => {
    const newBookmark = {
      icon: previewIcon.innerHTML,
      link: inputURL.value,
      name: inputName.value
    }
    console.log(user.email)
    try {
      await addDoc(collection(db, user.email), newBookmark);
      
      showBookmarks();
      //clear the form
      inputURL.value = "";
      inputName.value = "";
      previewIcon.innerHTML = "";
      previewName.innerHTML = "";
      const icons = document.getElementsByClassName('material-icons');
      for (let i = 0; i < icons.length; i++) {
        icons[i].style.backgroundColor = 'transparent';
        icons[i].style.color = 'white';
      }
    } catch (err) {
      console.error(err)
    }
  })
}


addIconForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addNewBookmark();
})

inputName.addEventListener('input', () => {
  previewName.innerHTML = inputName.value;
})

const deleteBookmark = async (id) => {
  onAuthStateChanged(auth, async (user) => {
    try {
      const collection = doc(db, user.email, id);

      await updateDoc(collection, {
        icon: deleteField(),
        link: deleteField(),
        name: deleteField()
      });

      showBookmarks();
    } catch (err) {
      console.error(err)
    }
  })
}

window.deleteBookmark = deleteBookmark;