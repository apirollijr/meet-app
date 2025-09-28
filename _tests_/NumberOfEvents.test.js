
import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../src/components/NumberOfEvents";

function ControlledWrapper() {
  const [noe, setNoe] = useState(32);
  return <NumberOfEvents currentNOE={noe} setCurrentNOE={setNoe} />;
}

describe("<NumberOfEvents />", () => {
  test("renders number input (spinbutton)", () => {
    render(<ControlledWrapper />);
    expect(
      screen.getByRole("spinbutton", { name: /number of events/i })
    ).toBeInTheDocument();
  });

  test("default value is 32", () => {
    render(<ControlledWrapper />);
    expect(
      screen.getByRole("spinbutton", { name: /number of events/i })
    ).toHaveValue(32);
  });

  test("user can change value of the number input", async () => {
    const user = userEvent.setup();
    render(<ControlledWrapper />);

    const input = screen.getByRole("spinbutton", { name: /number of events/i });

    await user.clear(input);
    await user.type(input, "10");

  
    expect(input).toHaveValue(10);
  });
});
