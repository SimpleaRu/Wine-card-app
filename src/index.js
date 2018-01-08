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
var sparkling = document.querySelector('#sparkling');
var wineCardsArr;
var wineCardsFilter;


function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function checkFilter (arr, filter) {

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

renderCards();

addCardButton.addEventListener('click', function (e) {
    addWineForm.style.display = 'block';

});
/* formClose.addEventListener('click', function (e) {
    addWineForm.style.display = 'none';
}); */

document.body.addEventListener('click', function (e) {
    if (e.target == addWineForm || e.target == formClose) {
        addWineForm.style.display = 'none';
    }
});

form.addEventListener('submit', function (e) {
    if (fileFild.files[0].size > 400000) {
        fileFildText.innerText = 'Выберите фото до 500 KB';
        console.log('file too big');
        e.preventDefault();
    }
    else {
        var oData = new FormData(form);
        var oReq = new XMLHttpRequest();
        oReq.open("POST", "functions.php", true);
        oReq.onload = function (oEvent) {

            if (oReq.status == 200) {
                console.log("Uploaded!");
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
    console.log(colorSelector.value);
 
    wineCardsFilter = wineCardsArr.filter(function (elem) {
        if (elem.colorType == colorSelector.value || colorSelector.value == 'any') {
          
            return elem;
        }
    });

    console.log(wineCardsFilter);
});

sparkling.addEventListener('change', function (e) {
    console.log(sparkling.checked);
});