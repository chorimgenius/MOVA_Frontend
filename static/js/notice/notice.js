const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


window.onload = () => {
  getNotice()
}

async function getNotice() {
  const urlParameter = window.location.search;
  console.log(urlParameter)

  if(urlParameter == ""){
    const response = await fetch(`${backend_base_url}/notice/all/`,{
      method: 'GET',
      headers:{
        "Authorization": localStorage.getItem("access"),
      }
    })
    response_json = await response.json()
    notice_list = response_json["results"]
    const list_html = document.getElementById("noticegetlist")
    var count = 1
    notice_list.forEach(element => {
      const today = new Date(element.created_at);
      const list = `
      <tr>
          <td id="notice_number">${count}</td>
          <th id="notice_title"><a href="http://127.0.0.1:5500/templates/notice/noticedetail.html?id=${element.id}">${element.title}</a></th>
          <td id="notice_created_at">${today.toLocaleDateString()}</td>
      </tr>`
      count += 1
      list_html.insertAdjacentHTML("afterbegin",list)
    })
  }
  else {
    const response = await fetch(`${backend_base_url}/notice/all${urlParameter}` ,{
      method: 'GET',
      headers:{
        "Authorization": localStorage.getItem("access"),
      }
    })
    response_json = await response.json()
    notice_list = response_json["results"]
    console.log(notice_list)
    const list_html = document.getElementById("noticegetlist")
    var count = 1
    notice_list.forEach(element => {
      const today = new Date(element.created_at);
      const list = `
      <tr>
          <td id="notice_number">${count}</td>
          <th id="notice_title"><a href="http://127.0.0.1:5500/templates/notice/noticedetail.html?id=${element.id}">${element.title}</a></th>
          <td id="notice_created_at">${today.toLocaleDateString()}</td>
      </tr>`
      count += 1
      list_html.insertAdjacentHTML("afterbegin",list)
      }) 
  }
}

function noticeSearch(){
  var notice_search = document.getElementById("notice_search").value;
  console.log(notice_search)
  location.href = `${frontend_base_url}/templates/notice/notice.html?search=${notice_search}`
}


function postNotice() {
  location.href = "noticewrite.html"
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