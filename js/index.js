
var endpoint = 'http://script.google.com/macros/s/AKfycbxF32BTdW53v1v_nOJ4aGD743EyIH2yLb7VNQBWTqG1sSXT8nFqJQ4x5sLZMQ3I82o_/exec'


function getLocation(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        callback({latitude: latitude, longitude: longitude});
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
var lat = '';
var lon = '';
$(document).ready(function(){
    getLocation(function(location) {
        console.log(location.latitude, location.longitude);
        lat = location.latitude;
        lon = location.longitude;
    });
      
})

function submitData(){
    var name = $(".name").val();
    var gender = $(".gender").val();
    var data = {
        "name":name,
        "age":gender,
        "lat":lat,
        "lon": lon
      }
      $.ajax({
        url:endpoint,
        method:'POST',
        contentType:'application/json',
        data:JSON.stringify(data),
        success:function(response){
            console.log(response);
        },
        error:function(err){
            console.error(err)
        }
    })
}
  
