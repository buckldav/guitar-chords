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
  chordG7,
  chordA7,
  chordC7,
  chordC9
} from './frets'
import { Quality, Root, Shape, Extensions, Alterations, CheckButton } from './types';
import { getSQ, QEAMap, rootMap, shapeMap } from './scales';

const Fretboard: React.FC = props => {
  const [boardSize, setBoardSize] = useState<number>(1)
  const [root, setRoot] = useState<Root>("E")
  const [shape, setShape] = useState<Shape>("E")
  const [quality, setQuality] = useState<Quality>("")
  const [extensions, setExtensions] = useState<string[]>([])
  const [alterations, setAlterations] = useState<string[]>([])

  function getChord() {
    let chord: number[][] = [[]]
    if (root === "E") {
      if (shape === "E" && quality.includes("7")) {
        chord = chordE7(quality, extensions, alterations)
      } else if (shape === "G" && quality.includes("7")) {
        chord = chordG7(quality, extensions, alterations)
      } else if (quality.includes("9")) {
        chord = chordE9(quality, extensions, alterations)
      } else {
        chord = [[5,3]]
      }
    }
    if (root === "A") {
      if (shape === "C" && quality.includes("7")) {
        chord = chordC7(quality, extensions, alterations)
      } else if (shape === "A" && quality.includes("7")) {
        chord = chordA7(quality, extensions, alterations)
      } else if (quality.includes("9")) {
        chord = chordC9(quality, extensions, alterations)
      } else {
        chord = [[4,3]]
      }
    }
    if (root === "D") {
      chord = [[3,3]]
    }
    return generateChord(chord, root)
  }

  function getValidExtensions() {
    const valid = QEAMap[getSQ(shape, quality)]
    return valid ? valid.extensions : Array<Extensions>()
  }

  function getValidAlterations() {
    const valid = QEAMap[getSQ(shape, quality)]
    return valid ? valid.alterations : Array<Alterations>()
  }

  function getChordDescription() {
    const empty = "Use the below dropdowns."
    let strQuality = ""
    const extAndAlt = []

    if (quality.includes("7") || quality.includes("9")) {
      if (quality.includes("maj")) {
        strQuality = "Major"
      } else if (quality.includes("min")) {
        strQuality = "Minor"
      } else {
        strQuality = "Dominant"
      }
      if (!alterations.includes("maj7")) extAndAlt.push("7")
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
      `${strQuality} ${extAndAlt.reduce((total, current, i) => (total + (i<extAndAlt.length ? ", ": "") + current))}` 
      : strQuality 
      : empty
  }

  function setExtensionsAndClear(extensions: string[]) {
    setAlterations([])
    setExtensions(extensions)
  }

  function setQualityAndClear(quality: Quality) {
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

  function toggleAlterationsDisabled() {
    if (document.querySelector(".alterations")) {
      // The alert is up
      console.log(document.querySelectorAll("button.alterations-button"))
      const buttons = document.querySelectorAll("button.alterations-button")
      buttons.forEach(val => {
        val.addEventListener("click", (e: Event) => {
          const unchecked = (e.currentTarget as CheckButton).ariaChecked
          const value = ((e.currentTarget as Node).firstChild!.lastChild as HTMLElement).innerText
          console.log("Unchecked", unchecked, "Value", value)
        })
      })
    }
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
        {Object.keys(rootMap).map(val => <IonSelectOption value={val} key={val}>{val} String</IonSelectOption>)}
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
                <IonItem key={val}>
                  <IonLabel>{val.toUpperCase()} Shape</IonLabel>
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
              <IonSelect disabled={quality === ""} multiple={true} value={extensions} onIonChange={e => e.detail.value ? setExtensionsAndClear(e.detail.value) : null} style={{minWidth: "100px"}}>
                {getValidExtensions().map(val => <IonSelectOption value={val} key={val}>Add {val}</IonSelectOption>)}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Alts.</IonLabel>
              <IonSelect 
                disabled={quality === ""} 
                multiple={true} 
                value={alterations} 
                style={{minWidth: "100px"}}
                onIonChange={e => e.detail.value ? setAlterations(e.detail.value) : null} 
                onIonFocus={toggleAlterationsDisabled}
                onIonCancel={toggleAlterationsDisabled}
                onIonBlur={toggleAlterationsDisabled}
                interfaceOptions={{
                  cssClass: "alterations"
                }}
              >
                {getValidAlterations().map(val => 
                  (!(extensions.includes("13") && getSQ(shape, quality) !== "A7") && (val.includes("5") || val.includes("11"))) ||
                  ((extensions.includes("9") || quality.includes("9")) && !(quality.includes("min") && alterations.includes("b5")) && val.includes("9")) ||
                  (extensions.includes("13") && val.includes("13")) ?
                  <IonSelectOption value={val} key={val} className="alterations-button">
                    {val.includes("#") ? "Sharp" : "Flat"} {val.split(/\D/).reduce((total, current) => total+current)}
                  </IonSelectOption>
                : null)}
              </IonSelect>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
      
    </IonList>
  </>)
}

export default Fretboard;