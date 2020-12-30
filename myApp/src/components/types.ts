type Root = "E" | "A"
type Shape = "C" | "A" | "G" | "E" | "D" | ""
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
export type { Root, Shape, Chord, Circle }