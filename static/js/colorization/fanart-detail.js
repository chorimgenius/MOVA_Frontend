const backend_base_url = "http://127.0.0.1:8000"

window.onload = () => {
  Validator()
  loadBoard()
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
  location.href= "../webtoon/search_webtoon.html?search=" + search;
}

var id = 0 // 게시글 아이디
async function loadBoard(){
  const urlStr = window.location.href;
  const url = new URL(urlStr);
  const urlParms = url.searchParams;
  id = urlParms.get('id')

  const response = await fetch(`http://127.0.0.1:8000/fanart/${id}/`,{
      headers: {
        "Authorization": localStorage.getItem("access"),
      },
      method:'GET',
  })
  const response_json = await response.json()
  const fanart_image = document.getElementById('fanart-image')
  fanart_image.src = "http://127.0.0.1:8000"+response_json.image

  var date = new Date(response_json.created_at)
  const payload = localStorage.getItem("payload")
  const payload_parse = JSON.parse(payload)
  const payload_userid = payload_parse.user_id
  const comments = response_json.comment_set
  const comment_element = document.querySelector(".comment-list")
  comments.forEach(element => {
    const write_time = timeForToday(element.created_at)
    let delete_button = ""
    if(element.user.id== payload_userid){
      delete_button = `&nbsp&nbsp<a onclick='delete_comment(${element.id})' style='color:black;'>|&nbsp삭제</a>`
    }

    const comment = `<div class='comment-node' id='comment-id${element.id}'>
                        <div class='print-author'>
                            ${element.user.username}|<small style="color:darkgrey;">${write_time}</small>${delete_button}
                        </div> 
                        ${element.content}
                    </div>`
    comment_element.insertAdjacentHTML("beforeend",comment)
  });
  
  const likes_count = document.getElementById('likes-count')
  likes_count.textContent = response_json.likes.length

  const likeButton = document.getElementById('like_button')
  const webtoon_likes = response_json.likes

  if (webtoon_likes.includes(payload_userid)){
      likeButton.classList.toggle('like_button_click')
  }
  else{
      likeButton.classList.toggle('like_button_click')
      likeButton.classList.toggle('like_button_click')
  }
}

//likes
async function fanart_like(){
  const response = await fetch(`http://127.0.0.1:8000/fanart/${id}/like/`,{
    headers: {
      "Authorization" : localStorage.getItem("access"),
      "content-type" : 'application/json',
    },
    method:'POST',
  })
  response_json = await response.json()
  likeButton = document.getElementById('like_button')
  likeButton.classList.toggle('like_button_click')
  const likes_count = document.getElementById('likes-count')
  if(response_json == "좋아요 등록 완료!"){
    likes_count.textContent = parseInt(likes_count.textContent)+1
  }else{
    likes_count.textContent = parseInt(likes_count.textContent)-1
  }
}

function timeForToday(value) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
      return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
}
async function write_comment(){
  const comment = document.getElementById("write-comment")
  const response = await fetch(`http://127.0.0.1:8000/fanart/${id}/comment/`,{
    headers: {
      "Authorization": localStorage.getItem("access"),
      "content-type" : 'application/json',
    },
    method:'POST',
    body: JSON.stringify({
        "content": comment.value,
    })
  })
  const response_json = await response.json()
  const comment_element = document.querySelector(".comment-list")
  const write_time = timeForToday(response_json.created_at)
  const add_comment = `<div class='comment-node'id='comment-id${response_json.id}'>
                        <div class='print-author'>
                            ${response_json.user}|<small style="color:darkgrey;">${write_time}</small>&nbsp&nbsp<a onclick='delete_comment(${response_json.id})' style='color:black;'>|&nbsp삭제</a>
                        </div> 
                        ${response_json.content}
                    </div>`
  comment_element.insertAdjacentHTML("afterbegin",add_comment)
  comment.value = null
}
async function delete_comment(id){
  const response = await fetch(`http://127.0.0.1:8000/fanart/${id}/comment/${id}`,{
    headers: {
      "Authorization": localStorage.getItem("access"),
    },
    method:'DELETE',
  })
  const comment = document.getElementById(`comment-id${id}`)
  comment.style.display = "none"
}
