export const getVideoDurationString = (durationInSeconds: number) => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  const secondsString = seconds.toString().padStart(2, '0');

  if (minutes < 60) {
    return `${minutes}:${secondsString}`;
  }

  const hours = Math.floor(minutes / 60);
  const hourMinutes = minutes % 60;
  const hourMinutesString = hourMinutes.toString().padStart(2, '0');

  return `${hours}:${hourMinutesString}:${secondsString}`;
};
