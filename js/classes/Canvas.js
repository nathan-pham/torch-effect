export default class Canvas {

    constructor({ container, camera, autoplay=true }) {

        this.container = typeof container === "string" ? document.querySelector(container) : container
        this.camera = camera

        this.createCanvas()
        this.addEventListeners()

        if(autoplay) {

            this.startAnimation()

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
    
    startAnimation() {

        const animate = () => {
            
            requestAnimationFrame(animate)
            this.ctx.drawImage(this.camera.video, 0, 0, this.size.width, this.size.height)

        }

        animate()

        
    }

}