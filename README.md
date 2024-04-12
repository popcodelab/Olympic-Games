# Olympic Games
## Table of contents

- Description and goals
- Installation
- Development server
- Build
- Technologies
- Compodoc
- Authors
- Screenshots

## Description and goals

Olympic Games is the OpenClassroom project 2 : Développer me front-end en utilisant Angular.

This application provides a dashboard displaying information from previous Olympic Games (number of medals by country, etc.).

The main goals of this project are :

- Use services to make HTTP calls.
- Use RxJS and observables.
- Unsubscribe observables.
- Minimize the use of type "any".

## Installation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Technologies

- HTML5
- TypeScript
- JavaScript
- CSS3
- Bootstrap 4.6.0
- Font Awesome 6.5.2
- Angular Material 14.1.0
- Angular 14.1.3
- CanvasJS
  - Angular-Charts 1.2.0
  - Charts 3.7.45
- Compodoc 1.1.23
- Git

<div class="container">
  <div class="item"><img class="icon" src="https://raw.github.com/popcodelab/svg-icons/main/html-5.svg?sanitize=true" alt="HTML5"></div>
  <div class="item"><img class="icon" src="https://raw.github.com/popcodelab/svg-icons/main/typescript.svg?sanitize=true" alt="TypeScript"></div>
  <div class="item"><img class="icon" src="https://raw.github.com/popcodelab/svg-icons/main/javascript.svg?sanitize=true" alt="JavaScript"></div>
  <div class="item"><img class="icon" src="https://raw.github.com/popcodelab/svg-icons/main/css-3.svg?sanitize=true" alt="CSS3"></div>
  <div class="item"><img class="icon" src="https://raw.github.com/popcodelab/svg-icons/main/font-awesome-flag.svg?sanitize=true" alt="Font Awesome"></div>
  <div class="item"><img class="icon" src="https://raw.github.com/popcodelab/svg-icons/main/angular.svg?sanitize=true" alt="angular"></div>
  <div class="item"><img class="icon" src="https://raw.github.com/popcodelab/svg-icons/main/CanvasJS.svg?sanitize=true" alt="CanvasJS"></div>
  <div class="item"><img class="icon" src="https://raw.github.com/popcodelab/svg-icons/main/compodoc.svg?sanitize=true" alt="CompoDoc"></div>
</div>

## Compodoc

To generate the documentation, if compodoc is not installed, follow the instructions bellow :

instal compodoc : `npm install @compodoc/compodoc`

Once installed :
- To generate the documentation run the command : `npm run compodoc`
- To Serve it on http://127.0.0.1:8080  : `npm run compodoc:serve`

## Authors

POP's Code Lab

## Screenshots

![Screenshot 1](./src/assets/screenshots/screenshot.png)
![Screenshot 2](./src/assets/screenshots/screenshot-line.png)
![Screenshot 3](./src/assets/screenshots/screenshot-mobile.png)
![Screenshot 3](./src/assets/screenshots/screenshot-mobile-line.png)

<hr/>

[![forthebadge](https://forthebadge.com/images/badges/built-by-developers.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-markdown.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

<style>
.container {
  display: flex;
}

.item {
  flex: 1; /* Each item occupies equal space */
  border: 1px solid black;
  padding: 5px;
  margin: 5px;
}

.icon {
  height: 60px;
  width: 60px;
}
</style>
