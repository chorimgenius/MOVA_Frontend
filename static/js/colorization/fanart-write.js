const backend_base_url = "http://127.0.0.1:8000"
window.onload = () => {
    Validator()
    Profile()
}

async function Validator() {
    access = localStorage.getItem("access")
    refresh = localStorage.getItem("refresh")
    payload = localStorage.getItem("payload")

    if (access == null || payload == null || refresh == null) {
        alert("로그인 후 이용해주세요")
        location.href = "Wsignup.html"
    }
}

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

let uploadField = document.getElementById('image-upload')
uploadField.addEventListener('change', resize_image);
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
let drawingMode; // true일 때만 그리기
let brush = 'color'; // 'color', 'image'
let colorVal = 'black'; // 색상
let resize_image_id = 0
let image_id = 0
async function resize_image(e) {
    let file = e.currentTarget.files[0];
    const form_data = new FormData();
    form_data.append('image', file)
    const response = await fetch(`http://127.0.0.1:8000/fanart/baseimage/`, {
        headers: {
            "Authorization": localStorage.getItem("access"),
        },
        method: 'POST',
        body: form_data
    })
    response_json = await response.json()
    resize_image_id = response_json['serializer.data'].id

    const imgElem = new Image();
    imgElem.addEventListener('load', () => {
        context.drawImage(imgElem, 0, 0, 480, 480);
    });
    imgElem.src = response_json['image_data']
}
function downHandler() {
    drawingMode = true;
}

function upHandler() {
    drawingMode = false;
}

function moveHandler(e) {
    if (!drawingMode) return;

    switch (brush) {
        case 'color':
            context.beginPath();
            context.arc(e.offsetX, e.offsetY, 3, 0, Math.PI * 2, false);
            context.fill();
            break;
        case 'image':
            context.drawImage(imgElem, 이벤트.layerX, 이벤트.layerY, 50, 50);
            break;
    }
}

function setColor(이벤트) {
    brush = 이벤트.target.getAttribute('data-type');
    colorVal = 이벤트.target.getAttribute('data-color');
    context.fillStyle = colorVal;
}

function createImage() {
    const url = canvas.toDataURL('image/png');
    const imgElem = new Image();
    imgElem.src = url;
    resultImage.appendChild(imgElem);
}

canvas.addEventListener('mousedown', downHandler);
canvas.addEventListener('mousemove', moveHandler);
canvas.addEventListener('mouseup', upHandler);

async function colorization() {
    var imgDataUrl = canvas.toDataURL('image/png');
    var blobBin = atob(imgDataUrl.split(',')[1]);	// base64 데이터 디코딩
    var array = [];
    for (var i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
    }
    var file = new Blob([new Uint8Array(array)], { type: 'image/png' });	// Blob 생성
    var file_name = 'canvas_img_' + new Date().getMilliseconds() + '.png';
    var form_data = new FormData();	// formData 생성
    form_data.append("resize_image", resize_image_id)
    form_data.append("hint_image", file, file_name);	// file data 추가

    const response = await fetch(`http://127.0.0.1:8000/fanart/colorization/`, {
        headers: {
            "Authorization": localStorage.getItem("access"),
        },
        method: 'POST',
        body: form_data
    })
    response_json = await response.json()

    let result_box = document.getElementById('result_image_box')
    result_box.src = "http://127.0.0.1:8000" + response_json.result_image
    image_id = response_json.id
}
let webtoon_id = 0
async function fanart_write() {
    let title = document.getElementById("fanart-title").value
    let content = document.getElementById("fanart-content").value


    const response = await fetch(`http://127.0.0.1:8000/fanart/`, {
        headers: {
            "Authorization": localStorage.getItem("access"),
            "content-type": 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "title": title,
            "content": content,
            "webtoon": webtoon_id,
            "image": image_id
        })
    })

    const response_json = await response.json()
    location.href = 'fanart-detail.html?id=' + response_json.id
}

async function getBoardWebtoon() {
    const webtoon = document.getElementById("board-webtoon").value
    const response = await fetch(`http://127.0.0.1:8000/board/webtoonall?search=${webtoon}`, {
        method: 'GET',
        headers: {
            "Authorization": localStorage.getItem("access"),
        }
    })
    response_json = await response.json()
    search_webtoon = response_json["results"]
    const modal_html = document.getElementById("webtoon_box")
    search_webtoon.forEach(element => {
        const modal = ` <button class="modal-webtoonlist" onclick="getwebtoon_name(${element.id},'${element.title}')"><div class="item video-box-wrapper" style="width: 175px">
                        <div class="img-preview">
                            <img src="${element.image_url}" alt="">
                        </div>
                        <div class="video-description-wrapper">
                            <p class="video-description-header">${element.title}</p>
                            <p class="video-description-subheader">${element.author}</p>
                        </div>
                        </div></button> `
        modal_html.insertAdjacentHTML("beforeend", modal)
    })
}
async function getwebtoon_name(id, title) {
    webtoon_id = id
    document.getElementById('webtoon_name').innerHTML = title
    modal.style.display = "none"
    const webtoonlist = document.querySelectorAll(".modal-webtoonlist")
    webtoonlist.forEach(element => {
        element.remove()
    })
}
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
    const modal_html = document.getElementById("webtoon_box")
    const webtoonlist = document.querySelectorAll(".modal-webtoonlist")
    webtoonlist.forEach(element => {
        element.remove()
    })

});

var colorBlock = document.getElementById('color-block');
var ctx1 = colorBlock.getContext('2d');
var width1 = colorBlock.width;
var height1 = colorBlock.height;

var colorStrip = document.getElementById('color-strip');
var ctx2 = colorStrip.getContext('2d');
var width2 = colorStrip.width;
var height2 = colorStrip.height;

var colorLabel = document.getElementById('color-label');

var x = 0;
var y = 0;
var drag = false;
var rgbaColor = 'rgba(255,0,0,1)';

ctx1.rect(0, 0, width1, height1);
fillGradient();

ctx2.rect(0, 0, width2, height2);
var grd1 = ctx2.createLinearGradient(0, 0, 0, height1);
grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
ctx2.fillStyle = grd1;
ctx2.fill();

function click(e) {
    x = e.offsetX;
    y = e.offsetY;
    var imageData = ctx2.getImageData(x, y, 1, 1).data;
    rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
    fillGradient();
}

function fillGradient() {
    ctx1.fillStyle = rgbaColor;
    ctx1.fillRect(0, 0, width1, height1);

    var grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
    grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
    grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
    ctx1.fillStyle = grdWhite;
    ctx1.fillRect(0, 0, width1, height1);

    var grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
    grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
    grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
    ctx1.fillStyle = grdBlack;
    ctx1.fillRect(0, 0, width1, height1);
}

function mousedown(e) {
    drag = true;
    changeColor(e);
}

function mousemove(e) {
    if (drag) {
        changeColor(e);
    }
}
const color_palette = document.getElementById('color-palette')
function mouseup(e) {
    drag = false;
    color_palette.style.display = 'none'
}

function changeColor(e) {
    x = e.offsetX;
    y = e.offsetY;
    var imageData = ctx1.getImageData(x, y, 1, 1).data;
    rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
    colorLabel.style.backgroundColor = rgbaColor;
    context.fillStyle = rgbaColor;
}
function show_palette() {
    color_palette.style.display = 'block'
}

colorLabel.addEventListener("click", show_palette, false);

colorStrip.addEventListener("click", click, false);

colorBlock.addEventListener("mousedown", mousedown, false);
colorBlock.addEventListener("mouseup", mouseup, false);
colorBlock.addEventListener("mousemove", mousemove, false);