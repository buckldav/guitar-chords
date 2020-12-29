import React, { useEffect, useState } from 'react';
import { Stage, Layer, Line, Rect, Text, Circle, Group } from 'react-konva';
import { IonItem, IonLabel, IonList, IonListHeader, IonSelect, IonSelectOption, IonItemDivider, IonGrid, IonRow, IonCol } from '@ionic/react';

import {
  strings,
  frets,
  fretBoxes,
  fretDegrees,
  generateChord
} from './frets'

const Fretboard: React.FC = props => {
  const [scale, setScale] = useState<number>(1)
  const [root, setRoot] = useState<string>("E")
  const [quality, setQuality] = useState<string>("")
  const [extensions, setExtensions] = useState<string[]>([])
  const [alterations, setAlterations] = useState<string[]>([])

  function getChord() {
    let chord = [[5,3],[3,3],[2,4],[1,3]]
    if (root === "E") {
      if (quality.includes("7")) {
        chord = [[5,3],[3,3],[2,4],[1,3]]

        if (quality.includes("maj")) chord[1] = [3,4]
        else if (quality.includes("min")) chord[2] = [2,3]

        if (extensions.includes("9")) chord.push([0,5])
        if (extensions.includes("13")) chord[3] = [1,5]

        if (alterations.includes("b5")) chord[3] = [1,2]
        else if (alterations.includes("#5") || alterations.includes("b13")) chord[3] = [1,4]
        if (alterations.includes("b9")) chord[4] = [0,4]
        else if (alterations.includes("#9")) chord[4] = [0,6]
      } 
      else if (quality.includes("9")) {
        chord = [[5,3],[3,3],[2,2],[1,0]]

        if (quality.includes("maj")) chord[1] = [3,4]

        if (extensions.includes("13")) chord.push([0,0])

        if (alterations.includes("b9")) chord[2] = [2,1]
        else if (alterations.includes("#9")) chord[2] = [2,3]
      } 
      else {
        chord = [[5,3]]
      }
    }
    return generateChord(chord)
  }

  function getChordDescription() {
    const empty = "Use the below dropdowns"
    let strQuality = ""
    const extAndAlt = []

    if (quality.includes("7") || quality.includes("9")) {
      if (quality.includes("maj")) {
        strQuality = "Major 7th"
      } else if (quality.includes("min")) {
        strQuality = "Minor 7th"
      } else {
        strQuality = "Dominant 7th"
      }
      if (alterations.includes("b5")) extAndAlt.push("b5")
      if (alterations.includes("#5")) extAndAlt.push("#5")
      if (quality.includes("9") || extensions.includes("9")) {
        if (alterations.includes("b9")) extAndAlt.push("b9")
        else if (alterations.includes("#9")) extAndAlt.push("#9")
        else extAndAlt.push("9")
      }
      if (extensions.includes("13")) {
        if (alterations.includes("b13")) extAndAlt.push("b13")
        else extAndAlt.push("13")
      }
    }
    return strQuality !== "" ? extAndAlt.length !== 0 ? 
      `${strQuality} with ${extAndAlt.reduce((total, current, i) => (total + (i<extAndAlt.length ? ", ": "") + current))}` 
      : strQuality 
      : empty
  }

  function setExtensionsAndClear(extensions: string[]) {
    setAlterations([])
    setExtensions(extensions)
  }

  function setQualityAndClear(quality: string) {
    setExtensionsAndClear([])
    setQuality(quality)
  }

  function setRootAndClear(root: string) {
    setQualityAndClear("")
    setRoot(root)
  }

  useEffect(() => {
    setScale(window.innerWidth/400 < 1.2 ? window.innerWidth/400 : 1.2)
    window.onresize = (e: Event) => {
      setScale(window.innerWidth/400 < 1.2 ? window.innerWidth/400 : 1.2)
    }
  }, [])
  
  
  return (<>
    <IonItem>
      <IonLabel>Root</IonLabel>
      <IonSelect value={root} onIonChange={e => setRootAndClear(e.detail.value)} style={{minWidth: "150px"}}>
        <IonSelectOption value="E">E String</IonSelectOption>
      </IonSelect>
    </IonItem>
    <Stage width={400} height={250} style={{transform: `scale(${scale})`, margin: `${scale}rem 0`}}>
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
        <IonLabel style={{textAlign: "center"}}>
          {getChordDescription()}
        </IonLabel>
      </IonListHeader>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Key</IonLabel>
              <IonSelect disabled={true} value={"any"} style={{minWidth: "80px"}}>
                <IonSelectOption value="any">{"any"}</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Quality</IonLabel>
              <IonSelect value={quality} onIonChange={e => setQualityAndClear(e.detail.value)} style={{minWidth: "80px"}}>
                <IonSelectOption value="7">{"7"}</IonSelectOption>
                <IonSelectOption value="maj7">{"maj7"}</IonSelectOption>
                <IonSelectOption value="min7">{"min7"}</IonSelectOption>
                <IonSelectOption value="9">{"9"}</IonSelectOption>
                <IonSelectOption value="maj9">{"maj9"}</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>Exts.</IonLabel>
              <IonSelect disabled={quality === ""} multiple={true} value={extensions} onIonChange={e => setExtensionsAndClear(e.detail.value)} style={{minWidth: "100px"}}>
                {!quality.includes("9") ? <IonSelectOption value="9">Add 9</IonSelectOption> : null}
                <IonSelectOption value="13">Add 13</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Alts.</IonLabel>
              <IonSelect disabled={quality === ""} multiple={true} value={alterations} onIonChange={e => setAlterations(e.detail.value)} style={{minWidth: "100px"}}>
                {!quality.includes("9") && !extensions.includes("13") ? <>
                  <IonSelectOption value="b5">Flat 5</IonSelectOption>
                  <IonSelectOption value="#5">Sharp 5</IonSelectOption>
                </> : null}
                {quality.includes("9") || extensions.includes("9") ? <>
                  <IonSelectOption value="b9">Flat 9</IonSelectOption>
                  <IonSelectOption value="#9">Sharp 9</IonSelectOption>
                </> : null}
                {!quality.includes("9") && extensions.includes("13") ? <IonSelectOption value="b13">Flat 13</IonSelectOption> : null}
              </IonSelect>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
      
    </IonList>
  </>)
}

export default Fretboard;