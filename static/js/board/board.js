const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


window.onload = () => {
  getBoard()
}

async function getBoard() {
  const urlParameter = window.location.search;
  console.log(urlParameter)

  if(urlParameter == ""){
    const response = await fetch(`${backend_base_url}/board/all/`,{
      method: 'GET',
      headers:{
        "Authorization": localStorage.getItem("access"),
      }
    })
    response_json = await response.json()
    board_list = response_json["results"]
    const list_html = document.getElementById("boardgetlist")
    var count = 1
    board_list.forEach(element => {
      const today = new Date(element.created_at);
      const list = `
      <tr>
          <td id="board_number">${count}</td>
          <th id="board_title"><a href="http://127.0.0.1:5500/templates/board/boarddetail.html?id=${element.id}">${element.title}</a></th>
          <td id="board_created_at">${today.toLocaleDateString()}</td>
      </tr>`
      count += 1
      list_html.insertAdjacentHTML("afterbegin",list)
    })
  }
  else {
    const response = await fetch(`${backend_base_url}/board/all${urlParameter}` ,{
      method: 'GET',
      headers:{
        "Authorization": localStorage.getItem("access"),
      }
    })
    response_json = await response.json()
    board_list = response_json["results"]
    const list_html = document.getElementById("boardgetlist")
    var count = 1
    board_list.forEach(element => {
      const today = new Date(element.created_at);
      const list = `
      <tr>
          <td id="board_number">${count}</td>
          <th id="board_title"><a href="http://127.0.0.1:5500/templates/board/boarddetail.html?id=${element.id}">${element.title}</a></th>
          <td id="board_created_at">${today.toLocaleDateString()}</td>
      </tr>`
      count += 1
      list_html.insertAdjacentHTML("afterbegin",list)
      }) 
  }
}

function boardSearch(){
  var board_search = document.getElementById("board_search").value;
  console.log(board_search)
  location.href = `${frontend_base_url}/templates/board/board.html?search=${board_search}`
}


function postBoard() {
  location.href = "boardwrite.html"
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