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

  createTitleOfRightContainer();

  document.querySelector('#searchBtn').addEventListener('click', function () {
    searchForCharacter(userDatas);
  });

  // megkeressük melyik portréra kattintottunk
  var listener = document.querySelectorAll('.portrait');
  for (var k in listener) {
    if (listener.hasOwnProperty(k)) {
      listener[k].addEventListener('click', function () {
        var name = this.querySelector('label').innerHTML;
        searchForTheClickedPortrait(userDatas, name);
        classAdder(name);
      });
    }
  }

  var input = document.getElementById('searchInput');
  input.addEventListener('keyup', function () {
    if (event.keyCode === 13) {
      searchForCharacter(userDatas);
    }
  });
}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function createTitleOfRightContainer() {
  var paragraph = document.getElementById('titleParagraph');
  paragraph.innerText = 'Game of Thrones';
}

// kitesszük a portrékat és a neveket
function portaitMaker(data) {
  sortByName(data);
  var place = document.querySelector('.left');
  for (var k in data) {
    if (data.hasOwnProperty(k) && !data[k].dead) {
      place.innerHTML += `<div class="portrait"><img src="./${
        data[k].portrait
      }" alt="${data[k].name}"><div class="customfont"><label>${
        data[k].name
      }</label></div></div>`;
    }
  }
}

// rendezzük név szerint
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

// megkeressük az adatait a kattintott portrénak
function searchForTheClickedPortrait(data, name) {
  for (var k in data) {
    if (data.hasOwnProperty(k)) {
      if (data[k].name === name) {
        pictureDisplay(data[k].picture, data[k].name);
        nameDisplay(data[k].name);
        bioDisplay(data[k].bio);
        if (data[k].house) {
          houseDisplay(data[k].house);
        }
      }
    }
  }
}

function nameDisplay(name) {
  var place = document.querySelector('.main');
  var para = document.createElement('p');
  para.innerHTML = name;
  para.className = 'nameParagraph';
  place.appendChild(para);
}

function pictureDisplay(picture, name) {
  var place = document.querySelector('.main');

  place.innerHTML = '';
  var image = document.createElement('img');
  image.src = picture;
  image.alt = name;
  place.appendChild(image);
}

function houseDisplay(house) {
  var place = document.querySelector('.nameParagraph');
  var logo = document.createElement('img');
  logo.src = `./assets/houses/${house}.png`;
  logo.alt = name;
  logo.className = 'logo';
  place.appendChild(logo);
}

function bioDisplay(bio) {
  var place = document.querySelector('.main');
  var bioDiv = document.createElement('div');
  bioDiv.innerHTML = bio;
  place.appendChild(bioDiv);
}

// keresőmezőben keresett karakter megkeresése a userDatas-ban
function searchForCharacter(data) {
  var inputText = document.querySelector('#searchInput').value.toLowerCase();
  var found = false;
  if (inputText) {
    for (var k in data) {
      if (
        data.hasOwnProperty(k) &&
        data[k].name.toLowerCase().indexOf(inputText) > -1
      ) {
        pictureDisplay(data[k].picture, data[k].name);
        nameDisplay(data[k].name);
        bioDisplay(data[k].bio);
        if (data[k].house) {
          houseDisplay(data[k].house);
        }
        found = true;
        findTheSearchedCharacter(data[k].name);
        classRemover(data[k].name);
        break;
      }
    }
    if (found === false) {
      document.querySelector('.main').innerHTML = '';
      nameDisplay('Character not found');
      classRemover('');
    }
  }
}

// keresőmezőben keresett karakter megkeresése a megjelenített portrék között
function findTheSearchedCharacter(name) {
  var pics = document.querySelectorAll('.left img');
  for (var k in pics) {
    if (pics.hasOwnProperty(k)) {
      if (pics[k].alt === name) {
        pics[k].classList.add('selected');
        break;
      }
    }
  }
}

function classAdder(name) {
  if (name) {
    var pics = document.querySelectorAll('.left img');
    for (const k in pics) {
      if (pics.hasOwnProperty(k)) {
        if (pics[k].alt === name) {
          pics[k].classList.add('selected');
          classRemover(name);
          break;
        }
      }
    }
  }
}

function classRemover(value) {
  var classDetected = document.querySelectorAll('.selected');
  for (var k in classDetected) {
    if (classDetected.hasOwnProperty(k)) {
      if (classDetected[k].alt !== value) {
        classDetected[k].classList.remove('selected');
      }
    }
  }
}
