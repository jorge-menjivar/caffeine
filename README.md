# Caffeine
An open source note-taking app. Work in progress.

![](./example_images/pic1.png)

# Contribute

You can get test the app by following the next steps.

## Add required packages
1. Run `npm install` to download project dependencies.
2. Run `npm run build` to generate production files.

### Optional: Required only to run on mobile devices
1. Run `npx cap add ios` to set up iOS project.
2. Run `npx cap add android` to set up Android project.
## Run on Windows/MacOS/Linux
```npm run desktop```

## Run on iOS
Xcode and macOS required

```npm run ios```

## Run on Android
Android Studio and Android SDK required

```npm run android```

# Project Structure

```
caffeine
│
│
└───css
│   │   *.scss <- styling for app
│   │
│   └───blocks
│       │   <block name>.scss <- styling for independent blocks
│       │
│
│
└───src
│   └───electron
│   │   │   main.ts           <- Electron code for starting the app
│   │   │
│   │   
│   └───preload
│   │   │   preload.ts        <- Code to be executed before loading Electron app
│   │   │
│   │   
│   └───render
│   │   │   desktop_note.tsx    <- Component in charge of rendering note file on desktop
│   │   │   desktop_renderer.tsx<- Script in charge of rendering desktop app
│   │   │   mobile_note.tsx     <- Component in charge of rendering note file on mobile
│   │   │   mobile_renderer.tsx <- Script in charge of rendering mobile app
│   │   │
│   │   └───blocks
│   │       │   block.tsx          <- Component in charge of toggling edit/render block
│   │       │   block_editor.tsx   <- Component in charge of rendering editor input box
│   │       │   block_renderer.tsx <- Component in charge selecting proper block renderer
│   │       │   
│   │       └───code
│   │       │   │   *.tsx              <- Code block rendererers (vs_code, code_editor2, etc)
│   │       │   │
│   │       │   
│   │       └───media
│   │       │   │   *.tsx              <- Media block rendererers (image, audio, video)
│   │       │   │
│   │       │   
│   │       └───text
│   │           │   *.tsx              <- Text block rendererers (h1, h2, bullet_point)
│   │           │
│   │   
│   └───watcher
│       │   watcher.ts        <- Refreshes Electron app when changes are detected (unused)
│       │
│
│
└───templates
│   │   index.html <- Webpack uses this template to generate ./dist/index.html
│   │
│
│
└───...

 
```
