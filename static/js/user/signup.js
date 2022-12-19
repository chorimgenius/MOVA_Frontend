// // html js
// // javascripts interlock
const backend_base_url = "https://www.chorim.shop"

//Signup
async function handleSignup(){
	const username = document.getElementById("sign-username").value
	const email = document.getElementById("sign-email").value
	const password = document.getElementById("sign-pass").value
	const password2 = document.getElementById("sign-confirm").value

  if (username == '') {
    alert("아이디를 입력해주세요!");
    return 0;
  }
  else if (password == '' || password2 == '') {
    alert("비밀번호를 입력해주세요!");
    return 0;
  }
  else if (password != password2) {
    alert("비밀번호를 확인해주세요!");
    return 0;
  }
  else if (email == '') {
  alert("이메일을 입력해주세요!");
  return 0;
  }
  
	const response = await fetch(`${backend_base_url}/user/signup/`, {
		headers: {
			'Content-Type' : 'application/json',
		},
		method: 'POST',
		body: JSON.stringify({
			"username":username,
			"password":password,
			"email":email
		})
	})
  response_json = await response.json()
  alert(response_json.message)
  location.href = "signup.html";
}
//Signin
async function handleSignin(){
	const email = document.getElementById("log-email").value
	const password = document.getElementById("log-pass").value
	const response = await fetch(`${backend_base_url}/user/api/token/`, {
        headers: {
            'content-type' : 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email":email,
            "password":password
        })
    })
	const response_json = await response.json()
  if(response_json.detail == undefined){
    localStorage.setItem("access", "Bearer "+response_json.access);
    localStorage.setItem("refresh", response_json.refresh);
  
      const base64Url = response_json.access.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      localStorage.setItem("payload", jsonPayload);
      alert("MOVA에 오신걸 환영 합니다.")
      location.href = "../webtoon/main.html";
  }
  else{
    alert("가입된 정보를 확인해주세요")
  }
}

// 회원가입, 로그인페이지 넘어가는 코드
$('.message a').click(function(){
  $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});
