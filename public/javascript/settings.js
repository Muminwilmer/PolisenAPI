function applySettings() {
  document.cookie = "playAudio=" + document.getElementById("playAudio").checked;
  document.cookie = "audioCity=" + document.getElementById("audioCity").checked;
  document.cookie = "onlySelectedCity=" + document.getElementById("onlySelectedCity").checked;
  getSelectedValues()
}

function getSelectedValues() {
  var select = document.getElementById("selectLists");
  var selectedValues = [];

  for (var i = 0; i < select.options.length; i++) {
    if (select.options[i].selected) {
      selectedValues.push(select.options[i].value);
    }
  }

  document.cookie = "citys=" + selectedValues;
}
