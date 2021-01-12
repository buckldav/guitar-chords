import { colors, noteCircle, fretBoxes, strings, generateFretDegrees } from "./frets"
import { Shape, Quality, Root, Chord } from './types'

function generateChord(notes: number[][], root: Root) : Chord[] {
  return notes.map((note) => ({
      degree: {
        ...generateFretDegrees(root)[note[0]][note[1]],
        fill: colors.black,
        fontStyle: "bold"
      },
      noteCircle: {
        ...noteCircle,
        x: fretBoxes[note[0]][note[1]].x,
        y: strings[note[0]].string.points[1]
      }
    })
  )
}

function getChordDescription(quality: Quality, extensions: string[], alterations: string[]) {
  const empty = "Use the below dropdowns."
    let strQuality = ""
    const extAndAlt = []

    if (quality.includes("7") || quality.includes("9")) {
      if (quality.includes("maj")) {
        strQuality = "Major"
      } else if (quality.includes("min")) {
        strQuality = "Minor"
      } else {
        strQuality = "Dominant"
      }
      if (!alterations.includes("maj7")) extAndAlt.push("7")
      if (alterations.includes("b5")) extAndAlt.push("b5")
      if (alterations.includes("#5")) extAndAlt.push("#5")
      if (quality.includes("9") || extensions.includes("9")) {
        if (alterations.includes("b9")) extAndAlt.push("b9")
        else if (alterations.includes("#9")) extAndAlt.push("#9")
        else extAndAlt.push("9")
      }
      if (alterations.includes("#11")) extAndAlt.push("#11")
      if (extensions.includes("13")) {
        if (alterations.includes("b13")) extAndAlt.push("b13")
        else extAndAlt.push("13")
      }
    }
    return strQuality !== "" ? extAndAlt.length !== 0 ? 
      `${strQuality} ${extAndAlt.reduce((total, current, i) => (total + (i<extAndAlt.length ? ", ": "") + current))}` 
      : strQuality 
      : empty
}

const chordE7 = (quality: Quality, extensions: string[], alterations: string[]) => {
  let chord = [[5,3],[3,3],[2,4],[1,3]]

  if (quality.includes("maj")) chord[1] = [3,4]
  else if (quality.includes("min")) chord[2] = [2,3]

  if (extensions.includes("9")) chord.push([0,5])
  if (extensions.includes("13")) chord[3] = [1,5]

  if (alterations.includes("b5") || alterations.includes("#11")) chord[3] = [1,2]
  else if (alterations.includes("#5") || alterations.includes("b13")) chord[3] = [1,4]
  if (alterations.includes("b9")) chord[4] = [0,4]
  else if (alterations.includes("#9")) chord[4] = [0,6]

  return chord
}

const chordE9 = (quality: Quality, extensions: string[], alterations: string[]) => {
  let chord = [[5,3],[3,3],[2,2],[1,0]]

  if (quality.includes("maj")) chord[1] = [3,4]

  if (extensions.includes("13")) chord.push([0,0])

  if (alterations.includes("b9")) chord[2] = [2,1]
  else if (alterations.includes("#9")) chord[2] = [2,3]

  return chord
}

const chordG7 = (quality: Quality, extensions: string[], alterations: string[]) => {
  let chord = [[5,3],[3,0],[2,0],[1,0],[0,3]]

  if (quality.includes("7")) {
    if (quality.includes("maj")) chord[4] = [0,2]
    else chord[4] = [0,1]
  }

  if (extensions.includes("9")) chord[2] = [2,2]

  if (alterations.includes("#5")) chord[1] = [3,1]
  if (alterations.includes("b9")) chord[2] = [2,1]
  else if (alterations.includes("#9")) chord[2] = [2,3]

  return chord
}

const chordC7 = (quality: Quality, extensions: string[], alterations: string[]) => {
  let chord = [[4,3],[3,2],[2,3],[1,1]]

  if (quality.includes("maj")) {
    chord[2] = [2,0]
    chord[3] = [1,0]
  } else if (quality.includes("min")) {
    chord[1] = [3,1]
  }

  if (extensions.includes("9")) {
    chord[3] = [1,3]
    if (alterations.includes("b9")) chord[3] = [1,2]
    else if (alterations.includes("b9")) chord[3] = [1,4]
  }
  
  return chord
}

const chordC9 = (quality: Quality, extensions: string[], alterations: string[]) => {
  let chord = [[4,3],[3,2],[2,3],[1,3]]

  if (quality.includes("maj")) chord[2] = [2,4]
  else if (quality.includes("min")) chord[1] = [3,1]

  if (extensions.includes("13") && !alterations.includes("b13")) chord.push([0,5])

  else if (alterations.includes("b5") || alterations.includes("#11")) chord.push([0,2])
  else if (alterations.includes("#5") || alterations.includes("b13")) chord.push([0,4])
  if (alterations.includes("b9")) chord[3] = [1,2]
  else if (alterations.includes("#9")) chord[3] = [1,4]

  return chord
}

const chordA7 = (quality: Quality, extensions: string[], alterations: string[]) => {
  let chord = [[4,3],[3,5],[2,3],[1,5]]
  
  if (quality.includes("maj")) chord[2] = [2,4]
  else if (quality.includes("min")) chord[3] = [1,4]

  if (extensions.includes("13") && !alterations.includes("b13")) chord.push([0,5])

  else if (alterations.includes("b5") || alterations.includes("#11")) chord[1] = [3,4]
  else if (alterations.includes("#5") || alterations.includes("b13")) chord[1] = [3,6]

  return chord
}

const chordD7 = (quality: Quality, extensions: string[], alterations: string[]) => {
  let chord = [[3,3],[2,5],[1,4],[0,5]]

  if (quality.includes("maj")) chord[2] = [1,5]
  else if (quality.includes("min")) chord[3] = [0,4]

  if (alterations.includes("b5")) chord[1] = [2,4]
  else if (alterations.includes("#5")) chord[1] = [2,6]

  return chord
}

const chord_e7 = (quality: Quality, extensions: string[], alterations: string[]) => {
  let chord = [[3,3],[2,2],[1,4],[0,1]]

  if (quality.includes("maj")) chord[2] = [1,5]
  else if (quality.includes("min")) chord[1] = [2,1]

  if (extensions.includes("9")) chord[3] = [0,3]

  if (alterations.includes("b9")) chord[3] = [0,2]
  else if (alterations.includes("#9")) chord[3] = [0,4]

  return chord
}

function getChord(root: Root, shape: Shape, quality: Quality, extensions: string[], alterations: string[]) {
  let chord: number[][] = [[]]
  if (root === "E") {
    if (shape === "E" && quality.includes("7")) {
      chord = chordE7(quality, extensions, alterations)
    } else if (shape === "G" && quality.includes("7")) {
      chord = chordG7(quality, extensions, alterations)
    } else if (quality.includes("9")) {
      chord = chordE9(quality, extensions, alterations)
    } else {
      chord = [[5,3]]
    }
  }
  if (root === "A") {
    if (shape === "C" && quality.includes("7")) {
      chord = chordC7(quality, extensions, alterations)
    } else if (shape === "A" && quality.includes("7")) {
      chord = chordA7(quality, extensions, alterations)
    } else if (quality.includes("9")) {
      chord = chordC9(quality, extensions, alterations)
    } else {
      chord = [[4,3]]
    }
  }
  if (root === "D") {
    if (shape === "D") {
      chord = chordD7(quality, extensions, alterations)
    } else if (shape === "e") {
      chord = chord_e7(quality, extensions, alterations)
    } else {
      chord = [[3,3]]
    }
  }
  return generateChord(chord, root)
}

function numbersToABC() {
  return "[CEG]"
}

export {
  getChordDescription,
  getChord,
  numbersToABC
}