
const url = "/api/v1/bookmarks";

const bookmarksContainerDOM = document.querySelector('.bookmarksContainer');
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
showBookmarks();