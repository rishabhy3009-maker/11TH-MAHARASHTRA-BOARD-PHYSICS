import { FormulaVaultItem } from '../types/physics';

export const FORMULA_VAULT: FormulaVaultItem[] = [
  {
    id: 'f-proj-range',
    chapterId: 3,
    chapterTitle: 'Motion in a Plane',
    name: 'Horizontal Range of Projectile',
    equation: 'R = \\frac{u^2 \\sin(2\\theta)}{g}',
    dimensionalFormula: '[M^0 L^1 T^0]',
    siUnit: 'meters (m)',
    category: 'mechanics',
    variables: [
      { symbol: 'u', label: 'Initial Velocity', defaultValue: 25, unit: 'm/s', min: 1, max: 100, step: 1 },
      { symbol: 'theta', label: 'Launch Angle', defaultValue: 45, unit: 'degrees', min: 1, max: 89, step: 1 },
      { symbol: 'g', label: 'Acceleration due to Gravity', defaultValue: 9.8, unit: 'm/s²', min: 1, max: 25, step: 0.1 }
    ],
    compute: (inputs) => {
      const u = inputs['u'] || 25;
      const theta = inputs['theta'] || 45;
      const g = inputs['g'] || 9.8;
      const rad = (2 * theta * Math.PI) / 180;
      const R = (u * u * Math.sin(rad)) / g;
      return {
        value: Number(R.toFixed(2)),
        unit: 'm',
        steps: [
          `Substitute u = ${u} m/s, θ = ${theta}°, g = ${g} m/s²`,
          `2θ = ${2 * theta}°, sin(${2 * theta}°) = ${Math.sin(rad).toFixed(4)}`,
          `R = (${u}² × ${Math.sin(rad).toFixed(4)}) / ${g}`,
          `R = (${(u * u).toFixed(2)} × ${Math.sin(rad).toFixed(4)}) / ${g} = ${R.toFixed(2)} m`
        ]
      };
    }
  },
  {
    id: 'f-proj-height',
    chapterId: 3,
    chapterTitle: 'Motion in a Plane',
    name: 'Maximum Vertical Height of Projectile',
    equation: 'H_{max} = \\frac{u^2 \\sin^2(\\theta)}{2g}',
    dimensionalFormula: '[M^0 L^1 T^0]',
    siUnit: 'meters (m)',
    category: 'mechanics',
    variables: [
      { symbol: 'u', label: 'Initial Velocity', defaultValue: 25, unit: 'm/s', min: 1, max: 100, step: 1 },
      { symbol: 'theta', label: 'Launch Angle', defaultValue: 45, unit: 'degrees', min: 1, max: 89, step: 1 },
      { symbol: 'g', label: 'Acceleration due to Gravity', defaultValue: 9.8, unit: 'm/s²', min: 1, max: 25, step: 0.1 }
    ],
    compute: (inputs) => {
      const u = inputs['u'] || 25;
      const theta = inputs['theta'] || 45;
      const g = inputs['g'] || 9.8;
      const rad = (theta * Math.PI) / 180;
      const sinVal = Math.sin(rad);
      const H = (u * u * sinVal * sinVal) / (2 * g);
      return {
        value: Number(H.toFixed(2)),
        unit: 'm',
        steps: [
          `sin(${theta}°) = ${sinVal.toFixed(4)}`,
          `sin²(${theta}°) = ${(sinVal * sinVal).toFixed(4)}`,
          `H = (${u * u} × ${(sinVal * sinVal).toFixed(4)}) / (2 × ${g}) = ${H.toFixed(2)} m`
        ]
      };
    }
  },
  {
    id: 'f-bank-opt',
    chapterId: 4,
    chapterTitle: 'Laws of Motion',
    name: 'Optimum Banking Speed on Curved Road',
    equation: 'v_{opt} = \\sqrt{r g \\tan(\\theta)}',
    dimensionalFormula: '[M^0 L^1 T^{-1}]',
    siUnit: 'm/s',
    category: 'mechanics',
    variables: [
      { symbol: 'r', label: 'Radius of Curve', defaultValue: 100, unit: 'm', min: 10, max: 500, step: 5 },
      { symbol: 'theta', label: 'Banking Angle', defaultValue: 30, unit: 'degrees', min: 1, max: 60, step: 1 },
      { symbol: 'g', label: 'Gravity', defaultValue: 9.8, unit: 'm/s²', min: 1, max: 25, step: 0.1 }
    ],
    compute: (inputs) => {
      const r = inputs['r'] || 100;
      const theta = inputs['theta'] || 30;
      const g = inputs['g'] || 9.8;
      const tanVal = Math.tan((theta * Math.PI) / 180);
      const v = Math.sqrt(r * g * tanVal);
      return {
        value: Number(v.toFixed(2)),
        unit: 'm/s',
        steps: [
          `tan(${theta}°) = ${tanVal.toFixed(4)}`,
          `v = √(${r} × ${g} × ${tanVal.toFixed(4)})`,
          `v = √(${(r * g * tanVal).toFixed(2)}) = ${v.toFixed(2)} m/s (${(v * 3.6).toFixed(1)} km/h)`
        ]
      };
    }
  },
  {
    id: 'f-escape-vel',
    chapterId: 5,
    chapterTitle: 'Gravitation',
    name: 'Escape Velocity from Planet',
    equation: 'v_e = \\sqrt{\\frac{2GM}{R}}',
    dimensionalFormula: '[M^0 L^1 T^{-1}]',
    siUnit: 'm/s',
    category: 'mechanics',
    variables: [
      { symbol: 'M', label: 'Mass of Planet (× 10²⁴ kg)', defaultValue: 5.972, unit: '× 10²⁴ kg', min: 0.1, max: 2000, step: 0.1 },
      { symbol: 'R', label: 'Radius of Planet (km)', defaultValue: 6371, unit: 'km', min: 500, max: 100000, step: 100 }
    ],
    compute: (inputs) => {
      const M_val = (inputs['M'] || 5.972) * 1e24;
      const R_val = (inputs['R'] || 6371) * 1000;
      const G = 6.674e-11;
      const v = Math.sqrt((2 * G * M_val) / R_val);
      const vKm = v / 1000;
      return {
        value: Number(vKm.toFixed(2)),
        unit: 'km/s',
        steps: [
          `Planet Mass M = ${M_val.toExponential(3)} kg`,
          `Planet Radius R = ${R_val.toExponential(3)} m`,
          `v = √((2 × 6.674×10⁻¹¹ × ${M_val.toExponential(2)}) / ${R_val.toExponential(2)})`,
          `v = ${v.toFixed(0)} m/s = ${vKm.toFixed(2)} km/s`
        ]
      };
    }
  },
  {
    id: 'f-snell',
    chapterId: 9,
    chapterTitle: 'Optics',
    name: 'Snell\'s Law of Refraction',
    equation: 'n_1 \\sin(\\theta_1) = n_2 \\sin(\\theta_2)',
    dimensionalFormula: '[M^0 L^0 T^0] (Dimensionless)',
    siUnit: 'degrees',
    category: 'optics',
    variables: [
      { symbol: 'n1', label: 'Refractive Index 1 (Incident)', defaultValue: 1.0, unit: '', min: 1.0, max: 3.0, step: 0.05 },
      { symbol: 'n2', label: 'Refractive Index 2 (Refracting)', defaultValue: 1.5, unit: '', min: 1.0, max: 3.0, step: 0.05 },
      { symbol: 'theta1', label: 'Incident Angle', defaultValue: 30, unit: 'degrees', min: 0, max: 89, step: 1 }
    ],
    compute: (inputs) => {
      const n1 = inputs['n1'] || 1.0;
      const n2 = inputs['n2'] || 1.5;
      const theta1 = inputs['theta1'] || 30;
      const sin1 = Math.sin((theta1 * Math.PI) / 180);
      const sin2 = (n1 / n2) * sin1;

      if (sin2 > 1) {
        const critAngle = ((Math.asin(n2 / n1) * 180) / Math.PI).toFixed(2);
        return {
          value: 90,
          unit: 'Total Internal Reflection (TIR)',
          steps: [
            `sin(θ₂) = (n₁/n₂) × sin(θ₁) = (${n1}/${n2}) × ${sin1.toFixed(4)} = ${sin2.toFixed(4)} > 1.0`,
            `Light undergoes Total Internal Reflection!`,
            `Critical angle θ_c = arcsin(${n2}/${n1}) = ${critAngle}°`
          ]
        };
      }

      const theta2 = (Math.asin(sin2) * 180) / Math.PI;
      return {
        value: Number(theta2.toFixed(2)),
        unit: 'degrees',
        steps: [
          `sin(θ₁) = sin(${theta1}°) = ${sin1.toFixed(4)}`,
          `sin(θ₂) = (${n1} / ${n2}) × ${sin1.toFixed(4)} = ${sin2.toFixed(4)}`,
          `θ₂ = arcsin(${sin2.toFixed(4)}) = ${theta2.toFixed(2)}°`
        ]
      };
    }
  },
  {
    id: 'f-lens-maker',
    chapterId: 9,
    chapterTitle: 'Optics',
    name: 'Lens Maker\'s Formula (Focal Length)',
    equation: '\\frac{1}{f} = (\\mu - 1) \\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)',
    dimensionalFormula: '[M^0 L^1 T^0]',
    siUnit: 'cm',
    category: 'optics',
    variables: [
      { symbol: 'mu', label: 'Refractive Index of Glass', defaultValue: 1.5, unit: '', min: 1.1, max: 2.5, step: 0.05 },
      { symbol: 'R1', label: 'Radius of 1st Surface R₁', defaultValue: 20, unit: 'cm', min: 5, max: 100, step: 1 },
      { symbol: 'R2', label: 'Radius of 2nd Surface R₂', defaultValue: -20, unit: 'cm', min: -100, max: 100, step: 1 }
    ],
    compute: (inputs) => {
      const mu = inputs['mu'] || 1.5;
      const R1 = inputs['R1'] || 20;
      const R2 = inputs['R2'] || -20;
      const invF = (mu - 1) * (1 / R1 - 1 / R2);
      const f = 1 / invF;
      return {
        value: Number(f.toFixed(2)),
        unit: 'cm',
        steps: [
          `1/R₁ = 1/${R1} = ${(1 / R1).toFixed(4)} cm⁻¹`,
          `1/R₂ = 1/${R2} = ${(1 / R2).toFixed(4)} cm⁻¹`,
          `1/f = (${mu} - 1) × (${(1 / R1).toFixed(4)} - ${(1 / R2).toFixed(4)}) = ${invF.toFixed(4)} cm⁻¹`,
          `f = 1 / ${invF.toFixed(4)} = ${f.toFixed(2)} cm`
        ]
      };
    }
  },
  {
    id: 'f-wheatstone',
    chapterId: 11,
    chapterTitle: 'Electric Current Through Conductors',
    name: 'Balanced Wheatstone Bridge Resistance S',
    equation: 'S = \\frac{Q \\cdot R}{P}',
    dimensionalFormula: '[M^1 L^2 T^{-3} A^{-2}]',
    siUnit: 'Ohms (Ω)',
    category: 'electromagnetism',
    variables: [
      { symbol: 'P', label: 'Arm P Resistance', defaultValue: 10, unit: 'Ω', min: 1, max: 1000, step: 1 },
      { symbol: 'Q', label: 'Arm Q Resistance', defaultValue: 25, unit: 'Ω', min: 1, max: 1000, step: 1 },
      { symbol: 'R', label: 'Arm R Resistance', defaultValue: 40, unit: 'Ω', min: 1, max: 1000, step: 1 }
    ],
    compute: (inputs) => {
      const P = inputs['P'] || 10;
      const Q = inputs['Q'] || 25;
      const R = inputs['R'] || 40;
      const S = (Q * R) / P;
      return {
        value: Number(S.toFixed(2)),
        unit: 'Ω',
        steps: [
          `Wheatstone balance condition: P / Q = R / S`,
          `S = (Q × R) / P`,
          `S = (${Q} × ${R}) / ${P} = ${(Q * R).toFixed(0)} / ${P} = ${S.toFixed(2)} Ω`
        ]
      };
    }
  },
  {
    id: 'f-doppler-sound',
    chapterId: 8,
    chapterTitle: 'Sound',
    name: 'Doppler Shift: Moving Source Towards Observer',
    equation: 'f_{app} = f_0 \\left(\\frac{v}{v - v_s}\\right)',
    dimensionalFormula: '[M^0 L^0 T^{-1}]',
    siUnit: 'Hertz (Hz)',
    category: 'thermal-sound',
    variables: [
      { symbol: 'f0', label: 'Original Source Frequency', defaultValue: 500, unit: 'Hz', min: 100, max: 2000, step: 10 },
      { symbol: 'v', label: 'Speed of Sound in Air', defaultValue: 340, unit: 'm/s', min: 300, max: 360, step: 1 },
      { symbol: 'vs', label: 'Source Speed Approaching', defaultValue: 34, unit: 'm/s', min: 0, max: 200, step: 2 }
    ],
    compute: (inputs) => {
      const f0 = inputs['f0'] || 500;
      const v = inputs['v'] || 340;
      const vs = inputs['vs'] || 34;
      const f_app = f0 * (v / (v - vs));
      return {
        value: Number(f_app.toFixed(1)),
        unit: 'Hz',
        steps: [
          `Denominator v - vs = ${v} - ${vs} = ${v - vs} m/s`,
          `Ratio v / (v - vs) = ${v} / ${v - vs} = ${(v / (v - vs)).toFixed(4)}`,
          `f_app = ${f0} × ${(v / (v - vs)).toFixed(4)} = ${f_app.toFixed(1)} Hz (Pitch increases!)`
        ]
      };
    }
  }
];
