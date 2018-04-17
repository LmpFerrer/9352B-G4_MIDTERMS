var area = document.getElementById('map');
var elemLeft = area.offsetLeft;
var elemTop = area.offsetTop;
var context = area.getContext('2d');
var transients = [];
var trans;
var initWidth;
var imgwid;
var imghgt;
var list;
//loading of JSON file
var requestUrl = 'data.json';
var request = new XMLHttpRequest();

window.onload = function() {
	initWidth = document.documentElement.clientWidth;
	request.open('GET', requestUrl);
	request.responseType = 'json';
	request.send();
	make_base();
};

//loading of map
function make_base() {
	var base_image = new Image();
	base_image.src = 'map/zoom15.bmp';
	base_image.onload = function() {
		imgwid = base_image.width;
		imghgt = base_image.height;
		context.canvas.width = imgwid;
		context.canvas.height = imghgt;
	}
};

function markerRendering(){
	request.onload = function() {
		trans = request.response;
		// Add element.
		trans.forEach(function(transients) {
			transients.push({
				top: parseInt(data.Latitude, 10),
				left: parseInt(data.Longitude, 10),
				name: Data.Name
			});
		});
		make_location(transients);
	}
}

//click event
document.getElementById("Transients").addEventListener("click", markerRendering()); 

//create the locations for each collections
function make_location(transients) {
		var marker = new Image();
		marker.src = 'images/marker.png';
		for (i = 0; i < transients.length; i++) {
			context.drawImage(marker,transients[i].latitude,transients[i].longitude,30,30);
		};
}


if('serviceWorker' in navigator){
    try {
        navigator.serviceWorker.register('sw.js');
        console.log('SW resgitered');
    } catch (error) {
        console.log('SW registration failed');
    }
}


//search function
var icon = document.getElementById('Search');
icon.onclick = function() {
	var form = document.getElementById('inputForm');
	resto.forEach(function(restaurant) {
		if(form.elements[0].value.toLowerCase() === restaurant.name.toLowerCase()) {
			removeClickEvent();
			removeSomeClickEvent(list);
			context.clearRect(0, 0, imgwid, imghgt);
			list = [];
			list.push({
				colour: '#05EFFF',
				top: parseInt(restaurant.top, 10),
				left: parseInt(restaurant.left, 10),
				radius: 10,
				name: restaurant.name
			});
			make_location(list);
			addSomeClickEvent(list);
		}
	});
}
