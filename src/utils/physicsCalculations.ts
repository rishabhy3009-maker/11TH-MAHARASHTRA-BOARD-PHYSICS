/**
 * Pure physics calculations and mathematical models for simulations and solvers.
 * Decoupled from UI rendering to allow automated unit testing.
 */

export interface ProjectileOutput {
  timeOfFlight: number; // seconds
  maxHeight: number; // meters
  horizontalRange: number; // meters
  vx: number; // horizontal velocity (constant)
  vyInitial: number; // vertical initial velocity
}

export function calculateProjectile(
  velocity: number,
  angleDeg: number,
  g: number = 9.8
): ProjectileOutput {
  if (velocity < 0 || g <= 0) {
    throw new Error('Velocity must be non-negative and gravity must be positive.');
  }

  const rad = (angleDeg * Math.PI) / 180;
  const vx = velocity * Math.cos(rad);
  const vyInitial = velocity * Math.sin(rad);

  const timeOfFlight = (2 * vyInitial) / g;
  const maxHeight = (vyInitial * vyInitial) / (2 * g);
  const horizontalRange = (velocity * velocity * Math.sin(2 * rad)) / g;

  return {
    timeOfFlight: Math.max(0, Number(timeOfFlight.toFixed(4))),
    maxHeight: Math.max(0, Number(maxHeight.toFixed(4))),
    horizontalRange: Math.max(0, Number(horizontalRange.toFixed(4))),
    vx: Number(vx.toFixed(4)),
    vyInitial: Number(vyInitial.toFixed(4)),
  };
}

export function getProjectilePosition(
  velocity: number,
  angleDeg: number,
  timeSec: number,
  g: number = 9.8
): { x: number; y: number; vx: number; vy: number } {
  const rad = (angleDeg * Math.PI) / 180;
  const vx = velocity * Math.cos(rad);
  const vy = velocity * Math.sin(rad) - g * timeSec;
  const x = vx * timeSec;
  const y = Math.max(0, velocity * Math.sin(rad) * timeSec - 0.5 * g * timeSec * timeSec);

  return {
    x: Number(x.toFixed(4)),
    y: Number(y.toFixed(4)),
    vx: Number(vx.toFixed(4)),
    vy: Number(vy.toFixed(4)),
  };
}

export interface InclineOutput {
  normalForce: number; // Newtons
  gravitationalDownForce: number; // Newtons along incline
  frictionForce: number; // Newtons
  netAcceleration: number; // m/s^2 down incline
  isSliding: boolean;
}

export function calculateInclineForces(
  massKg: number,
  angleDeg: number,
  muFriction: number,
  g: number = 9.8
): InclineOutput {
  if (massKg <= 0 || muFriction < 0) {
    throw new Error('Mass must be positive and friction coefficient non-negative.');
  }

  const rad = (angleDeg * Math.PI) / 180;
  const normalForce = massKg * g * Math.cos(rad);
  const downForce = massKg * g * Math.sin(rad);
  const maxFriction = muFriction * normalForce;

  const isSliding = downForce > maxFriction;
  const frictionForce = isSliding ? maxFriction : downForce;
  const netForce = isSliding ? downForce - maxFriction : 0;
  const netAcceleration = netForce / massKg;

  return {
    normalForce: Number(normalForce.toFixed(3)),
    gravitationalDownForce: Number(downForce.toFixed(3)),
    frictionForce: Number(frictionForce.toFixed(3)),
    netAcceleration: Number(netAcceleration.toFixed(3)),
    isSliding,
  };
}

export interface SnellOutput {
  refractedAngleDeg: number;
  isTotalInternalReflection: boolean;
  criticalAngleDeg?: number;
}

export function calculateSnellAngle(
  n1: number,
  n2: number,
  incidentAngleDeg: number
): SnellOutput {
  if (n1 <= 0 || n2 <= 0) {
    throw new Error('Refractive indices must be greater than zero.');
  }

  const incidentRad = (incidentAngleDeg * Math.PI) / 180;
  const sinIncident = Math.sin(incidentRad);
  const sinRefracted = (n1 / n2) * sinIncident;

  if (n1 > n2) {
    const criticalRad = Math.asin(n2 / n1);
    const criticalAngleDeg = Number(((criticalRad * 180) / Math.PI).toFixed(2));

    if (sinRefracted > 1.0) {
      return {
        refractedAngleDeg: 90,
        isTotalInternalReflection: true,
        criticalAngleDeg,
      };
    }

    const refractedRad = Math.asin(sinRefracted);
    return {
      refractedAngleDeg: Number(((refractedRad * 180) / Math.PI).toFixed(2)),
      isTotalInternalReflection: false,
      criticalAngleDeg,
    };
  }

  const refractedRad = Math.asin(Math.min(1.0, sinRefracted));
  return {
    refractedAngleDeg: Number(((refractedRad * 180) / Math.PI).toFixed(2)),
    isTotalInternalReflection: false,
  };
}

export function calculateEscapeVelocity(
  massKg: number,
  radiusM: number,
  G: number = 6.674e-11
): number {
  if (massKg <= 0 || radiusM <= 0) {
    throw new Error('Mass and radius must be positive.');
  }
  const v = Math.sqrt((2 * G * massKg) / radiusM);
  return Number(v.toFixed(2));
}

export function calculatePendulumPeriod(
  lengthM: number,
  g: number = 9.8
): number {
  if (lengthM <= 0 || g <= 0) {
    throw new Error('Length and gravity must be positive.');
  }
  const T = 2 * Math.PI * Math.sqrt(lengthM / g);
  return Number(T.toFixed(3));
}

export function evaluateLogicGate(
  gate: 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR',
  a: boolean,
  b: boolean = false
): boolean {
  switch (gate) {
    case 'AND':
      return a && b;
    case 'OR':
      return a || b;
    case 'NOT':
      return !a;
    case 'NAND':
      return !(a && b);
    case 'NOR':
      return !(a || b);
    case 'XOR':
      return a !== b;
    default:
      return false;
  }
}

export function calculateWheatstoneBalance(
  P: number,
  Q: number,
  R: number
): number {
  if (P <= 0) throw new Error('Resistance P must be positive.');
  return Number(((Q * R) / P).toFixed(2));
}

export function formatMathEquation(latex: string): string {
  if (!latex) return '';
  return latex
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\theta/g, 'θ')
    .replace(/\\mu/g, 'μ')
    .replace(/\\lambda/g, 'λ')
    .replace(/\\pi/g, 'π')
    .replace(/\\omega/g, 'ω')
    .replace(/\\sigma/g, 'σ')
    .replace(/\\varepsilon_0/g, 'ε₀')
    .replace(/\\varepsilon/g, 'ε')
    .replace(/\\Phi/g, 'Φ')
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\gamma/g, 'γ')
    .replace(/\\tau/g, 'τ')
    .replace(/\\mathbf\{([^}]+)\}/g, '$1')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)')
    .replace(/\\cdot/g, '·')
    .replace(/\\times/g, '×')
    .replace(/\\pm/g, '±')
    .replace(/\\mp/g, '∓')
    .replace(/\\le/g, '≤')
    .replace(/\\ge/g, '≥')
    .replace(/\\approx/g, '≈')
    .replace(/\\oint/g, '∮')
    .replace(/\\hat\{([^}]+)\}/g, '$1̂')
    .replace(/\\overline\{([^}]+)\}/g, '‾$1')
    .replace(/\\quad/g, '  ')
    .replace(/\\/g, '');
}
