import './main.css';
const render = require('./ext.hbs');
var wineWraper = document.querySelector('.wine-cards');

var wineCards = [
    {
        name: 'Cabernet Saperavi',
        type: 'dry',
        colorType: 'red',
        imgUrl: '../img/cabernet_saperavi.jpg',
        colorText: 'Пурпурный',
        aromeText: 'Ноты чёрной смородины',
        tasteText: 'Сбалансированный, немного танинный',
        originText: 'Крым, Массандра',
        priceText: '300&#8381;',
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
        priceText: '300&#8381;',
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
        priceText: '300&#8381;',
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
        priceText: '300&#8381;',
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
        priceText: '300&#8381;',
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
        priceText: '300&#8381;',
        noteText: 'Молодое крымское вино'
    },
];

let template = render({ list: wineCards });

wineWraper.innerHTML = template;