// Validated dark-mode categorical palette (fixed order — never cycled or reassigned by rank).
// Source: dataviz skill reference palette, dark column. Passes adjacent-pair CVD Delta E >= 8
// and normal-vision floor >= 15 on a dark chart surface.
export const CATEGORICAL_DARK = [
  "#3987e5", // blue
  "#d95926", // orange
  "#199e70", // aqua
  "#c98500", // yellow
  "#d55181", // magenta
  "#008300", // green
  "#9085e9", // violet
  "#e66767", // red
] as const;

// Returns a CSS variable so the chart follows the active theme: globals.css
// defines --series-N with the dark column above and the light column for html.light.
export function categoricalColor(index: number) {
  return `var(--series-${(index % CATEGORICAL_DARK.length) + 1})`;
}
