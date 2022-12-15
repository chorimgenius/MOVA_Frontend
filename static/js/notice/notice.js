const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


window.onload = () => {
  Validator()
  getNotice()
  Profile()
}

async function Validator(){
  access = localStorage.getItem("access")
  refresh = localStorage.getItem("refresh")
  payload = localStorage.getItem("payload")

  if(access == null || payload == null || refresh == null){
      alert("로그인 후 이용해주세요")
      location.href = "../user/signup.html"
  }
}

const urlStr = window.location.href;
const url = new URL(urlStr);
const urlParms = url.searchParams;
var search = urlParms.get('search')
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

async function pagination(num){
  if(search==null){
    search=""
  }
  const response = await fetch(`${backend_base_url}/notice/all?page=${num}&search=${search}`,{
    method: 'GET',
      headers:{
        "Authorization": localStorage.getItem("access"),
      }
  })
  response_json = await response.json()
  notice_list = response_json["results"]

  //초기화
  const notice_list_remove = document.querySelectorAll(".notice-list")
  notice_list_remove.forEach(element => {
    element.remove()
  })


  const list_html = document.getElementById("noticegetlist")
  var count = 1
  notice_list.forEach(element => {
    const today = new Date(element.created_at);
    const list = `
    <tr class="notice-list">
        <td id="notice_number">${count}</td>
        <th id="notice_title"><a href="http://127.0.0.1:5500/templates/notice/noticedetail.html?id=${element.id}">[${element.notice_category_name}] &nbsp ${element.title}</a></th>
        <td id="notice_created_at">${today.toLocaleDateString()}</td>
    </tr>`
    count += 1
    list_html.insertAdjacentHTML("afterbegin",list)
  })
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
      <tr class="notice-list">
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
    fan_button = document.getElementById('notice_button')
    fan_button.classList.toggle("button-wrap-after")
    const list_html = document.getElementById("noticegetlist")
    var count = 1
    notice_list.forEach(element => {
      const today = new Date(element.created_at);
      const list = `
      <tr class="notice-list">
          <td id="notice_number">${count}</td>
          <th id="notice_title"><a href="http://127.0.0.1:5500/templates/notice/noticedetail.html?id=${element.id}">[${element.notice_category_name}] &nbsp ${element.title}</a></th>
          <td id="notice_created_at">${today.toLocaleDateString()}</td>
      </tr>`
      count += 1
      list_html.insertAdjacentHTML("afterbegin",list)
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
    fan_button = document.getElementById('event_button')
    fan_button.classList.toggle("button-wrap-after")
    notice_list = response_json["results"]
    const list_html = document.getElementById("noticegetlist")
    var count = 1
    notice_list.forEach(element => {
      const today = new Date(element.created_at);
      const list = `
      <tr class="notice-list">
          <td id="notice_number">${count}</td>
          <th id="notice_title"><a href="http://127.0.0.1:5500/templates/notice/noticedetail.html?id=${element.id}">[${element.notice_category_name}] &nbsp ${element.title}</a></th>
          <td id="notice_created_at">${today.toLocaleDateString()}</td>
      </tr>`
      count += 1
      list_html.insertAdjacentHTML("afterbegin",list)
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
    const list_html = document.getElementById("noticegetlist")
    var count = 1
    notice_list.forEach(element => {
      const today = new Date(element.created_at);
      const list = `
      <tr class="notice-list">
          <td id="notice_number">${count}</td>
          <th id="notice_title"><a href="http://127.0.0.1:5500/templates/notice/noticedetail.html?id=${element.id}">[${element.notice_category_name}] &nbsp ${element.title}</a></th>
          <td id="notice_created_at">${today.toLocaleDateString()}</td>
      </tr>`
      count += 1
      list_html.insertAdjacentHTML("afterbegin",list)
      })
  }

  page_size = Math.ceil(response_json.count/10)
  const pagination_list = document.getElementById('pagination_list')
  const item_prev = `<a href="#!-1" class="cdp_i">prev</a>`
  pagination_list.insertAdjacentHTML("afterbegin",item_prev)
  for(i=1;i<=page_size;i++){
    const item = `<a href="#!${i}" onclick="pagination(${i})" class="cdp_i">${i}</a>`
    pagination_list.insertAdjacentHTML("beforeend",item)
    
  }
  const item_next = `<a href="#!+1" class="cdp_i">next</a>`
  pagination_list.insertAdjacentHTML("beforeend",item_next)
  Pagination()
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
  const footnotice = document.getElementById('footnotice')
  if(response_json.is_admin==true){
    del_put_button = `<button type="submit" onclick="postNotice()" class="btn btn-dark-write" style="margin-top: 10px; float: right; margin-right: 100px;">작성</button>`
    footnotice.insertAdjacentHTML("beforeend", del_put_button)
}}

async function handleLogout(){
	localStorage.removeItem("access")
	localStorage.removeItem("refresh")
	localStorage.removeItem("payload")
	alert("로그아웃되었습니다.")
    location.href="../user/signup.html"
}

async function Search(){
  const search = document.getElementById("search").value
  location.href= "../webtoon/search_webtoon.html?search=" + search;
}

function noticeSearch(){
  var notice_search = document.getElementById("notice_search").value;
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

  async function Pagination(){
    var paginationPage = parseInt($('.cdp').attr('actpage'), 10);
    $('.cdp_i').on('click', function(){
      var go = $(this).attr('href').replace('#!', '');
      if (go === '+1') {
        paginationPage++;
        pagination(paginationPage)
  
      } else if (go === '-1') {
        paginationPage--;
        pagination(paginationPage)
      }else{
        paginationPage = parseInt(go, 10);
      }
      $('.cdp').attr('actpage', paginationPage);
    });
  };