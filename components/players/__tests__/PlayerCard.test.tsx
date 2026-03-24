import { render, screen } from "@testing-library/react";
import PlayerCard from "../PlayerCard";

const mockPlayer = { id: "p1", name: "Test", assignedChallenge: "c1" };

describe("PlayerCard", () => {
  it("displays the player name", () => {
    render(<PlayerCard player={mockPlayer} />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
