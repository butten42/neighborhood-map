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
var map;
var marker;
var markers = [];
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
function loadScript(url){
    var Script = document.createElement('script');
    Script.setAttribute('src', url);
    document.body.appendChild(Script);
}
var googleScript='js/google.js';
var googleUrl="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAREfcIaFiSSJ81sB884G9GvdNqp6Y_FjE&v=3&callback=initMap";
loadScript(googleScript);
loadScript(googleUrl);
var Location=function(data){
    this.title = data.title;
    this.tel= data.tel;
    this.address=data.address;
    this.marker=data.marker;
}

var ViewModel = function(){
    var self=this;
    this.locationList=ko.observableArray([]);
    locations.forEach(function(item){
        self.locationList.push(new Location(item));
    });
    this.setLocation=function(elem){
      google.maps.event.trigger(elem.marker, "click");
    }
    this.query=ko.observable('');
    this.searchResults = ko.computed(function(){
    var q = self.query().toLowerCase();
    return ko.utils.arrayFilter(locations, function(item) {
      if (item.title.toLowerCase().indexOf(q) >= 0) {
            return item.setVisible(true);
        } else {
            return item.setVisible(false);
        }
    });
  });
}

