import gsap from "gsap"
import { RoughEase } from "gsap/EasePack"

const lerp = (a, b, t) => a + (b - a) * t

export default class Canvas {

    constructor({ container, camera, model, autoplay=true }) {

        this.container = typeof container === "string" ? document.querySelector(container) : container
        this.camera = camera
        this.model = model

        this.handPosition = { x: this.size.width / 2, y: this.size.height / 2 }
        this.animationState = { flicker: 0 }

        this.createCanvas()
        this.addEventListeners()

        if(autoplay) {

            this.startGsapAnimation()
            this.startAnimationFrame()

        }

    }

    get size() {

        return {
            width: this.container.offsetWidth,
            height: this.container.offsetHeight
        }

    }

    createCanvas() {

        this.canvas = document.createElement("canvas")
        this.canvas.width = this.size.width
        this.canvas.height = this.size.height

        this.ctx = this.canvas.getContext("2d")

        this.container.appendChild(this.canvas)

    }

    addEventListeners() {

        window.addEventListener("resize", () => {

            this.canvas.width = this.size.width
            this.canvas.height = this.size.height

        })

    }

    startGsapAnimation() {

        gsap.fromTo(this.animationState, 
            { flicker: 0 }, 
            { 
                duration: 0.5, 
                flicker: 0.25, 
                repeat: -1, 
                yoyo: true,
                ease: RoughEase.ease.config({ strength: 0.3, points: 8, randomize: false })
            }
        )

    }

    startAnimationFrame() {

        const animate = async () => {
        
            // draw video
            this.ctx.save()
            this.ctx.translate(this.size.width, 0)
            this.ctx.scale(-1, 1)
            this.ctx.drawImage(this.camera.video, 0, 0, this.size.width, this.size.height)
            this.ctx.restore()

            // const videoFrame = this.ctx.getImageData(0, 0, this.size.width, this.size.height)

            const pointerFinger = this.model.data.hands?.landmarks[1][8]

            if(pointerFinger) {

                this.handPosition.x = lerp(this.handPosition.x, this.size.width - (pointerFinger.x * this.size.width), 0.5)
                this.handPosition.y = lerp(this.handPosition.y, pointerFinger.y * this.size.height, 0.5)

            }

            // draw gradient
            const { x, y } = this.handPosition
            const gradient = this.ctx.createRadialGradient(x, y, 50, x, y, 125)
            gradient.addColorStop(0, `rgba(255, 255, 255, ${ this.animationState.flicker })`)
            gradient.addColorStop(1, "rgba(0, 0, 0, 0.9)")

            this.ctx.fillStyle = gradient
            this.ctx.fillRect(0, 0, this.size.width, this.size.height)

            requestAnimationFrame(animate)

        }

        animate()

        
    }

}