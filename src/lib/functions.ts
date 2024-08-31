import { Point } from "./types"

export function lerp(start: number, end: number, amount: number) {
  const twoPi = 2 * Math.PI

  start = start % twoPi
  end = end % twoPi

  if (start < 0) start += twoPi
  if (end < 0) end += twoPi

  let difference = end - start

  if (difference > Math.PI) {
    difference -= twoPi
  } else if (difference < -Math.PI) {
    difference += twoPi
  }

  const result = start + difference * amount

  return (result + twoPi) % twoPi
}

export function interpolateArc(start: Point, end: Point, time: number, speed: number, radius: number) {
  // Oblicz wektor między startem a końcem
  let dx = end.x - start.x;
  let dy = end.y - start.y;
  
  // Oblicz kąt pomiędzy wektorem a osią X
  let angle = Math.atan2(dy, dx);

  // Znajdź środek okręgu pomiędzy punktami
  let midX = (start.x + end.x) / 2;
  let midY = (start.y + end.y) / 2;

  // Wektor normalny do linii prostej między punktami (prostopadły)
  let normalX = -dy;
  let normalY = dx;

  // Normalizacja wektora
  let length = Math.sqrt(normalX * normalX + normalY * normalY);
  normalX /= length;
  normalY /= length;

  // Ustawienie odpowiedniego promienia łuku
  normalX *= radius;
  normalY *= radius;

  // Przesunięcie środka wzdłuż normalnej do punktu startowego
  let centerX = midX + normalX;
  let centerY = midY + normalY;

  // Oblicz kąt startowy i końcowy
  let startAngle = Math.atan2(start.y - centerY, start.x - centerX);
  let endAngle = Math.atan2(end.y - centerY, end.x - centerX);

  // Oblicz całkowitą długość łuku
  let arcLength = Math.abs(endAngle - startAngle) * radius;

  // Oblicz ile czasu potrzeba na przebycie łuku przy danej prędkości
  let totalTime = arcLength / speed;

  // Oblicz pozycję na łuku w zależności od upływu czasu
  let t = Math.min(time / totalTime, 1); // t = czas / całkowity czas, ograniczamy do 1

  // Kąt w zależności od 't'
  let interpolatedAngle = startAngle + (endAngle - startAngle) * t;

  // Oblicz nową pozycję na łuku
  let x = centerX + radius * Math.cos(interpolatedAngle);
  let y = centerY + radius * Math.sin(interpolatedAngle);

  return { x: x, y: y, t: t };
}
