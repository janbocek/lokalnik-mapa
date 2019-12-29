
$(function() {prekresliMapu(); });

function prekresliMapu() {

document.getElementById('mapid').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";

var mymap = new L.map('map');

var mylayer = new L.tileLayer('https://mapserver.mapy.cz/base-m/{z}-{x}-{y}', {
	attribution: 'Mapy.cz',
	maxZoom: 18
})

mymap.setView([49.7, 15.5], 7);
mymap.addLayer(mylayer);

var rokSelect = document.getElementById("volbaroku");
rok = rokSelect.options[rokSelect.selectedIndex].value;

if (rok == 'rok2019') {
	var redakce = 'https://github.com/janbocek/lokalnik-mapa/blob/master/media2019.json'
} else {
	var redakce = 'https://github.com/janbocek/lokalnik-mapa/blob/master/media2009.json'
}

fetch('https://github.com/janbocek/lokalnik-mapa/blob/master/orp.json')
.then(response => response.json())
.then(data1 => {

fetch(redakce)
.then(response => response.json())
.then(data2 => {

var markerStyle = {
    radius: 3,
    fillColor: "#444",
    color: "#fff",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
};

// přidání polygonů podle roku
if (rok == 'rok2019') {
	var polygon = L.geoJSON(data1['features'], {
		style: function(feature) {
	        switch (feature.properties.red2019) {
	        	case 4: return {fillColor: "#08306b", fillOpacity: 0.7, weight: 1, color: "#777777"};
	        	case 3: return {fillColor: "#2879b9", fillOpacity: 0.7, weight: 1, color: "#777777"};
	        	case 2: return {fillColor: "#73b3d8", fillOpacity: 0.7, weight: 1, color: "#777777"};
	        	case 1: return {fillColor: "#c8ddf0", fillOpacity: 0.7, weight: 1, color: "#777777"};
	        	case 0: return {fillColor: "#ffffff", fillOpacity: 0.7, weight: 1, color: "#777777"};
	        }
	    }
	})
} else {
	var polygon = L.geoJSON(data1['features'], {
		style: function(feature) {
	        switch (feature.properties.red2009) {
	        	case 4: return {fillColor: "#08306b", fillOpacity: 0.7, weight: 1, color: "#777777"};
	        	case 3: return {fillColor: "#2879b9", fillOpacity: 0.7, weight: 1, color: "#777777"};
	        	case 2: return {fillColor: "#73b3d8", fillOpacity: 0.7, weight: 1, color: "#777777"};
	        	case 1: return {fillColor: "#c8ddf0", fillOpacity: 0.7, weight: 1, color: "#777777"};
	        	case 0: return {fillColor: "#ffffff", fillOpacity: 0.7, weight: 1, color: "#777777"};
	        }
	    }
	})
}

polygon.addTo(mymap);

// přidání markerů + tooltipů
var marker = L.geoJSON(data2['features'], {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, markerStyle).bindTooltip(
        	'<b>' + feature.properties.titul + '</b><br/><i>' + feature.properties.podtitul + '</i><br/>web: <a href="' + feature.properties.web + '">' + feature.properties.web + '</a><br/>založení: ' + feature.properties.prvniCislo + '<br/>distribuce: ' + feature.properties.distribuce + '<br/>periodicita: ' + feature.properties.periodicita + '<br/>adresa: ' + feature.properties.geoadresa);
    }
}).addTo(mymap);

});

});

}