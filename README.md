# 🎓 Live Class UI

A real-time virtual classroom and video conferencing platform built with Next.js — enabling seamless live classes, interactive sessions, and collaborative learning experiences.


---

## Features

- **Live Video Conferencing** — Real-time audio/video streaming for interactive classroom sessions
- **Screen Sharing** — Instructors can share their screen for presentations and demonstrations
- **Real-Time Chat** — In-session text chat for questions, discussions, and participation
- **Room Management** — Create, join, and manage virtual classroom rooms with unique room IDs
- **User Roles** — Distinct instructor and student roles with appropriate permissions
- **Responsive Design** — Fully responsive UI that works across desktop, tablet, and mobile
- **Session Controls** — Mute/unmute, camera toggle, hand raise, and participant management
- **Modern UI** — Clean, intuitive interface built with reusable component architecture

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Components** | Custom component library (`/components`) |
| **State Management** | React Hooks (`/hooks`) |
| **Deployment** | Vercel |

## Project Structure

```
live-class-ui/
├── app/                  # Next.js App Router pages & layouts
├── components/           # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions & helpers
├── public/               # Static assets
├── styles/               # Global styles & Tailwind config
├── components.json       # Component registry
├── next.config.mjs       # Next.js configuration
├── package.json          # Dependencies & scripts
├── postcss.config.mjs    # PostCSS configuration
└── pnpm-lock.yaml        # Lock file
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/suraj7880314386/live-class-ui.git
cd live-class-ui

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
pnpm build
pnpm start
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Built by [Suraj Singh](https://github.com/suraj7880314386)**
