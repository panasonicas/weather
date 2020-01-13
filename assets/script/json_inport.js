"use strict";


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

    function dabartinisLaikas(){
    var a = new Date();
    var year = a.getFullYear();
    
    function ifLess10(t){
        if(t<10){
            t="0"+t; 
        }
        return t;
    }
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var month = months[a.getMonth()];
    var date = ifLess10(a.getDate());
    var hour = ifLess10(a.getHours());
    var min = ifLess10(a.getMinutes());
    var sec = ifLess10(a.getSeconds());
    var days = ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"];
    var day = days[a.getDay()];
    //---------FORMATUOJAME---------
    var time = day+ "<br>" + year + '-' + month + '-'+date + '<br>' + hour + ':' + min + ':' + sec;
    var formatDiena = day;
    var formatData = year + '-' + month + '-'+date;
    var formatLaikas = hour + ':' + min + ':' + sec;
    //---------SPAUSDINAME---------
    document.getElementById("now").innerHTML = `
    <h4>${formatData},  ${formatDiena}</h4>
    <h2>${formatLaikas}</h2>
    `;
}

var t=setInterval(function(){dabartinisLaikas()},1000);


function weekDay(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
   // var days = ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"];
    var days = ["Sek", "Pr", "Ant", "Tre", "Kt", "Pn", "Št"];
    var day = days[a.getDay()];
    return day;
}
function monthDay(UNIX_timestamp){
    
function ifLess10(t){
    if(t<10){
        t="0"+t; 
    }
    return t;
}
    var a = new Date(UNIX_timestamp * 1000);
    var thisDay = ifLess10(a.getDate());
    var smonths = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var month = smonths[a.getMonth()];
    return (month+"-"+thisDay);
}

function hour(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var hour = a.getHours();
    return hour;
}

function Refresh(){
    for(let i=1; i<9; i++){
        document.getElementById("selectedCity"+i+"").addEventListener("click", function(){
            //location.reload();
            document.getElementById("daily-flex-container").innerHTML = "";
            getData(i);
            });
    }
}

function myfunction(i){
    var e = document.getElementById("selectedCity"+i+"");
    //var e = document.getElementsByClassName("cityBtn");
    var strUser = e.value;
    var url1 = `https://api.openweathermap.org/data/2.5/forecast?id=${strUser}&units=metric&lang=lt&APPID=15d5d0897e0df118cf21bf2eef3f894f`
    return url1;
    };

function selectedCity(i){
    var e = document.getElementById("selectedCity"+i+"");
    var chosen = e.title;
    return chosen;
    };

function getData (i) {
    console.log("get data viduje esantis globalus i: "+i);
    const xhr = new XMLHttpRequest();
    xhr.open("GET", myfunction(i), true);
    xhr.onload = function() {
        const data = JSON.parse(xhr.response);
        console.log(data.list[0].main);
        console.log(data.list[0].wind);
        for(let i=0; i<40; i++){
            
        }

        //kada prasideda kita diena

        let n=hour(data.list[0].dt);
        let indeks = -1;
        for(n;n<=24;n+=3){
            indeks=indeks+1;
        }
        //console.log("indeksas lygu "+indeks); //kita diena prasideda po tiek id kiek yra index reiksme
        
        let startID = 0; //pirmos dienos pradzios ID
        let endID = indeks; //pirmos dienos pabaigos ID
        
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
        for (let i =0; i<5; i++){
           // console.log(objects[i]); 
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


    //randame dazniausiai pasikartojanti elementa (ikona) masyve;
    
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

    //formuojame animuotu ikonu masyva
    let animIcoDay = [
    "assets/gif/animated/day.svg",
    "assets/gif/animated/cloudy-day-2.svg",
    "assets/gif/animated/cloudy.svg",
    "assets/gif/animated/cloudy.svg",
    "assets/gif/animated/rainy-4.svg",
    "assets/gif/animated/rainy-6.svg",
    "assets/gif/animated/thunder.svg",
    "assets/gif/animated/snowy-6.svg",
    "assets/gif/animated/cloudy.svg"
    ];

    let animIcoNight = [
    "assets/gif/animated/night.svg",
    "assets/gif/animated/cloudy-night-2.svg",
    "assets/gif/animated/cloudy.svg",
    "assets/gif/animated/cloudy.svg",
    "assets/gif/animated/rainy-4.svg",
    "assets/gif/animated/rainy-6.svg",
    "assets/gif/animated/thunder.svg",
    "assets/gif/animated/snowy-6.svg",
    "assets/gif/animated/cloudy.svg"
    ];

    //formuojame API ikonu masyva
    let staticIcoDay = ["01d","02d","03d","04d","09d","10d","11d","13d","50d"];
    let staticIcoNight = ["01n","02n","03n","04n","09n","10n","11n","13n","50n"];
    let change = "";
    function keitimas (a){
    for (let i = 0; i<staticIcoDay.length; i++){
        if(a === staticIcoDay[i]){
            change = animIcoDay[i];
        }
        if(a === staticIcoNight[i]){
            change = animIcoNight[i];
        }
    }
    return change;
}

   
    var dayOb={};
    for (var x = 0; x < 5; x++) {
        dayOb[x] = {
            minmax: minmax(objects[x].start, objects[x].end),
            day: weekDay(data.list[objects[x].start].dt),
            ikona: keitimas(most(ikona(objects[x].start, objects[x].end))),
            date: monthDay(data.list[objects[x].start].dt)
        }    
    }
    //console.log(dayOb[0]);
    
    
    document.getElementById("flex-container").innerHTML = `
    
    <div class = "weatherToday">
    <h4 class = "now" id="now"></h4>
        <div class = "city">
            <h2>${selectedCity(i)}, Lietuva</h2>
        </div>
        <div class="description">
        <h3>${data.list[0].weather[0].description}</h3>
        </div>
        <div class = "iconToday">
            <img src = "${dayOb[0].ikona}">
        </div>
        <div class = "tempToday">
            <h1><i class="fas fa-temperature-low"></i> ${parseInt(data.list[0].main.temp)}&deg;C</h1>
            <h4>Pojūtis ${data.list[0].main.feels_like}&deg;C</h4>
            <h1>${parseInt(dayOb[0].minmax[0])}&deg; / ${parseInt(dayOb[0].minmax[1])}&deg;</h1>
        </div>
        <div class = "moreDetail">
            <div class = "detailColumn">
                <h4><i class="fab fa-safari"></i><br> Slėgis <br> ${data.list[0].main.pressure} Pa</h4>
            </div>
            <div class = "detailColumn">
                <h4><i class="fas fa-tint"></i><br> Drėgmė <br> ${data.list[0].main.humidity}%</h4>
            </div>
            <div class = "detailColumn">
                <h4><i class="fas fa-wind"></i><br> Vėjo greitis <br> ${data.list[0].wind.speed}m/s</h4>
            </div>
            <div class = "detailColumn">
                <h4><i class="fas fa-location-arrow"></i><br> Kryptis <br> ${data.list[0].wind.deg}'</h4>
            </div>
        </div>
    </div>    
    <div class="my-slider" id="my-slider"></div>
    `

    for(let i=0; i<5; i++){
        document.getElementById("daily-flex-container").innerHTML += `
        <div class = "dayColumn" id="${i}">
            <div class = "todayHeading">
                <h3>${dayOb[i].day} (${dayOb[i].date})</h3>
            </div>    
            <div class = "iconWeek">
            <img src = "${dayOb[i].ikona}">
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
        <div class="testSpec${i}" id="testSpec${i}"></div>
        `  
    }

function sliderPrint(){
    for(let i=0; i<5; i++){
        let pradziosID = objects[i].start;  
        let pabaigosID = objects[i].end; 
        for(pradziosID; pradziosID<=pabaigosID; pradziosID++){   
        document.getElementById("my-slider").innerHTML += `
            <div class = "column">
                <p>${weekDay(data.list[pradziosID].dt)} ${monthDay(data.list[pradziosID].dt)}<br>
                ${hour(data.list[pradziosID].dt)}:00</p>
                <img src = "${keitimas(data.list[pradziosID].weather[0].icon)}">
                <h4>${parseInt(data.list[pradziosID].main.temp)}&deg;C</h4>
            </div>
        ` }

    }

}

    sliderPrint();
    showUp();
    //showNav();
    //-------------------------TINY SLIDER ON GET DATA FUNCTION PROPERTIES-----------------------  
    tns({
        container: '.my-slider',
        items: 5,
        // slideBy: 'page',
        autoplay: false,
        loop: false,
        mouseDrag:true,
        slideShow: {
            autoStart: true,
            autoplayTimeout: 1000,
          },
      });
    //-------------------------TINY SLIDER ON GET DATA FUNCTION PROPERTIES----------------------- 
    };
    xhr.send();
};

Refresh();
getData(1);


function showUp (){
    for (let i=0 ; i<5; i++){
        let today = document.getElementById(i);
        let show = document.getElementById("testSpec"+i+"");
        today.addEventListener ('click', () => {
            show.classList.toggle("testSpec"+i+"-active");
    });
}
}

function showNav (){
        let today = document.getElementById("btn");
        let show = document.getElementById("selectorius");
        today.addEventListener ('click', () => {
            show.classList.toggle("nav-active");
    });

}


// function innerprint(){
//     for(let i=0; i<5; i++){
//         let pradziosID = objects[i].start;  
//         let pabaigosID = objects[i].end; 
//         for(pradziosID; pradziosID<=pabaigosID; pradziosID++){   
//         document.getElementById("my-slider").innerHTML += `
//             <p>${hour(data.list[pradziosID].dt)}:00</p>
//             <img src = "${keitimas(data.list[pradziosID].weather[0].icon)}">
//             <p>${parseInt(data.list[pradziosID].main.temp)}&deg;C</p>
//         ` }

//     }

// }