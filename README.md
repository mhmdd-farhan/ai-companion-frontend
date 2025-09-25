# AI Companion Frontend

A modern, beautifully designed frontend application for AI Companion - a smart chatbot that allows custom AI roles for each chat, providing highly specific interactions tailored to the persona. This React-based application offers an intuitive user interface for seamless interaction with AI companions.

## Features

- **Modern UI/UX**: Clean, responsive design with beautiful animations and interactions
- **User Management**: Automatic registration and login system with username-based authentication
- **Multi-Chat Interface**: Manage multiple chat sessions with different AI personas
- **Custom Personas**: Create and interact with AI companions having specific personalities and roles
- **Real-time Chat**: Smooth, real-time messaging experience with typing indicators
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **State Management**: Efficient state handling with React Query for optimal performance
- **Dasboard**: Display all the matrics (Total User, Total Chat, Total Persona, Evg Latency) and some tables.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Query
- **Routing**: React Router
- **HTTP Client**: Axios or Fetch API

## Integrated Backend Application

[AI Companion Backend](https://github.com/your-username/ai-companion-backend)

## How to Contribute

We welcome contributions! Please follow these steps to set up the development environment:

1. **Clone the repository**

   ```bash
   git clone https://github.com/mhmdd-farhan/ai-companion-frontend.git
   cd ai-companion-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your backend API endpoint and other configuration
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Run tests**

   ```bash
   npm test
   ```

6. **Create a pull request**
   - Create a feature branch: `git checkout -b feature/your-feature-name`
   - Make your changes and commit them
   - Push to your fork and submit a PR

### Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview production build
- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run linting

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
