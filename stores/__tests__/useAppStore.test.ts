import { useAppStore } from "../useAppStore";

beforeEach(() => {
  useAppStore.setState({
    challenges: [],
    players: [],
    monsters: [],
    battles: [],
  });
});

describe("addChallenge", () => {
  it("adds a challenge to the list", () => {
    const challenge = {
      id: "1",
      name: "Test Challenge",
      createdAt: 0,
      createdBy: "me",
      tiers: [],
      isTemplate: false,
    };

    useAppStore.getState().addChallenge(challenge);

    const challenges = useAppStore.getState().challenges;

    expect(challenges).toHaveLength(1);
    expect(challenges[0].name).toBe("Test Challenge");
  });
});

describe("deletePlayer", () => {
  it("deletes the player and related battles", () => {
    useAppStore.setState({
      players: [{ id: "p1", name: "Test", assignedChallenge: "c1" }],
      battles: [
        {
          id: "b1",
          playerId: "p1",
          challengeId: "c1",
          tierRowId: "t1",
          groupId: "g1",
          outcome: "win",
          minutesAwarded: 1,
          timestamp: 0,
        },
        {
          id: "b2",
          playerId: "p2",
          challengeId: "c1",
          tierRowId: "t1",
          groupId: "g1",
          outcome: "loss",
          minutesAwarded: 1,
          timestamp: 0,
        },
      ],
    });

    useAppStore.getState().deletePlayer("p1");

    const players = useAppStore.getState().players;
    const battles = useAppStore.getState().battles;

    expect(players).toHaveLength(0);
    expect(battles).toHaveLength(1);
    expect(battles[0].id).toBe("b2");
  });
});
