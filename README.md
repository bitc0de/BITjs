# BITjs
BITjs is a desktop application built with Electron that allows users to write and run JavaScript code in real time, similar to the RunJS application.

![BITjs Screenshot](https://i.ibb.co/L5Hm5zZ/image.png)

## Features

- Code editor with syntax highlighting (Dracula theme)
- Real-time JavaScript code execution
- Support for asynchronous operations and web APIs
- Minimalistic and elegant user interface
- Cross-platform (Windows, macOS, Linux)

## Installation

### Prerequisites

- Node.js (version 12 or higher)
- npm (usually comes with Node.js)

### Installation steps

1. Clone this repository:
```
git clone https://github.com/bitc0de/BITjs.git
```

2. Navigate to the project directory:
```
cd bitjs
```

3. Install the dependencies:
```
npm install
```

## Usage

To start the application in development mode:
```
npm start
```

To compile the application for your operating system:
```npm run build```

This will create the executable files in the `dist` folder.

## Development

This project uses the following main technologies:

- Electron
- CodeMirror (for the code editor)
- Node.js (for server-side code execution)

### Project structure

- main.js`: Electron`s main entry point
- renderer.js`: Script for the rendering process
- index.html`: Main HTML file
- `preload.js`: Preload script for the secure inter-process communication.

## Contribute

Contributions are welcome. Please follow these steps to contribute:

1. Make a fork of the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

bitc0de - [@bitc0de](https://x.com/bitc0de)
