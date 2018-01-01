import './normalize.css';
import './main.css';
const render = require('./ext.hbs');
var wineWraper = document.querySelector('.wine-cards');
var addCardButton = document.querySelector('.add-button');
var addWineForm = document.querySelector('.add-wine-form-wrapper');
var formClose = document.querySelector('#formClose');

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function renderCards() {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../src/winecardsJSON.json', true);

    xhr.send();
    xhr.addEventListener('load', function () {
        if (xhr.status != 200) {
            console.warn(xhr.status + ': ' + xhr.statusText);
        }
        else {
            if (IsJsonString(xhr.response)) {
                var wineCardsArr = JSON.parse(xhr.response);
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
formClose.addEventListener('click', function (e) {
    addWineForm.style.display = 'none';
});

document.body.addEventListener('click', function (e) {
    if (e.target == addWineForm) {
        addWineForm.style.display = 'none';
    }
});

/* fetch('../src/winecardsJSON.json') // '../src/winecardsJSON.json' 
    // http://simplea.ru/wineCards/winecardsJSON.json
    .then(function (resp) {
    // console.log( JSON.parse(resp));
        return resp.json(); // resp.json()
    })
    .then(function (j) {

     //  console.log(j[0].imgUrl);
        let template = render({ list: j });

        wineWraper.innerHTML = template;
    })
    .catch(alert); */
