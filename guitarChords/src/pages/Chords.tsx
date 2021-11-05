import React, { useState } from "react";
import {
  getChord,
  getChordShell,
  getChordDescription,
} from "../components/chords";
import { getSQ, QEAMap, rootMap, shapeMap } from "../components/scales";
import {
  Quality,
  Root,
  Shape,
  Extensions,
  Alterations,
  CheckButton,
} from "../components/types";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
  IonRadioGroup,
  IonRadio,
  IonToggle,
} from "@ionic/react";
import "./Chords.css";
import Fretboard from "../components/Fretboard";

const Chords: React.FC = () => {
  const [shell, setShell] = useState(true);
  const [root, setRoot] = useState<Root>("E");
  const [shape, setShape] = useState<Shape>("E");
  const [quality, setQuality] = useState<Quality>("7");
  const [extensions, setExtensions] = useState<string[]>([]);
  const [alterations, setAlterations] = useState<string[]>([]);

  function getValidQualities() {
    const qualities: Quality[] = Array<Quality>("7", "maj7", "min7", "dim");
    if (shell) {
      // TODO: Include these voicings for non-shell options
      qualities.push("6", "min6");
    }
    if (!shell) {
      if (shape !== ("D" as Shape) && shape !== ("e" as Shape)) {
        qualities.push("9", "maj9");
      }
      if (shape === ("A" as Shape) || shape === ("C" as Shape)) {
        qualities.push("min9");
      }
      if (shape === ("G" as Shape)) {
        qualities.splice(qualities.indexOf("min7"), 1);
      }
    }
    return qualities;
  }

  function getValidExtensions() {
    const valid = quality ? QEAMap[getSQ(shape, quality)] : false;
    return valid ? valid.extensions : Array<Extensions>();
  }

  function getValidAlterations() {
    const valid = quality ? QEAMap[getSQ(shape, quality)] : false;
    if (!valid) return Array<Alterations>();
    // Can't have b3 and #9
    if (quality.includes("min") && valid.alterations.includes("#9")) {
      valid.alterations.splice(valid.alterations.indexOf("#9"));
    }
    return valid.alterations;
  }

  function setExtensionsAndClear(extensions: string[]) {
    setAlterations([]);
    setExtensions(extensions);
  }

  function setQualityAndClear(quality: Quality) {
    setExtensionsAndClear([]);
    setQuality(quality);
  }

  function setShapeAndClear(shape: Shape) {
    setQualityAndClear("7");
    setShape(shape);
  }

  function setRootAndClear(root: Root) {
    setShapeAndClear("");
    setRoot(root);
  }

  function toggleAlterationsDisabled() {
    if (document.querySelector(".alterations")) {
      // The alert is up
      const buttons = document.querySelectorAll("button.alterations-button");
      // Disable/Activate button
      const toggleButton = (button: Element) => {
        if (!button.getAttribute("disabled")) {
          button.setAttribute("disabled", "true");
          button.classList.add("alert-checkbox-button-disabled");
        } else {
          button.removeAttribute("disabled");
          button.classList.remove("alert-checkbox-button-disabled");
        }
      };
      /**
       * Calls toggleButton for other buttons depending on the current button
       * @param value Sharp 9, Flat 5, etc. The current element's text
       * @param current The current button
       */
      const checkAndToggleByValue = (value: String, current: Element) => {
        // Special case: A7 Shape, only one alteration allowed
        if (getSQ(shape, quality) === "A7") {
          buttons.forEach((button) => {
            if (button !== current) {
              toggleButton(button);
            }
          });
        }
        // Disable other 9ths
        else if (value.includes("9")) {
          buttons.forEach((button) => {
            if (button !== current) {
              if (button.classList.contains("alt9")) {
                toggleButton(button);
              }
            }
          });
        }
        // Disable other 5ths, #11
        else if (value.includes("5") || value.includes("11")) {
          buttons.forEach((button) => {
            if (button !== current) {
              if (
                button.classList.contains("alt5") ||
                button.classList.contains("alt11")
              ) {
                toggleButton(button);
              }
            }
          });
        }
      };

      buttons.forEach((button) => {
        const checked = (button as CheckButton).ariaChecked;
        // On load
        if (checked === "true") {
          const value = ((button as Node).firstChild!.lastChild as HTMLElement)
            .innerText;
          checkAndToggleByValue(value, button as Element);
        }
        // On click
        button.addEventListener("click", (e: Event) => {
          const value = (
            (e.currentTarget as Node).firstChild!.lastChild as HTMLElement
          ).innerText;
          checkAndToggleByValue(value, e.currentTarget as Element);
        });
      });
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chord Builder</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Chord Builder</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container">
          <IonItem>
            <IonLabel>Root</IonLabel>
            <IonSelect
              value={root}
              onIonChange={(e) => setRootAndClear(e.detail.value)}
              style={{ minWidth: "150px" }}
            >
              {Object.keys(rootMap).map((val) => (
                <IonSelectOption value={val} key={val}>
                  {val} String
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <Fretboard
            root={root}
            chord={
              shell
                ? getChordShell(root, shape, quality)
                : getChord(root, shape, quality, extensions, alterations)
            }
          />

          <IonList>
            <IonListHeader>
              <IonLabel style={{ textAlign: "center" }}>
                {getChordDescription(quality, extensions, alterations)}
              </IonLabel>
            </IonListHeader>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel>Shell Voicing</IonLabel>
                    <IonToggle
                      checked={shell}
                      onIonChange={(e) => setShell(e.detail.checked)}
                    />
                  </IonItem>
                  <IonRadioGroup
                    allowEmptySelection={true}
                    value={shape}
                    onIonChange={(e) => setShapeAndClear(e.detail.value)}
                  >
                    {shapeMap[root].map((val) => (
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
                    <IonSelect
                      disabled={shape === ""}
                      value={quality}
                      onIonChange={(e) => setQualityAndClear(e.detail.value)}
                      style={{ minWidth: "80px" }}
                    >
                      {getValidQualities().map((val) => (
                        <IonSelectOption value={val} key={val}>
                          {val}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Exts.</IonLabel>
                    <IonSelect
                      disabled={shell || extensions.length === 0}
                      multiple={true}
                      value={extensions}
                      onIonChange={(e) =>
                        e.detail.value
                          ? setExtensionsAndClear(e.detail.value)
                          : null
                      }
                      style={{ minWidth: "100px" }}
                    >
                      {getValidExtensions().map((val) => (
                        <IonSelectOption value={val} key={val}>
                          Add {val}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Alts.</IonLabel>
                    <IonSelect
                      disabled={shell || alterations.length === 0}
                      multiple={true}
                      value={alterations}
                      style={{ minWidth: "100px" }}
                      onIonChange={(e) =>
                        e.detail.value ? setAlterations(e.detail.value) : null
                      }
                      onIonFocus={toggleAlterationsDisabled}
                      onIonCancel={toggleAlterationsDisabled}
                      onIonBlur={toggleAlterationsDisabled}
                      interfaceOptions={{
                        cssClass: "alterations",
                      }}
                    >
                      {getValidAlterations().map((val) =>
                        (!(
                          extensions.includes("13") &&
                          getSQ(shape, quality) !== "A7"
                        ) &&
                          (val.includes("5") || val.includes("11"))) ||
                        ((extensions.includes("9") || quality.includes("9")) &&
                          !(
                            quality.includes("min") &&
                            alterations.includes("b5")
                          ) &&
                          val.includes("9")) ||
                        (extensions.includes("13") && val.includes("13")) ? (
                          <IonSelectOption
                            value={val}
                            key={val}
                            className={`alterations-button alt${val
                              .split(/\D/)
                              .reduce((total, current) => total + current)}`}
                          >
                            {val.includes("#") ? "Sharp" : "Flat"}{" "}
                            {val
                              .split(/\D/)
                              .reduce((total, current) => total + current)}
                          </IonSelectOption>
                        ) : null
                      )}
                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Chords;
