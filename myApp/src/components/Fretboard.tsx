import React, { useEffect, useState } from 'react';
import { Stage, Layer, Line, Rect, Text, Circle, Group } from 'react-konva';
import { IonItem, IonLabel, IonList, IonListHeader, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonRadioGroup, IonRadio } from '@ionic/react';

import {
  strings,
  frets,
  fretBoxes,
  generateFretDegrees,
  generateChord,
  chordE7,
  chordE9,
  chordA7cShape,
  chordA9
} from './frets'
import { Root, Shape } from './types';
import { shapeMap } from './scales';

const Fretboard: React.FC = props => {
  const [boardSize, setBoardSize] = useState<number>(1)
  const [root, setRoot] = useState<Root>("E")
  const [shape, setShape] = useState<Shape>("E")
  const [quality, setQuality] = useState<string>("")
  const [extensions, setExtensions] = useState<string[]>([])
  const [alterations, setAlterations] = useState<string[]>([])

  function getChord() {
    let chord: number[][] = [[]]
    if (root === "E") {
      if (shape === "E" && quality.includes("7")) {
        chord = chordE7(quality, extensions, alterations)
      } else if (shape === "E" && quality.includes("9")) {
        chord = chordE9(quality, extensions, alterations)
      } else {
        chord = [[5,3]]
      }
    }
    if (root === "A") {
      if (shape === "C" && quality.includes("7")) {
        chord = chordA7cShape(quality, extensions, alterations)
      } else if (shape === "C" && quality.includes("9")) {
        chord = chordA9(quality, extensions, alterations)
      } else {
        chord = [[4,3]]
      }
    }
    return generateChord(chord, root)
  }

  function getChordDescription() {
    const empty = "Use the below dropdowns."
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
      if (alterations.includes("#11")) extAndAlt.push("#11")
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

  function setShapeAndClear(shape: Shape) {
    setQualityAndClear("")
    setShape(shape)
  }

  function setRootAndClear(root: Root) {
    setShapeAndClear("")
    setRoot(root)
  }

  useEffect(() => {
    setBoardSize(window.innerWidth/400 < 1.2 ? window.innerWidth/400 : 1.2)
    window.onresize = (e: Event) => {
      setBoardSize(window.innerWidth/400 < 1.2 ? window.innerWidth/400 : 1.2)
    }
  }, [])
  
  
  return (<>
    <IonItem>
      <IonLabel>Root</IonLabel>
      <IonSelect value={root} onIonChange={e => setRootAndClear(e.detail.value)} style={{minWidth: "150px"}}>
      <IonSelectOption value="E">E String</IonSelectOption>
      <IonSelectOption value="A">A String</IonSelectOption>
      </IonSelect>
    </IonItem>
    <Stage width={400} height={250} style={{transform: `scale(${boardSize})`, margin: `${boardSize}rem 0`}}>
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
        {generateFretDegrees(root).map((row, i) => (row.map((col, j) => <Text key={""+i+j} {...col} />)))}
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
            <IonRadioGroup allowEmptySelection={true} value={shape} onIonChange={e => setShapeAndClear(e.detail.value)}>
              {shapeMap[root].map(val => (
                <IonItem>
                  <IonLabel>{val} Shape</IonLabel>
                  <IonRadio slot="end" value={val} />
                </IonItem>
              ))}
            </IonRadioGroup>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>Quality</IonLabel>
              <IonSelect disabled={shape === ""} value={quality} onIonChange={e => setQualityAndClear(e.detail.value)} style={{minWidth: "80px"}}>
                <IonSelectOption value="7">{"7"}</IonSelectOption>
                <IonSelectOption value="maj7">{"maj7"}</IonSelectOption>
                <IonSelectOption value="min7">{"min7"}</IonSelectOption>
                <IonSelectOption value="9">{"9"}</IonSelectOption>
                <IonSelectOption value="maj9">{"maj9"}</IonSelectOption>
              </IonSelect>
            </IonItem>
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
                {!(root === "E" && quality.includes("9")) && !extensions.includes("13") ? <>
                  <IonSelectOption value="b5">Flat 5</IonSelectOption>
                  <IonSelectOption value="#5">Sharp 5</IonSelectOption>
                </> : null}
                {quality.includes("9") || extensions.includes("9") ? <>
                  <IonSelectOption value="b9">Flat 9</IonSelectOption>
                  {!quality.includes("min") ? <IonSelectOption value="#9">Sharp 9</IonSelectOption> : null}
                </> : null}
                {!(root === "E" && quality.includes("9")) && !extensions.includes("13") && !quality.includes("min") ? <>
                  <IonSelectOption value="#11">Sharp 11</IonSelectOption> 
                </> : null}
                {!(root === "E" && quality.includes("9")) && extensions.includes("13") ? <IonSelectOption value="b13">Flat 13</IonSelectOption> : null}
              </IonSelect>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
      
    </IonList>
  </>)
}

export default Fretboard;