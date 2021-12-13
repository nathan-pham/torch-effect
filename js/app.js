import Handsfree from "handsfree"

import Camera from "./classes/Camera"
import Canvas from "./classes/Canvas"

import "/css/globals.css"
import "/css/index.css"

const main = (async () => {

    const camera = new Camera({ container: "#app", hidden: true })
    await camera.startWebcam()

    const handsfree = new Handsfree({ 
        hands: true,
        setup: {
            video: {
                $el: camera.video
            }
        }
    })
    
    handsfree.enablePlugins("browser")
    handsfree.start()

    const canvas = new Canvas({ 
        container: "#app", 
        model: handsfree,
        camera
    })

})()