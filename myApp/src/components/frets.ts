import { degrees, rootMap } from './scales';
import { Root, Circle, Chord } from './types'

const colors = {
  white: "#FFFFFF",
  light: "#DCDCDD",
  medium: "#C5C3C6",
  dark: "#46494C",
  black: "#000000",
  slate: "#4C5C68",
  blue: "#1985A1"
}
const typography = {
  fontFamily: "monospace",
  fontSize: 20,
  fill: colors.slate
}
const typographyDegrees = {
  fontFamily: typography.fontFamily,
  fontSize: 20,
  fill: colors.medium
}
const fretboardDimensions = {
  x: [30,395],
  leftX: 15,
  stepX: 50,
  topY: 20,
  stepY: 40
}
const stringNotes = ["e","b","G","D","A","E"]
const strings = stringNotes.map((val, i) => {
  const { x, topY, stepY } = fretboardDimensions
  return {
    letter: {
      ...typography,
      text: val,
      x: 10,
      y: topY+i*stepY-typography.fontSize/2
    },
    string: {
      strokeWidth: 2,
      stroke: colors.medium,
      points: [x[0],topY+i*stepY, x[1],topY+i*stepY] // [x1,y1, x2,y2...]
    }
  }
})
const frets = [...Array(8)].map((val, i) => {
  const { x, leftX, stepX, topY, stepY } = fretboardDimensions
  return {
    strokeWidth: 2,
    stroke: colors.medium,
    points: [x[0]+i*stepX+leftX,topY, x[0]+i*stepX+leftX,topY+(strings.length-1)*stepY] 
  }
})
const fretBoxes = strings.map((string) => {
  return frets.map((fret) => {
    return {
      width: fretboardDimensions.stepX/2,
      height: fretboardDimensions.stepY/1.5,
      x: fret.points[0]+fretboardDimensions.stepX/4, 
      y: string.string.points[1]-fretboardDimensions.stepY/4,
      fill: colors.white
    }
  })
})
const stringIntervals = [0,7,3,10,5,0]
const generateFretDegrees = (root: Root): object[][] => fretBoxes.map((row, i) => row.map((col, j) => {
  const start = degrees.indexOf(rootMap[root])
  // console.log(start)
  return {
    ...col,
    fill: colors.blue,
    text: degrees[(start+stringIntervals[i]+j) % degrees.length],
    fontSize: 12,
    align: "center",
    verticalAlign: "middle"
  }
}))
const noteCircle: Circle = {
  radius: 15,
  offsetX: -12.5,
  stroke: colors.dark,
  strokeWidth: 3
}

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

const chordE7 = (quality: string, extensions: string[], alterations: string[]) => {
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

const chordE9 = (quality: string, extensions: string[], alterations: string[]) => {
  let chord = [[5,3],[3,3],[2,2],[1,0]]

  if (quality.includes("maj")) chord[1] = [3,4]

  if (extensions.includes("13")) chord.push([0,0])

  if (alterations.includes("b9")) chord[2] = [2,1]
  else if (alterations.includes("#9")) chord[2] = [2,3]

  return chord
}

const chordA7cShape = (quality: string, extensions: string[], alterations: string[]) => {
  let chord = [[4,3],[3,2],[2,3],[1,1]]

  if (quality.includes("maj")) {
    chord[2] = [2,0]
    chord[3] = [1,0]
  } else if (quality.includes("min")) {
    chord[1] = [3,1]
  }
  
  return chord
}

const chordA9 = (quality: string, extensions: string[], alterations: string[]) => {
  let chord = [[4,3],[3,2],[2,3],[1,3]]

  if (quality.includes("maj")) chord[2] = [2,4]
  else if (quality.includes("min")) chord[1] = [1,1]

  if (extensions.includes("13") && !alterations.includes("b13")) chord.push([0,5])

  else if (alterations.includes("b5") || alterations.includes("#11")) chord.push([0,2])
  else if (alterations.includes("#5") || alterations.includes("b13")) chord.push([0,4])
  if (alterations.includes("b9")) chord[3] = [1,2]
  else if (alterations.includes("#9")) chord[3] = [1,4]

  return chord
}

const chordA7aShape = (quality: string, extensions: string[], alterations: string[]) => {
  let chord = [[4,3],[3,5],[2,3],[1,5]]
  
  return chord
}

export {
  colors,
  typography,
  typographyDegrees,
  fretboardDimensions,
  stringNotes,
  strings,
  frets,
  fretBoxes,
  noteCircle,
  generateFretDegrees,
  generateChord,
  chordE7,
  chordE9,
  chordA7cShape,
  chordA7aShape,
  chordA9
}
