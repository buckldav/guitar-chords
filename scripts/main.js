const SEVEN_NOTES = "ABCDEFG"

function translateSymbols(chordString) {
  chordString = chordString.replace("^", "▵");
  console.log(chordString)
  return chordString
}

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

// The keys are the qualities
const QUALITIES = {
  "maj": ["maj", "Maj", "ma", "Ma", "M", "▵"],
  "min": ["min", "mi", "m", "-"],
  "dim": ["dim", "o"],
  "aug": ["aug", "+"],
  "dom": []
}
/**
 * @returns quality: (see above keys in the dictionary)
 */
function getQuality(chordString) {
  var quality = ""
  var remainder = ""
  var extension = ""
  // Check if the quality is valid
  if (chordString.length == 0) {
    // If there's nothing left in the chordString, quality = "maj"
    quality = "maj"
  } else if (chordString.indexOf('6') == 0) {
    // It's a six chord, quality = "maj"
    quality = "maj"
    extension = "6"
  } else if (chordString.indexOf('7') == 0 || chordString.indexOf('9') == 0) {
    // If it's 7 or 9 immediately following the key, quality = "dom"
    quality = "dom"
    extension = chordString[0]
  } else if (chordString.indexOf('11') == 0 || chordString.indexOf('13') == 0) {
    // If it's 11 or 13 immediately following the key, quality = "dom"
    quality = "dom"
    extension = chordString.substring(0,2)
  } else if (chordString[0] >= '0' && chordString[0] <= '9') {
    // If it's any other number immediately following the key, invalid
    throw "Invalid chord quality"
  } else {
    // Otherwise, check if it's a valid chord quality in the dictionary
    // Set the substring endIndex to the length of the quality
    for (var qKey in QUALITIES) {
      let values = QUALITIES[qKey]
      if (quality == "") {
        for (let i = 0; i < values.length; i++) {
          if (chordString.indexOf(values[i]) == 0) {
            quality = qKey
            chordString = chordString.substring(values[i].length, chordString.length)
            // Get extension
            if (chordString.indexOf('6') == 0 || chordString.indexOf('7') == 0 || chordString.indexOf('9') == 0) {
              // If it's 6, 7, or 9 
              extension = chordString[0]
            } else if (chordString.indexOf('11') == 0 || chordString.indexOf('13') == 0) {
              // If it's 11 or 13
              extension = chordString.substring(0,2)
            }
            
            remainder = chordString.substring(extension.length, chordString.length)
            break
          }
        } 
      }
    }
  }

  // If the quality still equals "", invalid
  if (quality == "") {
    throw "Invalid chord quality"
  }

  return {
    "quality": quality,
    "extension": extension,
    "remainder": remainder
  }
}

E_STR_MAP = {"E": 0,"Fb": 0,"E#": 1,"F": 1,"F#": 2,"Gb": 2,"G": 3,"G#": 4,"Ab": 4,"A": 5,"A#": 6,"Bb": 6,"B": 7,"Cb": 7,"B#": 8,"C": 8,"C#": 9,"Db": 9,"D": 10,"D#": 11,"Eb": 11} 
A_STR_MAP = {"A": 0,"A#": 1,"Bb": 1,"B": 2,"Cb": 2,"B#": 3,"C": 3,"C#": 4,"Db": 4,"D": 5,"D#": 6,"Eb": 6,"E": 7,"Fb": 7,"E#": 8,"F": 8,"F#": 9,"Gb": 9,"G": 10,"G#": 11,"Ab": 11} 
D_STR_MAP = {"D": 0,"D#": 1,"Eb": 1,"E": 2,"Fb": 2,"E#": 3,"F": 3,"F#": 4,"Gb": 4,"G": 5,"G#": 6,"Ab": 6,"A": 7,"A#": 8,"Bb": 8,"B": 9,"Cb": 9,"B#": 10,"C": 10,"C#": 11,"Db": 11} 

function isMajor(quality) {
  return quality == "maj"
}
function isDominant(quality) {
  return quality == "dom"
}
function isMinor(quality) {
  return quality == "min"
}

function makeCshape(chordObj) {
  var key = A_STR_MAP[chordObj.key]
  // Fit the C chord
  key = key >= 3 ? key : key + 12
  var finalChord = ""
  // Basic quality
  if (isMajor(chordObj.quality) || isDominant(chordObj.quality)) {
    // Major chord
    finalChord = ["X",key,key-1,key-3,key-2,key-3]
  } else if (isMinor(chordObj.quality)) {
    // If it's a Cm chord, the eString gets a different value
    let eString = key == 3 ? key : key - 4
    // Minor chord
    finalChord = ["X",key,key-2,key-3,key-2,eString]
  }

  // Extension
  if (chordObj.extension == '6') {
    finalChord[3] = key - 1
    finalChord[5] = key 
  } else if (isMajor(chordObj.quality) && chordObj.extension != '') {
    // Major 7 interval 
    finalChord[4] = key - 3
  } else if (chordObj.extension != '') {
    // Minor 7 interval
    finalChord[3] = key
    finalChord[5] = key
  }
  if (chordObj.extension == '9' || chordObj.extension == '11' || chordObj.extension == '13') {
    // 9 interval
    finalChord[4] = key
    if (isMajor(chordObj.quality)) {
      finalChord[3] = key + 1
      finalChord[5] = key
    }
    // 11 interval
    if (chordObj.extension == '11') {
      finalChord[2] = key
      if (isMinor(chordObj.quality)) {
        // Minor 3rd
        finalChord[2] = key - 2
        // 11
        finalChord[5] = key - 2
      }
    }
    // 13 interval
    if (chordObj.extension == '13') {
      finalChord[5] = key + 2
    }
  }

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
  var finalChord = ""
  if (isMajor(chordObj.quality)) {
    // Major chord
    finalChord = ["X",key,key+2,key+2,key+2,key]
  } else if (isDominant(chordObj.quality)) {
    // Dominant 7 chord
    finalChord = ["X",key,key+2,key,key+2,key]
  } else if (isMinor(chordObj.quality)) {
    // Minor chord
    finalChord = ["X",key,key+2,key+2,key+1,key]
  }

  // Extension
  if (chordObj.extension == '6') {
    finalChord[5] = key + 2
  } else if (isMajor(chordObj.quality) && chordObj.extension != '') {
    // Major 7 interval 
    finalChord[3] = key + 1
  } else if (chordObj.extension != '') {
    // Minor 7 interval
    finalChord[3] = key
  }
  if (chordObj.extension == '9' || chordObj.extension == '11' || chordObj.extension == '13') {
    // 9 interval
    finalChord[4] = key
    // 11 interval
    if (chordObj.extension == '11') {
      finalChord[2] = key
      if (isMinor(chordObj.quality)) {
        // Minor 3rd
        finalChord[4] = key + 1
      }
    }
    // 13 interval
    if (chordObj.extension == '13') {
      finalChord[4] = key + 2
      finalChord[5] = key + 2
    }
  }

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
  var finalChord = ""
  if (isMajor(chordObj.quality)) {
    // Major chord
    finalChord = [key,key-1,key-3,key-3,key-3,key]
  } else if (isDominant(chordObj.quality)) {
    // Dominant 7 chord
    finalChord = [key,key-1,key-3,key-3,key-3,key-2]
  } else if (isMinor(chordObj.quality)) {
    // Minor chord
    finalChord = [key,key-2,key-3,key-3,key,key]
  }

  // Extension
  if (chordObj.extension == '6') {
    finalChord[5] = key - 3
  } else if (isMajor(chordObj.quality) && chordObj.extension != '') {
    // Major 7 interval 
    finalChord[5] = key - 1
  } else if (chordObj.extension != '') {
    // Minor 7 interval
    finalChord[5] = key - 2
  }
  if (chordObj.extension == '9' || chordObj.extension == '11' || chordObj.extension == '13') {
    // 9 interval
    finalChord[2] = key
    finalChord[3] = key - 1
    if (isMajor(chordObj.quality)) {
      finalChord[2] = key - 3
    }
    // 11 interval
    if (chordObj.extension == '11') {
      finalChord[1] = key      
      finalChord[4] = key - 2
    }
    // 13 interval
    if (chordObj.extension == '13') {
      if (isMajor(chordObj.quality)) {
        finalChord[2] = key - 1
        finalChord[3] = key - 1
        finalChord[4] = key
        finalChord[5] = key - 1
      } else if (isDominant(chordObj.quality)) {
        finalChord[2] = key
        finalChord[3] = key - 1
        finalChord[4] = key - 3
        finalChord[5] = key - 3
      } else {
        finalChord[2] = key
        finalChord[3] = key
        finalChord[4] = key - 2
        finalChord[5] = key - 3
      }
    }
  }

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
  var finalChord = ""
  if (isMajor(chordObj.quality)) {
    // Major chord
    finalChord = [key,key+2,key+2,key+1,key,key]
  } else if (isDominant(chordObj.quality)) {
    // Dominant 7 chord
    finalChord = [key,key+2,key,key+1,key,key]
  } else if (isMinor(chordObj.quality)) {
    // Minor chord
    finalChord = [key,key+2,key+2,key,key,key]
  }

  // Extension
  if (chordObj.extension == '6') {
    finalChord = [key, key-1, key-1, key+1, key, key]
    if (isMinor(chordObj.quality)) {
      finalChord[3] = key
    }
  } else if (isMajor(chordObj.quality) && chordObj.extension != '') {
    // Major 7 interval 
    finalChord = [key, key+2, key+1, key+1, key, key-1]
  } else if (chordObj.extension != '') {
    // Minor 7 interval
    finalChord = [key, key+2, key, key, key, key]
  }

  // TODODODODOD
  if (chordObj.extension == '9' || chordObj.extension == '11' || chordObj.extension == '13') {
    // 9 interval
    finalChord[5] = key + 2
    // 11 interval
    if (chordObj.extension == '11') {
      finalChord[1] = key      
      finalChord[4] = key - 2
    }
    // 13 interval
    if (chordObj.extension == '13') {
      if (isMajor(chordObj.quality)) {
        finalChord[2] = key - 1
        finalChord[3] = key - 1
        finalChord[4] = key
        finalChord[5] = key - 1
      } else if (isDominant(chordObj.quality)) {
        finalChord[2] = key
        finalChord[3] = key - 1
        finalChord[4] = key - 3
        finalChord[5] = key - 3
      } else {
        finalChord[2] = key
        finalChord[3] = key
        finalChord[4] = key - 2
        finalChord[5] = key - 3
      }
    }
  }

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
  var finalChord = ""
  if (isMajor(chordObj.quality)) {
    // Major chord
    finalChord = ["X","X",key,key+2,key+2,key+2]
  } else if (isDominant(chordObj.quality)) {
    // Dominant 7 chord
    finalChord = ["X","X",key,key+2,key+1,key+2]
  } else if (isMinor(chordObj.quality)) {
    // Minor chord
    finalChord = ["X","X",key,key+2,key+3,key+1]
  }
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

function E_DGB(chordObj) {
  var key = E_STR_MAP[chordObj.key]
  var finalChord = ""
  if (isMajor(chordObj.quality)) {
    // Major chord
    finalChord = [key,"x",key+2,key+1,key,"x"]
  } else if (isDominant(chordObj.quality)) {
    // Dominant 7 chord
    finalChord = [key,"x",key,key+1,key,"x"]
  } else if (isMinor(chordObj.quality)) {
    // Minor chord
    finalChord = [key,"x",key+2,key,key,"x"]
  }

  // Extension
  if (chordObj.extension == '6') {
    finalChord = [key, "x", key-1, key+1, key, "x"]
    if (isMinor(chordObj.quality)) {
      finalChord[3] = key
    }
  } else if (isMajor(chordObj.quality) && chordObj.extension != '') {
    // Major 7 interval 
    finalChord = [key, "x", key+1, key+1, key, "x"]
  } else if (isMinor(chordObj.quality) && chordObj.extension != '') {
    // Minor 7 interval
    finalChord = [key, "x", key, key, key, "x"]
  }

  // Upper extensions
  if (chordObj.extension == '9' || chordObj.extension == '11' || chordObj.extension == '13') {
    // 9 interval
    if (chordObj.extension == '9') {
      finalChord[3] = key - 1
      finalChord[4] = key - 3
    }
    // 11 interval
    if (chordObj.extension == '11') {
      finalChord[2] = key      
      finalChord[3] = key - 1
      finalChord[4] = key - 2
    }
    // 13 interval
    if (chordObj.extension == '13') {
      finalChord[4] = key + 2
    }
  }
  $("#chords").append(`
    <div>
      <h3>E_DGB_ shape</h3>
      <iframe src="https://chordgenerator.net/${chordObj.string}.png?p=${finalChord.join('')}&s=3" width="130"></iframe>
    </div>
  `)
}

function generateChords(chordObj) {
  // Clear the existing chords
  $("#chords").empty()

  // Make the new ones
  E_DGB(chordObj)
}

makeChordsFromForm = () => {
  try {
    var chordString = $("[name='chord-input']").val()
    chordString = translateSymbols(chordString)
    keyObj = getKey(chordString)
    qualityObj = getQuality(keyObj.remainder)
    console.log(qualityObj)
    generateChords({
      key: keyObj.key,
      quality: qualityObj.quality,
      extension: qualityObj.extension,
      string: chordString
    })
  } catch (e) {
    console.log(e)
  }
  return false;
}

$("[name='chord-input']").change(makeChordsFromForm);
$("#chord-form").on('submit', makeChordsFromForm);