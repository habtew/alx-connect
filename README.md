# ALX Connect Chatbot

ALX Connect Chatbot is a simple web-based chatbot application built using React. The chatbot allows users to interact with an AI assistant named Sam. The messages are sent to a backend server for processing, and the responses are displayed in the chat interface.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time chat interface
- User and AI assistant messages are displayed with different styles
- Input field clears after sending a message
- Keeps chat history in the session

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later) or yarn (v1.22 or later)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/alx-connect.git
cd alx-connect
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a .env file in the root directory and add your backend server URL:

```bash
REACT_APP_BACKEND_URL=https://alx-connect.onrender.com/predict
```

4. Start the development server:

```bash
npm run dev
# or
yarn start
```

# Usage
## To use the chatbot:

1. Open the chat interface.
2. Type a message in the input field.
3. Press Enter or click the "Send" button.
4. The chatbot will send your message to the backend server and display the response from Sam.

# Contributing
## Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch ```git checkout -b feature/your-feature-name```.
3. Make your changes.
4. Commit your changes ```git commit -m 'Add some feature'```.
5. Push to the branch ```git push origin feature/your-feature-name```.
6. Open a Pull Request.

# License
### This project is licensed under the MIT License. See the LICENSE file for details.