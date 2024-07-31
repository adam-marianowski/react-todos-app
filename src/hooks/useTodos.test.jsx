import { it, vi, describe, expect, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react";
import axios from "axios";
import { useTodos } from "./useTodos.jsx";

const data = [
  { id: "1", title: "foo", complete: false },
  { id: "2", title: "bar", complete: true },
];

beforeEach(() => {});

describe("useTodos", () => {
  it("should contain initial state", async () => {
    vi.spyOn(axios, "get").mockResolvedValue([]);

    const { result } = renderHook(() => useTodos());
    await waitFor(() => expect(result.current.todos).toHaveLength(0));
  });

  it("should initially execute getTodos", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({ data });

    const { result } = renderHook(() => useTodos());
    await waitFor(() => expect(result.current.todos).toHaveLength(2));
  });

  it("should get todos", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({ data });

    const { result } = renderHook(() => useTodos());
    await act(async () => await result.current.getTodos());
    expect(result.current.todos).toHaveLength(2);
  });

  it("should add todo", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({ data: [] });
    vi.spyOn(axios, "post").mockResolvedValue({ data: [data[0]] });

    const { result } = renderHook(() => useTodos());
    await act(async () => await result.current.addTodo(data[1]));
    await waitFor(() => expect(result.current.todos).toHaveLength(1));
  });

  it("should delete todo", async () => {
    const removedTodo = data[0];
    const newState = data.filter((d) => d.id !== removedTodo.id);
    vi.spyOn(axios, "get").mockResolvedValue({ data });
    vi.spyOn(axios, "delete").mockResolvedValue(newState);

    const { result } = renderHook(() => useTodos());
    await act(async () => await result.current.deleteTodo(removedTodo.id));
    await waitFor(() => expect(result.current.todos).toHaveLength(1));
  });

  it("should toggle todo", async () => {
    const updatedTodo = { ...data[0], completed: !data[0].complete };
    vi.spyOn(axios, "get").mockResolvedValue({ data });
    vi.spyOn(axios, "put").mockResolvedValue([...data, updatedTodo]);

    const { result } = renderHook(() => useTodos());
    await act(async () => await result.current.toggleTodo(updatedTodo));
  });
});
