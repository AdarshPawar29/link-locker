# LinkLocker

A modern, secure platform for organizing and sharing your important links.

## Features

- 🔒 Secure link storage with end-to-end encryption
- 📱 Responsive design for all devices
- 🏷️ Tag-based organization
- 🔍 Powerful search and filtering
- 👥 Team collaboration
- 🔗 Link preview and validation
- 📊 Usage analytics

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Auth, Database)
- **State Management**: React Query
- **Form Handling**: React Hook Form, Zod

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Configure Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Add your project URL and anon key to `.env.local`

5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
linklocker/
├── app/                    # Next.js app router
├── components/            
│   ├── auth/              # Authentication components
│   ├── links/             # Link management components
│   ├── lockers/           # Locker management components
│   ├── shared/            # Shared/common components
│   └── ui/                # UI components (shadcn/ui)
├── lib/
│   ├── supabase/          # Supabase client and types
│   ├── utils/             # Utility functions
│   └── validators/        # Zod schemas
├── hooks/                 # Custom React hooks
├── styles/                # Global styles
└── types/                 # TypeScript types
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE for details