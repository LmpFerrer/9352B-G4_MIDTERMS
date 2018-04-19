var area = document.getElementById("map");
var elemLeft = area.offsetLeft;
var elemTop = area.offsetTop;
var context = area.getContext('2d');
var houses = [];
var house;
var initWidth;
var imgwid;
var imghgt;
var list;
//loading of JSON file
var requestUrl = 'js/datass.json';
var request = new XMLHttpRequest();

window.onload = function() {
	initWidth = document.documentElement.clientWidth;
	request.open('GET', requestUrl);
	request.responseType = 'json';
	request.send();
	loadMap();
};

function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//loading of map
function loadMap() {
	var base_image = new Image();
	base_image.src = 'map/zoom15.bmp';
	base_image.onload = function() {
		imgwid = base_image.width;
		imghgt = base_image.height;
		context.canvas.width = imgwid;
		context.canvas.height = imghgt;
	};
	
	request.onload = function() {
		console.log("Storing elements in array");
		house = request.response;
		console.log(house);
		house.forEach(function(datass){
			houses.push({
			x:parseInt(datass.Latitude, 10),
			y:parseInt(datass.Longtitude, 10)
			});
		});
	}
};

//adding markers to the map
function addMarkerPoints(x,y){
	var marker = new Image();
	marker.src = './images/marker.png';
	var canvas = document.getElementById('map'),
	context = canvas.getContext('2d');
	context.drawImage(marker,x,y,30,30);
};

//setting the points according to the array
function locations(collections) {
	collections.forEach(function(datass) {
		addMarkerPoints(datass.x,datass.y);
	});
}

//Click Transients
document.getElementById("Transients").addEventListener("click", function (){
	locations(houses);
}); 

//Click Baguio
document.getElementById("Baguio").addEventListener("click", function (){
	context.clearRect(0, 0, imgwid, imghgt);
	loadmap();
});

//Click Search
document.getElementById("Search").addEventListener("click", function (){
});

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("Search");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};


if('serviceWorker' in navigator){
    try {
        navigator.serviceWorker.register('sw.js');
        console.log('SW resgitered');
    } catch (error) {
        console.log('SW registration failed');
    }
};