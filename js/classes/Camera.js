export default class Camera {

    constructor({ container, hidden }) {

        this.container = typeof container === "string" ? document.querySelector(container) : container
        this.hidden = hidden

        this.createVideo()

    }

    createVideo() {

        this.video = document.createElement("video")
        this.video.autoplay = true

        if(this.hidden) {

            this.video.style.display = "none"

        }

        this.container.appendChild(this.video)

    }

    async startWebcam() {

        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: this.container.offsetWidth,
                height: this.container.offsetHeight
            }
        })
        
        this.video.srcObject = stream
        this.video.onloadedmetadata = () => this.video.play()

    }

}