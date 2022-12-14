var id = 0 // 게시글 아이디
window.onload = async function loadBoard(){
  const payload = localStorage.getItem("payload");
  const payload_parse = JSON.parse(payload)
  const payload_userid = payload_parse.user_id
  const urlStr = window.location.href;
  const url = new URL(urlStr);
  const urlParms = url.searchParams;
  id = urlParms.get('id')
  console.log(100,id)

  const response = await fetch(`http://127.0.0.1:8000/fanart/${id}/`,{
      headers: {
        "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcxMjExMzcyLCJpYXQiOjE2NzA4NTEzNzIsImp0aSI6Ijg1MWE2M2QzODY1MTQxZDk5MDhkZmUzZWY2NzAxNThlIiwidXNlcl9pZCI6MSwiZW1haWwiOiJ0YWVreXUzMkBnbWFpbC5jb20ifQ.yOYjlhvpo2t5tpReAtJ1i9HY2P9OrkPqkNV8jVPbPRY",
      },
      method:'GET',
  })
  const response_json = await response.json()
  console.log(response_json)
  console.log(response_json.likes.length)
  const fanart_image = document.getElementById('fanart-image')
  fanart_image.src = "http://127.0.0.1:8000"+response_json.image

  var date = new Date(response_json.created_at)
  console.log(date)
  console.log(1000,date.toLocaleDateString())

  const comments = response_json.comment_set
  console.log(comments)
  const comment_element = document.querySelector(".comment-list")
  comments.forEach(element => {
    const write_time = timeForToday(element.created_at)
    let delete_button = ""
    console.log(element.user.id)
    if(element.user.id==1){
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
  console.log(webtoon_likes)
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
  console.log(response_json)
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
  console.log(comment)
  console.log(100,id)
  const response = await fetch(`http://127.0.0.1:8000/fanart/${id}/comment/`,{
    headers: {
      "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcxMDMzNzMwLCJpYXQiOjE2NzA2NzM3MzAsImp0aSI6IjAxNzc1MmVlNDg1MTQwNDBhYTZkZDlmODhhMWE4MjEyIiwidXNlcl9pZCI6MSwiZW1haWwiOiJ0YWVreXUzMkBnbWFpbC5jb20ifQ.MGn3HnrFALPT8cIBhXcaj10b1T8uiL8IhSwYCu8DEB8",
      "content-type" : 'application/json',
    },
    method:'POST',
    body: JSON.stringify({
        "content": comment.value,
    })
  })
  const response_json = await response.json()
  console.log(response_json)
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
  console.log(id)
  const response = await fetch(`http://127.0.0.1:8000/fanart/${id}/comment/${id}`,{
    headers: {
      "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcxMDMzNzMwLCJpYXQiOjE2NzA2NzM3MzAsImp0aSI6IjAxNzc1MmVlNDg1MTQwNDBhYTZkZDlmODhhMWE4MjEyIiwidXNlcl9pZCI6MSwiZW1haWwiOiJ0YWVreXUzMkBnbWFpbC5jb20ifQ.MGn3HnrFALPT8cIBhXcaj10b1T8uiL8IhSwYCu8DEB8",
    },
    method:'DELETE',
  })
  const comment = document.getElementById(`comment-id${id}`)
  comment.style.display = "none"
}


