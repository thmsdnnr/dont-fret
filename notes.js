// Given a string and an offset in half-steps, what's the note?
// Offset in halftones = fret number (0 being open string).

// C2 is the lowest. E5 is the highest.
// generate range [0 - 12 open to max.] Fret is note (0 = open)

// padded out the zero so the array index corresponds to string number.
const tuning = ["E4", "E4", "B3", "G3", "D3", "A2", "E2"]; // high string to low string, 1 -> 6

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


