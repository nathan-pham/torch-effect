import Camera from "./classes/Camera"
import Canvas from "./classes/Canvas"

import "/css/globals.css"
import "/css/index.css"

const main = (async () => {

    const camera = new Camera({ container: "#app", hidden: true })
    await camera.startWebcam()

    const canvas = new Canvas({ container: "#app", camera })

})()