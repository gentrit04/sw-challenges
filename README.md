# SW-Challenges

A web application to create, manage, and track custom challenges for players.

![website](/public/sw-challenges.png)

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/State%20Management-Zustand-FF9900?style=for-the-badge&logo=zustand&logoColor=white)

## Features

- **Challenge Management:** Create challenges with multiple tiers and assign specific monsters.
- **Player Tracking:** Add players and assign them to active challenges.
- **Battle Recording:** Track battle outcomes (wins/losses) against specific monsters and time awarded.
- **Progress View:** Monitor player progress and see clearly which monsters have been defeated.

## Run Locally

Clone the project

```bash
  git clone https://github.com/gentrit04/sw-challenges.git
```

Go to the project directory

```bash
  cd sw-challenges
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## More Context

This project started because a friend wanted to give us a fun challenge by creating a tier-list of monsters we had to defeat. Since it was difficult for her to manually keep track of the time awarded and whenever we defeated a monster, I built this app to simplify everything. Now, she simply makes the list and exports it, while we import it and keep track of our progress independently.

There are two ways to use this website. You can either let one person manage everything (battles, tierlist, players) for the group, or one person can create the tierlist, export it, and the players can import it and track their progress on their own.

## Data Source

Monster data and images are sourced from **[SWARFARM](https://swarfarm.com)** via their public API (`swarfarm.com/api/v2/monsters/`)

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
