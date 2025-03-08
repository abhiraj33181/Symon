let gameSeq = [];
let userSeq = [];
let btns = ["orange", "purple", "green", "blue"]
let level = 0;

let started = false;

let body = document.querySelector("body")
let h2 = document.querySelector("h2")

body.addEventListener("keypress", function(){
    if (started == false){
        console.log("Game Started");
        started = true;

        levelUp();
    }
})
function btnflash(btn){
    btn.classList.add("flash")
    setTimeout(function(){
        btn.classList.remove("flash")
    }, 500)
}

function userflash(btn){
    btn.classList.add("userflash")
    setTimeout(function(){
        btn.classList.remove("userflash")
    }, 500)
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level - ${level}`
    let ranIdx = Math.floor(Math.random()*3);
    let ranColor = btns[ranIdx];
    let ranBtn = document.querySelector(`.${ranColor}`)
    gameSeq.push(ranColor)
    console.log(gameSeq)

    btnflash(ranBtn);
}

function btnPress(){
    let btn = this;
    userflash(btn)

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1)
}

let allBtns = document.querySelectorAll(".btn")
for (btn of allBtns){
    btn.addEventListener("click", btnPress)
}
let high_score = 0;
let hsq = document.querySelector(".highscore")
let hint = document.querySelector(".hint")
function checkAns(idx){

    if (userSeq[idx] === gameSeq[idx]){
        if (userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000)
        }
    }else{
        h2.innerHTML = `Game Over!! Your Score was ${level} <br>Press Any key to start.`
        
        if (level>high_score){
            high_score = level;
            hsq.innerHTML = `Highest Score is = ${high_score}`
        }
        

        body.style.backgroundColor = "red";
        // document.getElementsByClassName("over").style
        setTimeout(function(){
        body.style.backgroundColor = "white";

        }, 2000);
        reset();
    } 
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

body.addEventListener("keypress", function(event) {
    if (event.key === "h") {
        hint.innerHTML = `HINT: ${gameSeq}`;
        setTimeout(function(){
            hint.innerHTML = `HINT: Press 'h' to get hint`;
        },5000)
    }
});