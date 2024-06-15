
var endpoint = 'https://script.google.com/macros/s/AKfycbz93z46meWKfTN5U8kzEmkiUu0Av0ByjO0lFvLHYx95O64kgv8GYfKPrQDj_L8gzoch/exec'


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

document.addEventListener('DOMContentLoaded', () => {
  (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
    const $notification = $delete.parentNode;

    $delete.addEventListener('click', () => {
      $notification.parentNode.removeChild($notification);
    });
  });
});

function showNotification(msg,status){
  var html = `<div class="notification ${status?'is-success':'is-danger'}">
  <button onclick="hideNotification()" class="delete"></button>
  ${msg}
</div>`
  $(".notif").html(html)
}

function hideNotification(){
  $(".notif").html('')
}


function spinner(load){
  if(load){
    $(".submit").html('<i class="fas fa-spinner fa-spin"></i>')
  }else{
    $(".submit").html('Submit')
  }
}

function submitData(){
    var name = $(".name").val();
    var gender = $(".gender").val();
    var data = {
        "name":name,
        "age":gender,
        "lat":lat,
        "lon": lon
      }
      spinner(true)
       $.ajax({
        type: 'POST',
        url: endpoint,
        data: JSON.stringify(data),
        success:function(response){
          spinner(false)
          showNotification(response.message,response.status)
            console.log(response);
        },
        error:function(err){
          spinner(false)
          showNotification("A system error occurred, please try again later",false)
            console.error(err)
        }
      });
}
  
