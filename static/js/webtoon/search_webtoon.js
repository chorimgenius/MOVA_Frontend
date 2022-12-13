const backend_base_url = "http://127.0.0.1:8000"

window.onload= () => {
    SearchPage()
}

const urlParams = new URL(location.href).searchParams;
const search = urlParams.get('search');

async function SearchPage(){
    const response = await fetch(`${backend_base_url}/all?search=${search}`, {
        method: 'GET',
        headers:{
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcxMTA3NTk1LCJpYXQiOjE2NzA3NDc1OTUsImp0aSI6IjRiMDQ2YzhiZDQ5ZjRmYjliYzMxMTYxYWZlNGNlZWUwIiwidXNlcl9pZCI6MywiZW1haWwiOiJqdUBqdS5jb20ifQ.KtocYBBUI2k_oS6bo1oB7ci7gDbiF0K9wCB2utxAFo4"
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

async function Search(){
    const search = document.getElementById("search").value
    console.log(search)
    location.href= "search_webtoon.html?search=" + search;
}
