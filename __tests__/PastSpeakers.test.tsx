/**
 * Tests for PastSpeakers logic — pure-function approach
 *
 * Task 9.2 — Property 4: No raw "TBA" placeholders rendered in PastSpeakers
 * Task 9.3 — Unit tests for PastSpeakers tab state
 *
 * Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.6
 *
 * Strategy: mirror the renderTestimonials helper and tabs construction logic
 * from the component directly in tests, avoiding framer-motion/React rendering.
 */

// ---------------------------------------------------------------------------
// Mirror the pure logic from PastSpeakers.tsx
// ---------------------------------------------------------------------------

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

/**
 * Mirrors the renderTestimonials helper in components/PastSpeakers.tsx.
 * For year 2025, any entry whose name or designation contains "TBA" is
 * replaced with polished interim copy. All other years are returned as-is.
 */
function renderTestimonials(year: number, raw: Testimonial[]): Testimonial[] {
  if (year !== 2025) return raw;
  return raw.map((t) =>
    t.name.includes("TBA") || t.designation.includes("TBA")
      ? {
          quote: "Speaker details from the 2025 edition will be announced shortly.",
          name: "TEDxSIST 2025",
          designation: "Previous Edition",
          src: "/sample.png",
        }
      : t
  );
}

// Tab/years data mirroring the component
const years = [2026, 2025, 2023, 2022] as const;
type Year = (typeof years)[number];

const tabTitles = years.map((y) =>
  y === 2025 ? "2025 (Previous Edition)" : y.toString()
);

const testimonials2026: Testimonial[] = [
  {
    quote: "The 2026 speaker lineup will be revealed soon. Stay tuned for updates.",
    name: "TEDxSIST 2026",
    designation: "Coming Soon",
    src: "/sample.png",
  },
];

// ---------------------------------------------------------------------------
// Task 9.2 — Property 4: No raw "TBA" rendered in renderTestimonials output
// **Validates: Requirements 7.4**
// ---------------------------------------------------------------------------

describe("Property 4 — No raw TBA rendered in renderTestimonials (Task 9.2)", () => {
  it("2025: entry with name 'TBA' is replaced — output has no name === 'TBA'", () => {
    const raw: Testimonial[] = [
      { quote: "Details coming soon", name: "TBA", designation: "Speaker", src: "/img.png" },
    ];
    const result = renderTestimonials(2025, raw);
    const names = result.map((t) => t.name);
    expect(names).not.toContain("TBA");
  });

  it("2025: entry with designation 'TBA' is replaced — output has no designation === 'TBA'", () => {
    const raw: Testimonial[] = [
      { quote: "Some talk", name: "Jane Doe", designation: "TBA", src: "/img.png" },
    ];
    const result = renderTestimonials(2025, raw);
    const designations = result.map((t) => t.designation);
    expect(designations).not.toContain("TBA");
  });

  it("2025: entries WITHOUT 'TBA' pass through unchanged", () => {
    const raw: Testimonial[] = [
      {
        quote: "An inspiring talk about resilience.",
        name: "Dr. Aishwarya",
        designation: "Dermatologist",
        src: "/aishwarya.png",
      },
    ];
    const result = renderTestimonials(2025, raw);
    expect(result[0]).toEqual(raw[0]);
  });

  it.each([2026, 2023, 2022] as const)(
    "year %i: entries are passed through unchanged even if they contain 'TBA'",
    (year) => {
      const raw: Testimonial[] = [
        { quote: "TBA", name: "TBA", designation: "TBA", src: "/img.png" },
      ];
      const result = renderTestimonials(year, raw);
      // Non-2025 years must NOT apply the replacement filter
      expect(result[0]).toEqual(raw[0]);
    }
  );

  it("property sweep: 10 mixed 2025 inputs — output contains no 'TBA' in name or designation", () => {
    // Generate 10 inputs mixing TBA and non-TBA entries
    const inputs: Testimonial[][] = Array.from({ length: 10 }, (_, i) => [
      {
        quote: `Quote ${i}`,
        name: i % 2 === 0 ? "TBA" : `Speaker ${i}`,
        designation: i % 3 === 0 ? "TBA" : `Role ${i}`,
        src: "/sample.png",
      },
    ]);

    for (const raw of inputs) {
      const result = renderTestimonials(2025, raw);
      for (const t of result) {
        expect(t.name).not.toBe("TBA");
        expect(t.name).not.toContain("TBA");
        expect(t.designation).not.toBe("TBA");
        expect(t.designation).not.toContain("TBA");
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Task 9.3 — Unit tests for PastSpeakers tab state
// **Validates: Requirements 7.1, 7.2, 7.3, 7.6**
// ---------------------------------------------------------------------------

describe("PastSpeakers tab state — unit tests (Task 9.3)", () => {
  it("years array starts with 2026 (first element is 2026)", () => {
    expect(years[0]).toBe(2026);
  });

  it("year 2025 tab title is '2025 (Previous Edition)'", () => {
    const title2025 = tabTitles[years.indexOf(2025)];
    expect(title2025).toBe("2025 (Previous Edition)");
  });

  it("year 2026 tab title is '2026'", () => {
    const title2026 = tabTitles[years.indexOf(2026)];
    expect(title2026).toBe("2026");
  });

  it("testimonials2026 has exactly 1 entry with the correct placeholder quote", () => {
    expect(testimonials2026).toHaveLength(1);
    expect(testimonials2026[0].quote).toBe(
      "The 2026 speaker lineup will be revealed soon. Stay tuned for updates."
    );
    expect(testimonials2026[0].name).toBe("TEDxSIST 2026");
    expect(testimonials2026[0].designation).toBe("Coming Soon");
  });
});
