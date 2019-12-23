function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var days = ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"];
    var day = days[a.getDay()];
    var time = day+ " "+date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

function weekDay(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var days = ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"];
    var day = days[a.getDay()];
    return day;
}

function hour(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var hour = a.getHours();
    return hour;
}


const url = "http://api.openweathermap.org/data/2.5/forecast?id=593116&units=metric&lang=lt&APPID=15d5d0897e0df118cf21bf2eef3f894f";
const getData = function() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function() {
        const data = JSON.parse(xhr.response);
        for(let i=0; i<40; i++){
            console.log(timeConverter(data.list[i].dt));
        }

        //kada prasideda kita diena

        let n=hour(data.list[0].dt);
        let indeks = -1;
        for(n;n<=24;n+=3){
            indeks=indeks+1;
        }
        //console.log("indeksas lygu "+indeks); //kita diena prasideda po tiek id kiek yra index reiksme
        
        startID = 0; //pirmos dienos pradzios ID
        endID = indeks; //pirmos dienos pabaigos ID
        
        //objektas kuris saugo dienos pradzios ir pabaigos ID
        var objects={};
        var dayCount = (data.list.length)/8;
        //console.log(dayCount);
        for (var x = 0; x < dayCount; x++) {
            objects[x] = {
                start: startID,
                end:endID
            }    
        startID=endID+1;
        endID=startID+7;
        }
        //console.log(objects);

    //formuojame masyva dazniausiai pasikartojancioms ikonoms dienoje
    function ikona(a, b){
        var arr = [];
        for(a; a<=b; a++){
            arr.push(data.list[a].weather[0].icon);
        }
        return arr;
    }


    //randame dazniausiai pasikartojanti elementa masyve;
    
    function most(a){
    var counts = {};
    var compare = 0;
    var mostFrequent;
    for(var i = 0, len = a.length; i < len; i++){
        var word = a[i];
        if(counts[word] === undefined){
            counts[word] = 1;
        }else{
            counts[word] = counts[word] + 1;
        }
        if(counts[word] > compare){
                compare = counts[word];
                mostFrequent = a[i];
        }
    }
    return mostFrequent;
    }
            
    function minmax (a, b){ 
        let max = -100;
        let min = 100;
    for(a; a<=b; a++){ 
        if (max<data.list[a].main.temp){
            max=data.list[a].main.temp;
        }
        if (min>data.list[a].main.temp){
            min=data.list[a].main.temp;
        }
        //console.log(data.list[i].main.temp);
    }  
    //console.log("max lygu: "+max);  
    //console.log("min lygu: "+min); 
    return [min, max];
    }
    //console.log("Minimaxas: "+minmax(objects[1].start, objects[1].end));
   
    var dayOb={};
    for (var x = 0; x < 5; x++) {
        console.log("ikonu masyvas: "+ikona(objects[x].start, objects[x].end));
        dayOb[x] = {
            minmax: minmax(objects[x].start, objects[x].end),
            day: weekDay(data.list[objects[x].start].dt),
            ikona: most(ikona(objects[x].start, objects[x].end))
        }    
    }
    console.log(dayOb);
    
    document.getElementById("flex-container").innerHTML = `
    <div class = "city">
        <h2>${data.city.name}<br>
        Orai</h2>
    </div>
    <div class = "iconToday">
    <img src = "http://openweathermap.org/img/wn/${dayOb[0].ikona}@2x.png">
    </div>
    <div class = "tempToday">
        <h1>${parseInt(data.list[0].main.temp)}&deg;C</h1>
        <h4>${data.list[0].weather[0].description}</h4>
    </div>
    `
    for(let i=0; i<5; i++){
        console.log(dayOb[i].ikona);
        document.getElementById("daily-flex-container").innerHTML += `
        <div class = "dayColumn">
            <div class = "todayHeading">
                <h3>${dayOb[i].day}</h3>
            </div>    
            <div class = "iconWeek">
            <img src = "http://openweathermap.org/img/wn/${dayOb[i].ikona}@2x.png">
            </div>
            <div class= "dayNyght">
                <div class= "day">
                    <p>DIENA</p>
                    <h3 class="d">${parseInt(dayOb[i].minmax[1])}&deg;C</h3>
                    
                </div>
                <div class= "night">
                <p>NAKTIS<p>
                    <h3 class="n">${parseInt(dayOb[i].minmax[0])}&deg;C</h3>
                    
                </div>
            </div>
        </div>
        `

    }
    };
    xhr.send();
};
getData();

//<h4>${data.list[0].weather[0].description}</h4>

//<img src = "http://openweathermap.org/img/wn/${dayOb[i].ikona}@2x.png">
//<img src = "assets/gif/animated/cloudy.svg">

//DIENOS ANIMUOTOS IKONOS
// document.getElementById("test").innerHTML = `
// <img src = "assets/gif/animated/day.svg">
// <img src = "assets/gif/animated/cloudy-day-2.svg">
// <img src = "assets/gif/animated/cloudy.svg">
// <img src = "assets/gif/animated/cloudy.svg">
// <img src = "assets/gif/animated/rainy-4.svg">
// <img src = "assets/gif/animated/rainy-6.svg">
// <img src = "assets/gif/animated/thunder.svg">
// <img src = "assets/gif/animated/snowy-6.svg">
// <img src = "assets/gif/animated/cloudy.svg">
// `   
////NAKTIES ANIMUOTOS IKONOS
// document.getElementById("test").innerHTML += `
// <img src = "assets/gif/animated/night.svg">
// <img src = "assets/gif/animated/cloudy-night-2.svg">
// <img src = "assets/gif/animated/cloudy.svg">
// <img src = "assets/gif/animated/cloudy.svg">
// <img src = "assets/gif/animated/rainy-4.svg">
// <img src = "assets/gif/animated/rainy-6.svg">
// <img src = "assets/gif/animated/thunder.svg">
// <img src = "assets/gif/animated/snowy-6.svg">
// <img src = "assets/gif/animated/cloudy.svg">
// `   