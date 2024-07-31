import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TodosForm from "./TodosForm.jsx";
import { userEvent } from "@testing-library/user-event";

describe("TodosForm", () => {
  it("should render form", () => {
    render(<TodosForm />);
    expect(screen.getByTestId("form")).toBeInTheDocument();
  });

  it("should render input", () => {
    render(<TodosForm />);
    expect(screen.getByTestId("input")).toBeInTheDocument();
  });

  it("should be able to type new todo ", async () => {
    const user = userEvent.setup();
    const textContent = "foo";

    render(<TodosForm />);
    const input = screen.getByTestId("input");
    await user.type(input, textContent);
    const form = new FormData(screen.getByTestId("form"));

    expect(form.get("title")).toBe(textContent);
  });

  it("should call onSubmit with new Todo object", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<TodosForm onSubmitForm={handleSubmit} />);

    const input = screen.getByTestId("input");
    await user.type(input, "foo{enter}");

    expect(handleSubmit).toBeCalledTimes(1);
  });

  it("should not work if input is empty", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<TodosForm onSubmitForm={handleSubmit} />);

    const input = screen.getByTestId("input");
    await user.type(input, "{enter}");

    expect(handleSubmit).toBeCalledTimes(0);
  });

  it("should clear input after submit", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<TodosForm onSubmitForm={handleSubmit} />);

    const input = screen.getByTestId("input");
    await user.type(input, "foo{enter}");
    const form = new FormData(screen.getByTestId("form"));

    expect(form.get("title")).toBe("");
  });
});
