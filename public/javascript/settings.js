function applySettings() {
  // document.cookie = "playAudio=" + document.getElementById("playAudio").checked;
  // document.cookie = "audioCity=" + document.getElementById("audioCity").checked;
  localStorage.setItem('onlySelectedCity', document.getElementById("onlySelectedCity").checked);
  getSelectedValues("cities",document.getElementById("selectCityList"))
  getSelectedValues("events",document.getElementById("selectEventList"))
}

function getSelectedValues(type,list) {
  var selectedValues = [];

  for (var i = 0; i < list.options.length; i++) {
    if (list.options[i].selected) {
      selectedValues.push({type:list.options[i].value});
    }
  }

  localStorage.setItem(type, JSON.stringify(selectedValues));
}
