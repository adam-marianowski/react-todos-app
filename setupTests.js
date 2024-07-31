import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import axios from "axios";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
