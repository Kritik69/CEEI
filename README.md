React User Directory
This project is a responsive React application that fetches and displays users from the JSONPlaceholder API. It includes functionality such as search, sorting, pagination, error handling, and uses a structured global state with Zustand. SWR is used for data fetching and caching.

Project Overview
The purpose of this project was to demonstrate core React skills while working with real-world data and building a scalable, user-friendly interface using Material UI. The application fetches user data, provides filtering and sorting options, and supports paginated results for a better browsing experience.

Tech Stack
Technology	Purpose
React.js	Application framework
Zustand	Lightweight global state management
SWR	Data fetching and caching
Axios	HTTP requests
Material UI	UI components and styling
Jest	Unit testing framework

Folder Structure
markdown
Copy
Edit
/components
  - SearchBar.js
  - SortDropdown.js
  - UserCard.js
/pages or index.js
/store
  - useUserStore.js
/tests
  - Home.test.js
  - useUserStore.test.js
Features
Fetches and caches user data using SWR

Allows searching users by name or email

Enables sorting by name or username in both ascending and descending order

Implements pagination (5 users per page)

Includes loading indicators and error handling

Provides basic unit tests for components and logic

Caching with SWR
SWR (stale-while-revalidate) is used for fetching and caching the user data. It helps improve performance by returning cached data while revalidating in the background.
const { data, error, isLoading } = useSWR(
  "https://jsonplaceholder.typicode.com/users",
  fetcher
);
This approach minimizes unnecessary API requests and results in a faster and smoother user experience.

State Management with Zustand
Zustand is used for managing the global state, including:

Full user list

Search query

Sort parameters

Pagination state

This setup avoids prop drilling and allows for centralized state updates.

export const useUserStore = create((set, get) => ({
  users: [],
  setUsers: (users) => set({ users }),
  // ...additional state logic
}));
Component Overview
UserCard
Displays individual user information in a Material UI card layout.

SearchBar
A controlled input that updates the search state in real-time to filter user results.

SortDropdown
Allows sorting the user list by name or username in ascending or descending order.

Pagination
Uses Material UI’s Pagination component to limit and navigate through users displayed per page.

Running the Project
Install dependencies and start the development server:

bash
Copy
Edit
npm install
npm run dev
The application will be available at http://localhost:3000.

Ensure that you are using a compatible version of Node.js for best results.

Testing
Jest and React Testing Library are used to write unit tests for components and functionality.

Example test case:
test("renders fetched users", async () => {
  render(<Home />);
  expect(await screen.findByText(/Leanne Graham/)).toBeInTheDocument();
});
Add the following configuration to your package.json for Jest:

json
Copy
Edit
"jest": {
  "testEnvironment": "jsdom"
}
To run tests:

bash
Copy
Edit
npm test
Future Enhancements
Add a detailed view or modal for each user

Implement server-side pagination

Include a dark mode feature

Acknowledgments
This application makes use of:

JSONPlaceholder API for mock user data

Material UI for styling and layout

SWR for handling data fetching and caching

Zustand for global state management

Summary
This project was designed with clarity, simplicity, and real-world development patterns in mind. It serves as a solid foundation for building more complex React applications that involve API integration, global state, and responsive design.