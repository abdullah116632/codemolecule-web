const n = 0.3;
for (let i = 0; i <= 10; i++) {
  const angle = (i / 10) * Math.PI / 2; // 0 to 90 deg
  const bx = Math.pow(Math.abs(Math.cos(angle)), n);
  const by = Math.pow(Math.abs(Math.sin(angle)), n);
  console.log(`angle: ${(angle * 180 / Math.PI).toFixed(0)} deg, x: ${bx.toFixed(2)}, y: ${by.toFixed(2)}`);
}
