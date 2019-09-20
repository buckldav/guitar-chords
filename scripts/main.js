const SEVEN_NOTES = "ABCDEFG"

function getKey(chordString) {
  if (chordString.length > 0 && SEVEN_NOTES.indexOf(chordString[0]) != -1) {
    var endIndex = 1
    if (chordString.indexOf("#") == 1 || chordString.indexOf("b") == 1) {
      endIndex = 2
    }
    return {
      "key": chordString.substring(0, endIndex),
      "remainder": chordString.substring(endIndex, chordString.length)
    }
  } else {
    throw "Invalid chord key"
  }
}

/**
 * @returns quality: M, m, dim, aug
 */
function getQuality(chordString) {
  if ((chordString[0] >= '0' && chordString[0] <= '9') || chordString.length == 0) {
    endIndex = 0
  } else if (chordString.indexOf("M") == 0 || chordString.indexOf("m") == 0) {
    endIndex = 1
  } else if (chordString.indexOf("dim") == 0 || chordString.indexOf("aug") == 0) {
    endIndex = 3
  } else {
    throw "Invalid chord quality"
  }
  return {
    "quality": chordString.substring(0, endIndex),
    "remainder": chordString.substring(endIndex, chordString.length)
  }
}

E_STR_MAP = {"E": 0,"Fb": 0,"E#": 1,"F": 1,"F#": 2,"Gb": 2,"G": 3,"G#": 4,"Ab": 4,"A": 5,"A#": 6,"Bb": 6,"B": 7,"Cb": 7,"B#": 8,"C": 8,"C#": 9,"Db": 9,"D": 10,"D#": 11,"Eb": 11} 
A_STR_MAP = {"A": 0,"A#": 1,"Bb": 1,"B": 2,"Cb": 2,"B#": 3,"C": 3,"C#": 4,"Db": 4,"D": 5,"D#": 6,"Eb": 6,"E": 7,"Fb": 7,"E#": 8,"F": 8,"F#": 9,"Gb": 9,"G": 10,"G#": 11,"Ab": 11} 
D_STR_MAP = {"D": 0,"D#": 1,"Eb": 1,"E": 2,"Fb": 2,"E#": 3,"F": 3,"F#": 4,"Gb": 4,"G": 5,"G#": 6,"Ab": 6,"A": 7,"A#": 8,"Bb": 8,"B": 9,"Cb": 9,"B#": 10,"C": 10,"C#": 11,"Db": 11} 

function makeCshape(chordObj) {
  var key = A_STR_MAP[chordObj.key]
  // Fit the C chord
  key = key >= 3 ? key : key + 12
  var majChord = ["X",key,key-1,key-3,key-2,key-3]
  var finalChord = majChord
  $("#chords").append(`
  <div>
    <h4>C Shape</h4>
    <pre class="fretboard">
e: `+ finalChord[5] +`
b: `+ finalChord[4] +`
G: `+ finalChord[3] +`
D: `+ finalChord[2] +`
A: `+ finalChord[1] +`
E: `+ finalChord[0] +`
    </pre>
  </div>
  `)
}

function makeAshape(chordObj) {
  var key = A_STR_MAP[chordObj.key]
  var majChord = ["X",key,key+2,key+2,key+2,key]
  var finalChord = majChord
  $("#chords").append(`
  <div>
    <h4>A Shape</h4>
    <pre class="fretboard">
e: `+ finalChord[5] +`
b: `+ finalChord[4] +`
G: `+ finalChord[3] +`
D: `+ finalChord[2] +`
A: `+ finalChord[1] +`
E: `+ finalChord[0] +`
    </pre>
  </div>
  `)
}

function makeGshape(chordObj) {
  var key = E_STR_MAP[chordObj.key]
  // Fit the G chord
  key = key >= 3 ? key : key + 12
  var majChord = [key,key-1,key-3,key-3,key-3,key]
  var finalChord = majChord
  $("#chords").append(`
  <div>
    <h4>G Shape</h4>
    <pre class="fretboard">
e: `+ finalChord[5] +`
b: `+ finalChord[4] +`
G: `+ finalChord[3] +`
D: `+ finalChord[2] +`
A: `+ finalChord[1] +`
E: `+ finalChord[0] +`
    </pre>
  </div>
  `)
}

function makeEshape(chordObj) {
  var key = E_STR_MAP[chordObj.key]
  var majChord = [key,key+2,key+2,key+1,key,key]
  var finalChord = majChord
  $("#chords").append(`
  <div>
    <h4>E Shape</h4>
    <pre class="fretboard">
e: `+ finalChord[5] +`
b: `+ finalChord[4] +`
G: `+ finalChord[3] +`
D: `+ finalChord[2] +`
A: `+ finalChord[1] +`
E: `+ finalChord[0] +`
    </pre>
  </div>
  `)
}

function makeDshape(chordObj) {
  var key = D_STR_MAP[chordObj.key]
  var majChord = ["X","X",key,key+2,key+3,key+2]
  var finalChord = majChord
  $("#chords").append(`
  <div>
    <h4>D Shape</h4>
    <pre class="fretboard">
e: `+ finalChord[5] +`
b: `+ finalChord[4] +`
G: `+ finalChord[3] +`
D: `+ finalChord[2] +`
A: `+ finalChord[1] +`
E: `+ finalChord[0] +`
    </pre>
  </div>
  `)
}

function generateChords(chordObj) {
  // Clear the existing chords
  $("#chords").empty()

  // Make the new ones
  makeCshape(chordObj)
  makeAshape(chordObj)
  makeGshape(chordObj)
  makeEshape(chordObj)
  makeDshape(chordObj)
}

setInterval(() => {
  try {
    keyObj = getKey($("[name='chord-input']").val())
    qualityObj = getQuality(keyObj.remainder)
    generateChords({
      key: keyObj.key,
      quality: qualityObj.quality
    })
  } catch (e) {
    console.log(e)
  }
}, 500)