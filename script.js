const playground = document.querySelector(".playground")
const playgroundChild = document.createElement("div")
let snakeInitial = [[1, 2], [1, 3], [1, 4]]
let direction = 'left'


const gameLoop = setInterval(()=>{

    
    if(direction === 'right'){
        snakeInitial.push([snakeInitial[snakeInitial.length -1 ][0],snakeInitial[snakeInitial.length -1 ][1] + 1])
        snakeInitial.shift()
        // snakeInitial.push(snakeInitial)
        // console.log(snakeInitial)
    }else if(direction === 'left'){
      
            snakeInitial.unshift([snakeInitial[0][0],snakeInitial[0][1] - 1 ])
            snakeInitial.pop()
            // snakeInitial.push(snakeInitial)
            // console.log(snakeInitial)
        
    }
    playgroundChild.innerHTML = '';
    for(let i = 0; i<10; i++){
        for(let j = 0; j<10; j++){
            let box = document.createElement("div")
            box.classList.add("box")
            box.setAttribute("data-x", i)
            box.setAttribute("data-y", j)
            for(let s = 0; s<snakeInitial.length; s++){
                if(snakeInitial[s][0] === i && snakeInitial[s][1] === j){
                    box.classList.add("snake")
                }
            }
            playgroundChild.appendChild(box)
        }
        
        
    }
    // console.log(playground.childNodes)
    playground.appendChild(playgroundChild)
}, 1000)