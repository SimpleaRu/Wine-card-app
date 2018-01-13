import './normalize.css';
import './main.css';
const render = require('./ext.hbs');
var wineWraper = document.querySelector('.wine-cards');
var addCardButton = document.querySelector('.add-button');
var addWineForm = document.querySelector('.add-wine-form-wrapper');
var formClose = document.querySelector('#formClose');
var form = document.forms.namedItem('addcard');
var fileFild = document.querySelector('#fileFild');
var sugarContent = document.querySelector('#sugarContent');
var fileFildText = document.querySelector('.file-text');
var colorSelector = document.querySelector('#color-selector');
var tasteSelector = document.querySelector('#taste-selector');
var sparkling = document.querySelector('#sparkling-selector');
var searchString = document.querySelector('#search-string');
var moreInfo = document.querySelector('.more-info');
var wineCardLogo = document.querySelector('.wine-card-logo');
var wineCardsArr;
var wineCardsFilter = [];

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }

    return true;
}

function renderFilter(arr) {

    let template = render({ list: arr });

    wineWraper.innerHTML = template;
}

function renderCards() {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../src/winecardsJSON.json', true); // winecardsJSON.json

    xhr.send();
    xhr.addEventListener('load', function () {
        if (xhr.status != 200) {
            console.warn(xhr.status + ': ' + xhr.statusText);
        }
        else {
            if (IsJsonString(xhr.response)) {
                wineCardsArr = JSON.parse(xhr.response);
                wineWraper.innerHTML = '';
                //  console.log(result);
                let template = render({ list: wineCardsArr });

                wineWraper.innerHTML = template;

            }
            else {
                console.warn('Ответ c сервера не JSON');
            }
        }
    });
}

function filterArr(array, inputValue) {
    let FilterArr = [];
    for (var i = 0; i < array.length; i++) {
        if (isMatching(array[i].name, inputValue.value)) {

            FilterArr.push(array[i]);
        }
    }
    return FilterArr;
}

function isMatching(full, chunk) {
    full = full.toLowerCase();
    chunk = chunk.toLowerCase();

    if (full.indexOf(chunk) >= 0) {
        return true;
    }
    return false;
}

renderCards();

addCardButton.addEventListener('click', function (e) {
    addWineForm.style.display = 'block';

});

document.body.addEventListener('click', function (e) {
    if (e.target == addWineForm || e.target == formClose) {
        addWineForm.style.display = 'none';
    }
});

form.addEventListener('submit', function (e) {
    if (fileFild.files[0].size > 500000) {
        fileFildText.innerText = 'Выберите фото до 500 KB';
        console.log('file too big');
        e.preventDefault();
    }
    else {
        var oData = new FormData(form);
        var oReq = new XMLHttpRequest();
        oReq.open('POST', 'functions.php', true);
        oReq.onload = function (oEvent) {

            if (oReq.status == 200) {
                console.log('Uploaded!');
                renderCards();
                addWineForm.style.display = 'none';

                //  console.log(oReq.response);
                //    var jsonResp = JSON.parse(oReq.response);
                //     console.log(oReq.response); 
            } else {
                console.warn("Error " + oReq.status + " occurred when trying to upload your file");
            }
        };

        oReq.send(oData);
        e.preventDefault();
    }
});

fileFild.addEventListener('change', function (e) {

    fileFildText.innerText = fileFild.files[0].name;

});

sugarContent.addEventListener('change', function (e) {

});

/* Обработка селекторов */
colorSelector.addEventListener('change', function (e) {

    wineCardsFilter = wineCardsArr.filter(function (elem) {
        if (elem.colorType == colorSelector.value || colorSelector.value == 'any') {

            return elem;
        }
    });

    //  console.log(wineCardsFilter);
    renderFilter(wineCardsFilter);
});

tasteSelector.addEventListener('change', function (e) {

    wineCardsFilter = wineCardsArr.filter(function (elem) {
        if (elem.sugarContent == tasteSelector.value || tasteSelector.value == 'any') {

            return elem;
        }
    });

    // console.log(wineCardsFilter);
    renderFilter(wineCardsFilter);

});

sparkling.addEventListener('change', function (e) {
    //  console.log(sparkling.checked);
    if (sparkling.checked) {
        console.log(sparkling.value);
        wineCardsFilter = wineCardsArr.filter(function (elem) {
            if (elem.sparkling == sparkling.value) {
                return elem;
            }
        });

        renderFilter(wineCardsFilter);
    } else {
        renderFilter(wineCardsArr);
    }

});

searchString.addEventListener('keyup', function (e) {

    wineCardsFilter = filterArr(wineCardsArr, searchString);
    renderFilter(wineCardsFilter);
})

wineWraper.addEventListener('click', function (e) {

    if (e.target.className == 'more-info') {

        var bigCard = [];

/*         for (var i = 0; i < wineCardsArr.length; i++) {
            if (e.target.dataset.parent == wineCardsArr[i].name) {
                bigCard.push(wineCardsArr[i]);
            }
        }
        console.log(bigCard); */


        var bigCard = e.target.parentElement;
        var allWinesList = document.createElement('p');

        allWinesList.innerText = "К списку вин";
        allWinesList.classList.add("all-Wines-Lis");
        console.log(bigCard);
        bigCard.classList.add("card-item-big");

        bigCard.children[0].classList.add("card-img-big");
        bigCard.children[1].classList.add("card-title-big");
        bigCard.children[2].lastElementChild.style.height = 'auto';

        bigCard.children[3].classList.add("display-none");
        wineWraper.innerHTML = '';

        wineWraper.appendChild(bigCard);
        bigCard.appendChild(allWinesList);

        allWinesList.addEventListener('click', function (e) {
            renderFilter(wineCardsArr);
        });

        wineCardLogo.addEventListener('click', function (e) {
            renderFilter(wineCardsArr);
        });

    }
});