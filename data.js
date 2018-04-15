function loadHomes() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		//4 means that request is finished and response is ready
		//200 means OK
  		if (this.readyState == 4 && this.status == 200) {
    		console.log("Request Answered By The Server");
    		var data = JSON.parse(this.responseText);
    		parse(data);
  		}
	};
	xhttp.open("GET", "data.json", true);
	xhttp.send();
}

function parse(homes){
	alert("Funtion Call Success");
	var name = new Array();
	var latitude = new Array();
	var longitude = new Array();
	var address = new Array();
	var price = new Array();
	var capacity = new Array();
	for (var i = 0; i < homes.length; i++) {
		name[i] = homes[i].FIELD1;
		latitude[i] = homes[i].FIELD2;
		longitude[i] = homes[i].FIELD3;
		address[i] = homes[i].FIELD4;
		price[i] = homes[i].FIELD5;
		capacity[i] = homes[i].FIELD6;
	}
}