import './normalize.css';
import './main.css';
const render = require('./ext.hbs');
var wineWraper = document.querySelector('.wine-cards');
var addCardButton = document.querySelector('.add-button');
var addWineForm = document.querySelector('.add-wine-form-wrapper');
var formClose = document.querySelector('#formClose');
var form = document.forms.namedItem('addcard');
var fileFild = document.querySelector('#fileFild');
var wineCardsArr;

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
    xhr.open('GET', '../src/winecardsJSON.json', true); // winecardsJSON.json

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

fileFild.addEventListener('change', function(e) {
console.log(fileFild.files[0].size);

});
