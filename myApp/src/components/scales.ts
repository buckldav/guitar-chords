import { Shape } from './types'
const degrees = ["1", "b9", "9", "b3\n#9", "3", "4\n11", "b5\n#11", "5", "#5\nb13", "6\n13", "b7", "7"]
const rootMap = {
  "E": "6\n13",
  "A": "3"
}
const shapeMap = {
  "E": Array<Shape>("E", "G"),
  "A": Array<Shape>("C", "A")
}
// const chromaticSharps = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
// const chromaticFlats = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
// const chromaticDoubleSharps = ["Bx", "C#", "D", "D#", "E", "Ex", "F#", "Fx", "G#", "A", "A#", "B"]
// const chromaticDoubleFlats = ["C", "Db", "D", "Eb", "Fb", "F", "Gb", "G", "Ab", "Bbb", "Bb", "Cbb"]


export {
  degrees,
  rootMap,
  shapeMap
}