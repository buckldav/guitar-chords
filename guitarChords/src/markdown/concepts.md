# Motivation and Usage
This app is intended to give guitar players a better understanding of chord theory, voice leading, and how to navigate the fretboard. Many genres of music, especially jazz, classical, R&B, progressive rock, and metal demand that a guitar player know many chords beyond the basic major and minor chords that we all play when we are starting out. In contrast to the approach of learning chords by looking up and memorizing dozens of chord diagrams, this app will show you how to take a few basic shapes and modify them slightly to include more complex harmonies. In the long run, this approach will allow you to learn and compose songs faster and be able to see and play patterns in the fretboard that you may not have seen before.

It is useful to understand a few simple theory concepts as you learn to build chords. We recommend taking a moment to understand the following to supplement your use of the [Chord Builder](/chords) module.

# Basic Chord Theory
### Chord and Scale Degrees
Know that notes in chords and scales can be represented as numbers. Using numbers allows us to communicate musical ideas that work across any key. For example, a C major scale is made up of the following unique notes: ```C D E F G A B```. Mapping these notes to numbers looks like this:
```
C D E F G A B
1 2 3 4 5 6 7
```
Taking this scale and extending it to two octaves gives us this:
```
C D E F G A B C D E  F  G  A  B  C
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
```

### Stacking Thirds
The first way to learn how build chords is by stacking thirds. The two octave scale becomes relevant here as we can take the scale and skip all of the even-numbered notes to get this pattern:
```
C E G B D F  A
1 3 5 7 9 11 13
```
The 9th, 11th, and 13th are known as "upper extensions" or "color notes" because they are not essential to the *quality* of the chord (see below) but can add texture, harmony, and feeling to a chord.

### Chord Quality
There are three primary chord qualities: Major, Minor, and Dominant. You can differentiate between major and minor by looking at the 3rd scale degree in the chord:
```
F Major (F or FM) | F minor (Fm)
F A C             | F Ab C
1 3 5             | 1 b3 5
```
The dominant chord quality requires that the chord stack thirds up to at least the 7th scale degree. Here's the dominant 7th chord alongside a Major 7th and minor 7th chord for comparison:
```
F Major 7 (FM7)   | F dominant 7 (F7)  | F minor 7 (Fm7)
F A C E           | F A C Eb           | F Ab C Eb
1 3 5 7           | 1 3 5 b7           | 1 b3 5 b7
```
Here are typical ways to extend these chords all the way to the 13th.
```
F Major 13 (FM13) | F dominant 13 (F13)| F minor 13 (Fm13)
F A C E G Bb D    | F A C Eb G Bb D    | F Ab C Eb G Bb D
1 3 5 7 9 11 13   | 1 3 5 b7 9 11 13   | 1 b3 5 b7 9 11 13
```
##### Note on the 11th
The 11th takes special consideration because it clashes with the 3rd of the chord for major and dominant chords. You will typically sharpen the 11th for those chord qualities.
```
FM13(#11)         | F13(#11)
F A C E G B   D   | F A C Eb G B   D
1 3 5 7 9 #11 13  | 1 3 5 b7 9 #11 13
```

### Voicings and Inversions
You don't need to always include ALL the notes for a chord. The choice of notes that you include in your chord is known as the *voicing*. Include the shell (third and seventh, see below) and the uppermost extension, and fill in the other notes as you please.
```
FM13
F A E D
1 3 7 13
``` 
You can also rearrange the notes in a voicing:
```
FM13
F E A D 
1 7 3 13
```
If you put a different note as the lowest note, that voicing is an *inversion*. Notice which note is in the bass for each inversion type:
```
G7 (root position) | G7 (1st inversion) | G7 (2nd inversion) | G7 (3rd inversion)
G B D F            | B D F G            | D F G B            | F G B D
1 3 5 7            | 3 5 7 1            | 5 7 1 3            | 7 1 3 5
```

#### Shell Voicings
Aside from the root, the most essential parts of these chords are the thirds and sevenths, known as the "shell". For example, you could play the notes `F A E` and know that the chord is a Major 7. You'll notice in the chord builder that the shell notes are typically played in the lower pitched strings while any upper extensions are played in the higher pitched strings. *When in doubt, just play the shell*.

### Dominant Function and Basic Voice Leading
A popular resolution in music is the `V7 -> I` cadence. This is a dominant seventh chord starting on the fifth scale degree in the key resolving to the one chord. The one chord can be major or minor depending on the key. Examples: `G7 -> C`, `E7 -> Am`. This is because of the strong pull of the 3rd and 7th in the `V` chord to the root and 3rd in the `I` chord. Example:
```
G7   C   E7    A
=======  =========
F -> E   D  -> C#
B -> C   G# -> A
G        E
```
Properly resolving the chord using step wise motion (meaning the notes move only a half-step or step at a time between chords) is a principle of good *voice leading* (treating each chord note as part of its own melody). Visit the [Progressions](/progressions) module to see more examples of voice leading.

# CAGED System
All you need to know about the CAGED system for the purposes of this app is that every chord is a variation of an existing chord you already know. C, A, G, E, and D major barre chord shapes are the starting points in the [Chord Builder](/chords) module. An example of this process is as follows:

E Shape, Dominant 7, add 13
1. Start with an E major barre shape, omitting the 5th on the A string and the root (1) on the e string. This is a way of playing an E 
2. Move the root note on the D string down to the flat 7.
3. Add the 13th upper extension note by replacing the fifth.

For more on this system and how it can be used to master scales as well, visit [https://www.stringjoy.com/caged-system/](https://www.stringjoy.com/caged-system/).

# Extras
If you're looking for the next steps beyond the concepts above, consider researching the following:
* Modes
  * Modes of the major scale 
  * Modes of harmonic minor and melodic minor scales
* Departures from triadic harmony
  * Rootless, no-3rd voicings
  * Quartal harmony
  * Quintal harmony