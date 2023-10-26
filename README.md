<h1 align="center">
  <br>
  <a href="https://github.com/tfkfan/phaser3-react-template#readme"><img src="readme/header.png" alt="header" width="600"></a>
  <br>
  Phaser 3 React TypeScript Starter Template
  <br>
</h1>

<h4 align="center">
A starter template for <a href="https://phaser.io/" target="_blank" >Phaser 3</a> with <a href="https://www.typescriptlang.org/index.html" target="_blank" >TypeScript</a> and <a href="https://webpack.js.org/" target="_blank" >webpack</a> for building excellent html5-games that work great in the browser and on mobile devices.</h4>

<p align="center">
  <a href="https://opensource.org/licenses/MIT" title="License: MIT" >
    <img src="https://img.shields.io/badge/License-MIT-greenbright.svg?style=flat-square">
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#preview">Preview</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#react-controls">React controls</a> •
  <a href="#websocket-support">Websocket support</a> •
  <a href="#credits">Credits</a>
</p>

---

## Key Features

- All newest ES 2020 features
- Prettier
- Webpack dev server
- Includes Phaser 3 TypeScript typings
- For development and production builds
- React gui development
- Websocket integration

## Preview

This is what you get after installing this template. A simple and clean starter template written in TypeScript. 

<img src="readme/build.png" width="640" style='border: 0.25em solid #e1e4e8;border-radius: 5px;'/>

## How To Use

To clone and run this template, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository (yes, npx not npm)
$ git clone https://github.com/tfkfan/phaser3-react-template.git

# Go into the repository
$ cd phaser3-react-template

# Install dependencies
$ npm install

# Start the local development server (on port 8080)
$ npm start

# Ready for production?
# Build the production ready code to the /dist folder
$ npm run build
```

## React controls

This template allows to use react hooks outside of react components

To use this take a look to /src/controls.ts  file to create your own handlers

To register new handler:
```typescript

class GameControls {
    private controls: GameControlsMap = {}

    // Create your own register controls method
    public registerGameDebugControls(controls: GameDebugControls) {
        this.controls.debug = controls
    }

    // Create your own valueSetter method
    public setFps(fps: number) {
        if (checkExists(this.controls.debug))
            this.controls.debug.setFps(fps)
    }

    public setVersion(version: string) {
        if (checkExists(this.controls.debug))
            this.controls.debug.setVersion(version)
    }
}
```

To use it inside phaser game:

```typescript
CONTROLS.setVersion(`Phaser v${Phaser.VERSION}`)
```
## Websocket support

Use Network class to communicate with ws server...

First, initialize websocket to communicate with specific server host:

```typescript
network.initConnection("<your ws host>")
```

Then use functionality directly:

```typescript
network.on(MessageType.UPDATE, data => {

}, this)
```

```typescript
network.send(MessageType.PLAYER_KEY_DOWN, {inputId: 'RIGHT', state: false});
```

## Credits

A huge thank you to Rich [@photonstorm](https://github.com/photonstorm) for creating Phaser
