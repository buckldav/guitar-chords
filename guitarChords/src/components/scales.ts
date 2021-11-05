import { Shape, Extensions, Alterations, Quality, ShapeQuality } from "./types";
const degrees = [
  "1",
  "b9",
  "9",
  "b3\n#9",
  "3",
  "4\n11",
  "b5\n#11",
  "5",
  "#5\nb13",
  "6\n13",
  "b7",
  "7",
];
const rootMap = {
  E: "6\n13",
  A: "3",
  D: "7",
};
const shapeMap = {
  E: Array<Shape>("E", "G"),
  A: Array<Shape>("C", "A"),
  D: Array<Shape>("D", "e"),
};
const QEAMap = {
  E7: {
    extensions: Array<Extensions>("9", "13"),
    alterations: Array<Alterations>("b5", "#5", "b9", "#9", "#11", "b13"),
  },
  G7: {
    extensions: Array<Extensions>("9"),
    alterations: Array<Alterations>("#5", "b9", "#9"),
  },
  E9: {
    extensions: Array<Extensions>("13"),
    alterations: Array<Alterations>("b9", "#9"),
  },
  G9: {
    extensions: Array<Extensions>("13"),
    alterations: Array<Alterations>("b9", "#9"),
  },
  A7: {
    extensions: Array<Extensions>("13"),
    alterations: Array<Alterations>("b5", "#5", "b9", "#9", "#11", "b13"),
  },
  C7: {
    extensions: Array<Extensions>("9"),
    alterations: Array<Alterations>("b9", "#9"),
  },
  A9: {
    extensions: Array<Extensions>("13"),
    alterations: Array<Alterations>("b5", "#5", "b9", "#9", "#11", "b13"),
  },
  C9: {
    extensions: Array<Extensions>("13"),
    alterations: Array<Alterations>("b5", "#5", "b9", "#9", "#11", "b13"),
  },
  D7: {
    extensions: Array<Extensions>(),
    alterations: Array<Alterations>("b5", "#5"),
  },
  e7: {
    extensions: Array<Extensions>("9"),
    alterations: Array<Alterations>("b9", "#9"),
  },
  "6": {
    extensions: Array<Extensions>("9"),
    alterations: Array<Alterations>(),
  },
  dim: {
    extensions: Array<Extensions>(),
    alterations: Array<Alterations>(),
  },
};
const getSQ = (shape: Shape, quality: Quality): ShapeQuality => {
  if (quality.includes("6")) return "6" as ShapeQuality;
  else if (quality.includes("dim")) return "dim" as ShapeQuality;
  else
    return (shape +
      quality
        .split(/\D/)
        .reduce((total, current) => total + current)) as ShapeQuality;
};
// const chromaticSharps = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
// const chromaticFlats = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
// const chromaticDoubleSharps = ["Bx", "C#", "D", "D#", "E", "Ex", "F#", "Fx", "G#", "A", "A#", "B"]
// const chromaticDoubleFlats = ["C", "Db", "D", "Eb", "Fb", "F", "Gb", "G", "Ab", "Bbb", "Bb", "Cbb"]

export { degrees, rootMap, shapeMap, QEAMap, getSQ };
