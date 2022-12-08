window.onload = async function loadBoard(){
    const urlStr = window.location.href;
    const url = new URL(urlStr);
    const urlParms = url.searchParams;
    const id = urlParms.get('id')

    const response = await fetch(`http://127.0.0.1:8000/fanart/${id}/`,{
        headers: {
          "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwODIzNTMzLCJpYXQiOjE2NzA0NjM1MzMsImp0aSI6ImQzNzliMGYwZmQ1ZTQ3M2NiM2U5MWVhZTY4YWMyYTUxIiwidXNlcl9pZCI6MSwiZW1haWwiOiJ0YWVreXUzMkBnbWFpbC5jb20ifQ.6QxyVubd-ggvtKodL1C5WAD69P894voRCJkogFk_1S0",
        },
        method:'GET',
    })
    const response_json = await response.json()
    console.log(response_json)
    
}
