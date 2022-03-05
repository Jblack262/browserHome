
const icons = ['email', 'assignment', 'assistant_photo', 'build', 'business_center', 'chat', 'color_lens', 'dashboard', 'edit', 'explore', 'extension' ,'favorite' ,'folder' ,'grade', 'home', 'insert_drive_file', 'lightbulb_outline' , 'live_tv', 'local_grocery_store' ,'location_on' ,'restaurant', 'settings', 'today']
const iconsContainer = document.querySelector('.icons');
const previewIcon = document.querySelector('#previewIcon');
let selectedIcon = undefined;

const showIcons = () => {
  const iconsHTML = icons.map((icon) => {
    return `<i class="material-icons icon" id="${icon}" onClick="selectIcon('${icon}')">${icon}</i>`
  }).join('')
  iconsContainer.innerHTML = iconsHTML;
}
showIcons();

const selectIcon = (icon) => {
  const iconDOM = document.getElementById(`${icon}`);
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