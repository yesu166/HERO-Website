import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import App from "./main";
afterEach(() => cleanup());

describe("NESI story website", () => {
  it("opens with a mystery and an obvious path into the story", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /something has been.*under the surface/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /follow the signal/i }).getAttribute("href")).toBe("#vision");
  });
  it("reveals NESI and distinguishes development from concepts", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "NESI", exact: true })).toBeTruthy();
    expect(screen.getByText(/independent AI studio exploring a more connected way/i)).toBeTruthy();
    expect(screen.getByText("In development")).toBeTruthy();
    expect(screen.getAllByText("Concept")).toHaveLength(2);
  });
  it("provides accessible mobile navigation", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
    expect(screen.getByRole("button", { name: "Close navigation" }).getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(screen.getByRole("link", { name: /meet nesi/i }));
    expect(screen.getByRole("button", { name: "Open navigation" }).getAttribute("aria-expanded")).toBe("false");
  });
  it("animates the reveal after deliberate interaction", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /bring the signal to life/i });
    expect(button.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(button);
    expect(screen.getByRole("button", { name: /signal acknowledged/i }).getAttribute("aria-pressed")).toBe("true");
    expect(document.querySelector(".reveal-section")?.classList.contains("signal-awake")).toBe(true);
  });
  it("keeps every internal navigation link attached to a section", () => {
    const { container } = render(<App />);
    const ids = new Set(Array.from(container.querySelectorAll<HTMLElement>("[id]")).map((el) => el.id));
    const links = Array.from(container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    expect(links.length).toBeGreaterThan(8);
    links.forEach((link) => {
      const target = link.getAttribute("href")?.slice(1);
      expect(Boolean(target && ids.has(target))).toBe(true);
    });
  });
  it("links to the actual NESI project repository", () => {
    render(<App />);
    expect(screen.getByRole("link", { name: /explore the foundations/i }).getAttribute("href")).toBe("https://github.com/yesu166/NESI-Agentic-AI");
  });
});
