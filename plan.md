# Plan: Google Calendar Integration for Employee Portal

Integrate Google Calendar with the Staff Portal to allow employees to see their external appointments alongside firm assignments.

## 1. Technical Implementation
- **Service Layer**: Create `src/lib/google-calendar.ts` to handle API interactions.
- **Context Update**: Update `EmployeeAuthContext.tsx` to manage Google OAuth session and connection state.
- **UI Components**: 
    - Add a "Connect Google Calendar" button in the sidebar or calendar header.
    - Create an `ExternalEvent` type and component to distinguish Google events from internal tasks.
    - Implement a fetching hook for Google Calendar events.

## 2. Component Enhancements (`src/components/employee/EmployeeCalendar.tsx`)
- Add a toggle to show/hide Google Calendar events.
- Merge internal tasks and external Google events into a unified chronological list.
- Apply distinct styling (Google Blue) to external events.

## 3. Mock/Real Logic
- Provide the structure for a real Google Calendar API fetch.
- Use mock data when not connected to demonstrate the UI.
- Implement the "Sign in with Google" flow placeholder using standard OAuth 2.0 patterns.

## 4. Design Guidelines
- **Visual Distinction**: Use the Google Calendar icon for external events.
- **Responsive**: Ensure the combined schedule looks good on mobile.
- **Micro-interactions**: Use `framer-motion` for loading states and event transitions.
