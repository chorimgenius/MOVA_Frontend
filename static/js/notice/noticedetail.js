$(document).ready(function () {
    $("a#pageLink").click(function () {
      $("a#pageLink").removeClass("active");
      $(this).addClass("active");
    });
    $(".menu-button").click(function () {
      $(".left-area").removeClass("hide-on-mobile");
    });
    $(".close-menu").click(function () {
      $(".left-area").addClass("hide-on-mobile");
    });
    $(".more-button").click(function () {
      $(".more-menu-list").toggle("hide");
    });


    var app = new Vue({
      el: '#app',
      data: { 
          progress: 0, 
          articleText: 'Loading...',
      }
  });
  
  document.addEventListener('scroll', function(e){
      app.progress = (window.scrollY/(document.getElementsByClassName('page-container')[0].clientHeight - window.innerHeight))*100;
  });
  
  // AJAX call for the Lorem Ipsum
  var xmlhttp = new XMLHttpRequest();
  
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
          if(xmlhttp.status == 200) { app.articleText = xmlhttp.responseText; }
          else if(xmlhttp.status == 400) { console.log('There was an error 400'); }
          else { console.log('Aw shucks, the proxy didnt work'); }
      }
  };
  
  xmlhttp.open("GET", "https://cors-anywhere.herokuapp.com/https://loripsum.net/api/12/long/decorate/link/ul/code/bq/headers", true);
  xmlhttp.send();