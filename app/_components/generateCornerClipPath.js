// Generates Safari-safe clip-path polygons for corner-shape styles
export default function generateCornerClipPath({
  width,
  height,
  radius,
  shape = "round", // round | scoop | bevel | notch | squircle
}) {
  if (shape == "superellipse") {
    return `superellipse(${radius / 10})`;
  }
  radius = Math.max(0, radius);

  // Helper to create N points along a curve segment
  function arcPoints(cx, cy, r, startAngle, endAngle, steps = 12) {
    const pts = [];
    for (let i = 0; i <= steps; i++) {
      const t = startAngle + (i / steps) * (endAngle - startAngle);
      pts.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]);
    }
    return pts;
  }

  let points = [];

  switch (shape) {
    case "round": {
      // Normal rounded corners → 4 quarter circles
      points = [
        ...arcPoints(radius, radius, radius, Math.PI, 1.5 * Math.PI), // top-left
        ...arcPoints(width - radius, radius, radius, 1.5 * Math.PI, 0), // top-right
        ...arcPoints(width - radius, height - radius, radius, 0, 0.5 * Math.PI), // bottom-right
        ...arcPoints(radius, height - radius, radius, 0.5 * Math.PI, Math.PI), // bottom-left
      ];
      break;
    }

    case "scoop": {
      // Inverse radius (cut inward)
      const r = radius;
      points = [
        ...arcPoints(0, 0, r, 0, Math.PI / 2), // top-left (inward)
        ...arcPoints(width, 0, r, Math.PI / 2, Math.PI), // top-right
        ...arcPoints(width, height, r, Math.PI, 1.5 * Math.PI), // bottom-right
        ...arcPoints(0, height, r, 1.5 * Math.PI, 2 * Math.PI), // bottom-left
      ];
      break;
    }

    case "bevel": {
      const r = radius;
      points = [
        [r, 0],
        [width - r, 0], // top
        [width, r],
        [width, height - r], // right
        [width - r, height],
        [r, height], // bottom
        [0, height - r],
        [0, r], // left
      ];
      break;
    }

    case "notch": {
      const r = radius;
      points = [
        [r, 0],
        [0, r], // top-left notch
        [0, height - r],
        [r, height], // bottom-left notch
        [width - r, height],
        [width, height - r], // bottom-right notch
        [width, r],
        [width - r, 0], // top-right notch
      ];
      break;
    }

    case "squircle": {
      // Superellipse approximation → x^(4) + y^(4) = r^(4)
      const n = 28; // number of boundary samples
      const a = width / 2;
      const b = height / 2;

      for (let i = 0; i < n; i++) {
        const t = (i / n) * 2 * Math.PI;
        const ct = Math.cos(t);
        const st = Math.sin(t);

        const x = a * Math.sign(ct) * Math.pow(Math.abs(ct), 2 / 4);
        const y = b * Math.sign(st) * Math.pow(Math.abs(st), 2 / 4);
        points.push([x + a, y + b]);
      }
      break;
    }

    default:
      throw new Error("Unsupported shape: " + shape);
  }

  // Convert to percentage coords (clip-path prefers %)
  const ptsPercent = points.map(([x, y]) => {
    const px = (x / width) * 100;
    const py = (y / height) * 100;
    return `${px.toFixed(2)}% ${py.toFixed(2)}%`;
  });

  // console.log(`polygon(${ptsPercent.join(", ")})`);

  return `polygon(${ptsPercent.join(", ")})`;
}
