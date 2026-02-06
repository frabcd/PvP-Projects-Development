# Chroma Core Arena (CCA)

A fast-paced, ability-based arena brawler built with Three.js and Firebase.

## 🌟 Latest Update: The Emperor Ascends (Part 1)
The visually distinct "Emperor" (formerly Mirage) has joined the arena with a fully animated 3D model!
- **New Model:** Detailed "Sand Emperor" model replaces placeholder geometry.
- **Animations:** Full support for Idle, Walk, and Attack animations.
- **Tech Upgrade:** New animation system with root-motion stripping for smooth gameplay sync.

## 🎮 Features

### Gameplay
- **12 Unique Characters:** Ranging from the time-bending **Chronomancer** to the heavy-hitting **Colossus**.
- **Skillshot Combat:** 4 abilities per hero (Q, E, R, F) including skillshots, dashes, AOEs, and ultimates.
- **Passives:** Unique passive text for every character adding strategic depth.

### Game Modes
- **Local Duel:** 1v1 on the same machine (WASD + IJKL).
- **Online Multiplayer:** Host/Join rooms to battle friends remotely.
- **AI Practice:** Test your skills against 3 tiers of AI (Basic, Adept, Unfair).
- **Classic & Rift:** Choose between standard arenas or "Rift" mode with periodic buffs.

### Tech Stack
- **Engine:** Three.js (WebGL)
- **Networking:** Firebase Realtime Database
- **Audio:** Tone.js for dynamic SFX
- **Assets:** FBX Model Loading with Animation Mixing

## 🕹️ Controls

| Action | Player 1 (Left) | Player 2 (Right) |
| :--- | :--- | :--- |
| **Move** | W, A, S, D | I, J, K, L |
| **Basic Attack** | Space | Enter |
| **Skill 1** | Q | U |
| **Skill 2** | E | O |
| **Skill 3** | R | P |
| **Ultimate** | F | H |

## 🚀 How to Run
1. Clone the repository.
2. Open `index.html` in a modern browser (Chrome/Edge recommended).
   *   *(Optional)* Use a local server (e.g., Live Server) for best performance with assets.

## 🛠️ Development Setup
- **Main Entry:** `main.js` handles the game loop and initialization.
- **Characters:** Defined in `player.js` (logic) and `models.js` (visuals).
- **Abilities:** All skill logic resides in `game-objects.js`.
- **Assets:** `assets.js` manages loading external GLB/FBX files.
