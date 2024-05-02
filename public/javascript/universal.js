if (localStorage.getItem('onlySelectedCity') == null) {
    localStorage.setItem('onlySelectedCity', true)
}
if (localStorage.getItem('onlySelectedEvent') == null) {
    localStorage.setItem('onlySelectedEvent', true)
}
if (localStorage.getItem('onlySelectedBoth') == null) {
    localStorage.setItem('onlySelectedBoth', false)
}
if (localStorage.getItem('cities') == null) {
    localStorage.setItem('cities', null)
}
if (localStorage.getItem('events') == null) {
    localStorage.setItem('events', null)
}

if (localStorage.getItem('oldEvent') == null) {
    localStorage.setItem('oldEvent', null)
}