const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

window.onload = () => {
  Validator()
  getBoard()
  Profile()
}

async function Validator(){
  access = localStorage.getItem("access")
  console.log(access)
  refresh = localStorage.getItem("refresh")
  payload = localStorage.getItem("payload")
  console.log(payload)

  if(access == null || payload == null || refresh == null){
      alert("로그인 후 이용해주세요")
      location.href = "../user/signup.html"
  }
}

const urlStr = window.location.href;
const url = new URL(urlStr);
const urlParms = url.searchParams;
const search = urlParms.get('search')
const category = urlParms.get('category')
console.log(category)

async function allbuttonclick(){
  all_button = document.getElementById('all_button')
  all_button.classList.toggle("button-wrap-after")
  location.href = `${frontend_base_url}/templates/board/board.html`
}

async function fanbuttonclick(){
  fan_button = document.getElementById('fan_button')
  fan_button.classList.toggle("button-wrap-after")
    location.href = `${frontend_base_url}/templates/board/board.html?category=1`
}

async function debatebuttonclick(){
  debate_button = document.getElementById('debate_button')
  debate_button.classList.toggle("button-wrap-after")
      location.href = `${frontend_base_url}/templates/board/board.html?category=2`
}

async function getBoard() {
  if(search == null && category == null){
    const response = await fetch(`${backend_base_url}/board/all/`,{
      method: 'GET',
      headers:{
        "Authorization": localStorage.getItem("access"),
      }
    })
    all_button = document.getElementById('all_button')
    all_button.classList.toggle("button-wrap-after")
    response_json = await response.json()
    board_list = response_json["results"]
    const list_html = document.getElementById("boardgetlist")
    var count = 1
    board_list.forEach(element => {
      const today = new Date(element.created_at);
      const list = `
      <tr>
          <td id="board_number">${count}</td>
          <th id="board_title"><a href="http://127.0.0.1:5500/templates/board/boarddetail.html?id=${element.id}">[${element.board_category_name}] &nbsp ${element.title}</a></th>
          <td id="board_webtoon">${element.webtoon_title}</td>
          <td id="board_created_at">${today.toLocaleDateString()}</td>
      </tr>`
      count += 1
      list_html.insertAdjacentHTML("afterbegin",list)
    })
  }

  else if(search == null && category == "1"){
    const response = await fetch(`${backend_base_url}/board/discussion/`,{
      method: 'GET',
      headers:{
        "Authorization": localStorage.getItem("access"),
      }
    })
    response_json = await response.json()
    board_list = response_json["results"]
    const list_html = document.getElementById("boardgetlist")
    var count = 1
    board_list.forEach(element => {
      const today = new Date(element.created_at);
      const list = `
      <tr>
          <td id="board_number">${count}</td>
          <th id="board_title"><a href="http://127.0.0.1:5500/templates/board/boarddetail.html?id=${element.id}">[${element.board_category_name}] &nbsp ${element.title}</a></th>
          <td id="board_webtoon">${element.webtoon_title}</td>
          <td id="board_created_at">${today.toLocaleDateString()}</td>
      </tr>`
      count += 1
      list_html.insertAdjacentHTML("afterbegin",list)
      fan_button = document.getElementById('fan_button')
      fan_button.classList.toggle("button-wrap-after")
    })
  }

  else if(search == null && category == "2"){
    const response = await fetch(`${backend_base_url}/board/fanboard/`,{
      method: 'GET',
      headers:{
        "Authorization": localStorage.getItem("access"),
      }
    })
    response_json = await response.json()
    board_list = response_json["results"]
    const list_html = document.getElementById("boardgetlist")
    var count = 1
    board_list.forEach(element => {
      const today = new Date(element.created_at);
      const list = `
      <tr>
          <td id="board_number">${count}</td>
          <th id="board_title"><a href="http://127.0.0.1:5500/templates/board/boarddetail.html?id=${element.id}">[${element.board_category_name}] &nbsp ${element.title}</a></th>
          <td id="board_webtoon">${element.webtoon_title}</td>
          <td id="board_created_at">${today.toLocaleDateString()}</td>
      </tr>`
      count += 1
      list_html.insertAdjacentHTML("afterbegin",list)
      debate_button = document.getElementById('debate_button')
      debate_button.classList.toggle("button-wrap-after")
    })
  }

  else {
    const response = await fetch(`${backend_base_url}/board/all?search=${search}` ,{
      method: 'GET',
      headers:{
        "Authorization": localStorage.getItem("access"),
      }
    })
    response_json = await response.json()
    board_list = response_json["results"]
    const list_html = document.getElementById("boardgetlist")
    var count = 1
    board_list.forEach(element => {
      const today = new Date(element.created_at);
      const list = `
      <tr>
          <td id="board_number">${count}</td>
          <th id="board_title"><a href="http://127.0.0.1:5500/templates/board/boarddetail.html?id=${element.id}">[${element.board_category_name}] &nbsp ${element.title}</a></th>
          <td id="board_webtoon">${element.webtoon_title}</td>
          <td id="board_created_at">${today.toLocaleDateString()}</td>
      </tr>`
      count += 1
      list_html.insertAdjacentHTML("afterbegin",list)
      }) 
  }
}

async function getDiscussion() {
  if(urlParameter == ""){
    const response = await fetch(`${backend_base_url}/board/discussion/`,{
      method: 'GET',
      headers:{
        "Authorization": localStorage.getItem("access"),
      }
    })
      response_json = await response.json()
      board_list = response_json["results"]
      const list_html = document.getElementById("boardgetlist")
      var count = 1
      board_list.forEach(element => {
        const today = new Date(element.created_at);
        const list = `
        <tr>
            <td id="board_number">${count}</td>
            <th id="board_title"><a href="http://127.0.0.1:5500/templates/board/boarddetail.html?id=${element.id}">[${element.board_category_name}] &nbsp ${element.title}</a></th>
            <td id="board_webtoon">${element.webtoon_title}</td>
            <td id="board_created_at">${today.toLocaleDateString()}</td>
        </tr>`
        count += 1
        list_html.insertAdjacentHTML("afterbegin",list)
    })
  }
}


function boardSearch(){
  var board_search = document.getElementById("board_search").value;
  console.log(board_search)
  location.href = `${frontend_base_url}/templates/board/board.html?search=${board_search}`
}

function postBoard() {
  location.href = "boardwrite.html"
}

async function Profile(){
  const response = await fetch(`${backend_base_url}/user/`, {
      method: 'GET',
      headers:{
        "Authorization": localStorage.getItem("access"),
      }
  })
  response_json = await response.json()
  document.getElementById("movaprofile_img").src = `${backend_base_url}${response_json.image}`
  document.getElementById("movaprofile_username").innerText = `${response_json.username}님`
}

async function handleLogout(){
	localStorage.removeItem("access")
	localStorage.removeItem("refresh")
	localStorage.removeItem("payload")
	alert("로그아웃되었습니다.")
    location.href="../user/signup.html"
}

async function Search(){
  const search = document.getElementById("search").value
  console.log(search)
  location.href= "../webtoon/search_webtoon.html?search=" + search;
}

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
})

async function Pagination(){
  var paginationPage = parseInt($('.cdp').attr('actpage'), 10);
  $('.cdp_i').on('click', function(){
    var go = $(this).attr('href').replace('#!', '');
    if (go === '+1') {
      paginationPage++;
    } else if (go === '-1') {
      paginationPage--;
    }else{
      paginationPage = parseInt(go, 10);
    }
    $('.cdp').attr('actpage', paginationPage);
  });
};
Pagination()


function movePaginaion() {
  const urlStr = window.location.href;
  const url = new URL(urlStr);
  const urlParms = url.searchParams;
  const search = urlParms.get('search')
  const next = document.getElementById('next')
  location.href = `${backend_base_url}/board/all/?page=${next}search=${search}`
}
