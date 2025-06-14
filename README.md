# Multi-Step Form Application

This is a Next.js project that implements a multi-step form.

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```bash
git clone <repository_url>
cd <project_directory>
npm install
```

## Running the Development Server

Once the dependencies are installed, you can run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project follows a standard Next.js structure with the following key directories:

- `src/app`: Contains the main application pages and layout.
- `src/components`: Reusable UI components, including the multi-step form and stepper.
- `src/context`: Provides the form data context using React Context API.
- `src/lib`: Contains utility functions and validation schemas.
- `public`: Static assets like images.

## Form Steps

The multi-step form includes the following steps:

1. Location
2. VIN
3. Details
4. Photos

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS (based on `globals.css` and `postcss.config.mjs`)
- Zod (based on validation schemas in `src/lib/validation`)

## Learn More

- [Next.js Documentation](https://nextjs.js.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zod Documentation](https://zod.dev/)
