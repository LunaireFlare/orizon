# [Orizon]

## Overview

Orizon is a fully functional fullstack web application in the form of a social platform designed to help senior citizens maintain social links after retirement. At its core is the event system, allowing any member to create, search and participate in an event. It comes with an administrator dashboard to moderate members and events, and uses a reverse proxy to link the frontends and backend.

> **Note**: this project is a **school project** - all data in it is purely fictitious and only serves as basis for application building and practice.

## Tech stack

### Version control

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

### Design

![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

### Frontend

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### Backend & DB

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

### Testing

![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE)

## Description

**Live version**: not currently deployed.

This project was developped with a team of four developers as an end-of-term project, over the course of three weeks (sprints). Whilst each member of the team had an official role in theory, in practice every developer was able to participate in each aspect should they choose to.

The product and base features was assigned, as it would be the case with an actual product, but we had complete freedom when it came to the architectural, technical and design aspects, as well as how we chose to divide and organise the work. We brought the initial rough idea to completion with every subsequent phase, starting from shaping the initial project specifications and diagrams, database modelisation and architecture choices, all the way to a deployment-ready stage, including development itself, functional and unit testing and accessibility and performance audits.

It was a great exercise to practice application development from start to finish, on every front and aspect, especially the early stages of app conception. Despite not being currently deployed, it is a fully functional MVP and will likely be revisited in the future.

### Features

- Containerised web app containing two frontends, one backend and a database
- Client web app including secure user registering and authentication (JWT)
- Events system allowing any member to create, modify and delete events, as well as (un)participate in them
- Possibility to search for events and users via multiple filters: name or key word, localisation (consuming external, public government API) and labels/"interests"
- User profile handling, allowing a user to update their information or delete their account in keeping with GDPR rules
- Backoffice web app exposing a moderation dashboard for moderators to validate or ban members and events
- Backend following MVC architecture and exposing an API following REST conventions
- Security measures to counteract the most common vulnerabilities exposed by OWASP (injection protections, role handling, client data sanitising...)
- Nginx reverse proxy to allow sub-domains on a single domain name and protect servers

### Practiced Skills

- UI/UX design
- Responsiveness
- Database modelisation (using MERISE)
- UML diagrams
- Application achitecture
- Front and API routing
- Agile development & project management
- Reverse proxies
- Containerisation
