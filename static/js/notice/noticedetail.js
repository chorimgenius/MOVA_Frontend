const backend_base_url = "http://127.0.0.1:8000"
const urlStr = window.location.href;
const url = new URL(urlStr);
const urlParms = url.searchParams;
const id = urlParms.get('id')
console.log(id)
window.onload = () => {
  getNoticeDetail()
}

async function getNoticeDetail() {
  console.log("함수실행맨")
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

  const footnote = document.getElementById('article-footnote')
  console.log(response_json.notice_user)
  if(response_json.notice_user=="qwe"){
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
  location.href = `http://127.0.0.1:5500/templates/notice/noticewrite.html?id=${id}`
}