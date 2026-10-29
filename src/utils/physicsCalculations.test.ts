import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateProjectile,
  calculateInclineForces,
  calculateSnellAngle,
  calculateEscapeVelocity,
  calculatePendulumPeriod,
  evaluateLogicGate,
  calculateWheatstoneBalance,
} from './physicsCalculations';

test('calculateProjectile: 45 degree launch at 20 m/s', () => {
  const result = calculateProjectile(20, 45, 9.8);
  // Time of flight = 2 * 20 * sin(45) / 9.8 = 2 * 14.1421 / 9.8 = 2.886s
  assert.ok(Math.abs(result.timeOfFlight - 2.886) < 0.05);
  // Max height = (vy^2)/(2g) = 200 / 19.6 = 10.2m
  assert.ok(Math.abs(result.maxHeight - 10.2) < 0.1);
  // Range = v^2 * sin(90) / 9.8 = 400 / 9.8 = 40.82m
  assert.ok(Math.abs(result.horizontalRange - 40.82) < 0.1);
});

test('calculateInclineForces: sliding condition check', () => {
  // Mass = 10kg, angle = 45 deg, mu = 0.2 (tan(45) = 1 > 0.2 => should slide)
  const sliding = calculateInclineForces(10, 45, 0.2, 9.8);
  assert.equal(sliding.isSliding, true);
  assert.ok(sliding.netAcceleration > 0);

  // Mass = 10kg, angle = 10 deg, mu = 0.5 (tan(10) ~ 0.176 < 0.5 => should NOT slide)
  const stationary = calculateInclineForces(10, 10, 0.5, 9.8);
  assert.equal(stationary.isSliding, false);
  assert.equal(stationary.netAcceleration, 0);
});

test('calculateSnellAngle: air to glass and total internal reflection', () => {
  // Air (1.0) to Glass (1.5) at 30 deg
  const airToGlass = calculateSnellAngle(1.0, 1.5, 30);
  assert.equal(airToGlass.isTotalInternalReflection, false);
  // sin(theta2) = (1/1.5)*sin(30) = 0.5 / 1.5 = 0.333 -> ~19.47 deg
  assert.ok(Math.abs(airToGlass.refractedAngleDeg - 19.47) < 0.2);

  // Glass (1.5) to Air (1.0) at 50 deg (critical angle is ~41.81 deg -> TIR)
  const glassToAir = calculateSnellAngle(1.5, 1.0, 50);
  assert.equal(glassToAir.isTotalInternalReflection, true);
  assert.ok(Math.abs(glassToAir.criticalAngleDeg! - 41.81) < 0.2);
});

test('calculateEscapeVelocity: Earth reference', () => {
  // Earth mass = 5.972e24 kg, radius = 6.371e6 m -> ~11186 m/s (11.2 km/s)
  const vEsc = calculateEscapeVelocity(5.972e24, 6.371e6, 6.674e-11);
  assert.ok(Math.abs(vEsc - 11186) < 50);
});

test('calculatePendulumPeriod: 1 meter pendulum', () => {
  // T = 2 * pi * sqrt(1 / 9.8) ~ 2.007s
  const T = calculatePendulumPeriod(1.0, 9.8);
  assert.ok(Math.abs(T - 2.007) < 0.05);
});

test('evaluateLogicGate: all standard gates', () => {
  assert.equal(evaluateLogicGate('AND', true, true), true);
  assert.equal(evaluateLogicGate('AND', true, false), false);
  assert.equal(evaluateLogicGate('OR', false, true), true);
  assert.equal(evaluateLogicGate('NOT', true), false);
  assert.equal(evaluateLogicGate('NAND', true, true), false);
  assert.equal(evaluateLogicGate('NOR', false, false), true);
  assert.equal(evaluateLogicGate('XOR', true, true), false);
  assert.equal(evaluateLogicGate('XOR', true, false), true);
});

test('calculateWheatstoneBalance: P/Q = R/S', () => {
  // P=10, Q=20, R=30 -> S = (20*30)/10 = 60
  const S = calculateWheatstoneBalance(10, 20, 30);
  assert.equal(S, 60);
});
