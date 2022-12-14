const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


window.onload = () => {
  Validator()
  getNotice()
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

async function allbuttonclick(){
  all_button = document.getElementById('all_button')
  all_button.classList.toggle("button-wrap-after")
  location.href = `${frontend_base_url}/templates/notice/notice.html`
}

async function noticebuttonclick(){
  fan_button = document.getElementById('notice_button')
  fan_button.classList.toggle("button-wrap-after")
    location.href = `${frontend_base_url}/templates/notice/notice.html?category=1`
}

async function eventbuttonclick(){
  debate_button = document.getElementById('event_button')
  debate_button.classList.toggle("button-wrap-after")
      location.href = `${frontend_base_url}/templates/notice/notice.html?category=2`
}

async function getNotice() {
  if(search == null && category == null){
    const response = await fetch(`${backend_base_url}/notice/all/`,{
      method: 'GET',
      headers:{
        "Authorization": localStorage.getItem("access"),
      }
    })
    all_button = document.getElementById('all_button')
    all_button.classList.toggle("button-wrap-after")
    response_json = await response.json()
    notice_list = response_json["results"]
    const list_html = document.getElementById("noticegetlist")
    var count = 1
    notice_list.forEach(element => {
      const today = new Date(element.created_at);
      const list = `
      <tr>
          <td id="notice_number">${count}</td>
          <th id="notice_title"><a href="http://127.0.0.1:5500/templates/notice/noticedetail.html?id=${element.id}">[${element.notice_category_name}] &nbsp ${element.title}</a></th>
          <td id="notice_created_at">${today.toLocaleDateString()}</td>
      </tr>`
      count += 1
      list_html.insertAdjacentHTML("afterbegin",list)
    })
  }

  else if(search == null && category == "1"){
    const response = await fetch(`${backend_base_url}/notice/notice/`,{
      method: 'GET',
      headers:{
        "Authorization": localStorage.getItem("access"),
      }
    })
    response_json = await response.json()
    notice_list = response_json["results"]
    const list_html = document.getElementById("noticegetlist")
    var count = 1
    notice_list.forEach(element => {
      const today = new Date(element.created_at);
      const list = `
      <tr>
          <td id="notice_number">${count}</td>
          <th id="notice_title"><a href="http://127.0.0.1:5500/templates/notice/noticedetail.html?id=${element.id}">[${element.notice_category_name}] &nbsp ${element.title}</a></th>
          <td id="notice_created_at">${today.toLocaleDateString()}</td>
      </tr>`
      count += 1
      list_html.insertAdjacentHTML("afterbegin",list)
      fan_button = document.getElementById('notice_button')
      fan_button.classList.toggle("button-wrap-after")
    })
  }

  else if(search == null && category == "2"){
    const response = await fetch(`${backend_base_url}/notice/event/`,{
      method: 'GET',
      headers:{
        "Authorization": localStorage.getItem("access"),
      }
    })
    response_json = await response.json()
    notice_list = response_json["results"]
    const list_html = document.getElementById("noticegetlist")
    var count = 1
    notice_list.forEach(element => {
      const today = new Date(element.created_at);
      const list = `
      <tr>
          <td id="notice_number">${count}</td>
          <th id="notice_title"><a href="http://127.0.0.1:5500/templates/notice/noticedetail.html?id=${element.id}">[${element.notice_category_name}] &nbsp ${element.title}</a></th>
          <td id="notice_created_at">${today.toLocaleDateString()}</td>
      </tr>`
      count += 1
      list_html.insertAdjacentHTML("afterbegin",list)
      fan_button = document.getElementById('event_button')
      fan_button.classList.toggle("button-wrap-after")
    })
  }

  else {
    const response = await fetch(`${backend_base_url}/notice/all?search=${search}` ,{
      method: 'GET',
      headers:{
        "Authorization": localStorage.getItem("access"),
      }
    })
    response_json = await response.json()
    notice_list = response_json["results"]
    console.log(notice_list)
    const list_html = document.getElementById("noticegetlist")
    var count = 1
    notice_list.forEach(element => {
      const today = new Date(element.created_at);
      const list = `
      <tr>
          <td id="notice_number">${count}</td>
          <th id="notice_title"><a href="http://127.0.0.1:5500/templates/notice/noticedetail.html?id=${element.id}">[${element.notice_category_name}] &nbsp ${element.title}</a></th>
          <td id="notice_created_at">${today.toLocaleDateString()}</td>
      </tr>`
      count += 1
      list_html.insertAdjacentHTML("afterbegin",list)
      }) 
  }
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

function noticeSearch(){
  var notice_search = document.getElementById("notice_search").value;
  console.log(notice_search)
  location.href = `${frontend_base_url}/templates/notice/notice.html?search=${notice_search}`
}


function postNotice() {
  location.href = "noticewrite.html"
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