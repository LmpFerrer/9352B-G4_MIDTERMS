var area = document.getElementById("map");
var elemLeft = area.offsetLeft;
var elemTop = area.offsetTop;
var context = area.getContext('2d');
var houses = [];
var house;
var initWidth;
var imgwid;
var imghgt;
var arr;
//parse json
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

//load map
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
			Name: datass.Name,
			Capacity:datass.Capacity,
			Price:datass.Price,
			Address:datass.Address,
			y:parseInt(datass.Latitude, 10)+50,
			x:parseInt(datass.Longtitude, 10)+400,
			height:30,
            width:30
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

//click area
var clickHouse = function(event) {
	var x = event.pageX - elemLeft;
	var y = event.pageY - elemTop;
	houses.forEach(function(datass) {
		if (y > element.y && y < element.y + element.height 
            && x > element.x && x < element.x + element.width) {
			var balay = datass.Name;
			buildContent(balay);
		}
	});
}

var addClickEvent = function() {
	area.addEventListener('click', clickHouse, false);
}

var removeClickEvent = function() {
	area.removeEventListener('click', clickHouse, false);
}

function buildContent(name) {
	var container = document.getElementById('rest-container');
	container.className = "show";
	houses.forEach(function(datass) {
		if(name == datass.Name) {
			container.innerHTML = createMenu(datass.Name, datass.Capacity, datass.Price, datass.Address);
		}
	})
}

function createMenu(Name, Capacity, Price, Address) {
	console.log(houses);
	var html = `<div class="menu">
	<h1>${Name}</h1>
	<h3>Capacity: ${Capacity}</h3>
	<h3>Price: ${Price}</h3>
	<h3>Address: </br> ${Address}</h3>
	</div>`
	return html;
}

var otherClickEvent = function(collections) {
	area.addEventListener('click', otherHouses(collections), false);
}
var removeOtherClickEvent = function(collections) {
	area.removeEventListener('click', otherHouses(collections), false);
}
//some houses only
function otherHouses(collections) {
    console.log("tangina");
    console.log(houses);
	return function(event) {
		var x = event.pageX - elemLeft;
		var y = event.pageY - elemTop;
		collections.forEach(function(datass) {
		if (y > datass.y && y < datass.y + datass.height 
            && x > datass.x && x < datass.x + datass.width) {
			var balay = datass.Name;
			buildContent(balay);
		}
		});
	}
}

//show per category
var prices = document.getElementsByClassName('price');
for(var i = 0; i < prices.length; i++) {
	prices[i].addEventListener('click', function() {
		removeClickEvent();
		removeOtherClickEvent(arr);
		var tempValue = this.value;
		context.clearRect(0, 0, imgwid, imghgt);
		arr = [];
		if(tempValue == low){
			house.forEach(function(datass) {
				if(parseInt(datass.Price, 10)>=3000) {
					arr.push({
						Name: datass.Name,
						x:parseInt(datass.Latitude, 10)+400,
						y:parseInt(datass.Longtitude, 10)+50,
						radius: 15
					});
				}
			});
		}
		if(tempValue == medium){
			house.forEach(function(datass) {
				if(parseInt(datass.Price, 10)<3000 && parseInt(datass.Price, 10)>=5000) {
					arr.push({
						Name: datass.Name,
						x:parseInt(datass.Latitude, 10)+400,
						y:parseInt(datass.Longtitude, 10)+50,
						radius: 15
					});
				}
			});
		}
		if(tempValue == high){
			house.forEach(function(datass) {
				if(parseInt(datass.Price, 10)<5000) {
					arr.push({
						Name: datass.Name,
						x:parseInt(datass.Latitude, 10)+400,
						y:parseInt(datass.Longtitude, 10)+50,
						radius: 15
					});
				}
			});
		}
		locations(arr);
		otherClickEvent(arr);
	});
}

//Click Transients
document.getElementById("Transients").addEventListener("click", function (){
	locations(houses);
    otherClickEvent(houses);
}); 

//Click Baguio
document.getElementById("Baguio").addEventListener("click", function (){
	context.clearRect(0, 0, imgwid, imghgt);
	loadmap();
});

//Click Search
document.getElementById("Search").addEventListener("click", function (){
	var x = document.getElementById("Search").value;
	removeClickEvent();
	removeOtherClickEvent(arr);
	var tempValue = this.value;
	context.clearRect(0, 0, imgwid, imghgt);
	arr = [];
	if(x == datass.Name) {
		arr.push({
		Name: datass.Name,
		x:parseInt(datass.Latitude, 10)+400,
		y:parseInt(datass.Longtitude, 10)+50,
		radius: 15
		});
	}
	locations(arr);
	otherClickEvent(arr);
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

//Call Service Worker
if('serviceWorker' in navigator){
    try {
        navigator.serviceWorker.register('sw.js');
        console.log('SW resgitered');
    } catch (error) {
        console.log('SW registration failed');
    }
};