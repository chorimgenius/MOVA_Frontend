const backend_base_url = "http://127.0.0.1:8000"

window.onload= () => {
    SearchPage()
    Profile()
}

const urlParams = new URL(location.href).searchParams;
const search = urlParams.get('search');

async function SearchPage(){
    const response = await fetch(`${backend_base_url}/all?search=${search}`, {
        method: 'GET',
        headers:{
            "Authorization": localStorage.getItem("access"),
        }
    })
    response_json = await response.json()
    list = response_json["results"]

    document.getElementById("toolbar").innerHTML = `<span style="font-weight: bold; color: #232428;">${search}</span>
                                                    <span style="color: #232428;">에 대한 검색결과 입니다.</span>`

    const img = document.getElementById("webtoon_list")
    list.forEach(element => {
        const image = ` <a class="a_box" href='webtoondetail.html?id=${element.id}'">
                            <li>
                                <figure>
                                <img src="${element.image_url}" class="list_image" alt="">
                                <figcaption>
                                    <p>${element.title}</p>
                                    <p>author By <a href="#" target="_blank">${element.author}</a></p>
                                </figcaption>
                                </figure>
                            </li>
                        </a>`
        img.insertAdjacentHTML("beforeend",image)

    });
}

async function Profile(){
    const response = await fetch(`${backend_base_url}/user/`, {
        method: 'GET',
        headers:{
          "Authorization": localStorage.getItem("access"),
        }
    })
    response_json = await response.json()
    document.getElementById("movaprofile_img").src = `${backend_base_url}${response_json.image}`
    document.getElementById("movaprofile_username").innerText = `${response_json.username}님`
}

async function Search(){
    const search = document.getElementById("search").value
    console.log(search)
    location.href= "search_webtoon.html?search=" + search;
}

// 로그아웃
async function handleLogout(){
	localStorage.removeItem("access")
	localStorage.removeItem("refresh")
	localStorage.removeItem("payload")
	alert("로그아웃되었습니다.")
    location.href="../user/signup.html"
}
