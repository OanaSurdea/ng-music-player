export const convertToSeconds = (ms: number): string => {
  ms = Math.floor(ms);
  return (ms - (ms %= 60)) / 60 + (9 < ms ? ':' : ':0') + ms;
};
