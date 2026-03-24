import { capitalizeFirstLetter, formatDate } from "../helpers";

describe("capitalizeFirstLetter", () => {
  it("capitalizes the first letter", () => {
    expect(capitalizeFirstLetter("fire")).toBe("Fire");
  });

  it("already capitalized string", () => {
    expect(capitalizeFirstLetter("Fire")).toBe("Fire");
  });

  it("handles single letter", () => {
    expect(capitalizeFirstLetter("a")).toBe("A");
  });

  it("handles empty string", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });
});

describe("formatDate", () => {
  it("formats a timestamp into a readable date", () => {
    const ts = new Date("2026-03-24").getTime();
    expect(formatDate(ts)).toBe("Mar 24, 2026");
  });
});
