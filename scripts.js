var house;
var houses = [];




var requestUrl = 'js/datass.json';
var request = new XMLHttpRequest();
window.onload = function() {
	initWidth = document.documentElement.clientWidth;
	request.open('GET', requestUrl);
	request.responseType = 'json';
	request.send();
};
window.onload = function() {
var canvas = document.getElementById('Map'),
context = canvas.getContext('2d');
base_image = new Image();
base_image.src = './images/Baguio.png';
base_image.onload = function(){
	context.drawImage(base_image,0,0)
	};
	request.onload = function() {
		house = request.response;
		house.forEach(function(datass){
			houses.push({
			x:datass.Longtitude,
			y:datass.Latitude
			});
		});
		locations(houses);	
	}
};
	
	function addMarkerPoints(x,y){
		var marker = new Image();
		marker.src = './images/marker.png';
		var canvas = document.getElementById('Map'),
		context = canvas.getContext('2d');		
			context.drawImage(marker,x,y,30,30);
	};
	
	
function locations(collections) {
			collections.forEach(function(datass) {
			addMarkerPoints(datass.x,datass.y);
		});
}
