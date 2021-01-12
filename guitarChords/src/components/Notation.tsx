import React from 'react'
import Abcjs from 'react-abcjs'
import { numbersToABC } from './chords'

const Notation: React.FC = (props) => <Abcjs
  abcNotation={
    'T:Chord\n[CE_G]'
  }
  parserParams={{}}
  renderParams={{ viewportHorizontal: true }}
/>

export default Notation