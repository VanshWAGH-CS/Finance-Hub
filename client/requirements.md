## Packages
recharts | Data visualization for dashboard history
framer-motion | Smooth page transitions and UI animations
lucide-react | (Already in base) Icon set
react-hook-form | (Already in base) Form handling
zod | (Already in base) Schema validation

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  display: ["var(--font-display)"],
  body: ["var(--font-body)"],
}
Authentication uses Replit Auth (useAuth hook).
API endpoints are defined in shared/routes.ts.
