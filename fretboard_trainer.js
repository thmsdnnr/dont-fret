// padded out the zero so the array index corresponds to string number.
// TODO: start is already a wrapper for all logic, turn EarTrainer into an object
function start() {
    let sessionRightCt = 0;
    let sessionWrongCt = 0;
    const tuning = ["E4", "E4", "B3", "G3", "D3", "A2", "E2"]; // high string to low string, 1 -> 6
    const INTER_NOTE_DELAY_MS = 1000;
    const generateNoteRange = (baseNote, noteCt) => {
        const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        const split = baseNote.split("");
        const octave = Number(split[split.length - 1]);
        if (isNaN(octave)) {
            throw new Error("Octave is not a number!");
        }
        const note = split.slice(0, split.length - 1).join("");
        let currentIdx = notes.indexOf(note);
        if (currentIdx === -1) {
            throw new Error("Not a valid note (or you used a flat sign)");
        }
        let result = [];
        let ct = 0;
        let currentOctave = octave;
        while (ct < noteCt) {
            if (currentIdx == notes.length) {
                currentIdx = 0;
                currentOctave++;
            }
            result.push(notes[currentIdx] + String(currentOctave));
            currentIdx++;
            ct++;
        }
        return result;
    }

    const notesByString = tuning.map(baseNote => generateNoteRange(baseNote, 13));
    // notesByString[stringNumber][fretNumber] yields note. eg notesByString[6][0] is low E, E2

    var synth = new Tone.Synth().toMaster();
    const randomInRange = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const randomString = () => randomInRange(1, 5);
    const randomFret = () => randomInRange(0, 13);

    const rightIcon = document.getElementById("right");
    const wrongIcon = document.getElementById("wrong");
    const showSelector = selector => selector.style.display = "block";
    const hideSelector = selector => selector.style.display = "none";
    // s_<stringNumber>_<fretNumber>
    let currentNoteId = "";
    let currentNote = "";

    const playNote = note => synth.triggerAttackRelease(note, '4n');
    const noteIdToSelector = {}; // memoize note selectors
    const getNoteSelector = noteId => {
        let selector;
        if (noteIdToSelector[noteId]) {
            selector = noteIdToSelector[noteId];
        } else {
            selector = document.getElementById(noteId);
            noteIdToSelector[noteId] = selector;
        }
        return selector;
    }

    const noteOn = noteId => getNoteSelector(noteId).classList.add("active");
    const noteOff = noteId => getNoteSelector(noteId).classList.remove("active");

    function generateAndPlay() {
        if (currentNoteId !== "") {
            noteOff(currentNoteId);
        }
        // TODO: train by string / by fret / etc.
        const rS = randomString();
        const rF = randomFret();
        currentNote = notesByString[rS][rF];
        currentNoteId = `s_${rS}_${rF}`;
        console.log(currentNote);
        console.log(currentNoteId);
        noteOn(currentNoteId);
        playNote(currentNote);
        writeNotationNote(currentNote);
    }

    function checkGuess(e) {
        const guess = e.target.id;
        const guessCompare = currentNote.split("").slice(0, currentNote.length - 1).join("");
        if (guess === guessCompare) {
            sessionRightCt++;
            hideSelector(wrongIcon);
            showSelector(rightIcon);
            setTimeout(function () {
                hideSelector(rightIcon);
                generateAndPlay();
            }, INTER_NOTE_DELAY_MS);
        } else {
            sessionWrongCt++;
            hideSelector(rightIcon);
            showSelector(wrongIcon);
        }
    }

    const eraseOldNotation = () => {
        const staff = document.getElementById('vexNote');
        while (staff.hasChildNodes()) {
            staff.removeChild(staff.lastChild);
        }
    }

    const writeNotationNote = noteName => {
        eraseOldNotation();
        const VF = Vex.Flow;
        var vf = new VF.Factory({
            renderer: { elementId: 'vexNote', width: 100, height: 200 }
        });
        var score = vf.EasyScore();
        var system = vf.System();
        system.addStave({
            voices: [
                score.voice(score.notes(`${noteName}/w`))]
        }).addClef('treble');
        vf.draw();
    }

    const neck = document.getElementById("guitar_neck");
    const guesses = document.getElementById("notes_to_guess");
    const replay = document.getElementById("replay");
    replay.addEventListener("click", function () {
        if (currentNote !== "") {
            playNote(currentNote);
        }
    });
    guesses.addEventListener("click", function (e) {
        checkGuess(e);
    });
    neck.addEventListener("click", function () {
        generateAndPlay();
    });
}
document.addEventListener("DOMContentLoaded", start);
