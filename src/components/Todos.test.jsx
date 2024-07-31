import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Todos from "./Todos.jsx";

const todosFormContent = "TodosForm";
const todosListContent = "TodosList";

// Mocking TodosForm
vi.mock("./TodosForm.jsx", () => ({
  default: (props) => {
    return <div>{todosFormContent}</div>;
  },
}));

vi.mock("./TodosList.jsx", () => ({
  default: (props) => {
    return <div>{todosListContent}</div>;
  },
}));

const mock = {
  todos: [],
  deleteTodo: vi.fn(),
  addTodo: vi.fn(),
  toggleTodo: vi.fn(),
};

vi.mock("../hooks/useTodos.jsx", () => ({
  useTodos: () => {
    return mock;
  },
}));

describe("Todos", () => {
  it("should render TodosForm", () => {
    render(<Todos />);
    expect(screen.getByTestId("component")).toHaveTextContent(todosFormContent);
  });

  it("should render TodosList", () => {
    render(<Todos />);
    expect(screen.getByTestId("component")).toHaveTextContent(todosListContent);
  });
});
