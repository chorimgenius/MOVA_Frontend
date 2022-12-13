const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"
const urlStr = window.location.href;
const url = new URL(urlStr);
const urlParms = url.searchParams;
const id = urlParms.get('id')
const search = urlParms.get('search')
console.log(search)

window.onload = () => {
  putBoardDetail()
}

async function putBoardDetail() {
  const get_response = await fetch(`${backend_base_url}/board/${id}/`,{
      method: 'GET',
      headers:{
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcxMTg0MzQwLCJpYXQiOjE2NzA4MjQzNDAsImp0aSI6IjlmNzc3ZTg4YjI0ZjRhNzFhYmIwZTM3YTFkOTE4MDc2IiwidXNlcl9pZCI6MSwiZW1haWwiOiJxd2VAcXdlLmNvbSJ9.VjL6PPlDcAzR8GizCJie61UzTRR4LLvekuZiktC8iS0"
      }
  })

  response_json = await get_response.json()
  document.getElementById('title').value =`${response_json.title}`
  document.getElementsByClassName('ProseMirror')[1].innerHTML = `${response_json.content}`
  document.getElementById('dropdown_category').value = `${response_json.board_category_name}`
  document.getElementById('board-author').innerText = `${response_json.board_user}`
  document.getElementById('webtoon_name').innerText = `${search}`
}

const { Editor } = toastui;
const { colorSyntax } = Editor.plugin;

const editor = new toastui.Editor({
    el: document.querySelector("#editor"),
    height: '400px',
    placeholder: 'please enter text.',
    initialValue: '텍스트를 입력해주세요',
    initialEditType: 'wysiwyg',
    plugins: [colorSyntax]
});

const modal = document.getElementById("modal_add_feed");
const buttonAddFeed = document.getElementById("select-webtoon");
buttonAddFeed.addEventListener("click", e => {
    modal.style.top = window.pageYOffset + 'px'; // top을 이용해 시작 y위치를 바꿔줌
    modal.style.display = "flex";
    document.body.style.overflowY = "hidden"; // 스크롤 없애기
});
const modal_close = document.getElementById("close_modal");
modal_close.addEventListener("click", e => {
  modal.style.display = "none"
});

async function getBoardWebtoon() {
  const webtoon = document.getElementById("board-webtoon").value
  
  const response = await fetch(`${backend_base_url}/board/webtoonall?search=${webtoon}`, {
    method: 'GET',
      headers:{
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcxMTg0MzQwLCJpYXQiOjE2NzA4MjQzNDAsImp0aSI6IjlmNzc3ZTg4YjI0ZjRhNzFhYmIwZTM3YTFkOTE4MDc2IiwidXNlcl9pZCI6MSwiZW1haWwiOiJxd2VAcXdlLmNvbSJ9.VjL6PPlDcAzR8GizCJie61UzTRR4LLvekuZiktC8iS0"
      }
  })
  response_json = await response.json()
  search_webtoon = response_json["results"]
  const modal_html = document.getElementById("webtoon_box")
  search_webtoon.forEach(element => {
    const modal = ` <button onClick="location.href='${frontend_base_url}/templates/board/boardwrite.html?id=${id}&search=${element.title}'"><div class="item video-box-wrapper" style="width: 175px">
                      <div class="img-preview">
                        <img src="${element.image_url}" alt="">
                      </div>
                      <div class="video-description-wrapper">
                        <p class="video-description-header">${element.title}</p>
                        <p class="video-description-subheader">${element.author}</p>
                      </div>
                    </div></button> `
    modal_html.insertAdjacentHTML("beforeend",modal)
  })
}

async function writeBoard() {
  const title = document.getElementById('title').value
  const content = editor.getHTML()
  const category = document.getElementById('dropdown_category').value

  if (category == "\ud32c\uac8c\uc2dc\ud310"){
    var cate_notice = "1"
  }
  else if (category == "\ud1a0\ub860\ubc29"){
      var cate_notice = "2"
  }
  if(id==null) {
    console.log(cate_notice)
    const response = await fetch(`${backend_base_url}/board/`, {
      method: 'POST',
      headers:{
          "content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcxMTg0MzQwLCJpYXQiOjE2NzA4MjQzNDAsImp0aSI6IjlmNzc3ZTg4YjI0ZjRhNzFhYmIwZTM3YTFkOTE4MDc2IiwidXNlcl9pZCI6MSwiZW1haWwiOiJxd2VAcXdlLmNvbSJ9.VjL6PPlDcAzR8GizCJie61UzTRR4LLvekuZiktC8iS0"   
      },
      body: JSON.stringify({
          "category_name":cate_notice,
          "title":title,
          "content":content,
          "webtoon":"3"
      })
    })
    location.href = "board.html"
  }
  else {
    const put_response = await fetch (`${backend_base_url}/board/${id}/`, {
      method: 'PUT',
      headers:{
          "content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcxMTg0MzQwLCJpYXQiOjE2NzA4MjQzNDAsImp0aSI6IjlmNzc3ZTg4YjI0ZjRhNzFhYmIwZTM3YTFkOTE4MDc2IiwidXNlcl9pZCI6MSwiZW1haWwiOiJxd2VAcXdlLmNvbSJ9.VjL6PPlDcAzR8GizCJie61UzTRR4LLvekuZiktC8iS0"   
      },
      body: JSON.stringify({
          "category_name":cate_notice,
          "title":title,
          "content":content
      })
  })
  location.href = `${frontend_base_url}/templates/board/boarddetail.html?id=${id}`    
  }
}
