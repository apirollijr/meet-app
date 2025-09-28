// _tests_/App.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockEvents from "../src/mock-data";

jest.mock("../src/api", () => ({
  getEvents: jest.fn(async ({ pageSize } = {}) => {
    const size = pageSize ?? 32;
    return mockEvents.slice(0, size);
  }),
}));

import App from "../src/App";

describe("integration tests: Number of Events with App & EventList", () => {
  test("changes the number of rendered events when user changes the 'number of events' input", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Works whether your input is type="number" (role=spinbutton) or text with a label
    const noeInput =
      (await screen.findByLabelText(/number of events/i)) ||
      screen.getByRole("spinbutton");

    // Replace value robustly: clear, then type; if clear fails in this env, triple-click + type
    await user.clear(noeInput);
    await user.type(noeInput, "10");
    if (String(noeInput.value) !== "10") {
      await user.tripleClick(noeInput);
      await user.type(noeInput, "10");
    }

    // Wait until the input actually reads 10
    await waitFor(() => expect(String(noeInput.value)).toBe("10"));

    // Now assert the UI outcome
    await waitFor(() =>
      expect(screen.getAllByRole("listitem")).toHaveLength(10)
    );

    // (Optional) If you still want to ensure the API was invoked for 10 at some point:
    // const { getEvents } = require("../src/api");
    // expect(getEvents).toHaveBeenCalledWith(expect.objectContaining({ pageSize: 10 }));
  });
});
