import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Progressions.css';
import Construction from '../assets/construction.svg';

const Progressions: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Progressions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Progressions</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "1em"
        }}>
          <h1>Under Construction</h1>
          <p>Come back soon!</p>
          <img src={Construction} alt="under construction" width="100%" style={{maxWidth: "600px"}} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Progressions;
