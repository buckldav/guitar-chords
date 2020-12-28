import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Chords.css';
import Fretboard from '../components/Fretboard';

const Chords: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Jazz Chords</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Jazz Chords</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container">
          <Fretboard />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Chords;
