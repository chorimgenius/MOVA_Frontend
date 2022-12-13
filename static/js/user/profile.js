const backend_base_url = "http://127.0.0.1:8000"

window.onload= () => {
    Profile()
    a()
}

// 프로필 페이지
async function Profile(){
    const response = await fetch(`${backend_base_url}/user/`, {
        method: 'GET',
        headers:{
          "Authorization": localStorage.getItem("access"),
        }
    })
    response_json = await response.json()

    document.getElementById("profile_img").src = `http://127.0.0.1:8000${response_json.image}`
    document.getElementById("username").innerText = `${response_json.username}`
    document.getElementById("email").innerText = `${response_json.email}`
    document.getElementById("bio").innerText = `${response_json.bio}`
}

function handleHome(){
    location.href="main.html"
}

function a(){
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
    });
  }

function move_profileedit(){
  location.href="userchange.html"
}


// 로그아웃
async function handleLogout(){
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    alert("로그아웃되었습니다.")
    location.href = "signup.html"
}

//회원탈퇴
async function ProfileDelete(){
  if (confirm("정말 삭제하시겠습니까??") == true){
    const payload = localStorage.getItem("payload")
    const payload_parse = JSON.parse(payload)
    const email= payload_parse.email
    const response = await fetch(`${backend_base_url}/user/`, {
        method: 'DELETE',
        headers:{
            'content-type' : 'application/json',
            "Authorization": localStorage.getItem("access"),
        },
        body: JSON.stringify({
            "email": email,
        })
    })
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")    
    location.href="signup.html";
  }
  else{   
    return false;
  }
  
}