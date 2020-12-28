import React, { useState } from 'react';
import { Stage, Layer, Rect, Line, Text } from 'react-konva';

const typography = {
  fontFamily: "monospace",
  fontSize: 20
}
const strings = ["e","b","G","D","A","E"]
const frets = {

}

const Fretboard: React.FC = props => {
  
  
  return (
    <Stage width={350} height={400}>
      <Layer>
        {[...strings,""].map((val, i) => {
          const x = [30,345]
          const leftX = 15;
          const stepX = 50;
          const topY = 50;
          const stepY = 40;
          return <>
            {i < strings.length ? 
            <>
              <Text 
                {...typography}
                text={val}
                x={10}
                y={topY+i*stepY-typography.fontSize/2}
              />
              <Line 
                strokeWidth={2}
                stroke="grey"
                points={[x[0],topY+i*stepY, x[1],topY+i*stepY]}
              />
            </> : null
            }
            <Line 
              strokeWidth={2}
              stroke="grey"
              points={[x[0]+i*stepX+leftX,topY, x[0]+i*stepX+leftX,topY+5*stepY]}
            />
          </>
        })}
      </Layer>
    </Stage>
  )
}

export default Fretboard;