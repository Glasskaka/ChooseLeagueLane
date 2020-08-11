var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

function drawgraph(countarray){
var staple = countarray;
var height = 0;
var percent = 0;
var xPos = 0;
    animate();
    function animate() {
        c.clearRect(50,0, canvas.width, canvas.height-20);
        if(++percent<30){
          requestAnimationFrame(animate);
        }
        height=percent/30;
        for (var i = 0; i < staple.length; i++) {
            xPos = (i*40)+50;
            c.fillStyle='red';
            c.fillRect(xPos,canvas.height-20,25,staple[i]*(5*-height));
        }
        if (percent == 30) {
            percent = 0;
            height = 0;
        }
    }
}

function canvastext(){
    let button = document.getElementById("btn2");
    var xPos = 0;
    if (button.style.display=="block") {
        var lName=[];
        length = 5;
        for (var i = 0; i < length; i++) {
            lName[i] = sessionStorage.getItem("lanenames"+i);
        }
        var txtPos = 0;
        c.clearRect(0,canvas.height-20, canvas.width, canvas.height);
        c.font = "12px Arial";
        if (document.body.classList.contains("nightmode")) {
            c.fillStyle='white';
        }
        else {
            c.fillStyle='black';
        }
        for (var i = 0; i < length; i++) {
          xPos = (i*40)+50;
          if (xPos == 90 || xPos == 170) {
              txtPos = xPos-8;
          }
          else {
              txtPos  = xPos
          }
          c.fillText(lName[i], txtPos, canvas.height-5);
        }
    }
}

function canvasmeter(){
  let button = document.getElementById("btn2");
  c.clearRect(0,0, 50, canvas.height-20);
  if (button.style.display=="block") {
      if (document.body.classList.contains("nightmode")) {
          c.strokeStyle='white';
      }
      else {
          c.strokeStyle='black';
      }
        var xPos = 40;
        var yPos = 0;
        for (var i = 0; i < canvas.height-30; i++) {
            if ((i)%5==0 && yPos<=215) {
                yPos = 20+i;
                if ((i)%25==0) {
                c.fillText(i/5,xPos-15, canvas.height-yPos+4);
                }
                c.beginPath();
                c.moveTo(xPos, yPos+11);
                if (yPos==220) {
                    c.lineTo(xPos+205, yPos+11);
                }
                else {
                    c.lineTo(xPos+5, yPos+11);
                }
                c.stroke();
            }
        }
    }
}
