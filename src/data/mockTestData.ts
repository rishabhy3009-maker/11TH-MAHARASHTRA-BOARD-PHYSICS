import { Question } from '../types/physics';

export interface MockTest {
  id: string;
  title: string;
  syllabusCovered: string;
  durationMinutes: number;
  totalMarks: number;
  questions: Question[];
}

export const SAMPLE_JEE_MOCK_TEST: MockTest = {
  id: 'jee-full-01',
  title: 'JEE Main 2026 Physics Full Mock Test #1',
  syllabusCovered: 'Class 11 Complete Mechanics, Thermal, Optics, Electromagnetism & Modern Physics',
  durationMinutes: 45,
  totalMarks: 60,
  questions: [
    {
      id: 'mock-1',
      chapterId: 1,
      type: 'mcq',
      text: 'In an experiment, four quantities a, b, c and d are measured with percentage error 1%, 2%, 3% and 4% respectively. Quantity P is calculated as P = (a³ b²) / (c d). The maximum percentage error in P is:',
      options: ['10%', '14%', '16%', '12%'],
      correctOptionIndex: 1,
      explanation: 'ΔP/P = 3(Δa/a) + 2(Δb/b) + 1(Δc/c) + 1(Δd/d) = 3(1) + 2(2) + 3 + 4 = 3 + 4 + 3 + 4 = 14%.',
      hint: 'Relative error in a product/quotient is the sum of product of power and relative errors.',
      difficulty: 'JEE Main',
      yearTag: 'JEE Main Standard'
    },
    {
      id: 'mock-2',
      chapterId: 2,
      type: 'mcq',
      text: 'Two vectors A and B have equal magnitudes of 10 units. If the magnitude of their sum |A + B| is also 10 units, what is the angle between vectors A and B?',
      options: ['60°', '90°', '120°', '180°'],
      correctOptionIndex: 2,
      explanation: '|A + B|² = A² + B² + 2AB cos θ => 10² = 10² + 10² + 2(10)(10) cos θ => 100 = 200 + 200 cos θ => 200 cos θ = -100 => cos θ = -1/2 => θ = 120°.',
      hint: 'Use the parallelogram resultant formula R² = A² + B² + 2AB cos θ.',
      difficulty: 'JEE Main'
    },
    {
      id: 'mock-3',
      chapterId: 3,
      type: 'mcq',
      text: 'A particle is projected with velocity 50 m/s at an angle of 53° above the horizontal (sin 53° = 4/5, cos 53° = 3/5). At apex, the radius of curvature of its trajectory is: (Take g = 10 m/s²)',
      options: ['45 m', '90 m', '120 m', '150 m'],
      correctOptionIndex: 1,
      explanation: 'At apex, velocity is purely horizontal v = u cos 53° = 50 × (3/5) = 30 m/s. Centripetal acceleration is gravity a_c = g = 10 m/s². Radius of curvature ρ = v² / a_c = 30² / 10 = 900 / 10 = 90 m.',
      hint: 'Radius of curvature = (instantaneous velocity)² / (normal component of acceleration).',
      difficulty: 'JEE Main'
    },
    {
      id: 'mock-4',
      chapterId: 4,
      type: 'mcq',
      text: 'A block of mass 2 kg rests on a rough horizontal plane (μs = 0.5, μk = 0.4). A horizontal force of 8 N is applied on the block. The magnitude of friction force acting on the block is: (g = 10 m/s²)',
      options: ['10 N', '8 N', '0 N', '4 N'],
      correctOptionIndex: 1,
      explanation: 'Maximum limiting static friction f_lim = μs N = 0.5 × (2 × 10) = 10 N. Applied force F = 8 N is less than f_lim (8 < 10), so block does not move. Static friction adjusts itself to exactly equal applied force: f = 8 N.',
      hint: 'Static friction is self-adjusting as long as applied force is less than limiting friction.',
      difficulty: 'JEE Main'
    },
    {
      id: 'mock-5',
      chapterId: 5,
      type: 'mcq',
      text: 'The escape velocity from the surface of Earth is 11.2 km/s. If a planet has double the mass of Earth and half the radius of Earth, its escape velocity will be:',
      options: ['11.2 km/s', '22.4 km/s', '5.6 km/s', '44.8 km/s'],
      correctOptionIndex: 1,
      explanation: 'v_e = √(2GM / R). For the new planet: v_e\' = √[2G(2M) / (R/2)] = √(4 × 2GM/R) = 2 v_e = 2 × 11.2 = 22.4 km/s.',
      hint: 'Substitute M\' = 2M and R\' = R/2 into the escape velocity formula.',
      difficulty: 'JEE Main'
    },
    {
      id: 'mock-6',
      chapterId: 8,
      type: 'mcq',
      text: 'A train moving at 34 m/s sounds its horn of frequency 450 Hz while approaching a tunnel in a hill. The speed of sound is 340 m/s. The frequency of echo heard by the train driver reflected from the hill is:',
      options: ['450 Hz', '500 Hz', '550 Hz', '600 Hz'],
      correctOptionIndex: 2,
      explanation: 'When reflection occurs from a stationary cliff, the driver acts as an observer approaching a source image. Direct formula: f\'\' = f₀ [(v + v_t) / (v - v_t)] = 450 × [(340 + 34) / (340 - 34)] = 450 × (374 / 306) = 450 × (11 / 9) = 550 Hz.',
      hint: 'Use the double Doppler formula for echo f\'\' = f [(v + u)/(v - u)].',
      difficulty: 'JEE Advanced'
    },
    {
      id: 'mock-7',
      chapterId: 9,
      type: 'mcq',
      text: 'A ray of light is incident at an angle of 60° on one face of an equilateral prism of refractive index √3. The angle of emergence from the other face is:',
      options: ['30°', '45°', '60°', '90°'],
      correctOptionIndex: 2,
      explanation: 'Prism angle A = 60°. At 1st face: 1 × sin 60° = √3 sin r₁ => √3/2 = √3 sin r₁ => sin r₁ = 1/2 => r₁ = 30°. Since r₁ + r₂ = A => r₂ = 60° - 30° = 30°. At 2nd face: √3 sin 30° = 1 × sin e => √3 × (1/2) = sin e => sin e = √3/2 => e = 60°. (Symmetric minimum deviation case!)',
      hint: 'Snell\'s law at both faces and r1 + r2 = A.',
      difficulty: 'JEE Main'
    },
    {
      id: 'mock-8',
      chapterId: 10,
      type: 'mcq',
      text: 'An electric dipole of moment p is placed in a uniform electric field E at an angle of 30°. The work done in rotating the dipole to align it opposite to the electric field (angle 180°) is:',
      options: ['pE (1 + √3/2)', 'pE (1 - √3/2)', '2 pE', '√3 pE'],
      correctOptionIndex: 0,
      explanation: 'Work done W = - pE (cos θ₂ - cos θ₁) = - pE (cos 180° - cos 30°) = - pE (-1 - √3/2) = pE (1 + √3/2).',
      hint: 'W = U_final - U_initial = -pE cos θ2 - (-pE cos θ1).',
      difficulty: 'JEE Main'
    },
    {
      id: 'mock-9',
      chapterId: 11,
      type: 'numerical',
      text: 'In a meter bridge experiment, null point is found at 40 cm from the left end when unknown resistance R is in left gap and 12 Ω standard resistance is in right gap. Find the value of unknown resistance R in ohms (Ω).',
      correctNumericalValue: 8,
      tolerance: 0.1,
      explanation: 'In meter bridge, R / S = l₁ / (100 - l₁) => R / 12 = 40 / (100 - 40) = 40 / 60 = 2/3 => R = 12 × (2/3) = 8 Ω.',
      hint: 'Formula: R = S × [l / (100 - l)].',
      difficulty: 'Board Level'
    },
    {
      id: 'mock-10',
      chapterId: 14,
      type: 'numerical',
      text: 'A full-wave rectifier uses two diodes. The internal resistance of each diode is 20 Ω and the load resistance is 980 Ω. What is the rectification efficiency in percent (%)? (Round to one decimal place)',
      correctNumericalValue: 79.6,
      tolerance: 0.5,
      explanation: 'Efficiency η = (0.812 × RL) / (rf + RL) = (0.812 × 980) / (20 + 980) = (0.812 × 980) / 1000 = 0.79576 = 79.6%.',
      hint: 'Formula: η = 81.2% × [RL / (rf + RL)].',
      difficulty: 'JEE Main'
    }
  ]
};
