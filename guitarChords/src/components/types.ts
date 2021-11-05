type Root = "E" | "A" | "D";
type Shape = "C" | "A" | "G" | "E" | "D" | "e" | ""; // lowercase e is on the D string
type Quality =
  | "6"
  | "min6"
  | "7"
  | "min7"
  | "maj7"
  | "9"
  | "min9"
  | "maj9"
  | "11"
  | "dim";
type ShapeQuality =
  | "E7"
  | "E9"
  | "G7"
  | "C7"
  | "C9"
  | "A7"
  | "D7"
  | "e7"
  | "6"
  | "dim";
type Extensions = "9" | "13";
type Alterations = "b5" | "#5" | "+7" | "b9" | "#9" | "#11" | "b13";
interface Circle {
  radius: number;
  offsetX: number | undefined;
  stroke: string;
  strokeWidth: number;
}
interface Chord {
  degree: object;
  noteCircle: Circle;
}
interface CheckButton extends HTMLButtonElement {
  ariaChecked: string;
}
interface FretboardProps {
  root: Root;
  chord: Chord[];
}
export type {
  Root,
  Shape,
  Quality,
  ShapeQuality,
  Extensions,
  Alterations,
  Chord,
  Circle,
  CheckButton,
  FretboardProps,
};
