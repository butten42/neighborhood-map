$('#iconModal').modal({
show: true,
backdrop: false
});

$('#leftButton').click(function(){
$('#iconModal').modal('hide');
});
$('#rightButton').click(function(){
$('#iconModal').modal('hide');
});
var Location=function(data){
    this.title = ko.observable(data.title);
    this.tel= ko.observable(data.tel);
    this.address=ko.observable(data.address);
}

var ViewModel = function(){
    var self=this;
    this.locationList=ko.observableArray([]);
    locations.forEach(function(item){
        self.locationList.push(new Location(item));
    });
    this.setLocation=function(clicked){
        console.log(clicked);
    }
    /*this.query=ko.observable('');
    self.markers = ko.dependentObservable(function() {
    var search = this.query().toLowerCase();
    ko.utils.arrayFilter(markers, function(marker) {
    if (marker.title.toLowerCase().indexOf(search) >= 0) {
            return marker.visible(true);
        } else {
            return marker.visible(false);
        }
    });
}, viewModel);*/
}
ko.applyBindings(new ViewModel());
/* abandened
var initialLocations= [];
var markerid=['ChIJlck5HozyAzQRlmYOSLbOQE4','ChIJw33RSpLyAzQRonD4xuEQczQ','ChIJlck5HozyAzQRlmYOSLbOQE4','ChIJtegeoRXuAzQRQi9n4dn9w-0','ChIJ4X1Eeqn1AzQRju9J1yD0-Zc','ChIJr5fS66t1BDQR8dpM0UXx7r8']
for (var i=0;i<markerid.length;i++){
    initialLocations.push(getGoogles(markerid[i]));
}
function getGoogles(marker) {
      var service = new google.maps.places.PlacesService(map);
      service.getDetails({
        placeId: marker
      }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          var inner= {};
          if (place.name) {
            inner.name= place.name;
          }
          if (place.formatted_address) {
            inner.address=place.formatted_address;
          }
          if (place.formatted_phone_number) {
            inner.tel=place.formatted_phone_number;
          }
          return inner;
        }
      });
    }
*/