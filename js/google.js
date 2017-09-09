var map;
var markers = [];

function initMap() {}
map = new google.maps.Map(document.getElementById('map'), {
  center: {
    lat: 22.5549176,
    lng: 113.7736861
  },
  zoom: 13,
  mapTypeControl: false
});
var locations = [{
    title: 'Shenzhen Library of Science and Technology',
    location: {
      lat: 22.5922326,
      lng: 113.9706436
    }
  },
  {
    title: 'Zoo',
    location: {
      lat: 22.5923205,
      lng: 113.9646499
    }
  },
  {
    title: 'The metro',
    location: {
      lat: 22.581893,
      lng: 113.9629383
    }
  },
  {
    title: 'Liao',
    location: {
      lat: 22.5831015,
      lng: 113.9642472
    }
  },
  {
    title: 'The house of noodles',
    location: {
      lat: 22.5859439,
      lng: 113.967487
    }
  },
  {
    title: 'A hotel I never been',
    location: {
      lat: 22.585762,
      lng: 113.9639131
    }
  }
];

var largeInfowindow = new google.maps.InfoWindow();
for (var i = 0; i < locations.length; i++) {
  // Get the position from the location array.
  var position = locations[i].location;
  var title = locations[i].title;
  // Create a marker per location, and put into markers array.
  var marker = new google.maps.Marker({
    position: position,
    title: title,
    animation: google.maps.Animation.DROP,
    icon: defaultIcon,
    id: i
  });
  // Push the marker to our array of markers.
  markers.push(marker);
  // Create an onclick event to open the large infowindow at each marker.
  marker.addListener('click', function () {
    populateInfoWindow(this, largeInfowindow);
  });
}

function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    // Clear the infowindow content to give the streetview time to load.
    infowindow.setContent('');
    infowindow.marker = marker;
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function () {
      infowindow.marker = null;
    });
    var streetViewService = new google.maps.StreetViewService();
    var radius = 50;
    // In case the status is OK, which means the pano was found, compute the
    // position of the streetview image, then calculate the heading, then get a
    // panorama from that and set the options
    function getStreetView(data, status) {
      if (status == google.maps.StreetViewStatus.OK) {
        var nearStreetViewLocation = data.location.latLng;
        var heading = google.maps.geometry.spherical.computeHeading(
          nearStreetViewLocation, marker.position);
        infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
        var panoramaOptions = {
          position: nearStreetViewLocation,
          pov: {
            heading: heading,
            pitch: 30
          }
        };
        var panorama = new google.maps.StreetViewPanorama(
          document.getElementById('pano'), panoramaOptions);
      } else {
        infowindow.setContent('<div>' + marker.title + '</div>' +
          '<div>No Street View Found</div>');
      }
    }
    // Use streetview service to get the closest streetview image within
    // 50 meters of the markers position
    streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
    // Open the infowindow on the correct marker.
    infowindow.open(map, marker);
  }
}