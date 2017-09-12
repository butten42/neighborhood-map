
function initMap() {
  var SZ = {
    lat: 22.5549176,
    lng: 113.7736861
  };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    mapTypeControl: false,
    center: SZ
  });

  var largeInfowindow = new google.maps.InfoWindow();

  for (var i = 0; i < locations.length; i++) {
    var position = locations[i].location;
    var title = locations[i].title;
    var placeId = locations[i].placeId;
     marker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: placeId
    });
     locations[i].marker=marker;
    markers.push(marker);
    marker.addListener('click', function () {
      populateInfoWindow(this, largeInfowindow);
    });
  }
  showListings();
ko.applyBindings(new ViewModel());
}
function populateInfoWindow(marker, infowindow) {
  var service = new google.maps.places.PlacesService(map);
  service.getDetails({
    placeId: marker.id
  }, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // Set the marker property on this infowindow so it isn't created again.
      infowindow.marker = marker;
      var innerHTML = '<div><div>' + marker.title + '</div>';

      if (place.formatted_address) {
        innerHTML += '<br>' + place.formatted_address;
      }
      if (place.formatted_phone_number) {
            innerHTML += '<br>' + place.formatted_phone_number;
          }
      if (place.opening_hours) {
        innerHTML += '<br><br><strong>Hours:</strong><br>' +
          place.opening_hours.weekday_text[0] + '<br>' +
          place.opening_hours.weekday_text[1] + '<br>' +
          place.opening_hours.weekday_text[2] + '<br>' +
          place.opening_hours.weekday_text[3] + '<br>' +
          place.opening_hours.weekday_text[4] + '<br>' +
          place.opening_hours.weekday_text[5] + '<br>' +
          place.opening_hours.weekday_text[6];
      }
      if (place.photos) {
        innerHTML += '<br><br><img src="' + place.photos[0].getUrl({
          maxHeight: 100,
          maxWidth: 200
        }) + '">';
      }
      innerHTML += '</div>';
      infowindow.setContent(innerHTML);
      infowindow.open(map, marker);
      infowindow.addListener('closeclick', function () {
        infowindow.marker = null;
      });
    }
  });
}
function showListings() {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
      }
