import { degrees } from './scales';

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
  topY: 50,
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
const fretDegrees = fretBoxes.map((row, i) => row.map((col, j) => {
  const start = degrees.indexOf("6\n13")
  console.log(start)
  return {
    ...col,
    fill: colors.blue,
    text: degrees[(start+stringIntervals[i]+j) % degrees.length],
    fontSize: 12,
    align: "center",
    verticalAlign: "middle"
  }
}))
interface CircleType {
  radius: number;
  offsetX: number | undefined;
  stroke: string;
  strokeWidth: number;
}
const noteCircle: CircleType = {
  radius: 15,
  offsetX: -12.5,
  stroke: colors.dark,
  strokeWidth: 3
}

interface ChordInterface {
  degree: object;
  noteCircle: CircleType;
}
function generateChord(notes: number[][]) : ChordInterface[] {
  return notes.map((note) => ({
      degree: {
        ...fretDegrees[note[0]][note[1]],
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

export {
  colors,
  typography,
  typographyDegrees,
  fretboardDimensions,
  stringNotes,
  strings,
  frets,
  fretBoxes,
  fretDegrees,
  noteCircle,
  generateChord
}
