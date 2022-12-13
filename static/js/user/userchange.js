const backend_base_url = "http://127.0.0.1:8000"

window.onload= () => {
    ProfileChange()
}

//박스안에 이전 닉네임, 소개글 보여주기
async function ProfileChange(){
    const response = await fetch(`${backend_base_url}/user/`, {
        method: 'GET',
        headers:{
            "Authorization": localStorage.getItem("access"),
        }
    })
    response_json = await response.json()
    console.log(response_json)

    document.getElementById("usernamechange").value = `${response_json.username}`
    document.getElementById("email").innerText = `${response_json.email}`
    a=document.getElementById("email")
    console.log(a)
    document.getElementById("biochange").value = `${response_json.bio}`
    b=document.getElementById("biochange")
    console.log(b)
    document.getElementById("profile_img").src = `http://127.0.0.1:8000${response_json.image}`
}

//내용 바꿔주는 put
async function ProfileChangeput(){
    const form_data = new FormData();
    const username = document.getElementById("usernamechange").value 
    form_data.append('username', username)
    const bio = document.getElementById("biochange").value
    form_data.append('bio', bio)
    
    const image = document.getElementById('file').files[0]
    if (image!=undefined){
        form_data.append('image',image)
        const response = await fetch(`${backend_base_url}/user/`, {
            headers:{
                "Authorization": localStorage.getItem("access"),
            },
            method: 'PUT',
            body: form_data
        })
    }
    else{
        const response = await fetch(`${backend_base_url}/user/`, {
            headers:{
                "Authorization": localStorage.getItem("access"),
            },
            method: 'PUT',
            body: form_data
        })
    }
    location.href="profile.html"
}

// 로그아웃
async function handleLogout(){
	localStorage.removeItem("access")
	localStorage.removeItem("refresh")
	localStorage.removeItem("payload")
	alert("로그아웃되었습니다.")
    location.href="signup.html"
}

//회원탈퇴
async function ProfileDelete(){
    const payload = localStorage.getItem("payload")
    const payload_parse = JSON.parse(payload)
    const email= payload_parse.email
    const response = await fetch(`${backend_base_url}/user/`, {
        method: 'DELETE',
        headers:{
            'content-type' : 'application/json',
            "Authorization": localStorage.getItem("access"),
        },
        body: JSON.stringify({
            "email": email,
        })
        
    })
    localStorage.removeItem("access")
	localStorage.removeItem("refresh")
	localStorage.removeItem("payload")
    alert("회원탈퇴되었습니다.")
    location.href="signup.html"
}

//비밀번호 변경 링크 보내기
async function move_passwordchange(){
    const response = await fetch(`${backend_base_url}/user/password_reset/`, {
        method: 'GET',
        headers:{
            "Authorization": localStorage.getItem("access"),
        }
    })
    location.href="http://127.0.0.1:8000/user/password_reset/"
}

