# 🚀 Skyrise Backend

[Dev API](http://api.skyrise.creatoramigo.xyz/)

## Stack:

### [Bun](https://bun.sh/) 
Bun is the chosen JavaScript runtime environment for this project.

### [ElysiaJS](https://elysiajs.com/)
ElysiaJS is the web framework used, focused on providing the best development experience with minimal overhead. Supercharged by Bun, it comes with built-in support for Swagger, making API documentation accessible at "/swagger".

### [Prisma](https://www.prisma.io/)
Prisma is the chosen ORM for data management. It simplifies database interaction, offering a powerful and efficient abstraction layer.

### [Eslint](https://eslint.org/)
Eslint is configured to ensure consistent development and follow code standards. Keep your code clean and organized with this linting tool.

### [Ethers JS](https://docs.ethers.org/)
The ethers.js library aims to be a complete and compact library for interacting with the Ethereum Blockchain and its ecosystem.

### Database: PostgreSQL
PostgreSQL is used as the database for this project. It provides a robust and scalable solution for managing data.

### MVC Pattern
This template follows the Model-View-Controller (MVC) pattern to organize code in a modular way, making project maintenance and expansion easier.

## Getting Started

This project depends on Bun and Docker. With both installed, follow the steps below:

1. Clone the project:
   ```sh
   git clone https://github.com/your-username/template-api.git
   ```
2. Install dependencies:
   ```sh
   bun i
   ```
3. (Optional) Start Postgres Docker and initialize database
   ```sh
   docker-compose up -d
   bun migrate
   ```
4. Start application
   ```sh
   bun dev
   ```

## Post configurations

### Environment variable
   1. Create env file from .env.example to keep your keys safe and make sure to change env_file in docker-compose.yml
   ```sh
      cp .env.example .env
   ```
   2. Update all variables as needed.

## Story

### Flow:

#### Brand:
- Come to VibeSquad platform and list their needs, say need 10K users and they put in $10K for it. Say the task is to Buy a TV.
   -> Smart Contract is deployed with Project Task Details.

#### Influencer:
- Come to VibeSquad platform, find listings and selects participate.
   -> Smart Contract function call participate from frontend
- A link gets generated which influencer copies and pastes on their various social media platforms like twitter, Instagram, farcaster, etc.
   -> link key encode/decode to (contract + address) [TODO: figure out]
      :-> Backend API or Algo on Frontend?
- ⁠Based on impressions, influencer gets paid.
   -> Fetch uses from smart contract and calculate reward for influencer on frontend.
   (TODO: figure out tBtc use)

#### User Flow:
- User clicks on link on social media.
   -> For every use, call setUse function from backend.
- User arrives at payment page and sees a due of $1000.
- Clicks on get social discount button which opens to a new page / modal. Adds their social networks and creates VibeSquad account.
   -> Call backend api:
      - payload:
         - user address
         - social handle
         - social key (twitter, instagram, etc)
      - return:
         - social ranking
         - discount elligible
         - discounted amount
- Based on social ranking, gets some discount. Say 10%.
   -> Checkout with discount amount on frontend

[Docs](https://skyrise-docs.apidog.io)
Docs Access password: `nosedive`
