import { describe, expect, it, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import TodosList from "./TodosList.jsx";
import { userEvent } from "@testing-library/user-event";

const data = [
  { id: "1", title: "foo", complete: false },
  { id: "2", title: "bar", complete: true },
];

describe("TodosList", () => {
  it("should display fallback if there are no todos", () => {
    render(<TodosList todos={[]} />);
    const fallback = screen.getByTestId("fallback");

    expect(fallback).toBeInTheDocument();
  });

  it("should not display fallback if there are todos", () => {
    render(<TodosList todos={data} />);
    const fallback = screen.queryByTestId("fallback");

    expect(fallback).not.toBeInTheDocument();
  });

  it("should display correct todos count if there are todos", () => {
    render(<TodosList todos={data} />);
    const counter = screen.queryByTestId("counter");

    expect(counter).toHaveTextContent(data.length);
  });

  it("should not display todos count if there are no todos", () => {
    render(<TodosList todos={[]} />);
    const counter = screen.queryByTestId("counter");

    expect(counter).not.toBeInTheDocument();
  });

  it("should display a list of todos if there are todos", () => {
    render(<TodosList todos={data} />);
    const list = screen.getAllByTestId("list");

    expect(list).toHaveLength(2);
  });

  it("should not display list of todos if there are no todos", () => {
    render(<TodosList todos={[]} />);
    const list = screen.queryByTestId("list");

    expect(list).not.toBeInTheDocument();
  });

  it("should strikethrough complete todos", () => {
    render(<TodosList todos={data} />);
    const decorationClass = "text-decoration-line-through";
    const titleField = screen.getAllByTestId("title");

    expect(titleField[1]).toHaveClass(decorationClass);
  });

  it("should not strikethrough incomplete todos", () => {
    render(<TodosList todos={data} />);
    const decorationClass = "text-decoration-line-through";
    const titleField = screen.getAllByTestId("title");

    expect(titleField[0]).not.toHaveClass(decorationClass);
  });

  it("should emit deleteTodo with id on click", async () => {
    const user = userEvent.setup();
    const handleDeleteTodo = vi.fn();
    render(<TodosList todos={data} onDeleteTodo={handleDeleteTodo} />);
    const deleteButton = screen.getAllByTestId("delete");

    await user.click(deleteButton[0]);

    expect(handleDeleteTodo).toBeCalledTimes(1);
    expect(handleDeleteTodo).toBeCalledWith(data[0].id);
  });

  it("should emit toggleTodo with todo on click", async () => {
    const user = userEvent.setup();
    const handleToggleTodo = vi.fn();
    render(<TodosList todos={data} onToggleTodo={handleToggleTodo} />);
    const toggleButton = screen.getAllByTestId("toggle");

    await user.click(toggleButton[0]);

    expect(handleToggleTodo).toBeCalledTimes(1);
    expect(handleToggleTodo).toBeCalledWith(data[0]);
  });
});
