
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

    
    const noeInput =
      (await screen.findByLabelText(/number of events/i)) ||
      screen.getByRole("spinbutton");


    await user.clear(noeInput);
    await user.type(noeInput, "10");
    if (String(noeInput.value) !== "10") {
      await user.tripleClick(noeInput);
      await user.type(noeInput, "10");
    }

    await waitFor(() => expect(String(noeInput.value)).toBe("10"));

  
    await waitFor(() =>
      expect(screen.getAllByRole("listitem")).toHaveLength(10)
    );

    
  });
});
