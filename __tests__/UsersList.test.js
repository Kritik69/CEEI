import { render, screen } from "@testing-library/react";
import UsersList from "../components/UsersList";

const mockUsers = [
  {
    id: 1,
    name: "Chelsey Dietrich",
    email: "Lucio_Hettinger@annie.ca",
    username: "@Kamren",
  },
];

test("renders user list", () => {
  render(<UsersList users={mockUsers} />);
  expect(screen.getByText("Chelsey Dietrich")).toBeInTheDocument();
});
