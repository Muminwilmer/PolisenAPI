function applySettings() {
  pressAnimation(document.getElementById("applySettings"))
  localStorage.setItem('eitherSelected', document.getElementById("eitherSelected").checked);
  localStorage.setItem('onlySelectedBoth', document.getElementById("onlySelectedBoth").checked);
  getSelectedValues("cities",document.getElementById("selectCityList"))
  getSelectedValues("events",document.getElementById("selectEventList"))
}

function pressAnimation(button){
  button.style.transform = "scale(0.90)";
  setTimeout(function() {
    button.style.transform = "scale(1)";
  }, 100);
}

function defaultSettings() {
  pressAnimation(document.getElementById("defaultSettings"))
  localStorage.setItem('eitherSelected', false);
  localStorage.setItem('onlySelectedBoth', false);
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
