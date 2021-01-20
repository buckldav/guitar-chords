import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { bulb, pulse, hammer } from 'ionicons/icons';
import Chords from './pages/Chords';
import Concepts from './pages/Concepts';
import Progressions from './pages/Progressions';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/concepts" component={Concepts} />
          <Route path="/progressions" component={Progressions} />
          <Route path="/chords" component={Chords} />
          <Redirect exact from="/" to="/chords" />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="concepts" href="/concepts">
            <IonIcon icon={bulb} />
            <IonLabel>Concepts</IonLabel>
          </IonTabButton>
          <IonTabButton tab="chords" href="/chords">
            <IonIcon icon={hammer} />
            <IonLabel>Chord Builder</IonLabel>
          </IonTabButton>
          <IonTabButton tab="progressions" href="/progressions">
            <IonIcon icon={pulse} />
            <IonLabel>Progressions</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
