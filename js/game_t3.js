// selectors
var blocks=document.querySelectorAll(".one-third")
var scoreCards=document.querySelectorAll(".score h1")
var winnerOverlay=document.getElementById('winnerwinnerchinesedinner')
// currentPlayer = 0 for P1 goes first(P1 plays x) and 1 for P2 goes first(P2 plays x)
var currentPlayer=0
var winFlag=0
var score=[0,0]
var symbol=["x","o"]
var winCombo=[[0,3,6],[1,4,7],[2,5,8],[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6]]

function checkWin(player){
    let combo=0;
    for (var i = 0; i < winCombo.length; i++) {
        for (var j = 0; j < winCombo[i].length; j++) {
            // console.log(winCombo[i][j])
            if (!blocks[winCombo[i][j]].classList.contains(symbol[player])) {
                combo=0;
                break;
            }else {
                combo++
            }
        }
        if (combo==3) {
            return 1;
        }
    }
    return 0;
}

function clearBlock(){
    blocks.forEach(function(block) {
        block.classList.remove("o");
        block.classList.remove("x");
    })
}

function updateScore() {
    for (var i = 0; i < 2; i++) {
        scoreCards[i].innerText=score[i]
    }
}

function resetGame(winner) {
    winnerOverlay.innerHTML="<h1><span>Player "+(winner+1).toString()+"</span><br>has won!</h1><a>Play again</a>"
    winnerOverlay.style.display="block"
    document.querySelector('#winnerwinnerchinesedinner a').addEventListener("click",function() {
        winnerOverlay.style.display="none"
    })
    // alert("Player "+(winner+1).toString()+" has won!")
    score=[0,0]
    clearBlock()
    updateScore()
}

document.querySelectorAll('.one-third:not(.x),.one-third:not(.o)').forEach(function(emptyBlock) {
    emptyBlock.addEventListener("click",function() {
        if(!(this.classList.contains(symbol[0])||this.classList.contains(symbol[1])))
        {
            this.classList.add(symbol[currentPlayer])
            if (checkWin(currentPlayer)) {
                score[currentPlayer]++
                winFlag=1
                console.log("Score\nPlayer 1 : "+score[0].toString()+"\nPlayer 2 : "+score[1].toString());
                console.log("Player "+(currentPlayer+1).toString()+" has won this round");
                updateScore()
            }
            for (var i = 0; i < 2; i++) {
                if (score[currentPlayer]<3) {
                    if (document.querySelectorAll('.one-third:not(.x):not(.o)').length==0||winFlag==1) {
                        winFlag=0
                        clearBlock()
                    }
                }else {
                    resetGame(currentPlayer)
                }
            }
            scoreCards[currentPlayer].classList.toggle("currentPlayer")
            currentPlayer=(currentPlayer+1)%2
            scoreCards[currentPlayer].classList.toggle("currentPlayer")
        }
    })
})

scoreCards[currentPlayer].classList.add("currentPlayer")
