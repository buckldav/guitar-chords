import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Concepts.css";
import concepts from "../markdown/concepts.md";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

type HeadingRendererProps = {
  level: number;
};

const Concepts: React.FC = () => {
  const [md, setMd] = useState("");

  function flatten(text: string, child: string | any): string {
    return typeof child === "string"
      ? text + child
      : React.Children.toArray(child.props.children).reduce(flatten, text);
  }

  function HeadingRenderer(props: PropsWithChildren<HeadingRendererProps>) {
    var children = React.Children.toArray(props.children);
    var text = children.reduce(flatten, "");
    var slug = text.toLowerCase().replace(/\W/g, "-");
    return React.createElement("h" + props.level, { id: slug }, props.children);
  }

  useEffect(() => {
    fetch(concepts)
      .then((data) => data.text())
      .then((text) => {
        setMd(text);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Concepts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Concepts</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="md-container">
          <ReactMarkdown
            plugins={[gfm]}
            renderers={{ heading: HeadingRenderer }}
          >
            {md}
          </ReactMarkdown>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Concepts;
