const playground = document.querySelector(".playground")
const playgroundChild = document.createElement("div")
const gameOver = document.querySelector(".gameOver")
const scoreDisplay = document.querySelector(".scoreDisplay")
const restartBtn = document.querySelector(".restartBtn")

const row = 21
const col = 36
// let snakeInitial = [[1, 2], [1, 3], [1, 4]]


// let snakeInitial = [[9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7]]

// let rightBtn = document.getElementById("rightBtn")
// let leftBtn = document.getElementById("leftBtn")
// let upBtn = document.getElementById("upBtn")
// let downBtn = document.getElementById("downBtn")
let direction = 'right'
let applePos = [Math.floor(Math.random() * row), Math.floor(Math.random() * col)]
let score = 0
let snakeCop
let start = true
let nextMove = 'right'
let dirBtn = document.querySelectorAll(".dirBtn")
let gameOverFlag = false


const menuContainer = document.createElement("div")
const startButton = document.createElement("button")

menuContainer.classList.add("menuContainer")
startButton.classList.add("startBtn")
let currentGame




const keyInputHandler = () => {
    window.addEventListener("keydown", (e) => {
        switch (e.code) {
            case "KeyD":
                // console.log(`key pressed ${e.code}`)
                nextMove = 'right'
                break
            case "KeyW":
                // console.log(`key pressed ${e.code}`)
                nextMove = "up"
                break
            case "KeyA":
                // console.log(`key pressed ${e.code}`)
                nextMove = "left"
                break
            case "KeyS":
                // console.log(`key pressed ${e.code}`)
                nextMove = "down"
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



const startGame = () => {
    score = 0
    snakeInitial = snakePosition()
    direction = "right"
    nextMove = "right"
    applePosition()
    gameOverFlag = false
    gameOver.style.visibility = 'hidden'
    currentGame = setInterval(mainGameLoop, 300)
}

const snakePosition = () => {
    let randRow = Math.floor(Math.random() * 18)
    let randCol = Math.floor(Math.random() * 18)
    // let snakeInitial = [[randRow, randCol], [randRow, randCol + 1], [randRow, randCol + 2]]
    let snakeInitial = [[randRow, randCol], [randRow, randCol + 1]]
    return snakeInitial
}


let snakeInitial = snakePosition()

const menuScreen = () => {



    startButton.textContent = 'Start Games'
    menuContainer.appendChild(startButton)
    playground.appendChild(menuContainer)


    startButton.addEventListener("click", () => {
        menuContainer.classList.add("hideMenu")
        menuContainer.classList.remove("menuContainer")
        startButton.style.display = 'none'
        start = false
        startGame()

        console.log("hide added")
    })
}

menuScreen()
keyInputHandler()

const mainGameLoop = () => {

    snakeCop = [...snakeInitial]
    checkValidMovement(nextMove)
    snakeMovement()
    checkBoundary()
    // direction = nextMove
    // applePosition()
    checkAppleEat()
    renderGraphics()

}

// const mainGameLoop = setInterval(() => {
//     if (start) {
//         menuScreen()
//     }

//     keyInputHandler()
//     // applePosition()
//     snakeCop = [...snakeInitial]
//     snakeMovement()
//     checkAppleEat()
//     renderGraphics()

// }, 300)



const checkAppleEat = () => {
    if (applePos[0] === snakeInitial[snakeInitial.length - 1][0] && applePos[1] === snakeInitial[snakeInitial.length - 1][1]) {
        snakeInitial.unshift([snakeInitial[0][0], snakeInitial[0][1]])
        applePosition()
        score++

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
    applePos = [Math.floor(Math.random() * row), Math.floor(Math.random() * col)]
    // console.log(applePos)
    for (let i = 0; i < snakeInitial.length; i++) {
        if (snakeInitial[i].includes(applePos)) {
            applePosition()
        }
    }

}


const checkBoundary = () => {

    // snakeCop.splice(snakeInitial.length - 1, 1)
    // console.log(snakeCop)
    // console.log(snakeInitial[snakeInitial.length - 1])
    // console.log(snakeCop.includes(snakeInitial[snakeInitial.length - 1]))
    if (snakeInitial[snakeInitial.length - 1][0] === -1 ||
        snakeInitial[snakeInitial.length - 1][0] === row ||
        snakeInitial[snakeInitial.length - 1][1] === col ||
        snakeInitial[snakeInitial.length - 1][1] === -1
    ) {
        gameOverScreen()
        gameOverFlag = true
    }
    else {
        for (let i = 0; i < snakeCop.length; i++) {
            // console.log(snakeCop[i])
            // console.log(snakeInitial[snakeInitial.length - 1])
            if (snakeCop[i][0] === snakeInitial[snakeInitial.length - 1][0] &&
                snakeCop[i][1] === snakeInitial[snakeInitial.length - 1][1]) {
                gameOverScreen()
                gameOverFlag = true
            }
        }

    }

}

const gameOverScreen = () => {
    clearInterval(currentGame)
    const scoreDisplayS = document.querySelector(".scoreDisplayS")
    scoreDisplayS.textContent = `Score: ${score}`
    gameOver.style.visibility = 'visible'
    restartBtn.addEventListener("click", startGame)
}

const renderGraphics = () => {

    scoreDisplay.textContent = `Score: ${score}`
    if (!gameOverFlag) {
        playgroundChild.innerHTML = '';
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
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
    }
    // console.log(playground.childNodes)
    playground.appendChild(playgroundChild)

}