# OtabekLC ERP Front-end

This project is the front-end for the OtabekLC ERP system, built with a modern technology stack to provide a fast, reliable, and scalable user experience.

## Overall Design Pattern

The application follows a **client-server architecture**. The front-end, built with Next.js, acts as the client that communicates with a back-end service, in this case, Supabase.

### Key Design Principles

* **Component-Based Architecture:** The UI is built using React and is broken down into reusable components. This promotes modularity, maintainability, and code reuse.
* **Server-Side Rendering (SSR) and Static Site Generation (SSG):** Leveraging Next.js, the application uses a hybrid approach. Some pages are server-rendered for dynamic content, while others might be statically generated for performance. This is evident from the use of `next dev`, `next build`, and `next start` scripts.
* **Backend as a Service (BaaS):** The project uses Supabase for its backend needs, including authentication, database, and real-time functionalities. This simplifies development by abstracting away server management.

## Implementation Patterns

### Technology Stack

* **Framework:** [Next.js](https://nextjs.org/) 15
* **UI Library:** [React](https://react.dev/) 19
* **Backend:** [Supabase](https://supabase.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) with `clsx` and `tailwind-merge` for utility class management.
* **UI Components:** A combination of custom components and primitives from [Radix UI](https://www.radix-ui.com/) (`@radix-ui/react-label`, `@radix-ui/react-slot`).
* **Icons:** [Lucide React](https://lucide.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)

### Implementation Details

* **Authentication:** Authentication is handled using `@supabase/ssr` and `@supabase/supabase-js`, which provides a secure and straightforward way to manage user sessions with server-side and client-side helpers.
* **Styling:** The project uses Tailwind CSS for a utility-first CSS approach. `clsx` is used for conditionally applying classes, and `tailwind-merge` is used to resolve conflicting Tailwind CSS classes.
* **Component Structure:** The UI is likely structured using a combination of page components (in `src/app/`) and reusable components (in `src/components/`). The `components/ui` directory suggests the use of a design system or a collection of primitive UI elements.
* **Data Fetching:** Data fetching is likely done using a combination of Next.js's built-in data fetching methods (for server components) and Supabase's client library (for client components).
