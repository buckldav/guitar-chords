import React, { useState } from 'react';
import { Stage, Layer, Line, Rect, Text, Circle, Group } from 'react-konva';
import { IonContent, IonItem, IonLabel, IonList, IonListHeader, IonSelect, IonSelectOption, IonPage, IonItemDivider } from '@ionic/react';

import {
  strings,
  frets,
  fretBoxes,
  fretDegrees,
  generateChord
} from './frets'

const Fretboard: React.FC = props => {
  const [root, setRoot] = useState("E")
  const [quality, setQuality] = useState("7")

  const getChord = () => {
    if (root === "E") {
      if (quality === "7") return generateChord([[5,3],[3,3],[2,4],[1,3]])
      if (quality === "maj7") return generateChord([[5,3],[3,4],[2,4],[1,3]])
      if (quality === "min7") return generateChord([[5,3],[3,3],[2,3],[1,3]])
      if (quality === "9") return generateChord([[5,3],[3,3],[2,2],[1,0]])
    }
    return generateChord([[]])
  }
  
  return (<>
    <Stage width={400} height={400} style={{transform: "scale(1)"}}>
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
      <Layer>
        {fretBoxes.map((row, i) => (row.map((col, j) => <Rect key={""+i+j} {...col} />)))}
        {fretDegrees.map((row, i) => (row.map((col, j) => <Text key={""+i+j} {...col} />)))}
      </Layer>
      <Layer>
        {getChord().map((val, i) => (
          <Group key={i}>
            <Text {...val.degree} />
            <Circle {...val.noteCircle} />
          </Group>
        ))}
      </Layer>
    </Stage>
    <IonList>
      <IonListHeader>
        <IonLabel>
          Select Starter Chord
        </IonLabel>
      </IonListHeader>

      <IonItem>
        <IonLabel>Chord Root</IonLabel>
        <IonSelect value={root} onIonChange={e => setRoot(e.detail.value)}>
          <IonSelectOption value="E">E String</IonSelectOption>
        </IonSelect>
      </IonItem>

      <IonItem>
        <IonLabel>Chord Quality</IonLabel>
        <IonSelect value={quality} onIonChange={e => setQuality(e.detail.value)}>
          <IonSelectOption value="7">{"7"}</IonSelectOption>
          <IonSelectOption value="maj7">{"maj7"}</IonSelectOption>
          <IonSelectOption value="min7">{"min7"}</IonSelectOption>
          <IonSelectOption value="9">{"9"}</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItemDivider>Current Chord</IonItemDivider>
      <IonItem>{quality} on the {root} string</IonItem>
    </IonList>
  </>)
}

export default Fretboard;