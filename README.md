# Memory-game

RS School vanilla JS task
[Task](https://github.com/rolling-scopes-school/tasks/tree/master/tasks/memory-game)

## Description

A browser-based memory card game built with HTML, CSS, and vanilla JavaScript. The goal is to find all 8 matching pairs among 16 shuffled cards in as few moves as possible.

Features

- Interactive gameplay: Randomized card layouts, card-flipping animations, move and matched-pair counters, and automatic win detection.

- Persistent game state: The current game progress is saved in localStorage and restored after page reloads, preserving the card layout, score, moves, and elapsed time.

- Save and resume games: Save an unfinished game, access it through the Saved Games menu, and resume or delete saved games.

- Finish game: End the current game at any time and reset the game state.

- Leaderboard: View the top 10 results, sorted by the number of moves, with results stored in localStorage.

- Reusable modal windows: Custom modal dialogs for game results, the leaderboard, and game management.

The application dynamically generates all HTML elements using JavaScript and uses localStorage to persist game progress and results between sessions.

## How to run locally

No additional installation or build commands are required.

1. Clone or download the repository.
2. Open the project in **Visual Studio Code**.
3. Start the project using the **Live Server** extension.
4. Open the provided local URL in your browser.

## Technologies

- HTML5
- CSS3
- JavaScript (Vanilla JS)
