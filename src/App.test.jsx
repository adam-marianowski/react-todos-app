import { it, vi, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App.jsx";

vi.mock("./components/Todos.jsx", () => {
  return {
    default: () => <div>Todos Component</div>,
  };
});

describe("App", () => {
  it("renders footer", () => {
    const textContent = "@Adam Marianowski";
    render(<App />);
    expect(screen.getByTestId("footer")).toHaveTextContent(textContent);
  });
});
