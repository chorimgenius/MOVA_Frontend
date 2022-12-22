const backend_base_url = "http://127.0.0.1:8000"

const urlStr = window.location.href;
const url = new URL(urlStr);
const urlParms = url.searchParams;
const id = urlParms.get('id')

window.onload = () => {
    Validator()
    putNoticeDetail()
    Profile()
}

async function Validator() {
    access = localStorage.getItem("access")
    refresh = localStorage.getItem("refresh")
    payload = localStorage.getItem("payload")

    if (access == null || payload == null || refresh == null) {
        alert("로그인 후 이용해주세요")
        location.href = "signup.html"
    }
}

async function putNoticeDetail() {
    const get_response = await fetch(`${backend_base_url}/notice/${id}/`, {
        method: 'GET',
        headers: {
            "Authorization": localStorage.getItem("access"),
        }
    })
    response_json = await get_response.json()
    document.getElementById('title').value = `${response_json.title}`
    document.getElementsByClassName('ProseMirror')[1].innerHTML = `${response_json.content}`
    document.getElementById('dropdown_category').value = `${response_json.notice_category_name}`
    document.getElementById('notice-author').innerText = `${response_json.notice_user}`
}

const { Editor } = toastui;
const { colorSyntax } = Editor.plugin;

const editor = new toastui.Editor({
    el: document.querySelector("#editor"),
    height: '400px',
    initialEditType: 'wysiwyg',
    plugins: [colorSyntax]
});

async function Profile() {
    const response = await fetch(`${backend_base_url}/user/`, {
        method: 'GET',
        headers: {
            "Authorization": localStorage.getItem("access"),
        }
    })
    response_json = await response.json()
    document.getElementById("movaprofile_img").src = `${backend_base_url}${response_json.image}`
    document.getElementById("movaprofile_username").innerText = `${response_json.username}님`
    document.getElementById("notice-author").innerText = `${response_json.username}`
}

async function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    alert("로그아웃되었습니다.")
    location.href = "signup.html"
}

async function Search() {
    const search = document.getElementById("search").value

    location.href = "search_webtoon.html?search=" + search;
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

async function writeNotice() {
    const title = document.getElementById('title').value
    const content = editor.getHTML()
    const category = document.getElementById('dropdown_category').value
    if (title == "" || content == "<p><br></p>"){
        alert("제목, 웹툰, 내용이 입력되지 않았습니다.")
        return 0;
    }
    if (category == "\uacf5\uc9c0\uc0ac\ud56d") {
        var cate_notice = "1"
    }
    else if (category == "\uc774\ubca4\ud2b8") {
        var cate_notice = "2"
    }
    if (id == null) {
        const response = await fetch(`${backend_base_url}/notice/`, {
            method: 'POST',
            headers: {
                "content-Type": "application/json",
                "Authorization": localStorage.getItem("access"),
            },
            body: JSON.stringify({
                "category_name": cate_notice,
                "title": title,
                "content": content
            })
        })
        // location.href = "notice.html"
    }
    else {
        const put_response = await fetch(`${backend_base_url}/notice/${id}/`, {
            method: 'PUT',
            headers: {
                "content-Type": "application/json",
                "Authorization": localStorage.getItem("access"),
            },
            body: JSON.stringify({
                "category_name": cate_notice,
                "title": title,
                "content": content
            })
        })
        location.href = `noticedetail.html?id=${id}`
    }
}