import { render, screen } from "@testing-library/react";
import App from "../App";
import { CountryProvider } from "../context/CountryContext";
import { MemoryRouter } from "react-router-dom";

test("renders header", () => {
  render(
    <MemoryRouter>
      <CountryProvider>
        <App />
      </CountryProvider>
    </MemoryRouter>
  );
  expect(screen.getByText(/REST Countries Explorer/i)).toBeInTheDocument();
});
