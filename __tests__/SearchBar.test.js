import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

test("search bar updates value on change", () => {
  const setSearch = jest.fn();
  render(<SearchBar search="" setSearch={setSearch} />);

  const input = screen.getByPlaceholderText(/search by name or email/i);
  fireEvent.change(input, { target: { value: "Chelsey Dietrich" } });

  expect(setSearch).toHaveBeenCalledWith("Chelsey Dietrich");
});
