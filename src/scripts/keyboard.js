import AudioMotionAnalyzer from 'audiomotion-analyzer';

document.addEventListener('DOMContentLoaded', function(event){
    // REMOVE CONSOLE LOGS 
        // console.log = function() {};
        //Web Audio API
        let audioContext = new (window.AudioContext || window.webkitAudioContext)(); //base Audio context
        let noteGain = audioContext.createGain(); //gain
        let oscList = []; //store key pressed oscilliators
        let filter = audioContext.createBiquadFilter();
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
        let attackTime = 0.3
        let sustainLevel = 0.8
        let releaseTime = 0.3
        
        
        
        //DOM 
        
        let waveForm = document.querySelector("select[name='waveform']");
        let kick = document.getElementsByClassName('kick');
        let hihat = document.getElementsByClassName('hihat');
        let bass = document.getElementsByClassName('bass');
        let choir = document.getElementsByClassName('choir');
        let bell = document.getElementsByClassName('bell');
        let vocal = document.getElementsByClassName('vocal');

        let hihat_audio = hihat[0].children[0];
        let kick_audio = kick[0].children[0];  
        let bass_audio = bass[0].children[0];
        let choir_audio = choir[0].children[0];
        let bell_audio = bell[0].children[0];
        let vocal_audio = vocal[0].children[0];

        let instructions_icon = document.getElementById('instructions-icon');
        let instructions_modal = document.getElementById('instructions-modal');
        let envelope_checkbox = document.getElementById('envelope-checkbox');
        const attackControl = document.querySelector('#attack-control');
        const releaseControl = document.querySelector('#release-control');
        
        //************* EVENT LISTENERS ****************
        window.addEventListener('keydown', keyDown);
        window.addEventListener('keyup', keyUp);
        window.addEventListener('change', adjustVolume, false);
        waveForm.addEventListener('change', function(event) {
            waveForm = event.target.value;
        });    
        
        
        instructions_icon.addEventListener('click', function(e){
            instructions_modal.style.display = "block";
            // console.log(instructions_icon);
            // console.log(instructions_modal);
        });
        
        window.onclick = function (event) {
            if (event.target === instructions_modal) {
                // console.log(event);
                instructions_modal.style.display = "none";
            }
        };
        
        hihat[0].addEventListener('click', function(e){
            e.preventDefault();
            if (hihat_audio.paused){
                hihat_audio.play();
                hihat[0].style.color = 'red';
            }else{
                hihat_audio.pause();
                hihat[0].style.color = 'black';
            }
            audioMotion.connectInput(hihat_audio);
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
            audioMotion.connectInput(kick_audio);
        });

        bass[0].addEventListener('click', function (e) {
            e.preventDefault();
            if (bass_audio.paused) {
                bass_audio.play();
                bass[0].style.color = 'red';
            } else {
                bass_audio.pause();
                bass[0].style.color = 'black';
            }
            audioMotion.connectInput(bass_audio);
        });

           bell[0].addEventListener('click', function (e) {
            e.preventDefault();
            if (bell_audio.paused) {
                bell_audio.play();
                bell[0].style.color = 'blue';
            } else {
                bell_audio.pause();
                bell[0].style.color = 'black';
            }
            audioMotion.connectInput(bell_audio);
        });
        
            choir[0].addEventListener('click', function (e) {
            e.preventDefault();
            if (choir_audio.paused) {
                choir_audio.play();
                choir[0].style.color = 'blue';
            } else {
                choir_audio.pause();
                choir[0].style.color = 'black';
            }
            audioMotion.connectInput(choir_audio);
        });

           vocal[0].addEventListener('click', function (e) {
            e.preventDefault();
            if (vocal_audio.paused) {
                vocal_audio.play();
                vocal[0].style.color = 'blue';
            } else {
                vocal_audio.pause();
                vocal[0].style.color = 'black';
            }
            audioMotion.connectInput(vocal_audio);
        });
        
        attackControl.addEventListener('input', function(){
            attackTime = parseFloat(this.value)
        });
        
        releaseControl.addEventListener('input', function(){
            releaseTime = parseFloat(this.value)
        });
        
        //****************** FUNCTIONS *************************
        
        
        
        //DOM element by data-freq
        function keyDown(e) {
            const key = (e.keyCode).toString(); //key code            
            console.log(e);
            if (noteFreq[key] && !oscList[key]) {
                playNote(key);
                // console.log(key)
                let freq = noteFreq[key].toString();
                let ele = document.querySelectorAll(`[data-freq = '${freq}']`);
                //white or black?
                // console.log(ele);
                if(ele[0].className === 'white key'){
                    ele[0].style.backgroundColor = 'whitesmoke';
                    ele[0].style.boxShadow = "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px rgb(218, 216, 99)";
                }else if(ele[0].className === 'black key'){
                    ele[0].style.backgroundColor = 'yellow';
                    ele[0].style.boxShadow = "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px rgb(218, 216, 99)";
                }
            }
            
        };
        
        function keyUp(e) {
            const key = (e.keyCode).toString(); //55
            if (noteFreq[key] && oscList[key]) {
                oscList[key].stop();
                delete oscList[key];
                // console.log(oscList);
                let freq = noteFreq[key].toString();
                let ele = document.querySelectorAll(`[data-freq = '${freq}']`);
                //white or black?
                if (ele[0].className === 'white key') {
                    ele[0].style.backgroundColor = 'grey';
                    ele[0].style.boxShadow = 'none';
                } else if (ele[0].className === 'black key') {
                    ele[0].style.backgroundColor = '#3d004e';
                    ele[0].style.boxShadow = 'none';
                };
            }
        };
         
            // AUDIO VISUALIZER
        const audioMotion = new AudioMotionAnalyzer( document.getElementById('container'), {
            gradient: 'prism'
            // radial: true,
            // spinSpeed: 20,
        } )

        function playNote(key) {
            const audioCtx = audioMotion.audioCtx;
            const osc = audioCtx.createOscillator(),
            noteGain = audioCtx.createGain();
            // const osc = audioContext.createOscillator(); //instrument (oscilliator)
            
                noteGain.gain.setValueAtTime(0, 0);
                noteGain.gain.linearRampToValueAtTime(sustainLevel, audioCtx.currentTime + attackTime);
                noteGain.gain.setValueAtTime(sustainLevel, audioCtx.currentTime + 1 - releaseTime);
                noteGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 5);
                noteGain.gain.value = volumeControl.value
                osc.frequency.setValueAtTime(noteFreq[key], audioCtx.currentTime);
                osc.type = waveForm; //selected waveform
                oscList[key] = osc; //261
                oscList[key].connect(noteGain); //sound connected
                audioMotion.connectInput(noteGain);
                oscList[key].start();
                // oscList[key].stop(audiContext.currentTime + 1);
       console.log(key)
            
        }
         function adjustVolume(e) {
            noteGain.gain.value = volumeControl.value
        };
        
        //CONNECTIONS
    
         noteGain.connect(filter);
         filter.connect(audioContext.destination);
 
    });    

    