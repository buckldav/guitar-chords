import React, { Fragment, useState } from 'react';
import { Stage, Layer, Line, Rect, Text, Circle, Group } from 'react-konva';

const typography = {
  fontFamily: "monospace",
  fontSize: 20
}
const typographyDegrees = {
  fontFamily: typography.fontFamily,
  fontSize: 20
}
const fretboardDimensions = {
  x: [30,345],
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
      stroke: "grey",
      points: [x[0],topY+i*stepY, x[1],topY+i*stepY] // [x1,y1, x2,y2...]
    }
  }
})
const frets = [...Array(7)].map((val, i) => {
  const { x, leftX, stepX, topY, stepY } = fretboardDimensions
  return {
    strokeWidth: 2,
    stroke: "grey",
    points: [x[0]+i*stepX+leftX,topY, x[0]+i*stepX+leftX,topY+(strings.length-1)*stepY] 
  }
})
const fretDegrees = strings.map((string) => {
  return frets.map((fret) => {
    return {
      width: fretboardDimensions.stepX/2,
      height: fretboardDimensions.stepY/2,
      x: fret.points[0]+fretboardDimensions.stepX/4, 
      y: string.string.points[1]-fretboardDimensions.stepY/4,
      fill: "white"
    }
  })
})

const noteCircle = {
  radius: 15,
  offsetX: -12.5,
  stroke: "black",
  strokeWidth: 3
}

const Fretboard: React.FC = props => {
  const [notes, setNotes] = useState([
    {
      degrees: {
        ...typographyDegrees,
        text: "G",
        x: fretDegrees[5][2].x,
        y: strings[5].letter.y
      },
      noteCircle: {
        ...noteCircle,
        x: fretDegrees[5][2].x,
        y: strings[5].string.points[1]
      }
    }
  ])
  
  return (
    <Stage width={350} height={400}>
      <Layer>
        {strings.map((val, i) => (
          <Fragment key={i}>
            <Text {...val.letter} />
            <Line {...val.string} />
          </Fragment>
        ))}
        {frets.map((val, i) => (
          <Line key={i} {...val} />
        ))}
      </Layer>
      <Layer>
        {fretDegrees.map((row, i) => (row.map((col, j) => (<Rect key={""+i+j} {...col} />))))}
      </Layer>
      <Layer>
        {notes.map((val, i) => (
          <Group 
            key={i}
            draggable
            onMouseOver={e => { document.body.style.cursor = "move" }}
            onMouseOut={e => { document.body.style.cursor = "" }}
          >
            <Text {...val.degrees} />
            <Circle {...val.noteCircle} />
          </Group>
        ))}
      </Layer>
    </Stage>
  )
}

export default Fretboard;