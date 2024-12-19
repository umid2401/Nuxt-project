export function getWindDirection(deg) {
  if (deg > 337.5 || deg <= 22.5) return "север";
  if (deg > 22.5 && deg <= 67.5) return "северо-восток";
  if (deg > 67.5 && deg <= 112.5) return "восток";
  if (deg > 112.5 && deg <= 157.5) return "юго-восток";
  if (deg > 157.5 && deg <= 202.5) return "юг";
  if (deg > 202.5 && deg <= 247.5) return "юго-запад";
  if (deg > 247.5 && deg <= 292.5) return "запад";
  if (deg > 292.5 && deg <= 337.5) return "северо-запад";
}
