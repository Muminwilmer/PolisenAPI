const URL = "https://polisen.se/api/events";

window.onload = function() {
  populateTable()
}
setInterval(populateTable, 45*1000);

function testNew() {
  newUpdate()
  populateTable()
}

function testData(type) {
  const data = getData();
  const parsedData = parseJsonString(data.requestText);
  parsedData.forEach(item => {
    var types = [];
    types.push(item[type])
    console.log(types)
  })
}
function getData() {
  var request = new XMLHttpRequest();
  request.open("GET", URL, false);
  request.send(null);

  const returnValue = {
    requestStatus: request.status,
    requestText: request.responseText
  }

  return returnValue;
}

function newUpdate() {
  const alert = document.createElement("img");
  alert.src = 'images/alert.ico'
  alert.id = 'alertImage'
  document.getElementById("images").appendChild(alert);
  const data = getData();
  const parsedData = parseJsonString(data.requestText);
  const parsedID = parsedData[0].name.toString()

  // if (getCookie("audioCity") == "true") {
  //   if (!getCookie("cities").includes(parsedID)) return;
  // } else {
  //   if (getCookie("playAudio") == "true") {
  //     var audio = document.getElementById("newsAudio");
  //     audio.play()
  //   };
  // }
  setTimeout(function() {
    alert.remove()
  }, 15000);
}

function populateTable(inputString) {
  const date = new Date(inputString)

  const data = getData();


  const parsedData = parseJsonString(data.requestText);
  console.log(parsedData)
  const sortedData = parsedData.sort((a, b) => b.id - a.id);
  console.log(sortedData)
  const parsedID = parsedData[0].id.toString()

  // Adds the oldEvent cookie if it doesn't exist.
  if (localStorage.getItem('oldEvent') == null) {
    localStorage.setItem('oldEvent', parsedID)
  }

  // Detect and handle new events
  if (localStorage.getItem('oldEvent') !== parsedID) {
    newUpdate()
    localStorage.setItem('oldEvent', parsedID)
  }

  // Adds and removes the Reload icon
  let table = document.getElementById("dataTableBody");
  const reload = document.createElement("img");
  reload.src = 'images/reload.ico'
  reload.id = 'reloadImage'
  reload.style.paddingLeft = '5px'
  document.getElementById("images").appendChild(reload);
  setTimeout(function() {
    reload.remove()
  }, 10000);

  table.innerHTML = "";




  let count = 0
  parsedData.forEach(async item => {
    
    async function checkIfExists(list,check){
      try {
        list = JSON.parse(list);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return "empty";
      }

      if (list === null || list === undefined) {
        return "empty";
      }

      for (let i = 0; i < list.length; i++) {
        if (list[i].type == check) {
          return true;
        }
        // If it doesn't return the function
        if (i == list.length-1) {
          return false;
        }
      }
    }

    function doesLocalVarExist(variable){
      try {
        if (variable === null) return false;
      }catch(error){
        return false;
      };

      try {
        if (variable === undefined) return false;
      }catch(error){
        return false;
      };

      try {
        if (variable.length == 0) return false;
      }catch(error){
        return false;
      };

      try {
        if (variable.length>0) return true;
      }catch(error){
        return false;
      };
      return true
    }

    let checked = false;
    const cities = localStorage.getItem('cities')
    const events = localStorage.getItem('events')
    if (localStorage.getItem('onlySelectedBoth')=="true" && !checked) {
      if (doesLocalVarExist(cities) && doesLocalVarExist(events)){
        const cityFound = await checkIfExists(cities,item.location.name)
        const eventFound = await checkIfExists(events,item.type)

        if (cityFound!=="empty"&&eventFound!=="empty"){
          if (cityFound==true && eventFound==true){checked=true}else{
            return;
          }
        }else{
          console.warn(`Please select atleast one city and event! City exist:(${cityFound}) Event exist:(${eventFound})`)
        }
      }
    }
    if (localStorage.getItem('eitherSelected')=="true" && !checked) {
      if (doesLocalVarExist(cities) || doesLocalVarExist(events)){
        const cityFound = await checkIfExists(cities,item.location.name)
        const eventFound = await checkIfExists(events,item.type)

        if (cityFound==true || eventFound==true){checked=true}else{
          return;
        }
      }
    }
  //   if (localStorage.getItem('onlySelectedCity')=="true" && !checked) {
  //     if (doesLocalVarExist(cities)){
  //       const cityFound = await checkIfExists(cities,item.location.name)
  //       
  //       if (cityFound==true){checked=true}else{
  //         return;
  //       }
  //     }
  //   }
  //   if (localStorage.getItem('onlySelectedEvent')=="true" && !checked) {
  //     if (doesLocalVarExist(events)){
  //       const eventFound = await checkIfExists(events,item.type)
  //       
  //       if (eventFound==true){checked=true}else{
  //         return;
  //       }
  //     }
  //   }

    // Adds row
    let row = table.insertRow();
    
    // Adds class to row
    row.classList.add("Row");
    
    // Makes row correct color
    if (count % 2 == 0) {
      row.id = 'darkRow';
    } else {
      row.id = 'whiteRow';
    }
    count++



    //Id
    //let idCell = row.insertCell(0);
    //idCell.innerHTML = item.id;

    //Type
    let typeCell = row.insertCell(0);
    typeCell.innerHTML = item.type;

    //Short Info
    let infoCell = row.insertCell(1);
    let aInfo = document.createElement('a');
    let infoLink = document.createTextNode(item.summary);
    aInfo.appendChild(infoLink);
    aInfo.href = `https://polisen.se${item.url}`;
    aInfo.target = "_blank";
    infoCell.appendChild(aInfo)

    //Location Name
    let locationCell = row.insertCell(2);
    let aLocation = document.createElement('a');
    let locationLink = document.createTextNode(item.location.name);
    aLocation.appendChild(locationLink);
    aLocation.href = `https://www.google.com/maps/search/${item.location.gps}`;
    aLocation.target = "_blank";
    locationCell.appendChild(aLocation)

    //let dropdownButton = document.createElement('button');
    //dropdownButton.textContent = item.location.name;

    //let dropdownContent = document.createElement('div');
    //dropdownContent.style.display = 'none';

    //dropdownButton.addEventListener('click', function() {
    //  locationCell.innerHTML = `<iframe
    //    src="https://www.google.com/maps/search/${item.location.gps}">
    //  </iframe>`;
    //});

    //dropdownButton.appendChild(dropdownContent);

    //dropdownButton.addEventListener('click', function() {
    //  dropdownContent.style.display = dropdownContent.style.display === 'none' ? 'block' : 'none';
    //});

    //locationCell.appendChild(dropdownButton);


    //Event date
    const [, day, month, time] = item.name.match(/(\d+) (\w+) (\d{2}\.\d{2})/);
    let datetimeCell = row.insertCell(3);
    datetimeCell.innerHTML = `${day} ${month[0].toUpperCase() + month.substring(1)} ${time}`

    //Published
    const formattedDate = formatDateString(item.datetime);
    let publishCell = row.insertCell(4);
    publishCell.innerHTML = formattedDate
  })

}

function parseJsonString(data) {
  return JSON.parse(data);
}



function formatDateString(inputString) {
  const date = new Date(inputString)

  //0 in Date
  let dayOfMonth = date.getDate();
  dayOfMonth < 10 ? dayOfMonth = "0" + dayOfMonth : null;

  //0 in Hour
  let hourOfDay = date.getHours();
  hourOfDay < 10 ? hourOfDay = "0" + hourOfDay : null;

  //0 in Minute
  let minuteOfHour = date.getMinutes();
  minuteOfHour < 10 ? minuteOfHour = "0" + minuteOfHour : null;

  //Creates Date String
  let parsedDateString = dayOfMonth + " " + getMonthString(date.getMonth()) + " " + hourOfDay + ":" + minuteOfHour;
  return parsedDateString;
}

function getMonthString(month) {
  switch (month) {
    case 0:
      return "Januari";
    case 1:
      return "Februari";
    case 2:
      return "Mars";
    case 3:
      return "April";
    case 4:
      return "Maj";
    case 5:
      return "Juni";
    case 6:
      return "Juli";
    case 7:
      return "Augusti";
    case 8:
      return "September";
    case 9:
      return "Oktober";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "N/A";
  }
}
