export default class Canvas {

    constructor({ container, camera }) {

        this.container = typeof container === "string" ? document.querySelector(container) : container
        this.camera = camera

        this.createCanvas()

    }

    createCanvas() {

        this.canvas = document.createElement("canvas")
        this.ctx = this.canvas.getContext("2d")

        this.container.appendChild(this.canvas)

    }
    
    startAnimation() {

        const animate = () => {
            
            requestAnimationFrame(animate)
            

        }

        
    }

}