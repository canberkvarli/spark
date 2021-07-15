document.addEventListener('DOMContentLoaded',function(event){
    
    //Knob canvas
    // let canvas2 = document.getElementById('knob-canvas-2');
    // let canvas3 = document.getElementById('knob-canvas-3');
    // let canvas4 = document.getElementById('knob-canvas-4');
    // let canvas5 = document.getElementById('knob-canvas-5');
    // let canvas6 = document.getElementById('knob-canvas-6');

    
        //Web Audio API
        let audioContext = new (window.AudioContext || window.webkitAudioContext)(); //base contex
        let mainGainNode = audioContext.createGain(); //gain
        let filter = audioContext.createBiquadFilter(); //filter effect 
        let oscList = []; //store key pressed oscilliators
        let noteFreq = {
            //octave-1
            '90': 261.626, //Z, C4
            '83': 277.183, //S, C4#
            '88': 293.665, //X, D4
            '68': 311.127, //D, D4#
            '67': 329.628, //C, E4
            '86': 349.228, //V, F4
            '71': 369.994, //G, F4#
            '66': 391.995, //B, G4
            '72': 415.305, //H, G4#
            '78': 440.000, //N, A4
            '74': 466.164, //J, A4#
            '77': 493.883, //M, B4
            '81': 523.251, //Q, C5
            '50': 554.365, //2, C5#
            '87': 587.329, //W, D5
            '51': 622.254, //3, D5
            '69': 659.255, //E, E5
            '82': 698.456, //R, F5
            '53': 739.989, //5, F5#
            '84': 783.991, //T, G5
            '54': 830.609, //6, G5#
            '89': 880.000, //Y, A5
            '55': 932.328, //7, A5#
            '85': 987.767, //U, B5
            '73': 1046.50, //I, C6
    
        } //key codes & note frequencies
        let volumeControl = document.querySelector("input[name='volume']");
        
        
       //CONNECTIONS

       mainGainNode.connect(filter);
       filter.connect(audioContext.destination);
        //DOM 
        // let keyboard = document.querySelector(".lower-container");
        let white_keys = document.querySelectorAll('white');
        let black_keys = document.querySelectorAll('black');
        let keys = document.querySelectorAll('key');
        let waveForm = document.querySelector("select[name='waveform']");
        let snare = document.getElementById('snare');
        let kick = document.getElementsByClassName('kick');
        let hihat = document.getElementsByClassName('hihat');
            let hihat_audio = hihat[0].children[0];
            let kick_audio = kick[0].children[0];

        
        //EVENT LISTENERS
        window.addEventListener('keydown', keyDown);
        window.addEventListener('keyup', keyUp);
        window.addEventListener('change', adjustVolume, false);
        waveForm.addEventListener('change', function(event) {
        waveForm = event.target.value;
       });    

        hihat[0].addEventListener('click', function(e){
        e.preventDefault();
            if (hihat_audio.paused){
                hihat_audio.play();
                hihat[0].style.color = 'red';
            }else{
                hihat_audio.pause();
                hihat[0].style.color = 'black';
            }
       });

       kick[0].addEventListener('click', function (e) {
           e.preventDefault();
           if (kick_audio.paused) {
               kick_audio.play();
               kick[0].style.color = 'red';
           } else {
               kick_audio.pause();
               kick[0].style.color = 'black';
           }
       });

        //FUNCTIONS

      

        function adjustVolume(e) {
           mainGainNode.gain.value = volumeControl.value
        }
        function keyDown(e) {
            const key = (e.keyCode).toString(); //key code            
            if (noteFreq[key] && !oscList[key]) {
                playNote(key);
                //if noteFreq.includes(white_keys.note_freq){
                    //changeColor();
                // }
            }
        };
    
        function keyUp(e) {
            const key = (e.keyCode).toString(); //55
            if (noteFreq[key] && oscList[key]) {
                oscList[key].stop();
                delete oscList[key];
            }

        };
    
        function playNote(key) {
            const osc = audioContext.createOscillator();
            osc.frequency.setValueAtTime(noteFreq[key], audioContext.currentTime);
            osc.type = waveForm; //selected waveform
            oscList[key] = osc;
            oscList[key].connect(mainGainNode); //sound connected
            oscList[key].start();
        }
    





        // CANVAS DRAW KNOBS //

        // let canvasContext2 = canvas2.getContext('2d');
        // canvasContext2.beginPath();
        // canvasContext2.arc(50, 40, 30, 0, 2 * Math.PI);
        // canvasContext2.stroke();
    
        // let canvasContext3 = canvas3.getContext('2d');
        // canvasContext3.beginPath();
        // canvasContext3.arc(50, 0, 30, 0, 2 * Math.PI);
        // canvasContext3.stroke();

        // let canvasContext4 = canvas4.getContext('2d');
        // canvasContext4.beginPath();
        // canvasContext4.arc(50, 40, 30, 0, 2 * Math.PI);
        // canvasContext4.stroke();

        // let canvasContext5 = canvas5.getContext('2d');
        // canvasContext5.beginPath();
        // canvasContext5.arc(50, 40, 30, 0, 2 * Math.PI);
        // canvasContext5.stroke();

        // let canvasContext6 = canvas6.getContext('2d');
        // canvasContext6.beginPath();
        // canvasContext6.arc(50, 40, 30, 0, 2 * Math.PI);
        // canvasContext6.stroke();
       
});    

