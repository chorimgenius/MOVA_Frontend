import { owl_carousel } from "../default/owl.carousel.js";

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



window.onload = async function loadDesign(){

  const response = await fetch(`http://127.0.0.1:8000/fanart/`,{
    headers: {
      "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwODIzNTMzLCJpYXQiOjE2NzA0NjM1MzMsImp0aSI6ImQzNzliMGYwZmQ1ZTQ3M2NiM2U5MWVhZTY4YWMyYTUxIiwidXNlcl9pZCI6MSwiZW1haWwiOiJ0YWVreXUzMkBnbWFpbC5jb20ifQ.6QxyVubd-ggvtKodL1C5WAD69P894voRCJkogFk_1S0",
    },
    method:'GET',
  })
  const response_json = await response.json()
  console.log(response_json)

  const list_box = document.getElementById('owl-slider-2')

  await response_json.forEach(element => {
    const content = `<div class="item video-box-wrapper" style="background-color:black;">
                <figure class="snip1477">
                    <img src="http://127.0.0.1:8000${element.image.result_image}" alt="sample38" />
                    <div class="title">
                      <div>
                        <h2>Penny</h2>
                        <h4>Tool</h4>
                      </div>
                    </div>
                    <figcaption>
                      <p>Which is worse, that everyone has his price, or that the price is always so low.</p>
                    </figcaption>
                    <a href="#"></a>
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

