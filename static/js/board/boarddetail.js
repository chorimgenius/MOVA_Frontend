const backend_base_url = "http://127.0.0.1:8000"
const urlStr = window.location.href;
const url = new URL(urlStr);
const urlParms = url.searchParams;
const id = urlParms.get('id')

const payload = localStorage.getItem("payload");
const payload_parse = JSON.parse(payload)
const payload_id= payload_parse.user_id

window.onload = () => {
  Validator()
  getBoardDetail()
  webtooncomment_read()
  Profile()
}

async function Validator(){
  access = localStorage.getItem("access")
  refresh = localStorage.getItem("refresh")
  payload = localStorage.getItem("payload")

  if(access == null || payload == null || refresh == null){
      alert("로그인 후 이용해주세요")
      location.href = "signup.html"
  }
}

async function getBoardDetail() {
  const response = await fetch(`${backend_base_url}/board/${id}/`, {
    method: 'GET',
  })
  response_json = await response.json()

  const board_title = document.getElementById('board_title')
  board_title.innerText = response_json.title

  const board_user_image = document.getElementById('board_user_image')
  board_user_image.src=`${backend_base_url}${response_json.board_user_profile_image}`
  
  if(response_json.image != null){
  const board_content_image = document.getElementById('board_content_image')
  board_content_image.innerHTML=`<img class="board-image" id="board_content_image" src="${backend_base_url}${response_json.image}">`
  }
  else{
    const board_content_image = document.getElementById('board_content_image').style.display="none";
    
  }

  const board_username = document.getElementById('board_username')
  board_username.innerText = response_json.board_user

  const board_content = document.getElementById('board_content')
  board_content.innerHTML = response_json.content

  const board_created_at = document.getElementById('board_created_at')
  const today = new Date(response_json.created_at)
  board_created_at.innerText = today.toLocaleDateString()

  const board_webtoon_name = document.getElementById('board_webtoon_name')
  board_webtoon_name.innerText = response_json.webtoon_title

  const footnote = document.getElementById('board_title')
  console.log(response_json)
  
  if(response_json.board_user_id == payload_id){
    del_put_button = `<button style="float: right; font-size: 16px;" onclick="deleteBoard()">삭제</button>
    <button style="float: right; font-size: 16px;" onclick="putBoard()">수정</button>`
    footnote.insertAdjacentHTML("beforeend", del_put_button)
  }
}

async function deleteBoard() {
  var result = confirm("게시글을 삭제하시겠습니까??");
  if(result == true) {
    alert("삭제가 완료되었습니다.")
    const response = await fetch(`${backend_base_url}/board/${id}/`, {
      method: 'DELETE',
      headers:{
        "Authorization": localStorage.getItem("access"),
      }
    })
  }
  else{
    return
  }
  location.href="board.html"
}

async function putBoard() {
  location.href = `boardwrite.html?id=${id}`
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
    location.href="signup.html"
}

async function Search(){
  const search = document.getElementById("search").value
  location.href= "search_webtoon.html?search=" + search;
}

function time2str(date) {
  let today = new Date()
  let before = new Date(date)
  let time = (today - before) / 1000 / 60  // 분
  if (time < 60) {
      return parseInt(time) + "분 전"
  }
  time = time / 60  // 시간
  if (time < 24) {
      return parseInt(time) + "시간 전"
  }
  time = time / 24
  if (time < 7) {
      return parseInt(time) + "일 전"
  }
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
};


//webtoon 상세 페이지 comment 부분
async function webtooncomment_read() {
  const urlStr = window.location.href;
  const url = new URL(urlStr);
  const urlParms = url.searchParams;
  const id = urlParms.get('id')
  const response = await fetch(`${backend_base_url}/board/${id}/comment/`, {
      method: 'GET'
  })
  response_json = await response.json()
  const comment_container = document.getElementById('comment-contatiner')
  for (let i=0; i < response_json.length; i++){
      let comment_id = response_json[i]['id']
      let username = response_json[i]['username']
      let image = response_json[i]['user_profile_image']
      let content = response_json[i]['comment']
      let created_at = response_json[i]['updated_at']
      let comments_user_id = response_json[i]['comments_user_id']
      let time_before = time2str(created_at)
      if (comments_user_id == payload_id){
        let comment_html1 = `<div class="comment">
                                <div class="comment_user">
                                    <img class="user_image" style="width: 50px; height: 50px; border-radius: 70%; margin-top: 30px;" src="${backend_base_url}${image}">
                                </div>
                                <div class="comment_content">
                                    <div style="display: flex;">
                                        <h6>${username} &nbsp| &nbsp ${time_before}</h6>
                                        
                                    </div>
                                    <span class="shape ble_left no_drag" id="comment">${content}</span>
                                </div>
                                <div class="update_delete">
                                <span onclick="openModal(${comment_id})">수정</span>
                                <span onclick="handleDeleteComment(${comment_id})">삭제</span>
                                </div>
                            </div>`
                        
    comment_container.insertAdjacentHTML("beforeend",comment_html1)
    } else {
        let comment_html2 = `<div class="comment">
                                <div class="comment_user">
                                    <img class="user_image" style="width: 50px; height: 50px; border-radius: 70%; margin-top: 20px;" src="${backend_base_url}${image}">
                                </div>
                                <div class="comment_content">
                                    <div style="display: flex;">
                                        <h6>${username}</h6>
                                        <span class="comment_time">${time_before}</span>
                                    </div>
                                    <span class="shape ble_left no_drag" id="comment">${content}</span>
                                </div>
                            </div>`

    comment_container.insertAdjacentHTML("beforeend",comment_html2)
    }
}}
//modal 열기
function openModal(comment_id){
  modal.style.display = "flex"
  webtooncomment_update_read(comment_id)
}

//modal 닫기
function closeModal(){
  modal.style.display = "none"
}

async function webtooncomment_write(){
  const urlStr = window.location.href
  const url = new URL(urlStr)
  const urlParams = url.searchParams
  const id = urlParams.get('id')
  const comment_write = document.getElementById('comment_write').value

  await fetch(`${backend_base_url}/board/${id}/comment/` , {
      method:'POST',
      headers: {
        "Authorization": localStorage.getItem("access"),
        "content-type" : 'application/json',
      },
      body: JSON.stringify({
          "comment" : comment_write,
      })
  })
  location.reload()
}

async function webtooncomment_update_read(comment_id) {
  const urlStr = window.location.href;
  const url = new URL(urlStr);
  const urlParms = url.searchParams;
  const id = urlParms.get('id')

  const response = await fetch(`${backend_base_url}/board/${id}/comment/${comment_id}`, {
      method: 'GET'
  })
  response_json = await response.json()
  const modal_comment_id = document.getElementById('modal_comment_id')
  modal_comment_id.innerText = response_json.id
  const modal_comment = document.getElementById('comment_update')
  modal_comment.value = response_json.comment
  }

  async function webtooncomment_update() {
    const urlStr = window.location.href
    const url = new URL(urlStr)
    const urlParams = url.searchParams
    const id = urlParams.get('id')
    const comment_id  = document.getElementById('modal_comment_id').innerText
    const comment_update = document.getElementById('comment_update').value

    await fetch(`${backend_base_url}/board/${id}/comment/${comment_id}/`, {
        method: 'PUT',
        headers: {
            "Authorization": localStorage.getItem("access"),
            "content-type" : 'application/json',
        },
        body: JSON.stringify({
            "comment": comment_update,
        })
    })
    closeModal()
    location.reload()
} 

//댓글 삭제
async function handleDeleteComment(comment_id){
  const urlStr = window.location.href;
  const url = new URL(urlStr);
  const urlParms = url.searchParams;
  const id = urlParms.get('id')
  const response = await fetch(`${backend_base_url}/board/${id}/comment/${comment_id}/`,{
      headers : {
        "Authorization": localStorage.getItem("access"),
      },    
      method : 'DELETE',
      body : {}
  })
  location.reload()
}