var wineContener = document.querySelector('.wineContener');
console.log(wineContener);
fetch('winecardsJSON.json')
.then(function (result){
    return result.json();
})
.then (function (result){
    console.log(result);
})
.catch(alert);

var img1 = document.createElement('img');
img1.setAttribute('src', 'img/1.png');
console.log(img1);
wineContener.appendChild(img1);