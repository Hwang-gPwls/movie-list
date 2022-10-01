export const theme = {
  color: {
    white: "#fff",
    black: "#0000",
    darkgray: "#2a303b",
    gray: "#A9AFBC",
  },
};

const customMediaQuery = (maxWidth: number): string =>
  `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  laptop: customMediaQuery(1440),
  mobile: customMediaQuery(420),
};
