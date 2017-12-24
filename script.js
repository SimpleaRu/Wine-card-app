var wineContener = document.querySelector('.wineContener');

fetch('winecardsJSON.json')
    .then(function (result) {
        return result.json();
    })
    .then(function (result) {

        for (var i = 0; i < result.length; i++) {
           
            var img = document.createElement('img');
            var text = document.createElement('p');
            var wpapper = document.createElement('div');

            wineContener.appendChild(wpapper);
            img.setAttribute('src', result[i].imgUrl);
            wpapper.appendChild(img);
            text.innerText = result[i].name;
            wpapper.appendChild(text);
        }
    })
    .catch(alert);
