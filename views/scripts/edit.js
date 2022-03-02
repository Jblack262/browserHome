const icons = ['email', 'assignment', 'assistant_photo', 'build', 'business_center', 'chat', 'color_lens', 'dashboard', 'edit', 'explore', 'extension' ,'favorite' ,'folder' ,'grade', 'home', 'insert_drive_file', 'lightbulb_outline' , 'live_tv', 'local_grocery_store' ,'location_on' ,'restaurant', 'settings', 'today']
const url = "/api/v1/bookmarks";
const iconsContainer = document.querySelector('.icons');
const bookmarksContainerDOM = document.querySelector('.bookmarksContainerEdit');
const addIconForm = document.querySelector('.addIcon')
const inputName = document.querySelector('#name');
const inputURL = document.querySelector('#url');
const previewName = document.querySelector('#previewName');
const previewIcon = document.querySelector('#previewIcon');
const warningMessage = document.querySelector('.warningMessage');
let selectedIcon = undefined;
const showIcons = () => {
  const iconsHTML = icons.map((icon) => {
    return `<i class="material-icons" id="${icon}" onClick="selectIcon('${icon}')">${icon}</i>`
  }).join('')
  iconsContainer.innerHTML = iconsHTML;
}
showIcons();

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
            const {icon, name, _id: id} = bookmark;
            return `
                <a onClick="deleteBookmark('${id}')" class="bookmark edit">
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
showBookmarks();

const selectIcon = (icon) => {
  const iconDOM = document.querySelector(`#${icon}`);
  const icons = document.getElementsByClassName('material-icons');
  selectedIcon = icon;
  for (let i = 0; i < icons.length; i++) {
    icons[i].style.backgroundColor = 'transparent';
    icons[i].style.color = 'white';
  }

  // icons.forEach((icon) => {
  //   console.log(icon)
  //   // icon.style.backgroundColor = 'transparent';
  // })
  iconDOM.style.backgroundColor = 'white';
  iconDOM.style.color = 'black';
  previewIcon.innerHTML = icon;
}

const addNewBookmark = async () => {
  try {
    const newBookmark = {
      icon: selectedIcon,
      link: inputURL.value,
      name: inputName.value
    }
    
    await axios.post(url, newBookmark);
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

  } catch (error) {
    console.error(error)
  }
}

addIconForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addNewBookmark();
})

inputName.addEventListener('input', () => {
  previewName.innerHTML = inputName.value;
})

const deleteBookmark = async (id) => {
  try {
    await axios.delete(`${url}/${id}`)
    showBookmarks();

  } catch (error) {
    console.error(error)
  }
}