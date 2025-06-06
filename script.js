const playground = document.querySelector(".playground")
const playgroundChild = document.createElement("div")
const gameOver = document.querySelector(".gameOver")
const scoreDisplay = document.querySelector(".scoreDisplay")
const restartBtn = document.querySelector(".restartBtn")
const controllerDisplay = document.querySelector(".controller")
const musicControl = document.querySelector(".musicControl")
const highScoreDisplay = document.querySelector(".highScoreDisplay")

const row = 21
const col = 36



let snakeHeadAngle = 'zero'
let moveCount = 1



let highScore = localStorage.getItem("highScore") || 0
// let snakeInitial = [[1, 2], [1, 3], [1, 4]]


// let snakeInitial = [[9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7]]

// let rightBtn = document.getElementById("rightBtn")
// let leftBtn = document.getElementById("leftBtn")
// let upBtn = document.getElementById("upBtn")
// let downBtn = document.getElementById("downBtn")








let direction = 'right'
let applePos = [1 + Math.floor(Math.random() * (row - 2)), 1 + Math.floor(Math.random() * col - 2)]
let score = 0
let snakeCop
let start = true
let nextMove = 'right'
let dirBtn = document.querySelectorAll(".dirBtn")
let gameOverFlag = false

const isMusicOn = document.querySelector("#musicOn")
// isMusicOn.checked
// if(isMusicOn.checked){
//     console.log("checked")
// }else if(!isMusicOn.checked){
//     console.log("unChecked")
// }

let soundFx = {
    eat: new Howl({
        src: "./quack_5.mp3"
    }),
    gameOverFX: new Howl({
        src: "./tmp8ljn9e7h.mp3"
    }),
    startGameFX: new Howl({
        src: "./a-few-moments-later-sponge-bob-sfx-fun.mp3"
    })
}

let gameSound = {
    music: new Howl({
        src: "./u_i_a.mp3",
        loop: true,
        volume: 0.20
    })
}
const menuContainer = document.createElement("div")
const startButton = document.createElement("button")

menuContainer.classList.add("menuContainer")
startButton.classList.add("startBtn")
let currentGame
controllerDisplay.style.visibility = 'hidden'



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
            // checkValidMovement(e.target.value)
            nextMove = e.target.value
        })
    })
}

const checkValidMovement = (move) => {
    if (direction === 'right' && move !== 'left') {
        direction = `${move}`
        snakeHeadAngle = 'zero'
    } else if (direction === 'left' && move !== 'right') {
        direction = `${move}`
        snakeHeadAngle = 'minusOneEighty'
    } else if (direction === 'up' && move !== 'down') {
        direction = `${move}`
        snakeHeadAngle = 'minusNinety'
    } else if (direction === 'down' && move !== 'up') {
        direction = `${move}`
        snakeHeadAngle = 'minusTwoSeventy'
    }
}
const applePosition = () => {
    applePos = [Math.floor(Math.random() * (row - 2)), Math.floor(Math.random() * col - 2)]
    // console.log(applePos)
    if (applePos[0] <= 0 || applePos[1] <= 0) {
        applePosition()
    }


    for (let i = 0; i < snakeInitial.length; i++) {
        if (snakeInitial.some((ele) => {
            return ele === applePos
        })) {
            applePosition()
        }
    }
    // console.log(applePos)
}




const startGame = () => {
    if (soundFx.gameOverFX.playing()) {
        soundFx.gameOverFX.stop()
    }

    if (!gameSound.music.playing()) {
        if (isMusicOn.checked) {
            gameSound.music.play()

        }
    }
    moveCount = 1
    soundFx.startGameFX.play()
    score = 0
    snakeInitial = snakePosition()
    direction = "right"
    nextMove = "right"
    applePosition()
    gameOverFlag = false
    gameOver.style.visibility = 'hidden'
    controllerDisplay.style.visibility = 'visible'
    musicControl.style.visibility = 'visible'
    currentGame = setInterval(mainGameLoop, 300)
}

const snakePosition = () => {
    let randRow = Math.floor(Math.random() * 18)
    let randCol = Math.floor(Math.random() * 18)
    if (randRow <= 0 && randCol <= 0) {
        randRow = 2
        randCol = 2
    }
    // let snakeInitial = [[randRow, randCol], [randRow, randCol + 1], [randRow, randCol + 2]]
    let snakeInitial = [[randRow, randCol], [randRow, randCol + 1]]
    return snakeInitial
}


let snakeInitial = snakePosition()

const menuScreen = () => {



    startButton.innerHTML = `JSnake<br>tart`
    menuContainer.appendChild(startButton)
    playground.appendChild(menuContainer)


    startButton.addEventListener("click", () => {
        menuContainer.classList.add("hideMenu")
        menuContainer.classList.remove("menuContainer")
        startButton.style.display = 'none'
        start = false
        startGame()

        // console.log("hide added")
    })
}

menuScreen()
keyInputHandler()

const mainGameLoop = () => {
    // isMusicOn.checked
    if (isMusicOn.checked) {
        if (!gameSound.music.playing()) {
            console.log("checked but music where")
            gameSound.music.play()
        }

    } else if (!isMusicOn.checked && gameSound.music.playing()) {
        gameSound.music.stop()
    }
    // console.log(isMusicOn.checked)
    // gameSound.music.play()
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
        soundFx.eat.play()
        moveCount++
        if (moveCount % 5 === 0) {
            score += 5
            moveCount = 0
        }
        else { score++ }

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



const checkBoundary = () => {

    // snakeCop.splice(snakeInitial.length - 1, 1)
    // console.log(snakeCop)
    // console.log(snakeInitial[snakeInitial.length - 1])
    // console.log(snakeCop.includes(snakeInitial[snakeInitial.length - 1]))
    if (snakeInitial[snakeInitial.length - 1][0] === 0 ||
        snakeInitial[snakeInitial.length - 1][0] === row - 1 ||
        snakeInitial[snakeInitial.length - 1][1] === col - 1 ||
        snakeInitial[snakeInitial.length - 1][1] === 0
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
    if (soundFx.startGameFX.playing()) {
        soundFx.startGameFX.stop()
    }

    const scoreDisplayS = document.querySelector(".scoreDisplayS")
    if (score > highScore) {
        highScore = score
        localStorage.setItem("highScore", JSON.stringify(highScore))
        scoreDisplayS.textContent = `New Highscore: ${score}`
    } else {
        scoreDisplayS.textContent = `Score: ${score}`
    }
    gameSound.music.stop()
    soundFx.gameOverFX.play()
    clearInterval(currentGame)
    


    gameOver.style.visibility = 'visible'
    controllerDisplay.style.visibility = 'hidden'
    musicControl.style.visibility = 'hidden'

    restartBtn.addEventListener("click", startGame)
}

const renderGraphics = () => {

    scoreDisplay.textContent = `Score: ${score}`
    highScoreDisplay.textContent = `HighScore: ${highScore}`
    if (!gameOverFlag) {
        playgroundChild.innerHTML = '';
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                let box = document.createElement("div")

                box.classList.add("box")
                box.setAttribute("data-x", i)
                box.setAttribute("data-y", j)
                for (let s = 0; s < snakeInitial.length; s++) {
                    if (i === row - 1 && j !== 0 && j <= col - 2) {
                        box.classList.add("tile")
                        box.innerHTML = `
                        <img src='./bottomTile.png'>
                        `
                    } else if (i === 0 && j !== 0 && j <= col - 2) {

                        box.classList.add("tile")
                        box.innerHTML = `
                            <img src='./topTile.png'>
                            `

                    } else if (i === 0 && j === 0) {
                        box.classList.add("tile")
                        box.innerHTML = `
                        <img src='./topLeftTile.png'>
                        `
                    } else if (i === 0 && j === col - 1) {
                        box.classList.add("tile")
                        box.innerHTML = `
                        <img src='./topRightTile.png'>
                        `
                    } else if (i === row - 1 && j === col - 1) {
                        box.classList.add("tile")
                        box.innerHTML = `
                        <img src='./bottomRightTile.png'>
                        `
                    } else if (i === row - 1 && j === 0) {
                        box.classList.add("tile")
                        box.innerHTML = `
                        <img src='./bottomLeftTile.png'>
                        `
                    } else if (i !== row - 1 && i !== 0 && j !== 0 && j === col - 1) {
                        box.classList.add("tile")
                        box.innerHTML = `
                        <img src='./rightTile.png'>
                        `
                    } else if (i !== row - 1 && i !== 0 && j === 0 && j !== col - 1) {
                        box.classList.add("tile")
                        box.innerHTML = `
                        <img src='./leftTile.png'>
                        `
                    }
                    if (snakeInitial[s][0] === i && snakeInitial[s][1] === j) {
                        box.classList.add("snake")
                    }

                    if (snakeInitial[snakeInitial.length - 1][0] === i && snakeInitial[snakeInitial.length - 1][1] === j) {
                        box.classList.add("head")
                        box.classList.add(`${snakeHeadAngle}`)
                    } else {
                        box.classList.remove("head")
                    }

                    if (applePos[0] === i && applePos[1] === j) {
                        box.classList.add("apple")
                        if (moveCount % 5 === 0) {
                            box.innerHTML = `<img src='./steak.png'/>`
                        } else {
                            box.innerHTML = `<img src='./appleNormal.png'/>`
                        }

                    }
                }
                playgroundChild.appendChild(box)
            }


        }
    }
    // console.log(playground.childNodes)
    playground.appendChild(playgroundChild)

}