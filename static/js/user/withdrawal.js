const backend_base_url = "https://www.chorim.shop"

//회원탈퇴
async function ProfileDelete(){
  const payload = localStorage.getItem("payload")
  const payload_parse = JSON.parse(payload)
  const email= payload_parse.email
  const input_email = document.getElementById('log-email').value
  console.log(input_email)
  if(email == input_email){
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
  alert("회원탈퇴가 완료되었습니다. 다음에 또 뵐께요!")
  location.href="signup.html";
  }
  else{
    alert ("사용중인 이메일이 아닙니다. 다시 입력해주세요")
  }
}