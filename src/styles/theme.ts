export const theme = {
  color: {
    white: "#fff",
    black: "#000",
    gray: "#a7aabc",
    darkgray: "#434656",
    lightpurple: "#a6accd",
  },
};

const customMediaQuery = (maxWidth: number): string =>
  `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  laptop: customMediaQuery(1440),
  mobile: customMediaQuery(420),
};
