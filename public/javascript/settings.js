function applySettings() {
  // document.cookie = "playAudio=" + document.getElementById("playAudio").checked;
  // document.cookie = "audioCity=" + document.getElementById("audioCity").checked;
  localStorage.setItem('onlySelectedCity', document.getElementById("onlySelectedCity").checked);
  localStorage.setItem('onlySelectedEvent', document.getElementById("onlySelectedEvent").checked);
  localStorage.setItem('onlySelectedBoth', document.getElementById("onlySelectedBoth").checked);
  getSelectedValues("cities",document.getElementById("selectCityList"))
  getSelectedValues("events",document.getElementById("selectEventList"))
}

function getSelectedValues(type,list) {
  var values = [];

  for (var i = 0; i < list.options.length; i++) {
    if (list.options[i].selected) {
      values.push({type:list.options[i].value});
    }
  }

  if (values.length>0)localStorage.setItem(type, JSON.stringify(values));
}
