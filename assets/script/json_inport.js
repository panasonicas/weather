
const url = "https://picsum.photos/v2/list";

const getData = function() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function() {
        const data = JSON.parse(xhr.response);
        for (let i = 0; i< data.length; i++){
            console.log(data[i]);
            document.getElementById("image-holder").innerHTML += `
            <div class = "fotoplace" id="${i}">
                <img src = "${data[i].download_url}">
            </div>
            `
        }
        for (let i = 0; i< data.length; i++){
        document.getElementById(i).addEventListener("click", function(){
            document.getElementById("image-show").innerHTML = `
            <p class="image-info">Image author: ${data[i].author};<br>
            Original image width: ${data[i].width} px;<br>
            Original image height: ${data[i].height} px;</p>
            <img src = "${data[i].download_url}">
            `
            });  
        }
    };
    xhr.send();
};
getData();
