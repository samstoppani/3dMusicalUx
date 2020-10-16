                            // JAVASCRIPT

function start() {
    document.getElementById("menu").classList.add("animated")
    document.getElementById("menu").classList.add("fadeOut")

    var lvl = document.createElement("H2");
    
    lvl.classList.add("animated")
    lvl.classList.add("fadeIn")
    lvl.id = "lvl"
    lvl.innerHTML = "Level 1";
    document.body.appendChild(lvl);

    $('#lives').css("display", "flex")
    $('#lives').addClass("animated fadeIn")

    return gameStarted = true;
}

function lvlCompleted(n) {
    document.getElementById("lvl").innerHTML = "Level " + n;

    var lvlCompleted = document.getElementById("lvlCompleted")

    lvlCompleted.innerHTML = "Level " + (n - 1) + " Complete - " + levels[n - 2] + " Added";
    lvlCompleted.classList.remove("fadeOut")
    lvlCompleted.classList.add("fadeIn")

    setTimeout(() => {
        lvlCompleted.classList.remove("fadeIn")
        lvlCompleted.classList.add("fadeOut")
    }, 3000)
}

var lvl = 1;

let colourIndex = 0;
let chordsIndex = 0;
const colours = [
    '#ffadad', '#ffd6a5', '#fdffb6',
    '#caffbf', '#9bf6ff',
    '#a0c4ff', '#bdb2ff', '#ffc6ff'
]

function lvl1Completed() {

    if (chordsIndex === 0 && clock.getElapsedTime() > 10) {

    } else if (clock.getElapsedTime() > chords[chordsIndex]) {

        if (colourIndex === (colours.length - 1)) {
            colourIndex = 0;
        } else {
            colourIndex++;
        }
    
        renderer.setClearColor(colours[colourIndex])
        chordsIndex++;

        if (chordsIndex === chords.length) {
            chordsIndex = 0;
        }
    }
}

let stringsIndex = 0;

const catcherPositions = [12, 15, 12, 9, 18, 15, 12, 9, 15]

function lvl2Completed() {

    if (stringsIndex === 0 && clock.getElapsedTime() > 10) {

    } else if (clock.getElapsedTime() > strings[stringsIndex]) {

        tl = new TimelineMax();
        tl.to(camera.position, 4, {y:catcherPositions[stringsIndex],  ease: Expo.easeOut})
        
        stringsIndex++;

        if (stringsIndex === strings.length) {
            stringsIndex = 0;
        }
    }
}

let waveIndex = 0;

function lvl3Completed() {
    if (waveIndex === 0 && clock.getElapsedTime() > 10) {

    } else if (clock.getElapsedTime() > melody[waveIndex]) {

        document.getElementById("overlay1").style.display = "block";

        var container = document.createElement('div')
        container.setAttribute("class", "rippleContainer")

        var wave1 = document.createElement('span')
        var wave2 = document.createElement('span')
        wave1.setAttribute("class", "ripple");
        wave2.setAttribute("class", "ripple r2");
        var horizontalPosition = "calc(50% - " + (Math.floor(Math.random() * 20) * 25 - 250).toString()+ "px)";
        wave1.style.left = horizontalPosition;
        wave2.style.left = horizontalPosition;

        container.appendChild(wave1)
        container.appendChild(wave2)

        container.style.top = "calc(30% - " + (Math.floor(Math.random() * 5) * 50 + 50).toString()+ "px)";

        document.getElementById("overlay1").appendChild(container)

        waveIndex++;

        if (waveIndex === melody.length) {
            waveIndex = 0;

            // remove children from overlay
            setTimeout(() => {
                const overlay = document.getElementById("overlay1");
                while (overlay.firstChild) {
                    overlay.removeChild(overlay.lastChild);
                }
            }, 1000)

        }
    }
}

let synthIndex = 0;
let musicNoteDirection = 0;

function lvl4Completed() {
    if (synthIndex === 0 && clock.getElapsedTime() > 10) {

    } else if (clock.getElapsedTime() > synth[synthIndex]) {

        document.getElementById("overlay3").style.display = "block";

        var musicNote = document.createElement('i')
        musicNote.setAttribute("class", "fas fa-music fa-2x musicNote");
        if (musicNoteDirection) {
            musicNote.style.animation = "musicNoteLeftAnim 2s 1";
            musicNote.style.animationFillMode = "forwards";
            musicNoteDirection = 0;
        }   else {
            musicNote.style.animation = "musicNoteRightAnim 2s 1";
            musicNote.style.animationFillMode = "forwards";
            musicNoteDirection = 1;
        }
        musicNote.style.left = "calc(50% - " + (Math.floor(Math.random() * 10) * 50 - 250).toString()+ "px)";
        musicNote.style.top = "calc(30% - " + (Math.floor(Math.random() * 5) * 10 + 50).toString()+ "px)";
        document.getElementById("overlay3").appendChild(musicNote)

        synthIndex++;

        if (synthIndex === synth.length) {
            synthIndex = 0;

            // remove children from overlay
            const overlay = document.getElementById("overlay3");
            while (overlay.firstChild) {
                overlay.removeChild(overlay.lastChild);
            }
        }
    }
}

let drumsIndex = 0;

function lvl5Completed() {
    if (drumsIndex === 0 && clock.getElapsedTime() > 10) {

    } else if (clock.getElapsedTime() > drums[drumsIndex]) {

        var cssDrums = document.getElementById("drums")
        if (!cssDrums.classList.contains("fadeIn")) {
            document.getElementById("overlay2").style.display = "block";
            cssDrums.classList.add("fadeIn")
        }

        var drumSelect = Math.floor(Math.random() * 2) + 1

        var selectedDrum = document.getElementById('drum' + drumSelect.toString())
        selectedDrum.animate([
            {
                transform: "scale(1)"
            },
            {
                transform: "scale(1.1)"
            }
        ], {
            duration: 150,
            easing: 'ease-in'
        })

        drumsIndex++;

        if (drumsIndex === drums.length) {
            drumsIndex = 0;
        }
    }
}

function gameCompleted() {
    $('#lvl').hide()
    $("#gameCompleted").append("<h2>Thanks for playing!<h2>")
}

let lives = 3;

function loseLife() {

    switch (lives) {
        case 2:
            document.getElementById("life1").remove()
            break;
        case 1: 
            document.getElementById("life2").remove()
            break;
        case 0: 
            document.getElementById("life3").remove()
            break;
    }
}


function gainLives() {
    $('#lives').html(`
        <i class="fas fa-heart" id="life1"></i>
        <i class="fas fa-heart" id="life2"></i>
        <i class="fas fa-heart" id="life3"></i>
    `)
}


                            // THREE.JS

// // set audio
const pianoChords = new Howl({
    src: ['audio/pianoChords.mp3'],
    loop: true,
    onend: function() {

        try {
            clock.start()
            lives = 3;
            gainLives()

            if (correct >= (numberOfNotes[order[orderNo]] - 2)) {
                lvl++;
                orderNo++;
                correct = 0;

                if (lvl == 6) {
                    gameCompleted() 
                    lvl = 6;
                    orderNo = 5
                    targetCreator = false;
                }

                if (order[orderNo] == "drums") {
                    a = 1
                } else if (orderNo == 5){
                    
                } else {
                    a = 0
                }
                b = 0;
        
                timings = eval(order[orderNo]);
                lvlCompleted(lvl)
        
                //  play next instrument
                audio[orderNo].fade(0, 1, 500);
            
            }

            else if (correct < (numberOfNotes[order[orderNo]] - 2) && targetCreator == false) {
                correct = 0;
                a = 1; // if 1, can replay loop when wrong, if 0, can play when correct
                b = 0;
            }

            else  {
                correct = 0;
                a = 0; // if 1, can replay loop when wrong, if 0, can play when correct
                b = 0;
            }

            if (lvl == 6) {
                console.log("finished")
                targetCreator = false;
            } else {
                targetCreator = true;
            }
        
        }
        catch {}
    }
});

const pianoMelody = new Howl({
    src: ['audio/pianoMelody.mp3'],
    volume: 0,
    loop: true
});

const stringsMelody = new Howl({
    src: ['audio/strings.mp3'],
    volume: 0,
    loop: true
});

const synthMelody = new Howl({
    src: ['audio/synth.mp3'],
    volume: 0,
    loop: true
});

const drumsRhythm = new Howl({
    src: ['audio/drums.mp3'],
    volume: 0,
    loop: true
});

// set scene
var scene = new THREE.Scene();

// set camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
camera.rotation.x = -30 * Math.PI / 180
camera.position.y = 15
camera.position.z = 30;

// set renderer
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#d8ddef");  // canvas colour
renderer.setSize(window.innerWidth, window.innerHeight); // canvas size

// #E9EDDE

document.body.appendChild(renderer.domElement)

// adjusts canvas on resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth/window.innerHeight

    camera.updateProjectionMatrix()
})


// set lights
var light1 = new THREE.PointLight(0xFFFFFF, 1, 500)
light1.position.set(0, 200, 200)
scene.add(light1)

var light2 = new THREE.PointLight(0xFFFFFF, 2, 1000)
light2.position.set(0, 10, 50)
scene.add(light2)


// set time 
var clock = new THREE.Clock(false)

// set objects 
var geometry = new THREE.BoxGeometry( 5, 5, 5 );
var material = new THREE.MeshLambertMaterial( {color: 0x00ff00} );

var aCatcher = new THREE.Mesh( geometry , material);
aCatcher.position.set(-10, 0, 10)
aCatcher.name = "a"

scene.add( aCatcher )

var sCatcher = new THREE.Mesh( geometry , material);
sCatcher.position.set(0, 0, 10)
sCatcher.name = "s"

scene.add( sCatcher )

var dCatcher = new THREE.Mesh( geometry , material);
dCatcher.material.depthTest = false;
dCatcher.material.opacity = 0.3;
dCatcher.material.transparent = true;
dCatcher.material.color.setHex( 0xffffff );
dCatcher.position.set(10, 0, 10)
dCatcher.name = "d"

scene.add( dCatcher )

// set timing

var chords = [
    0,
    4.364, 4.909, 
    8.727, 
    13.091,
    17.455, 
    21.818, 
    26.182, 
]

var strings = [
    3.273, 
    4.364, 7.636, 
    8.727, 
    13.091, 
    17.455, 20.727, 
    21.818, 
    26.182
]

var melody = [
    1.091, 1.909, 2.727, 3.545,
    5.455, 6.273, 7.091, 7.909,
    10.909, 11.182, 12.000, 12.273,
    15.273, 16.364,
    19.636, 20.727, 21.000,
    24.000, 24.273, 25.091, 25.364,
    28.364, 28.636, 29.182, 29.727, 30.000,
]

var synth = [
    6.545, 7.636, 7.909,
    8.727, 12.545,
    14.182, 15.818, 16.636,
    17.455, 
    21.818, 22.364, 23.455, 24.000, 24.545,
    26.182
]

var drums = [
    0.000, 1.091, 2.182, 2.727, 3.273,
    4.364, 4.909, 5.455, 6.545, 7.091, 7.636,
    8.727, 9.818, 10.909, 11.455, 12.000,
    13.091, 13.636, 14.182, 15.273, 15.818, 16.364, 16.909,
    17.455, 18.545, 19.636, 20.182, 20.727, 
    21.818, 22.364, 22.909, 24.000, 24.545, 25.091,
    26.182, 26.727, 27.273, 28.125, 28.364, 28.692, 29.240, 29.455, 29.782
]

var numberOfNotes = {
    "chords": chords.length,
    "melody": melody.length,
    "strings": strings.length,
    "synth": synth.length,
    "drums": drums.length
}

var orderNo = 0
var order = ["chords", "strings", "melody", "synth", "drums", "drums"]
var audio = [pianoChords, stringsMelody, pianoMelody, synthMelody, drumsRhythm]
var levels = ["Piano Chords", "Strings", "Piano Melody", "Synthesizer", "Drums"]

var a = 1;
var idNumber = 15;
var b = 0;
var correct = 0;

var timings = eval(order[orderNo]);

var targetCreator = true;

var gameStarted = false;

// render 
var render = function() {
    requestAnimationFrame(render);

    // Move camera, lights and 'catchers' 
    gameStarted ? camera.position.z -= 0.08 : null 

    gameStarted ? light1.position.z -= 0.08 : null 
    gameStarted ? light2.position.z -= 0.08 : null 

    gameStarted ? aCatcher.position.z -= 0.08 : null 
    gameStarted ? sCatcher.position.z -= 0.08 : null 
    gameStarted ? dCatcher.position.z -= 0.08 : null 


    if (lvl > 1) {
        lvl1Completed()
    }
    if (lvl > 2) {
        lvl2Completed()
    }
    if (lvl > 3) {
        lvl3Completed()
    }
    if (lvl > 4) {
        lvl4Completed()
    }
    if (lvl > 5) {
        lvl5Completed()
    }   


    // create a target 1 second before note played
    if ((timings[a] - 1) < clock.getElapsedTime() && targetCreator) {
        createTarget()
        a++;
    }

    if (correct < (numberOfNotes[order[orderNo]] - 2) && clock.getElapsedTime() > 29.47 && targetCreator && (order[orderNo] == "chords" || order[orderNo] == "drums") ) {
        createTarget()
        a++;
        targetCreator = false;
    }

    if (correct >= (numberOfNotes[order[orderNo]] - 2) && clock.getElapsedTime() > 29.47 && targetCreator && order[orderNo] == "synth" ) {

        createTarget()
        a++;
        targetCreator = false;
    }

    if (scene.getObjectById(idNumber) != undefined ) {

        let obj = scene.getObjectById(idNumber)

        // If target clicked on time
        if (obj.name == "clicked" && clock.getElapsedTime() > timings[b]) {

            // if previous note played, increase volume
            if (lvl == 6) {
            }
            else if (audio[orderNo]._volume == 0) {
                audio[orderNo].fade(0, 1, 100);
            }

            tl = new TimelineMax();
            if (obj.id == 15) {
                tl.to(obj.material.color, 0.1, {r:0.3, g:0.9, b:0,  ease: Expo.easeOut})
            }

            tl.to(obj.scale, 1, {x: 0.000001, y: 0.0000001, z: 0.0000001, ease: Expo.easeOut})

            b++;
            idNumber++;
            correct++;
        }

        // If target not clicked on time
        else if (obj.name != "clicked" && clock.getElapsedTime() > timings[b]) {

            if (lives > 0) {
                lives--;
                console.log("Lives--")
                loseLife();
            }

            // if previous note not played, decrease volume
            if (lvl == 6){
            }
            else if ( audio[orderNo]._volume == 1) {
                audio[orderNo].fade(1, 0, 100);
            }

            tl = new TimelineMax();
            tl.to(obj.material.color, 0.1, {r:255, g:20, b:255,  ease: Expo.easeOut})
            tl.to(obj.scale, 1, {x: 0.000001, y: 0.0000001, ease: Expo.easeOut})

            // console.log("target clicked too late")
            b++;
            idNumber++;
        }
    }

    renderer.render(scene, camera);

}

var counter = 1;

function createTarget() {
    var geometry = new THREE.BoxGeometry( 1, 1, 5 );
    var material = new THREE.MeshLambertMaterial( {color: "rgb(240, 240, 240)", side: THREE.DoubleSide} );
    var target = new THREE.Mesh( geometry, material );

    target.position.x = Math.floor(Math.random() * 3) * 10 - 10
    // target.position.z = camera.position.z - 29.6
    target.position.z = camera.position.z - 29

    switch (target.position.x) {
        case -10:
            target.name = 'a'
            break;
        case 0: 
            target.name = 's'
            break;
        case 10: 
            target.name = 'd'
            break;
    }

    scene.add(target)

    target.uuid = counter
    counter++;

    var tl = new TimelineMax()

    tl.to(target.scale, 1,  {x: 5, y: 5, ease: Expo.easeOut})
}

function createStartTarget() {
    var geometry = new THREE.BoxGeometry( 5, 5, 5 );
    var material = new THREE.MeshLambertMaterial( {color: "rgb(240, 240, 240)", side: THREE.DoubleSide} );
    var target = new THREE.Mesh( geometry, material );

    target.position.z = camera.position.z - 20

    target.name = "clicked"
    scene.add(target)

    var tl = new TimelineMax()

    tl.to(target.rotation, 2, {z: Math.PI*2, ease: Expo.easeOut})
}

function onKeyDown(event) {
    event.preventDefault();

    let target = scene.getObjectById(idNumber) 

    // start game on 's' keydown
    if (event.keyCode == 83 && gameStarted == false) {
        start()
        render();
        pianoChords.play()
        pianoMelody.play()
        stringsMelody.play()
        synthMelody.play()
        drumsRhythm.play()
        clock.start()  
    }


    switch (event.keyCode) {

        case 65:
            if (target.name == "a") {
                target.name = "clicked"
                this.tl = new TimelineMax();
                this.tl.to(target.material.color, 0.1, {r:0.2, g:0.9, b:1, ease: Expo.easeOut})
            }
            break;
        case 83:
            if (target.name == "s") {
                target.name = "clicked"
                this.tl = new TimelineMax();
                this.tl.to(target.material.color, 0.1, {r:0.3, g:0.9, b:0, ease: Expo.easeOut})
            }
            break;
        case 68: 
            if (target.name == "d") {
                target.name = "clicked"
                this.tl = new TimelineMax();
                this.tl.to(target.material.color, 0.1, {r:0.9, g:1, b:0.1, ease: Expo.easeOut})
            }
            break;
    }
}


window.addEventListener('keydown', onKeyDown)

createStartTarget()

render();

renderer.render(scene, camera);


