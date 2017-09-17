// make a global variable
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
// load the script
function loadScript(url){
    var Script = document.createElement('script');
    Script.setAttribute('src', url);
    document.body.appendChild(Script);
}
// make the script
var googleScript='js/google.js';
var googleUrl="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAREfcIaFiSSJ81sB884G9GvdNqp6Y_FjE&v=3&callback=initMap";
loadScript(googleScript);
loadScript(googleUrl); // abandoned the baidu map api script
// make the Lacation class
var Location=function(data){
    this.title = data.title;
    this.tel= data.tel;
    this.address=data.address;
    this.marker=data.marker;
    this.match=data.match;
}
// the google map VM
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
            return item.match(true);
        } else {
            return item.match(false);
        }
    });
  });
}
// the weather api
var url='http://api.openweathermap.org/data/2.5/forecast?id=1795563&APPID=85e225488d40b7a1d9ee47e76182d245'
$.ajax({
        url: url,
        dataType: "json",
    }).done(function(response){
  var data=response.list[0];
  var update=data.dt_txt;
  var humidity=data.main.humidity;
  var temperature=(data.main.temp-273.15).toFixed(1)+'°C';
  var weather=data.weather[0].main;
  $('#date').text(update);
  $('#weather').text(weather);
  $('#humidity').text(humidity);
  $('#temperature').text(temperature);
})
// toggle to show/hide the placebox
$('#toggleButton').click(function(){
  $('#place-box').toggle();
});
//
function mapError(){
  alert("failed to load the map, please try a VPN.");
}
if(typeof google === 'undefined'){
  mapError();
}