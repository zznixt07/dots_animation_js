
function random(min, max) {
    // [min-max)
    return (Math.random() * (max - min)) + min
}

function randomInt(min, max) {
    // [min-max)
    return Math.floor(Math.random() * (max - min)) + min
}

function degToRad(degrees) {
    return degrees * Math.PI / 180
}

function sine(deg) {
    return Math.sin(degToRad(deg))
}

function cosine(deg) {
    return Math.cos(degToRad(deg))
}


class Matter {

    constructor(x, y, velX, velY, exists) {
        this.x = x
        this.y = y
        this.velX = velX
        this.velY = velY
        this.exists = exists
    }
}

class WavyDot extends Matter {

    constructor(x, y, velX, velY, frequency, radius, color, transparency, exists) {
        super(x, y, velX, velY, exists)
        this.frequency = frequency
        this.radius = radius
        this.color = color
        this.transperency = transparency
    }

    draw() {
        if (this.exists) {
            ctx.beginPath()
            ctx.fillStyle = this.color
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
            ctx.fill()
        }
    }

    update() {
        // dots will start at leftmost and travel rightwards.
        if (this.x + this.radius > width) {
            this.x = 0
            this.y = random(0, height)
            // dont compute posX and posY
            return null
        }
        // dots could go out of screen from upper or lower height of screen.
        else if (this.y + this.radius - 100 > height) {
            // this.exists = false
            this.y = 0
            // return null
        }
        else if (this.y + this.radius + 100 < 0) {
            // this.exists = false
            this.y = height
            // return null
        }
        // this.y += sine(this.x * 0.25 * this.velY)
        const sineX = sine(this.x * this.frequency * this.velY)
        this.y += 0.1 * sineX + 0.12 * sineX + 0.15 * sineX
        this.x += this.velX
    }

}

function loop() {
    ctx.fillStyle = `rgba(255, 0, 0, ${TAILOPACITY})`
    ctx.drawImage(IMAGEOBJ, 0, 0, width, height)
    // ctx.drawImage(IMAGEOBJ, 0, 0, 1920, 1080)

    for (let dot of dots) {
        dot.draw()
        dot.update()
    }

    REQUESTID = requestAnimationFrame(loop)
}

// setup canvas
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const width = canvas.width = window.innerWidth - 5
const height = canvas.height = window.innerHeight - 5

const TAILOPACITY = 1
const NUMOFDOTS = 500

let dots = []
let REQUESTID
let posX, posY, velX, velY, frequency, radius, color
for (let i = 0; i < NUMOFDOTS; i++) {
    posX = random(0, width)
    posY = random(0, height)
    radius = randomInt(0, 1.01) ? random(2.0, 4.0) : random(0.01, 2.0)
    velX = random(0.1, 1) * radius
    velY = random(0.1, 2)
    frequency = random(0.1, 0.4)
    color = '#ffffff'
    dots.push(new WavyDot(posX, posY, velX, velY, frequency, radius, color, 1, true))
}

const IMAGEOBJ = new Image()
IMAGEOBJ.src = "./assets/back.jpg"
IMAGEOBJ.addEventListener('load', () => {
    loop()
})
