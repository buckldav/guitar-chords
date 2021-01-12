import React, { useEffect, useState } from 'react';
import { Stage, Layer, Line, Rect, Text, Circle, Group } from 'react-konva';

import {
  strings,
  frets,
  fretBoxes,
  generateFretDegrees
} from './frets'
import { FretboardProps } from './types';

const Fretboard: React.FC<FretboardProps> = ({root, chord}) => {
  const [boardSize, setBoardSize] = useState<number>(1)

  useEffect(() => {
    setBoardSize(window.innerWidth/400 < 1.2 ? window.innerWidth/400 : 1.2)
    window.onresize = (e: Event) => {
      setBoardSize(window.innerWidth/400 < 1.2 ? window.innerWidth/400 : 1.2)
    }
  }, [])
  
  return (<>
    <Stage width={400} height={250} style={{transform: `scale(${boardSize})`, margin: `${boardSize}rem 0`}}>
      {/* Fretboard: Strings and Frets */}
      <Layer>
        {strings.map((val, i) => (
          <Group key={i}>
            <Text {...val.letter} />
            <Line {...val.string} />
          </Group>
        ))}
        {frets.map((val, i) => (
          <Line key={i} {...val} />
        ))}
      </Layer>
      {/* Chord/Scale Degrees */}
      <Layer>
        {fretBoxes.map((row, i) => (row.map((col, j) => <Rect key={""+i+j} {...col} />)))}
        {generateFretDegrees(root).map((row, i) => (row.map((col, j) => <Text key={""+i+j} {...col} />)))}
      </Layer>
      {/* Chord */}
      <Layer>
        {chord.map((val, i) => (
          <Group key={i}>
            <Text {...val.degree} />
            <Circle {...val.noteCircle} />
          </Group>
        ))}
      </Layer>
    </Stage>
  </>)
}

export default Fretboard;