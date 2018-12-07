function getGameOfThronesCharacterDatas(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successGetGameOfThronesCharacterDatas(xhttp) {
  // Nem szabad globálisba kitenni a userDatas-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed
  portaitMaker(userDatas);
  addEventListener('click', function () {
    clickedVersion(userDatas, valueHolderArray[0]);
  });
}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

var valueHolderArray = [];

function clicker(value) {
  valueHolderArray[0] = value;
}

function portaitMaker(data) {
  sortByName(data);
  var place = document.querySelector('.left');
  for (var k in data) {
    if (data.hasOwnProperty(k) && !data[k].dead) {
      place.innerHTML += `<div class="portrait"><img onclick="clicker(this)" src="./${data[k].portrait}" alt="${data[k].name}"><div class="customfont"><label>${data[k].name}</label></div></div>`;
    }
  }
}

function sortByName(data) {
  var holder;
  for (var k = 0; k < data.length; k++) {
    for (var i = k + 1; i < data.length; i++) {
      if (data[k].name > data[i].name) {
        holder = data[k];
        data[k] = data[i];
        data[i] = holder;
      }
    }
  }
  return data;
}

function clickedVersion(data, value) {
  for (var k in data) {
    if (data.hasOwnProperty(k)) {
      if (data[k].name === value.alt) {
        pictureDisplay(data[k].picture);
        nameDisplay(data[k].name);
        bioDisplay(data[k].bio);
        if (data[k].house) {
          houseDisplay(data[k].house);
        }
      }
    }
  }
}

function pictureDisplay(picture) {
  var right = document.querySelector('.right');
  right.innerHTML = '';
  var image = document.createElement('img');
  image.src = picture;
  image.alt = name;
  right.appendChild(image);


  console.log(picture);
}

function nameDisplay(name) {
  var right = document.querySelector('.right');
  var para = document.createElement('p');
  para.innerHTML = name;
  right.appendChild(para);
  console.log(name);
}

function houseDisplay(house) {
  var right = document.querySelector('.right');
  var logo = document.createElement('img');
  logo.src = `./assets/houses/${house}.png`;
  logo.alt = name;
  right.querySelector('p').innerHTML = logo;
  console.log(house);
}

function bioDisplay(bio) {
  var right = document.querySelector('.right');
  var bioDiv = document.createElement('div');
  bioDiv.innerHTML = bio;
  right.appendChild(bioDiv);
  console.log(bio);
}
