var map;
var markers = ko.observableArray([]);
var locations = [{
      title: 'Shenzhen Library of Science and Technology',
      address: "中国广东省深圳市南山区丽水路",
      tel: '0755 2603 2921',
      location: {
        lat: 22.5922326,
        lng: 113.9706436
      },
      placeId: 'ChIJlck5HozyAzQRlmYOSLbOQE4'
    },
    {
      title: 'Zoo',
      address: '中国广东省深圳市南山区西丽路',
      tel: '0755 2662 2888',
      location: {
        lat: 22.5923205,
        lng: 113.9646499
      },
      placeId: 'ChIJw33RSpLyAzQRonD4xuEQczQ'
    },
    {
      title: 'The metro',
      address: "中国广东省深圳市南山区雨水路",
      tel: '0755 2603 2955',
      location: {
        lat: 22.581893,
        lng: 113.9629383
      },
      placeId: 'ChIJlck5HozyAzQRlmYOSLbOQE4'
    },
    {
      title: 'Liao',
      address: "中国广东省深圳市南山区贵喵路",
      tel: '0755 2603 2921',
      location: {
        lat: 22.5831015,
        lng: 113.9642472
      },
      placeId: 'ChIJtegeoRXuAzQRQi9n4dn9w-0'
    },
    {
      title: 'The house of noodles',
      address: "中国广东省深圳市南山区格于路",
      tel: '0755 8240 1720',
      location: {
        lat: 22.5859439,
        lng: 113.967487
      },
      placeId: 'ChIJ4X1Eeqn1AzQRju9J1yD0-Zc'
    },
    {
      title: 'A hotel I never been',
      address: "中国广东省深圳市南山区打的路",
      tel: '0755 2866 5555',
      location: {
        lat: 22.585762,
        lng: 113.9639131
      },
      placeId: 'ChIJr5fS66t1BDQR8dpM0UXx7r8'
    }
  ];

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
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: placeId
    });

    markers().push(marker);

    marker.addListener('click', function () {
      populateInfoWindow(this, largeInfowindow);
    });
  }
  showListings();
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
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function () {
        infowindow.marker = null;
      });
    }
  });
}
function showListings() {
        var bounds = new google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers().length; i++) {
          markers()[i].setMap(map);
          bounds.extend(markers()[i].position);
        }
        map.fitBounds(bounds);
      }
function hideListings() {
  for (var i = 0; i < markers().length; i++) {
    markers()[i].setMap(null);
  }
}

