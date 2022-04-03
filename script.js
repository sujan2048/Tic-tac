const gameBoard=document.querySelector('.gameboard')
const game=document.querySelector('.game')
const cells=document.querySelectorAll('.cells')
const cellsArr = Array.prototype.slice.call(cells)
const resetEl=document.querySelector('.resetbox')
const winBox=document.querySelector('.winbox')
const WINNING_COMBO=[[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[3,4,5],[6,7,8]]
const play=play1.bind(event)
const winner=document.querySelector('.winplayer')
const playAgain=document.querySelector('.again')
const tie=document.querySelector('.tied')
const player1=document.querySelector('.playerscore')
const player2=document.querySelector('.cpuscore')
const tieStatus=document.querySelector('.tiescore')
const turnX=document.querySelector('.turnouter1')
const turnO=document.querySelector('.turnouter2')

let select='selectedx';
let player1Score=0;
let player2Score=0;
let tieScore=0;

function initialize(){
    resetEl.addEventListener('click',function(){
        reset()
        resetCount()
    })
    // resetEl.addEventListener('touchstart',function(){
    //     reset()
    //     resetCount()
    // })
    gameBoard.addEventListener('click',play);
    // gameBoard.addEventListener('touchstart',play);
}

function play1(e){
    console.log(e)
    let cell=e.target
    const check=cell.classList
    if (!check.contains('cells'))return
    if(check.contains('selectedx'))return
    if(check.contains('selectedo'))return
    if(cell.classList.contains('cells'))cell.classList.add(`${select}`) 
    
    if(select==='selectedx'){
        select='selectedo'
        turnO.style.display='block'
        turnX.style.display='none'
    }
    else {
        select='selectedx'
        turnO.style.display='none'
        turnX.style.display='block'
    }
    checkWin()
    checkTie()
}

function checkWin(){
    WINNING_COMBO.forEach((combos)=>{
        let WINNER1=0;
        let WINNER2=0;
        combos.forEach((j)=>{
            if(cellsArr[j].classList.contains('selectedx')) WINNER1++;
            if(cellsArr[j].classList.contains('selectedo')) WINNER2++;
            if(WINNER1===3) {
                winBox.style.display='block'
                game.style.display='none'
                winner.textContent='Player 1 has won.'
                gameBoard.removeEventListener('click',play) 
                player1Score++;
                player1.textContent=`${player1Score}`              
            }
            if(WINNER2===3) {
                winBox.style.display='block'
                game.style.display='none'
                winner.textContent='Player 2 has won.'
                gameBoard.removeEventListener('click',play)  
                player2Score++;
                player2.textContent=`${player2Score}`  
            }
        })
    })
}

function checkTie(){
    let tieCount=0;

    cellsArr.forEach((cell)=>{
        if(cell.classList.contains('selectedx'))tieCount++
        if(cell.classList.contains('selectedo'))tieCount++
    })
    
    if(tieCount===9){
        winBox.style.display='block'
        game.style.display='none'
        tie.textContent='Game Ended in Draw'
        winner.textContent='Tough Competition'
        gameBoard.removeEventListener('click',play)
        tieScore++
        tieStatus.textContent=`${tieScore}`
    }

}

function reset(){
    cells.forEach((cell,i)=>{
            cell.classList.remove('selectedx')
            cell.classList.remove('selectedo')
            select='selectedx'
            winBox.style.display='none'
            game.style.display='block'
            turnO.style.display='none'
            turnX.style.display='block'
        }
    )
   
}

function resetCount(){
    tieStatus.textContent='0'
    player1.textContent='0'
    player2.textContent='0'
}

initialize()

playAgain.addEventListener('click',function(){
    reset()
    initialize()
})




