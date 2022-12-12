import { owl_carousel } from "../default/owl.carousel.js";


var radius = 240; // how big of the radius
var autoRotate = true; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var imgWidth = 120; // width of images (unit: px)
var imgHeight = 170; // height of images (unit: px)

var bgMusicURL = 'https://api.soundcloud.com/tracks/143041228/stream?client_id=587aa2d384f7333a886010d5f52f302a';
var bgMusicControls = true; // Show UI music control

setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid]; // combine 2 arrays

// Size of images
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

// Size of ground - depend on radius
var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {
  // Constrain the angle of camera (between 0 and 180)
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;

  // Apply the angle
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = (yes ? 'running' : 'paused');
}

var sX, sY, nX, nY, desX = 0,
  desY = 0,
  tX = 0,
  tY = 10;

// auto spin
if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

// setup events
document.getElementById('drag-container').onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX,
    sY = e.clientY;

  document.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
      nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  document.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};


function owl_slider(){
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
    var owl = $("#owl-slider-1");
    $("#owl-slider-1").owlCarousel({
      navigation: true,
      slideSpeed: 400,
      paginationSpeed: 400,
      items: 1,
      itemsDesktop: false,
      itemsDesktopSmall: false,
      itemsTablet: false,
      itemsMobile: false,
      autoplay: true,
      autoPlaySpeed: 200,
      autoPlayTimeout: 100,
      autoplayHoverPause: true
    });
    // Custom Navigation Events
    $(".owl-next").click(function () {
      owl.trigger("owl.next");
    });
    $(".owl-prev").click(function () {});

    $(".play").click(function () {
      owl.trigger("owl.play", 100);
    });
    $(".stop").click(function () {
      owl.trigger("owl.stop");
    });

    var owl = $("#owl-slider-2");
    owl.owlCarousel({
      navigation: true,
      slideSpeed: 400,
      paginationSpeed: 400,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 4
        }
      }
    });

    var owl = $("#owl-slider-3");
    owl.owlCarousel({
      navigation: true,
      slideSpeed: 400,
      paginationSpeed: 400,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 4
        }
      }
    });
  });
}

function fanart_detail(id){
  console.log(id)
}

window.onload = async function loadDesign(){

  const response = await fetch(`http://127.0.0.1:8000/fanart/`,{
    headers: {
      "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcxMjExMzcyLCJpYXQiOjE2NzA4NTEzNzIsImp0aSI6Ijg1MWE2M2QzODY1MTQxZDk5MDhkZmUzZWY2NzAxNThlIiwidXNlcl9pZCI6MSwiZW1haWwiOiJ0YWVreXUzMkBnbWFpbC5jb20ifQ.yOYjlhvpo2t5tpReAtJ1i9HY2P9OrkPqkNV8jVPbPRY",
    },
    method:'GET',
  })
  const response_json = await response.json()
  console.log(response_json)

  const list_box = document.getElementById('owl-slider-2')

  await response_json.forEach(element => {
    const content = `<div class="item video-box-wrapper" style="background-color:black;" onclick="fanart_detail(1)">
                <figure class="snip1477">
                    <img src="http://127.0.0.1:8000${element.image.result_image}" alt="sample38"/>
                    <div class="title">
                      <div>
                        <h2>재벌집 막내 아들</h2>
                        <h4>Taekyu</h4>
                      </div>
                    </div>
                    <figcaption>
                      <p>Which is worse, that everyone has his price, or that the price is always so low.</p>
                    </figcaption>
                    <a href="http://127.0.0.1:5500/templates/colorization/fanart-detail.html?id=${element.id}"></a>
                </figure>
              </div>`
    // list_box.forEach(element => {
    //   element.insertAdjacentHTML("beforeend",content)
    // })
    list_box.insertAdjacentHTML("beforeend",content)
  });
  console.log(1,"첫번째")

  owl_carousel()
  owl_slider()

}


