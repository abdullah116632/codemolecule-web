import * as THREE from 'three';
const curve = new THREE.SplineCurve([
  new THREE.Vector2(-10, 0),
  new THREE.Vector2(0, 5),
  new THREE.Vector2(10, -5)
]);
const p = curve.getPoint(0.5);
console.log(p);
