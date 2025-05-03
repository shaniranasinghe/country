import { render, screen } from "@testing-library/react";
import CountryList from "../components/CountryList";

test("shows 'No countries found.' if list is empty", () => {
  render(<CountryList countries={[]} />);
  expect(screen.getByText(/No countries found/i)).toBeInTheDocument();
});
