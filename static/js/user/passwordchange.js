async function PasswordChangeput(){
    const form_data = new FormData();
    const password = document.getElementById("usernamechange").value 
    form_data.append('password', password)
    const new_password = document.getElementById("biochange").innerText
    form_data.append('new_password', new_password)
    const confirm_new_password = document.getElementById('file').files[0]
    form_data.append('confirm_new_pass',confirm_new_password)
    const response = await fetch(`${backend_base_url}/user/passwordchange`, {
        headers:{
            "Authorization": localStorage.getItem("access"),
        },
        method: 'PUT',
        body: form_data
    })
    location.href="main.html"
}