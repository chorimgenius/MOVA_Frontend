const backend_base_url = "https://www.chorim.shop"
const urlStr = window.location.href;
const url = new URL(urlStr);
const urlParms = url.searchParams;
const id = urlParms.get('id')
window.onload = () => {
  Validator()
  getNoticeDetail()
  Profile()
}

const access = localStorage.getItem("access")
const refresh = localStorage.getItem("refresh")
const payload = localStorage.getItem("payload")
const payload_parse = JSON.parse(payload)
const is_admin = payload_parse.is_admin

async function Validator(){


  if(access == null || payload == null || refresh == null){
      alert("로그인 후 이용해주세요")
      location.href = "signup.html"
  }
}

async function getNoticeDetail() {
  const response = await fetch(`${backend_base_url}/notice/${id}/`, {
    method: 'GET',
  })
  response_json = await response.json()
  const notice_title = document.getElementById('notice_title')
  notice_title.innerText = response_json.title

  const notice_user_image = document.getElementById('notice_user_image')
  notice_user_image.src=`${backend_base_url}${response_json.notice_user_profile_image}`

  const notice_username = document.getElementById('notice_username')
  notice_username.innerText = response_json.notice_user

  const notice_content = document.getElementById('notice_content')
  notice_content.innerHTML = response_json.content

  const notice_created_at = document.getElementById('notice_created_at')
  const today = new Date(response_json.created_at)
  notice_created_at.innerText = today.toLocaleDateString()

  const footnote = document.getElementById('notice_title')
  if(is_admin==true){
    del_put_button = `<button style="float: right;" onclick="deleteNotice()">삭제</button>
    <button style="float: right;" onclick="putNotice()">수정</button>`
    footnote.insertAdjacentHTML("beforeend", del_put_button)
  }
}

async function deleteNotice() {
  const response = await fetch(`${backend_base_url}/notice/${id}/`, {
    method: 'DELETE',
    headers:{
      "Authorization": localStorage.getItem("access"),
    }
  })
  location.href="notice.html"
}

async function putNotice() {
  location.href = `https://www.mo-va.site/noticewrite.html?id=${id}`
}

async function handleLogout(){
	localStorage.removeItem("access")
	localStorage.removeItem("refresh")
	localStorage.removeItem("payload")
	alert("로그아웃되었습니다.")
    location.href="signup.html"
}

async function Search(){
  const search = document.getElementById("search").value
  location.href= "search_webtoon.html?search=" + search;
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