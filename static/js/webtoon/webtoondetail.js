const backend_base_url = "http://127.0.0.1:8000"

// webtoon 상세 페이지 내용 가져와서 띄우기
window.onload = function (){
    loadArticles()
    webtooncomment_read()
    console.log(localStorage.getItem("access"))
}
async function loadArticles() {
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    // const payload_userid= payload_parse.user_id
    const urlStr = window.location.href;
    const url = new URL(urlStr);
    const urlParms = url.searchParams;
    const id = urlParms.get('id')
    const response = await fetch(`${backend_base_url}/` + parseInt(id) + '/', {
        method: 'GET'
    })
    response_json = await response.json()
    console.log(response_json)
    const title= document.getElementById('content_title')
    title.innerText = response_json.title
    const platform = document.getElementById('platform')
    platform.innerText = response_json.platform
    const author = document.getElementById('author')
    author.innerText = response_json.author
    const story = document.getElementById('story')
    story.innerText = response_json.summary
    const day_of_the_weeks = document.getElementById('day_of_the_weeks')
    day_of_the_weeks.innerText = response_json.day_of_the_week
    const webtoon_pic = document.getElementById('webtoon_pic')
    webtoon_pic.src = response_json.image_url
    const likeButton = document.getElementById('like_button')
    const webtoon_likes = response_json.webtoon_likes
    if (webtoon_likes.includes(1)){
        likeButton.classList.toggle('like_button_click')
    }else{
        likeButton.classList.toggle('like_button_click')
        likeButton.classList.toggle('like_button_click')
    }
    const bookmarkButton = document.getElementById('bookmark_button')
    const webtoon_bookmarks = response_json.webtoon_bookmarks

    if (webtoon_bookmarks.includes(1)){
        bookmarkButton.classList.toggle('bookmark_button_click')
    }else{
        bookmarkButton.classList.toggle('bookmark_button_click')
        bookmarkButton.classList.toggle('bookmark_button_click')
    }
}

async function webtoonlink() {
    const urlStr = window.location.href;
    const url = new URL(urlStr);
    const urlParms = url.searchParams;
    const id = urlParms.get('id')
    const response = await fetch(`${backend_base_url}/` + parseInt(id) + '/', {
        method: 'GET'
    })
    response_json = await response.json()
    location.href = response_json.webtoon_link
}

// 시간 설정을위한 포맷팅
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
    const response = await fetch(`${backend_base_url}/` + parseInt(id) + '/comment/', {
        method: 'GET'
    })
    response_json = await response.json()
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    // const payload_username= payload_parse.username
    const comment_container = document.getElementById('comment-contatiner')
    for (let i=0; i < response_json.length; i++){
        let comment_id = response_json[i]['id']
        let username = response_json[i]['user']['username']
        let image = response_json[i]['user']['image']
        let content = response_json[i]['content']
        let created_at = response_json[i]['updated_at']
        let time_before = time2str(created_at)
        if (username == "lemon"){
            let comment_html1 = `<div class="comment">
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
    }
}

async function webtooncomment_write(){
    const urlStr = window.location.href
    console.log(urlStr)
    const url = new URL(urlStr)
    const urlParams = url.searchParams
    const id = urlParams.get('id')
    const comment_write = document.getElementById('comment_write').value

    await fetch(`${backend_base_url}/`+parseInt(id)+'/comment/', {
        method:'POST',
        headers: {
            "Authorization" : localStorage.getItem("access"),
            "content-type" : 'application/json',
        },
        body: JSON.stringify({
            "content" : comment_write,
        })
    })
    location.reload()
}  

//modal 열기
function openModal(comment_id){
    modal.style.display = "flex"
    webtooncomment_update_read(comment_id)
}

//modal 닫기
function closeModal(){
    modal.style.display = "none"
}


//수정을 위한 댓글 다시 가져오기
async function webtooncomment_update_read(comment_id) {
    console.log(comment_id)
    const urlStr = window.location.href;
    const url = new URL(urlStr);
    const urlParms = url.searchParams;
    const id = urlParms.get('id')

    const response = await fetch(`${backend_base_url}/` + parseInt(id) + '/comment/' + `${comment_id}` + '/', {
        method: 'GET'
    })
    response_json = await response.json()
    const modal_comment_id = document.getElementById('modal_comment_id')
    modal_comment_id.innerText = response_json.id
    const modal_comment = document.getElementById('comment_update')
    modal_comment.value = response_json.content
    }

//댓글 수정
async function webtooncomment_update() {
    const urlStr = window.location.href
    const url = new URL(urlStr)
    const urlParams = url.searchParams
    const id = urlParams.get('id')
    const comment_id  = document.getElementById('modal_comment_id').innerText
    const comment_update = document.getElementById('comment_update').value

    await fetch(`${backend_base_url}/` + parseInt(id) + '/comment/' + `${comment_id}` + '/', {
        method: 'PUT',
        headers: {
            "Authorization": localStorage.getItem("access")
        },
        body: JSON.stringify({
            "content": comment_update,
        })
    })
    closeModal()
    location.reload()
}  

//댓글 삭제
async function handleDeleteComment(commentId){
    const urlStr = window.location.href;
    const url = new URL(urlStr);
    const urlParms = url.searchParams;
    const id = urlParms.get('id')
    const response = await fetch(`${backend_base_url}/` + parseInt(id) + '/comment/' + `${commentId}` + '/',{
        headers : {
            'Authorization' : localStorage.getItem("access")
        },    
        method : 'DELETE',
        body : {}
    })
    window.console.log('delete')
    location.reload()
}

//webtoon 좋아요
document.addEventListener('DOMContentLoaded', function() {
    const urlStr = window.location.href;
    const url = new URL(urlStr);
    const urlParams = url.searchParams;
    const id = urlParams.get('id')
    const likeButton = document.getElementById('like_button');
    likeButton.addEventListener('click', () => { 
        fetch(`${backend_base_url}/` +parseInt(id) +'/like/',{
            headers:{
                "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcxMjU0NDQ1LCJpYXQiOjE2NzA4OTQ0NDUsImp0aSI6IjUzY2NlNjVmNmIyNTRlOWZiODU5MzM4ZmY2M2NhNzI4IiwidXNlcl9pZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VybmFtZSI6ImxlbW9uIn0.pYUgq63EdRV5U-52U2tNyfS66w6DWMEkVcnjGhIPIfQ"
            },
            method :'POST',
        })
        console.log("like 실행")
        likeButton.classList.toggle('like_button_click');

    });
});


//wbtoon bookmark
document.addEventListener('DOMContentLoaded', function() {
    const urlStr = window.location.href;
    const url = new URL(urlStr);
    const urlParams = url.searchParams;
    const id = urlParams.get('id')
    const bookmarkButton = document.getElementById('bookmark_button');
    bookmarkButton.addEventListener('click', () => { 
        fetch(`${backend_base_url}/` +parseInt(id) +'/bookmark/',{
            headers:{
                "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcxMjU0NDQ1LCJpYXQiOjE2NzA4OTQ0NDUsImp0aSI6IjUzY2NlNjVmNmIyNTRlOWZiODU5MzM4ZmY2M2NhNzI4IiwidXNlcl9pZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VybmFtZSI6ImxlbW9uIn0.pYUgq63EdRV5U-52U2tNyfS66w6DWMEkVcnjGhIPIfQ",
            },
            method :'POST',
        })
        console.log('bookmark 실행')   
        bookmarkButton.classList.toggle('bookmark_button_click')
    });
});





// 기본 페이지에 쓰이는 javascript
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
    var owl = $("#owl-slider-1");
    $("#owl-slider-1").owlCarousel({
        navigation: true,
        slideSpeed: 400,
        paginationSpeed: 400,
        items: 1,
        itemsDesktop: false,
        itemsDesktopSmall: false,
        itemsTablet: false,
        itemsMobile: false,
        autoplay: true,
        autoPlaySpeed: 200,
        autoPlayTimeout: 100,
        autoplayHoverPause: true
    });
    // Custom Navigation Events
    $(".owl-next").click(function () {
        owl.trigger("owl.next");
    });
    $(".owl-prev").click(function () { });

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

    var owl = $("#owl-slider-3");
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