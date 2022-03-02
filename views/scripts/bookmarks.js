const icons = ['email', 'assignment', 'assistant_photo', 'build', 'business_center', 'chat', 'color_lens', 'dashboard', 'edit', 'explore', 'extension' ,'favorite' ,'folder' ,'grade', 'home', 'insert_drive_file', 'lightbulb_outline' , '	live_tv', '	local_grocery_store' ,'location_on' ,'restaurant', 'settings', 'today']

const url = "/api/v1/bookmarks";

const bookmarksContainerDOM = document.querySelector('.bookmarksContainer');
const showBookmarks = async () => {
    try {
        const { data: {bookmarks} } = await axios.get(url)
        console.log(bookmarks)

        const bookmarksHTML = bookmarks.map(bookmark => {
            const {icon, link, name} = bookmark;
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
    }
}
showBookmarks()