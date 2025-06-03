const playground = document.querySelector(".playground")
const playgroundChild = document.createElement("div")
const gameOver = document.querySelector(".gameOver")
let snakeInitial = [[9, 2], [9, 3], [9, 4]]
let direction = 'up'

// let rightBtn = document.getElementById("rightBtn")
// let leftBtn = document.getElementById("leftBtn")
// let upBtn = document.getElementById("upBtn")
// let downBtn = document.getElementById("downBtn")

let dirBtn = document.querySelectorAll(".dirBtn")

const mainGameLoop = setInterval(() => {

    keyInputHandler()
    snakeMovement()
    renderGraphics()

}, 500)


const keyInputHandler = () => {
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

const checkBoundary = () => {
    if (snakeInitial[snakeInitial.length - 1][0] === 0 ||
        snakeInitial[snakeInitial.length - 1][0] === 23 ||
        snakeInitial[snakeInitial.length - 1][1] === 23 ||
        snakeInitial[snakeInitial.length - 1][1] === 0
    ) {
        clearInterval(mainGameLoop)
        gameOver.style.visibility = 'visible'
    }

}

const renderGraphics = () => {
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
            }
            playgroundChild.appendChild(box)
        }


    }
    // console.log(playground.childNodes)
    playground.appendChild(playgroundChild)
    checkBoundary()
}