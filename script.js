var wineContener = document.querySelector('.wineContener');
var form = document.forms.namedItem('addcard');


/* fetch('winecardsJSON.json')
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
    .catch(alert); */
    function IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

var xhr = new XMLHttpRequest();
xhr.open('GET', 'winecardsJSON.json', true);

xhr.send();
xhr.addEventListener('load', function () {
    if (xhr.status != 200) {
        console.warn(xhr.status + ': ' + xhr.statusText);
    }
    else {

        var result = JSON.parse(xhr.response);

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
    }
});

form.addEventListener('submit', function(ev) {
   var oData = new FormData(form);
   var oReq = new XMLHttpRequest();
   oReq.open("POST", "functions.php", true);
   oReq.onload = function(oEvent) {
    if (oReq.status == 200) {
     console.log("Uploaded!");
     if (IsJsonString(oReq.response)) {
         var jsonResp = JSON.parse(oReq.response);
         console.log(jsonResp);
     }
     else { 
         console.warn('Ответ в сервера не JSON');
     }
    // console.log(oReq.response);
    } else {
      console.warn("Error " + oReq.status + " occurred when trying to upload your file");
    }
  };

  oReq.send(oData);
  ev.preventDefault();

});
