const backend_base_url = "http://127.0.0.1:8000/"

window.onload = async function loadBoards() {
  boards = await getBoards()
  console.log(boards)
}

async function getBoards() {
  const response = await fetch('http://127.0.0.1:8000/all?search=', {
    headers : {
      "Authorization" : "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcxMDE2MzAzLCJpYXQiOjE2NzA2NTYzMDMsImp0aSI6ImJjYzkzNzg0YWJmYzQ0MDI5MTM3MDY5NGNjMGNkYWJhIiwidXNlcl9pZCI6MiwiZW1haWwiOiJxd2VAcXdlLmNvbSJ9.Rm8bJR-HKeGGi9MVJC4WsHS7oy8bS8wZsamPFwmLNCM"
    },
    method: 'GET',
  })
  console.log(response)
}