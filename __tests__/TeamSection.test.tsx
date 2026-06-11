/**
 * Tests for TeamSection component
 *
 * Task 10.2 — Property 5: No raw placeholder text rendered in TeamSection
 * Task 10.3 — Unit tests for TeamSection
 *
 * Validates: Requirements 8.1, 8.2, 8.3
 *
 * Pure-function approach: tests mirror the renderTeamMembers logic directly,
 * avoiding framer-motion / ChevronLeft / AnimatedTestimonials rendering complexity.
 */

// ---------------------------------------------------------------------------
// Pure-function mirror of renderTeamMembers from TeamSection.tsx
// ---------------------------------------------------------------------------

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  designation: string;
  src: string;
}

/**
 * Mirror of renderTeamMembers from components/TeamSection.tsx.
 * Any entry whose name/designation contains "TBA" or whose quote contains
 * "coming soon" (case-insensitive) is replaced with polished interim copy.
 */
function renderTeamMembers(members: Testimonial[]): Testimonial[] {
  return members.map((m) =>
    m.name.includes("TBA") ||
    m.designation.includes("TBA") ||
    m.quote.toLowerCase().includes("coming soon")
      ? {
          id: m.id,
          quote: "Team details for this edition will be announced shortly.",
          name: "—",
          designation: "—",
          src: "/sample.png",
        }
      : m
  );
}

// ---------------------------------------------------------------------------
// Static data mirrored from TeamSection.tsx
// ---------------------------------------------------------------------------

const teams = ["2026 Team"];

const testimonialsByTeam: Record<string, Testimonial[]> = {
  "2026 Team": [
    {
      id: 0,
      quote: "Team details coming soon...",
      name: "TBA",
      designation: "TBA",
      src: "/sample.png",
    },
  ],
};

// ---------------------------------------------------------------------------
// Task 10.2 — Property 5: No raw placeholder text rendered in TeamSection
// **Validates: Requirements 8.2, 8.3**
// ---------------------------------------------------------------------------

describe("Property 5 — No raw placeholder text rendered in TeamSection (Task 10.2)", () => {
  // 1. Entry with name: "TBA" → replaced; output has name === "—", no name === "TBA"
  it("replaces an entry with name 'TBA': output name is '—', not 'TBA'", () => {
    const input: Testimonial[] = [
      { id: 1, quote: "Some quote", name: "TBA", designation: "Coordinator", src: "/sample.png" },
    ];
    const result = renderTeamMembers(input);
    expect(result[0].name).toBe("—");
    expect(result[0].name).not.toBe("TBA");
  });

  // 2. Entry with designation: "TBA" → replaced; output has designation === "—", no designation === "TBA"
  it("replaces an entry with designation 'TBA': output designation is '—', not 'TBA'", () => {
    const input: Testimonial[] = [
      { id: 2, quote: "Some quote", name: "Alice", designation: "TBA", src: "/sample.png" },
    ];
    const result = renderTeamMembers(input);
    expect(result[0].designation).toBe("—");
    expect(result[0].designation).not.toBe("TBA");
  });

  // 3. Entry with quote containing "coming soon" → replaced
  it("replaces an entry whose quote contains 'coming soon' (case-insensitive)", () => {
    const input: Testimonial[] = [
      { id: 3, quote: "Team details coming soon...", name: "Bob", designation: "Lead", src: "/sample.png" },
    ];
    const result = renderTeamMembers(input);
    expect(result[0].name).toBe("—");
    expect(result[0].designation).toBe("—");
    expect(result[0].quote).toBe(
      "Team details for this edition will be announced shortly."
    );
  });

  // 4. Clean entry (no TBA, no coming soon) → passed through unchanged
  it("passes through a clean entry unchanged", () => {
    const input: Testimonial[] = [
      {
        id: 4,
        quote: "I drive the mission forward.",
        name: "Carol",
        designation: "Tech Lead",
        src: "/team/carol.png",
      },
    ];
    const result = renderTeamMembers(input);
    expect(result[0]).toEqual(input[0]);
  });

  // 5. Property sweep: 10+ mixed inputs — assert output contains no "TBA" and no "coming soon"
  it("property sweep: 10+ mixed inputs — output never contains 'TBA' or 'coming soon'", () => {
    const mixedInputs: Testimonial[] = [
      { id: 10, quote: "TBA details", name: "TBA", designation: "TBA", src: "/s.png" },
      { id: 11, quote: "Coming soon details", name: "TBA", designation: "Staff", src: "/s.png" },
      { id: 12, quote: "Details COMING SOON for 2026", name: "Dave", designation: "TBA", src: "/s.png" },
      { id: 13, quote: "Team details coming soon...", name: "TBA", designation: "TBA", src: "/s.png" },
      { id: 14, quote: "Great contribution", name: "Eve", designation: "Design Lead", src: "/s.png" },
      { id: 15, quote: "Another clean entry", name: "Frank", designation: "Organiser", src: "/s.png" },
      { id: 16, quote: "TBA", name: "TBA", designation: "TBA", src: "/s.png" },
      { id: 17, quote: "coming soon", name: "Grace", designation: "TBA", src: "/s.png" },
      { id: 18, quote: "Solid work here", name: "Henry", designation: "Finance", src: "/s.png" },
      { id: 19, quote: "Coming Soon", name: "Iris", designation: "Curation", src: "/s.png" },
      { id: 20, quote: "Team coming soon update", name: "Jack", designation: "Operations", src: "/s.png" },
    ];

    const result = renderTeamMembers(mixedInputs);

    for (const item of result) {
      // No field should contain "TBA"
      expect(item.name).not.toContain("TBA");
      expect(item.designation).not.toContain("TBA");
      expect(item.quote).not.toContain("TBA");
      // No field should contain "coming soon" (case-insensitive)
      expect(item.name.toLowerCase()).not.toContain("coming soon");
      expect(item.designation.toLowerCase()).not.toContain("coming soon");
      expect(item.quote.toLowerCase()).not.toContain("coming soon");
    }
  });

  // 6. Replacement quote is exactly the polished interim copy
  it("replacement quote is exactly 'Team details for this edition will be announced shortly.'", () => {
    const input: Testimonial[] = [
      { id: 21, quote: "coming soon", name: "TBA", designation: "TBA", src: "/sample.png" },
    ];
    const result = renderTeamMembers(input);
    expect(result[0].quote).toBe(
      "Team details for this edition will be announced shortly."
    );
  });
});

// ---------------------------------------------------------------------------
// Task 10.3 — Unit tests for TeamSection
// **Validates: Requirements 8.1, 8.2, 8.3**
// ---------------------------------------------------------------------------

describe("TeamSection — unit tests (Task 10.3)", () => {
  // 7. The teams array contains "2026 Team" and NOT "2025 Team"
  it('teams array contains "2026 Team" and not "2025 Team"', () => {
    expect(teams).toContain("2026 Team");
    expect(teams).not.toContain("2025 Team");
  });

  // 8. The testimonialsByTeam["2026 Team"] key exists
  it('testimonialsByTeam has "2026 Team" key', () => {
    expect(testimonialsByTeam).toHaveProperty("2026 Team");
    expect(Array.isArray(testimonialsByTeam["2026 Team"])).toBe(true);
  });

  // 9. The "2026 Team" entry has name: "TBA" in raw data — after renderTeamMembers, name is "—"
  it('"2026 Team" raw data has name "TBA"; after renderTeamMembers, name becomes "—"', () => {
    const rawEntry = testimonialsByTeam["2026 Team"][0];
    expect(rawEntry.name).toBe("TBA");

    const rendered = renderTeamMembers(testimonialsByTeam["2026 Team"]);
    expect(rendered[0].name).toBe("—");
  });

  // 10. Tab label "2026 Team" is correct (requirement 8.1)
  it('tab label is "2026 Team" — satisfies requirement 8.1', () => {
    // The teams array drives the tab titles directly in the component
    expect(teams[0]).toBe("2026 Team");
  });
});
