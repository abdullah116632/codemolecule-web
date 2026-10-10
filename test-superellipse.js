const n = 0.3;
const w = 100, h = 100;
for (let i = 0; i < 8; i++) {
  const angle = (i / 8) * Math.PI * 2;
  const bx = w * Math.pow(Math.abs(Math.cos(angle)), n) * Math.sign(Math.cos(angle));
  const by = h * Math.pow(Math.abs(Math.sin(angle)), n) * Math.sign(Math.sin(angle));
  console.log(`angle: ${angle.toFixed(2)}, x: ${bx.toFixed(2)}, y: ${by.toFixed(2)}`);
}
