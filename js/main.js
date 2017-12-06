var viewElement = document.querySelector('.view');

function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

function addLayout(layout) {
    
    if(layout=='grid') {
        viewElement.classList.add('grid-view');
        viewElement.classList.remove('list-view');
    }
    else if(layout=='list') {
       viewElement.classList.add('list-view');
       viewElement.classList.remove('grid-view');
    }
}

fetchJSONFile('js/data.json', function(data) {

    var blocksElement = document.querySelector('.blocks');

    function createElements(car) {
        var blockElement = document.createElement('div');
        var imageElement = document.createElement('div');
        var image = document.createElement('img');
        var contentElement = document.createElement('div');
        var titleElement = document.createElement('p');
        var dateElement = document.createElement('span');
        var descElement = document.createElement('p');

        blockElement.appendChild(imageElement);
        blockElement.appendChild(contentElement);

        imageElement.appendChild(image);

        contentElement.appendChild(titleElement);
        contentElement.appendChild(dateElement);
        contentElement.appendChild(descElement);

        blockElement.className = 'block';
        imageElement.className = 'image';
        contentElement.className = 'content';
        titleElement.className = 'title';
        dateElement.className = 'date';
        descElement.className = 'desc';

        image.src = car.image;
        titleElement.innerHTML = car.title;
        dateElement.innerHTML = car.date;
        descElement.innerHTML = car.desc;

        return blockElement;
    }

    function addContent() {

        for (var i = 0; i < data.cars.length; i++) {
            var car = data.cars[i];
            var card = createElements(car);
            blocksElement.appendChild(card);
        }

    }

    addContent();
});