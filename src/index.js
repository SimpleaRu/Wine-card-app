import './normalize.css';
import './main.css';
const render = require('./ext.hbs');
var wineWraper = document.querySelector('.wine-cards');

/* var wineCards = [
    {
        name: 'Cabernet Saperavi',
        type: 'dry',
        colorType: 'red',
        imgUrl: '../img/cabernet_saperavi.jpg',
        colorText: 'Пурпурный',
        aromeText: 'Ноты чёрной смородины',
        tasteText: 'Сбалансированный, немного танинный',
        originText: 'Крым, Массандра',
        priceText: '300',
        noteText: 'Молодое крымское вино'
    },
    {
        name: 'Cabernet',
        type: 'dry',
        colorType: 'red',
        imgUrl: '',
        colorText: 'Пурпурный',
        aromeText: 'Ноты чёрной смородины',
        tasteText: 'Сбалансированный, немного танинный',
        originText: 'Крым, Массандра',
        priceText: '300',
        noteText: 'Молодое крымское вино'
    },
    {
        name: 'Saperavi',
        type: 'dry',
        colorType: 'red',
        imgUrl: '',
        colorText: 'Пурпурный',
        aromeText: 'Ноты чёрной смородины',
        tasteText: 'Сбалансированный, немного танинный',
        originText: 'Крым, Массандра',
        priceText: '300',
        noteText: 'Молодое крымское вино'
    },
    {
        name: 'Cabernet Saperavi',
        type: 'dry',
        colorType: 'red',
        imgUrl: '../img/cabernet_saperavi.jpg',
        colorText: 'Пурпурный',
        aromeText: 'Ноты чёрной смородины',
        tasteText: 'Сбалансированный, немного танинный',
        originText: 'Крым, Массандра',
        priceText: '300',
        noteText: 'Молодое крымское вино'
    },
    {
        name: 'Cabernet',
        type: 'dry',
        colorType: 'red',
        imgUrl: '',
        colorText: 'Пурпурный',
        aromeText: 'Ноты чёрной смородины',
        tasteText: 'Сбалансированный, немного танинный',
        originText: 'Крым, Массандра',
        priceText: '300',
        noteText: 'Молодое крымское вино'
    },
    {
        name: 'Saperavi',
        type: 'dry',
        colorType: 'red',
        imgUrl: '',
        colorText: 'Пурпурный',
        aromeText: 'Ноты чёрной смородины',
        tasteText: 'Сбалансированный, немного танинный',
        originText: 'Крым, Массандра',
        priceText: '300',
        noteText: 'Молодое крымское вино'
    },
]; */

fetch('../src/winecardsJSON.json') // '../src/winecardsJSON.json' 
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
    .catch(alert);
/* var wineCardsJSON = JSON.stringify(wineCards);
console.log(JSON.stringify(wineCards));
console.log(JSON.parse(wineCardsJSON));
 */