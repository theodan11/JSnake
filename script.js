const playground = document.querySelector(".playground")
const playgroundChild = document.createElement("div")
const gameOver = document.querySelector(".gameOver")
const scoreDisplay = document.querySelector(".scoreDisplay")
// let snakeInitial = [[9, 2], [9, 3], [9, 4]]
let snakeInitial = [[9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7]]
let direction = 'up'
let applePos = [Math.floor(Math.random() * 24), Math.floor(Math.random() * 24)]
let score = 0
let snakeCop

// let rightBtn = document.getElementById("rightBtn")
// let leftBtn = document.getElementById("leftBtn")
// let upBtn = document.getElementById("upBtn")
// let downBtn = document.getElementById("downBtn")

let dirBtn = document.querySelectorAll(".dirBtn")

const mainGameLoop = setInterval(() => {
    keyInputHandler()
    // applePosition()
    snakeCop = [...snakeInitial]
    snakeMovement()
    checkAppleEat()
    renderGraphics()

}, 500)


const checkAppleEat = () => {
    if (applePos[0] === snakeInitial[snakeInitial.length - 1][0] && applePos[1] === snakeInitial[snakeInitial.length - 1][1]) {
        snakeInitial.unshift([snakeInitial[0][0], snakeInitial[0][1]])
        applePosition()
        score++

    }
}

const keyInputHandler = () => {
    window.addEventListener("keydown", (e)=>{
        switch(e.code){
            case "KeyD":
                // console.log(`key pressed ${e.code}`)
                checkValidMovement("right")
                break
            case "KeyW":
                // console.log(`key pressed ${e.code}`)
                checkValidMovement("up")
                break
            case "KeyA":
                // console.log(`key pressed ${e.code}`)
                checkValidMovement("left")
                break
            case "KeyS":
                // console.log(`key pressed ${e.code}`)
                checkValidMovement("down")
                break
        }
    })
    dirBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            // console.log(e.target.value)
            checkValidMovement(e.target.value)
        })
    })
}

const checkValidMovement = (move) => {
    if (direction === 'right' && move !== 'left') {
        direction = `${move}`
    } else if (direction === 'left' && move !== 'right') {
        direction = `${move}`
    } else if (direction === 'up' && move !== 'down') {
        direction = `${move}`
    } else if (direction === 'down' && move !== 'up') {
        direction = `${move}`
    }
}

const snakeMovement = () => {
    if (direction === 'right') {
        snakeInitial.push([snakeInitial[snakeInitial.length - 1][0], snakeInitial[snakeInitial.length - 1][1] + 1])
        snakeInitial.shift()
        // snakeInitial.push(snakeInitial)
        // console.log(snakeInitial)
    } else if (direction === 'left') {

        snakeInitial.push([snakeInitial[snakeInitial.length - 1][0], snakeInitial[snakeInitial.length - 1][1] - 1])
        snakeInitial.shift()
        // snakeInitial.push(snakeInitial)
        // console.log(snakeInitial)

    } else if (direction === 'up') {

        snakeInitial.push([snakeInitial[snakeInitial.length - 1][0] - 1, snakeInitial[snakeInitial.length - 1][1]])
        snakeInitial.shift()
    } else if (direction === 'down') {

        snakeInitial.shift()
        snakeInitial.push([snakeInitial[snakeInitial.length - 1][0] + 1, snakeInitial[snakeInitial.length - 1][1]])
    }

}

const applePosition = () => {
    applePos = [Math.floor(Math.random() * 24), Math.floor(Math.random() * 24)]
    // console.log(applePos)
    for(let i = 0; i< snakeInitial.length; i++){
        if(snakeInitial[i].includes(applePos)){
            applePosition()
        }
    }

}

const checkBoundary = () => {

    snakeCop.splice(snakeInitial.length - 1, 1)
    // console.log(snakeCop)
    // console.log(snakeInitial[snakeInitial.length - 1])
    // console.log(snakeCop.includes(snakeInitial[snakeInitial.length - 1]))
    if (snakeInitial[snakeInitial.length - 1][0] === -1 ||
        snakeInitial[snakeInitial.length - 1][0] === 24 ||
        snakeInitial[snakeInitial.length - 1][1] === 24 ||
        snakeInitial[snakeInitial.length - 1][1] === -1
    ) {
        clearInterval(mainGameLoop)
        gameOver.style.visibility = 'visible'
    }
    else {
        for (let i = 0; i < snakeCop.length; i++) {
            // console.log(snakeCop[i])
            // console.log(snakeInitial[snakeInitial.length - 1])
            if (snakeCop[i][0] === snakeInitial[snakeInitial.length - 1][0] && 
                snakeCop[i][1] === snakeInitial[snakeInitial.length - 1][1]) {
                clearInterval(mainGameLoop)
                gameOver.style.visibility = 'visible'
            }
        }

    }

}

const renderGraphics = () => {
    scoreDisplay.textContent = `${score}`
    playgroundChild.innerHTML = '';
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 24; j++) {
            let box = document.createElement("div")
            box.classList.add("box")
            box.setAttribute("data-x", i)
            box.setAttribute("data-y", j)
            for (let s = 0; s < snakeInitial.length; s++) {
                if (snakeInitial[s][0] === i && snakeInitial[s][1] === j) {
                    box.classList.add("snake")
                }

                if (snakeInitial[snakeInitial.length - 1][0] === i && snakeInitial[snakeInitial.length - 1][1] === j) {
                    box.classList.add("head")
                } else {
                    box.classList.remove("head")
                }

                if (applePos[0] === i && applePos[1] === j) {
                    box.classList.add("apple")
                }
            }
            playgroundChild.appendChild(box)
        }


    }
    // console.log(playground.childNodes)
    playground.appendChild(playgroundChild)
    checkBoundary()
}