let uploadField = document.getElementById('image-upload')
uploadField.addEventListener('change', resize_image);
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const control = document.querySelector('.control')
let drawingMode; // true일 때만 그리기
let brush = 'color'; // 'color', 'image'
let colorVal = 'black'; // 색상
let resize_image_id = 0
let image_id = 0
async function resize_image(e){
let file = e.currentTarget.files[0];
const form_data = new FormData();
form_data.append('image',file)
const response = await fetch(`http://127.0.0.1:8000/fanart/baseimage/`,{
    headers: {
    "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNzUyNzE1LCJpYXQiOjE2NzAzOTI3MTUsImp0aSI6IjJiZTMzMTQxNzUxNDQxMzI4ZGE3ZDY1MDNlMGI4ZGNmIiwidXNlcl9pZCI6MSwiZW1haWwiOiJ0YWVreXUzMkBnbWFpbC5jb20ifQ.1B6_uDlW_8i7becxZVPSXl_cN6jaF1edhX_rLHVeSw8",
    },
    method:'POST',
    body: form_data
})
response_json = await response.json()
console.log(response_json)
console.log(response_json.image)
resize_image_id = response_json.id

const imgElem = new Image();
imgElem.src = `http://127.0.0.1:8000${response_json.image}`;
imgElem.crossOrigin = 'Anonymous';
imgElem.addEventListener('load', () => {
    context.drawImage(imgElem, 0, 0, 480, 480);
});
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
    context.arc(e.offsetX, e.offsetY, 1, 0, Math.PI*2, false);
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
console.log(brush);
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
control.addEventListener('click', setColor);

async function colorization(){
var imgDataUrl = canvas.toDataURL('image/png');
var blobBin = atob(imgDataUrl.split(',')[1]);	// base64 데이터 디코딩
var array = [];
for (var i = 0; i < blobBin.length; i++) {
    array.push(blobBin.charCodeAt(i));
}
var file = new Blob([new Uint8Array(array)], {type: 'image/png'});	// Blob 생성
var file_name = 'canvas_img_' + new Date().getMilliseconds() + '.png';
var form_data = new FormData();	// formData 생성
form_data.append("resize_image",resize_image_id)
form_data.append("hint_image", file,file_name);	// file data 추가

const response = await fetch(`http://127.0.0.1:8000/fanart/colorization/`,{
    headers: {
    "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNzUyNzE1LCJpYXQiOjE2NzAzOTI3MTUsImp0aSI6IjJiZTMzMTQxNzUxNDQxMzI4ZGE3ZDY1MDNlMGI4ZGNmIiwidXNlcl9pZCI6MSwiZW1haWwiOiJ0YWVreXUzMkBnbWFpbC5jb20ifQ.1B6_uDlW_8i7becxZVPSXl_cN6jaF1edhX_rLHVeSw8",
    },
    method:'POST',
    body: form_data
})
response_json = await response.json()
console.log(response_json)

let result_box = document.getElementById('result_image_box')
result_box.src = "http://127.0.0.1:8000"+response_json.result_image
image_id = response_json.id
console.log("image_id = "+image_id)


}
async function fanart_write(){
    let title = document.getElementById("fanart-title").value
    let content = document.getElementById("fanart-content").value
    let webtoon = 1 // 임시

    console.log("title : "+title)
    console.log("content : " +content)
    console.log("image : " + image_id)

    const response = await fetch(`http://127.0.0.1:8000/fanart/`,{
        headers: {
        "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwOTI1Njc5LCJpYXQiOjE2NzA1NjU2NzksImp0aSI6IjlhM2ViYTE3YWNiZDRiZDZhZTE0NGI4ZDQyY2I1NmM4IiwidXNlcl9pZCI6MSwiZW1haWwiOiJ0YWVreXUzMkBnbWFpbC5jb20ifQ.JyYhMKHQ7CzXDsZnlO_Tfpn6Ygx6Fc2d239u9__Wt8U",
        "content-type" : 'application/json',
        },
        method:'POST',
        body: JSON.stringify({
            "title": title,
            "content": content,
            "webtoon": webtoon,
            "image": image_id
        })
    })

    const response_json = await response.json()
    console.log(response_json)
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
});

// async function search_webtoon(){
//   const name = document.getElementById('webtoon-name').value
//   console.log(1,name)
//   const response = await fetch(`http://127.0.0.1:8000/fanart/`,{
//     headers: {
//       "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwOTI1Njc5LCJpYXQiOjE2NzA1NjU2NzksImp0aSI6IjlhM2ViYTE3YWNiZDRiZDZhZTE0NGI4ZDQyY2I1NmM4IiwidXNlcl9pZCI6MSwiZW1haWwiOiJ0YWVreXUzMkBnbWFpbC5jb20ifQ.JyYhMKHQ7CzXDsZnlO_Tfpn6Ygx6Fc2d239u9__Wt8U",
//       "content-type" : 'application/json',
//     },
//     method:'POST',
//     body: JSON.stringify({
//         "title": title,
//         "content": content,
//         "webtoon": webtoon,
//         "image": image_id
//       })
//   })

//   const response_json = await response.json()
// }