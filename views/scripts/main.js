const timeDOM = document.querySelector('#time');

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