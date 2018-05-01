/************ SOUND HANDLER ***************/

/**
 * Sound handler
 */
var soundHandler = {

    // Stop all sounds
    stopSounds: false,

    /**
     * Play
     * @param obj
     */
    play: function(obj) {
        if (!this.stopSounds) {
            obj.currentTime = 0;
            obj.play();
        }
    },

    /**
     * Pause
     * @param obj
     */
    pause: function(obj) {
        obj.pause();
    },

    /**
     * Stop
     * @param obj
     */
    stop: function(obj) {
        this.pause(obj);
        obj.currentTime = 0;
    },

    /**
     * set volume
     * @param obj
     * @param volume
     */
    setVolume: function(obj, volume) {
        obj.volume = volume;
    },

    /**
     * Add music loop
     * @param obj
     */
    addLoop: function(obj) {
        obj.addEventListener('ended', function() {
            this.play();
        }, false);
    },

    /**
     * Add event file
     * @param obj
     * @param file
     */
    relateFile: function(obj, file) {
        obj.setAttribute('src', file);
    }
};

/**
 * Quit volume
 */
var volumeOff = function() {

    for (var s in musics) {
        soundHandler.setVolume(musics[s], 0.0);
    }
    for (var s in effects) {
        soundHandler.setVolume(effects[s], 0.0);
    }
};

/**
 * Add volume
 */
var volumeOn = function() {

    for (var s in musics) {
        soundHandler.setVolume(musics[s], 1);
    }
    for (var s in effects) {
        soundHandler.setVolume(effects[s], 1);
    }
};

/**
 * Game's musics
 */
var musics = {
    loop: document.createElement('audio')
};

/**
 * Game's sound effects
 */
var effects = {
    place: document.createElement('audio'),
    completed: document.createElement('audio'),
    placeFigure: document.createElement('audio'),
    startSolver: document.createElement('audio')
};

// effects

soundHandler.relateFile(effects.place, '../puzzle/assets/audio/place-square.wav');
soundHandler.relateFile(effects.completed, '../puzzle/assets/audio/puzzle-completed.mp3');
soundHandler.relateFile(effects.placeFigure, '../puzzle/assets/audio/place-figure.wav');
soundHandler.relateFile(effects.startSolver, '../puzzle/assets/audio/start-solver.wav');

// musics
soundHandler.relateFile(musics.loop, '../puzzle/assets/audio/loop.wav');
soundHandler.addLoop(musics.loop);