# FrameStorm 🌪️

A powerful React application for managing and automating social media campaigns with an intuitive interface and robust features.

## 🚀 Features

- **Authentication System**: Secure user authentication powered by Supabase
- **Campaign Management**: Create and manage social media campaigns efficiently
- **Content Generation**: AI-powered content generation for social media posts
- **Real-time Chat Interface**: Interactive chat system for campaign management
- **Social Media Integration**: Connect and manage multiple social media platforms
- **Responsive Design**: Built with mobile-first approach using Tailwind CSS
- **Modern UI Components**: Utilizing shadcn/ui components for a polished look
- **Type Safety**: Built with TypeScript for enhanced development experience

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Backend & Auth**: Supabase
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **Data Visualization**: Recharts
- **UI Components**: 
  - Radix UI primitives
  - Embla Carousel
  - Sonner for toasts
  - Vaul for drawers
  - Command palette (cmdk)

## 📦 Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd prompt-cascade-92
```

2. Install dependencies:
```bash
# Using npm
npm install

# Using yarn
yarn

# Using pnpm
pnpm install

# Using bun
bun install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## 🚀 Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm run build:dev`: Build for development
- `npm run preview`: Preview the production build
- `npm run lint`: Run ESLint for code linting

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── Auth/          # Authentication related components
│   ├── Campaign/      # Campaign management components
│   └── ui/            # Reusable UI components (shadcn/ui)
├── hooks/             # Custom React hooks
├── integrations/      # External service integrations
│   └── supabase/      # Supabase client and types
├── lib/              # Utility functions and helpers
└── pages/            # Application pages/routes
```

## 🔐 Authentication

The application uses Supabase for authentication. Users can:
- Sign up with email/password
- Sign in with email/password
- Reset password
- Manage their profile

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile devices

Custom hook `use-mobile.tsx` is available for mobile-specific features.

## 🎨 UI Components

The project uses shadcn/ui components, which are built on top of Radix UI primitives. These include:
- Accordions
- Alert Dialogs
- Avatars
- Cards
- Carousels
- Charts
- Forms
- And many more...

## 🔧 Development

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Consistent code formatting with project conventions

### Best Practices

1. Keep components small and focused
2. Use TypeScript interfaces for props
3. Implement proper error handling
4. Follow the established project structure
5. Write meaningful commit messages

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for the amazing component library
- [Supabase](https://supabase.com/) for backend and authentication
- [Vite](https://vitejs.dev/) for the blazing fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS