var lanes = ["Top", "Jungle", "Mid", "Bottom", "Support"];
var lanenr = [0, 1, 2, 3, 4];
var random;
var lanenrlist = [];
var lanelist = [];
var listlength = 10;
var counter = 0;

function keybind() {
  window.addEventListener('keyup', showResult);
}

function clearHS() {
  localStorage.setItem("bignumber",0);
  var resetHighScore = "Highest Roll: "+localStorage.getItem("bignumber");
  writeHighScore(resetHighScore);
}

function showResult(e)
{
  let button = document.getElementById("btn2");
  if (e.keyCode==49)
  {
    makeTbl(),show(1),canvastext(),canvasmeter();
  }
  else if (e.keyCode==50 && button.style.display=="block") {
    show(2);
  }
  else
  {
    return 0;
  }
}

function dark(){
  localStorage.setItem("mode","dark");
  document.body.classList.add("nightmode");
  document.body.classList.remove("daymode");
  document.getElementById('colormode').innerHTML="Toggle Light Mode";
}

function light(){
  localStorage.setItem("mode","light");
  document.body.classList.add("daymode");
  document.body.classList.remove("nightmode");
  document.getElementById('colormode').innerHTML="Toggle Dark Mode";
}

function changemode() {
  if (localStorage.getItem("mode")=="dark") {
    light();
  }
  else {
    dark();
  }
  canvastext();
}

function mode(){
  if (localStorage.getItem("mode")=="dark") {
    dark();
  }
  else {
    light();
  }
}


function show(x){
  let button = document.getElementById("btn2");
  let table = document.getElementById("content");

  if (x==1 && button.style.display == "none") {
    document.getElementById("canvas").classList.add("border");
    button.innerHTML="Show Table";
    button.style.display="block";
  }
  else if (x==2 && table.style.display=="none") {
    table.style.display="block";
    button.innerHTML="Hide Table";
  }
  else if (x==2 && table.style.display=="block") {
    table.style.display="none";
    button.innerHTML="Show Table";
  }
}

function makeTbl(){
    var countlanes;
    var biglane;
    var reroll;
    var bigvalue;
    var winner;
    var highscore;
    var countertxt;
    var best;
    counter++;
    do {
        reroll = 0;
        countlanes = [];

        for (let a = 0; a < 100; a++) {
            random = Math.floor(Math.random() * Math.floor(lanenr.length));
            lanenrlist[a] = lanenr[random];
            lanelist[a] = lanes[lanenrlist[a]];
        }

        for (let i = 0; i <lanenrlist.length; i++) {
            let num = lanenrlist[i]
            countlanes[num] = countlanes[num] ? countlanes[num] + 1 : 1;
        }

        biglane = countlanes.reduce(function(a, b) {
            return Math.max(a, b);
        });

        for (let x = 0; x < countlanes.length; x++) {
            if (countlanes[x] == biglane) {
                bigvalue = x;
                reroll++;
            }
        }
        if (localStorage.getItem("bignumber")===null) {
          	localStorage.setItem("bignumber",0);
        }
        else if (localStorage.getItem("bignumber")<biglane) {
            localStorage.setItem("bignumber",biglane);
        }

        winner = lanes[bigvalue]+" ("+biglane+"/100)";
        highscore = "Highest Roll: "+localStorage.getItem("bignumber")
        countertxt = "Counter: "+counter+" Rolls"
    } while (reroll > 1);
    writeWinner(winner);
    writeHighScore(highscore);
    writeCounter(countertxt);
    drawtable();
    drawgraph(countlanes);
}

function drawtable(){
  let tbl;
    if (document.body.classList.contains("nightmode")) {
       tbl = "<table style='background-color: #54585e' class='rolls'><thead></thead><tbody>";
    }
    else {
      tbl = "<table style='background-color:' class='rolls'><thead></thead><tbody>";
    }


    for (let i = 0; i < listlength; i++)
    {
        tbl += "<tr>";
        for (let j = 0; j < listlength; j++) {

        let lane = lanelist[(i*10)+j];
        if (document.body.classList.contains("nightmode")) {
        tbl += "<td style='border:3px solid #1d1d1e'>" + lane +"</td>";
        }
        else {
        tbl += "<td style='border:3px solid black'>" + lane +"</td>";
        }

        }
        tbl += "</tr>";
    }
    tbl+="</tbody></table>";
    document.getElementById("content").innerHTML=tbl;
    for (var i = 0; i < lanes.length; i++) {
      sessionStorage.setItem("lanenames"+i,lanes[i]);
    }

}

function writeWinner(winner){
  document.getElementById("winner").innerHTML=winner;

}

function writeHighScore(highscoretxt){
  document.getElementById("highscore").innerHTML=highscoretxt;

}

function writeCounter(countertxt){
  document.getElementById("counter").innerHTML=countertxt;

}
