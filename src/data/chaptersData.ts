import { Chapter } from '../types/physics';

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: 1,
    numberStr: '01',
    title: 'Units and Measurements',
    category: 'mechanics',
    status: 'Completed',
    hscMarks: 5,
    jeeMarks: 4,
    tagline: 'Dimensions, Precision Instruments & Error Propagation',
    description: 'Fundamental and derived physical quantities, dimensional homogeneity, propagation of absolute and relative errors, Vernier calipers, and screw gauge micrometer mechanics.',
    keywords: ['dimensions', 'errors', 'significant figures', 'vernier', 'screw gauge', 'dimensional analysis', 'units', 'homogeneity'],
    keyFormulas: [
      { latex: '[M^a L^b T^c]', description: 'Dimensional representation of physical quantity', dimensions: 'Fundamental SI' },
      { latex: '\\Delta Z / Z = \\Delta A / A + \\Delta B / B', description: 'Fractional error in product Z = A × B' },
      { latex: 'LC = 1 \\text{ MSD} - 1 \\text{ VSD}', description: 'Least count of Vernier Caliper' }
    ],
    subtopics: [
      {
        id: '1.1',
        title: 'System of Units & Dimensions',
        conceptSummary: 'Physical quantities are categorized into fundamental (length, mass, time, electric current, temperature, amount of substance, luminous intensity) and derived quantities. Dimensional analysis uses [M], [L], and [T] powers to verify equations and convert units.',
        keyPoints: [
          'Principle of Homogeneity: Dimensions of all terms on both sides of a physical equation must be identical.',
          'Pure numbers, trigonometric functions, exponents, and logarithms are dimensionless [M^0 L^0 T^0].',
          'Limitations: Dimensional analysis cannot determine dimensionless constants like 1/2 or 2π, nor can it handle sum of exponential terms.'
        ],
        formulaHighlights: ['[Force] = [M L T^{-2}]', '[Work / Energy] = [M L^2 T^{-2}]', '[Pressure] = [M L^{-1} T^{-2}]'],
        solvedExample: {
          title: 'Dimensional Check of Time Period of Pendulum',
          problem: 'Using dimensions, deduce the relation T = k · l^x · g^y for a simple pendulum, where l is length and g is acceleration due to gravity.',
          given: { '[T]': 'M^0 L^0 T^1', '[l]': 'M^0 L^1 T^0', '[g]': 'M^0 L^1 T^{-2}' },
          solution: [
            '[T] = [l]^x · [g]^y => M^0 L^0 T^1 = L^x · (L T^{-2})^y = L^{x+y} T^{-2y}',
            'Equating powers of T: -2y = 1 => y = -1/2',
            'Equating powers of L: x + y = 0 => x - 1/2 = 0 => x = 1/2',
            'Hence T = k · l^{1/2} · g^{-1/2} = k √(l / g)'
          ],
          finalAnswer: 'T = 2π √(l / g) (where k = 2π determined experimentally)'
        }
      },
      {
        id: '1.2',
        title: 'Errors in Measurement & Significant Figures',
        conceptSummary: 'Every physical measurement contains uncertainty. Absolute error is the magnitude of difference between individual and mean measurement. Fractional and percentage errors quantify relative precision.',
        keyPoints: [
          'Addition / Subtraction: Absolute errors add up: ΔZ = ΔA + ΔB.',
          'Multiplication / Division: Relative errors add up: ΔZ/Z = ΔA/A + ΔB/B.',
          'Power rule: If Z = A^p · B^q / C^r, then ΔZ/Z = p(ΔA/A) + q(ΔB/B) + r(ΔC/C).'
        ],
        formulaHighlights: ['\\text{Percentage Error} = (\\Delta A / A_{mean}) \\times 100\\%'],
        solvedExample: {
          title: 'Error in Density Calculation',
          problem: 'The mass of a cube is measured with 1.5% error and length of edge with 1% error. Find maximum percentage error in density.',
          given: { 'Δm/m': '1.5%', 'ΔL/L': '1.0%' },
          solution: [
            'Density ρ = m / V = m / L^3',
            'Maximum fractional error: Δρ/ρ = Δm/m + 3(ΔL/L)',
            'Percentage error: (Δρ/ρ) × 100 = 1.5% + 3(1.0%) = 1.5% + 3.0% = 4.5%'
          ],
          finalAnswer: 'Maximum error in density = 4.5%'
        }
      }
    ],
    derivations: [
      {
        id: 'd1-1',
        title: 'Maximum Fractional Error in Power Expressions',
        expectedMarks: 3,
        finalEquation: '\\frac{\\Delta Z}{Z} = p \\frac{\\Delta A}{A} + q \\frac{\\Delta B}{B} + r \\frac{\\Delta C}{C}',
        steps: [
          'Let Z = A^p B^q / C^r. Take natural logarithm on both sides: ln Z = p ln A + q ln B - r ln C',
          'Differentiating both sides: dZ / Z = p (dA / A) + q (dB / B) - r (dC / C)',
          'For maximum possible experimental error, worst-case negative signs are converted to positive contributions:',
          'ΔZ / Z = p(ΔA/A) + q(ΔB/B) + r(ΔC/C)'
        ],
        keyCondition: 'Errors always compound in worst-case analysis; negative signs in division terms become additions.',
        boardTip: 'State clearly that errors never cancel out in experimental physics.'
      }
    ],
    jeeTraps: [
      {
        title: 'Significant Figures in Subtraction of Close Numbers',
        detail: 'When subtracting two numbers that are very close (e.g. 12.345 - 12.340 = 0.005), the result has only 1 significant figure! JEE questions intentionally construct scenarios with massive precision drops.',
        shortcutFormula: 'Significant figures of result = dictated by least decimal place, NOT original count.'
      },
      {
        title: 'Screw Gauge Zero Error Sign Trap',
        detail: 'Positive zero error (zero line below reference) MUST be subtracted from observed reading. Negative zero error (zero line above reference) MUST be added.',
        shortcutFormula: '\\text{Corrected Reading} = \\text{Observed} - (\\pm \\text{Zero Error})'
      }
    ],
    questions: [
      {
        id: 'q1-1',
        chapterId: 1,
        type: 'mcq',
        text: 'The physical quantity having the dimensional formula [M^1 L^2 T^{-3} A^{-1}] is:',
        options: ['Electric Resistance', 'Electric Potential / EMF', 'Magnetic Flux', 'Inductance'],
        correctOptionIndex: 1,
        explanation: 'Work done per unit charge V = W / Q = [M L^2 T^{-2}] / [A T] = [M L^2 T^{-3} A^{-1}].',
        hint: 'Recall that Potential V = Work / Charge.',
        difficulty: 'JEE Main',
        yearTag: 'JEE Main 2023'
      },
      {
        id: 'q1-2',
        chapterId: 1,
        type: 'numerical',
        text: 'A physical quantity X is given by X = (a^2 b^3) / (c √d). The percentage errors in a, b, c, and d are 1%, 2%, 3%, and 4% respectively. Calculate the percentage error in X (in %).',
        correctNumericalValue: 13,
        tolerance: 0.1,
        explanation: 'ΔX/X = 2(Δa/a) + 3(Δb/b) + 1(Δc/c) + 0.5(Δd/d) = 2(1) + 3(2) + 1(3) + 0.5(4) = 2 + 6 + 3 + 2 = 13%.',
        hint: 'Use power multiplication rule: powers become multipliers.',
        difficulty: 'JEE Main',
        yearTag: 'JEE Main 2024'
      }
    ]
  },
  {
    id: 2,
    numberStr: '02',
    title: 'Mathematical Methods',
    category: 'mechanics',
    status: 'Completed',
    hscMarks: 4,
    jeeMarks: 4,
    tagline: 'Vectors, Cross/Dot Products & Differential Calculus',
    description: 'Vector addition triangle & parallelogram law, resolution in 3D Cartesian coordinates, scalar dot product, vector cross product right-hand screw rule, and kinematic derivatives/integrals.',
    keywords: ['mathematical methods', 'vectors', 'dot product', 'cross product', 'calculus', 'differentiation', 'integration'],
    keyFormulas: [
      { latex: '\\mathbf{A} \\cdot \\mathbf{B} = AB \\cos \\theta = A_x B_x + A_y B_y + A_z B_z', description: 'Scalar Dot Product' },
      { latex: '|\\mathbf{A} \\times \\mathbf{B}| = AB \\sin \\theta', description: 'Vector Cross Product Magnitude' },
      { latex: 'R = \\sqrt{P^2 + Q^2 + 2PQ \\cos \\theta}', description: 'Resultant of two vectors' }
    ],
    subtopics: [
      {
        id: '2.1',
        title: 'Resolution of Vectors & Analytical Addition',
        conceptSummary: 'A vector in 3D space can be uniquely resolved along orthogonal Cartesian axes as A = A_x î + A_y ĵ + A_z k̂ with magnitude |A| = √(A_x² + A_y² + A_z²). Direction cosines satisfy cos²α + cos²β + cos²γ = 1.',
        keyPoints: [
          'Unit vector: â = A / |A|, has magnitude 1 and denotes pure spatial direction.',
          'Parallelogram law: Resultant R = √(P² + Q² + 2PQ cos θ), angle α with P: tan α = (Q sin θ)/(P + Q cos θ).'
        ]
      },
      {
        id: '2.2',
        title: 'Dot & Cross Products with Geometrical Meaning',
        conceptSummary: 'Dot product is scalar and measures parallel alignment (work done W = F · d). Cross product produces a pseudovector perpendicular to both operands by right-hand thumb rule (torque τ = r × F).',
        keyPoints: [
          'Orthogonal condition: A · B = 0 if A ⊥ B.',
          'Collinear condition: A × B = 0 if A || B.',
          'Area of parallelogram formed by vectors A and B is |A × B|.'
        ]
      }
    ],
    derivations: [
      {
        id: 'd2-1',
        title: 'Analytical Expression for Vector Addition (Parallelogram Law)',
        expectedMarks: 3,
        finalEquation: 'R = \\sqrt{P^2 + Q^2 + 2PQ \\cos \\theta}, \\quad \\tan \\alpha = \\frac{Q \\sin \\theta}{P + Q \\cos \\theta}',
        steps: [
          'Consider vectors P along OA and Q along OB at angle θ. Complete parallelogram OACB.',
          'Drop perpendicular CD to OA extended. In right-angled triangle ODC, OC² = OD² + CD² = (OA + AD)² + CD².',
          'Since AD = Q cos θ and CD = Q sin θ, OC² = (P + Q cos θ)² + (Q sin θ)².',
          'Expanding: R² = P² + 2PQ cos θ + Q²(cos²θ + sin²θ) = P² + Q² + 2PQ cos θ.',
          'Taking square root gives R = √(P² + Q² + 2PQ cos θ).'
        ],
        keyCondition: 'θ is the angle between tails of both vectors when placed co-initial.',
        boardTip: 'Draw the diagram with clear geometric labels O, A, B, C, D and right-angle marker at D.'
      }
    ],
    jeeTraps: [
      {
        title: 'Non-Commutative Nature of Cross Product',
        detail: 'A × B = - (B × A). Forgetting the minus sign when swapping order causes immediate sign inversion in torque and Lorentz force problems.',
        shortcutFormula: '\\mathbf{A} \\times \\mathbf{B} = -\\mathbf{B} \\times \\mathbf{A}'
      }
    ],
    questions: [
      {
        id: 'q2-1',
        chapterId: 2,
        type: 'mcq',
        text: 'If vectors A = 2î + 3ĵ - k̂ and B = -4î + 6ĵ + λk̂ are perpendicular to each other, what is the value of λ?',
        options: ['10', '-10', '5', '-5'],
        correctOptionIndex: 0,
        explanation: 'For perpendicular vectors, A · B = 0 => (2)(-4) + (3)(6) + (-1)(λ) = 0 => -8 + 18 - λ = 0 => λ = 10.',
        hint: 'Set scalar product A · B = 0.',
        difficulty: 'Board Level'
      }
    ]
  },
  {
    id: 3,
    numberStr: '03',
    title: 'Motion in a Plane',
    category: 'mechanics',
    status: 'Active',
    hscMarks: 6,
    jeeMarks: 8,
    tagline: '2D Projectile Trajectory & Circular Motion Dynamics',
    description: 'Kinematics in two dimensions, parabolic trajectory proofs, horizontal and inclined projectiles, uniform circular motion (UCM), centripetal acceleration, and non-uniform circular motion.',
    keywords: ['motion in a plane', 'projectile', 'trajectory', 'uniform circular motion', 'ucm', 'centripetal', 'range', 'height'],
    keyFormulas: [
      { latex: 'R = \\frac{u^2 \\sin 2\\theta}{g}', description: 'Horizontal Range of Projectile' },
      { latex: 'H_{max} = \\frac{u^2 \\sin^2 \\theta}{2g}', description: 'Maximum Vertical Height' },
      { latex: 'T = \\frac{2u \\sin \\theta}{g}', description: 'Total Time of Flight' },
      { latex: 'a_c = \\frac{v^2}{r} = \\omega^2 r', description: 'Radial Centripetal Acceleration' }
    ],
    subtopics: [
      {
        id: '3.1',
        title: 'Projectile Motion on Horizontal Ground',
        conceptSummary: 'An object thrown into the atmosphere subject solely to gravitational acceleration follows a curved parabolic trajectory. Horizontal velocity ux = u cos θ remains constant because ax = 0. Vertical velocity uy = u sin θ - gt undergoes constant downward deceleration.',
        keyPoints: [
          'At apex (highest point): vertical velocity vy = 0, but horizontal velocity is still vx = u cos θ.',
          'Speed at apex is not zero; kinetic energy at apex = 1/2 m (u cos θ)² = K_initial cos²θ.',
          'Complementary launch angles θ and (90° - θ) yield identical horizontal ranges for the same launch speed u.'
        ],
        formulaHighlights: [
          'y = x \\tan \\theta - \\frac{g x^2}{2 u^2 \\cos^2 \\theta}',
          'y = x \\tan \\theta \\left(1 - \\frac{x}{R}\\right)'
        ],
        solvedExample: {
          title: 'Speed and Kinetic Energy at Maximum Height',
          problem: 'A projectile is launched with velocity 40 m/s at 60° to the horizontal. Find its speed and the ratio of its kinetic energy at apex to initial kinetic energy.',
          given: { 'u': '40 m/s', 'θ': '60°', 'g': '9.8 m/s²' },
          solution: [
            'Horizontal velocity vx = u cos 60° = 40 × 0.5 = 20 m/s.',
            'At apex, vy = 0. Therefore total speed v_apex = vx = 20 m/s.',
            'Initial KE = 1/2 m u²; Apex KE = 1/2 m vx² = 1/2 m (u cos θ)²',
            'Ratio = (Apex KE) / (Initial KE) = cos² 60° = (1/2)² = 1/4 = 0.25'
          ],
          finalAnswer: 'Speed at apex = 20 m/s; KE ratio = 1/4 (25%)'
        }
      },
      {
        id: '3.2',
        title: 'Uniform Circular Motion (UCM) & Radial Acceleration',
        conceptSummary: 'When a particle moves in a circular path of radius r with constant angular speed ω, its linear speed v = rω is constant, but its velocity direction continually changes, demanding an inward radial centripetal acceleration ac = v²/r directed toward the circle center.',
        keyPoints: [
          'Period T = 2π / ω = 2πr / v; Frequency f = 1/T.',
          'Centripetal acceleration is purely perpendicular to instantaneous velocity: v · a = 0 (work done in UCM is zero).',
          'In non-uniform circular motion, net acceleration a_net = √(a_c² + a_t²), where a_t = dv/dt is tangential acceleration.'
        ]
      }
    ],
    derivations: [
      {
        id: 'd3-1',
        title: 'Equation of Path of a Projectile (Parabola Proof)',
        expectedMarks: 3,
        finalEquation: 'y = x \\tan \\theta - \\left[\\frac{g}{2 u^2 \\cos^2 \\theta}\\right] x^2',
        steps: [
          'Resolve initial velocity u at angle θ: u_x = u cos θ, u_y = u sin θ.',
          'Horizontal displacement after time t: x = u_x · t = (u cos θ) t => t = x / (u cos θ).',
          'Vertical displacement: y = u_y · t - 1/2 g t² = (u sin θ) t - 1/2 g t².',
          'Substitute t = x / (u cos θ): y = (u sin θ) [x / (u cos θ)] - 1/2 g [x / (u cos θ)]².',
          'Simplifying: y = x tan θ - [g / (2 u² cos² θ)] x².',
          'This is of standard quadratic form y = Ax - Bx² (where A = tan θ, B = g / (2u² cos² θ)), proving path is a parabola.'
        ],
        keyCondition: 'Neglecting air resistance, assuming uniform gravitational field g throughout motion.',
        boardTip: 'Must mention that horizontal motion is uniform (ax = 0) while vertical motion is under constant acceleration (ay = -g).'
      },
      {
        id: 'd3-2',
        title: 'Radial Centripetal Acceleration in UCM',
        expectedMarks: 3,
        finalEquation: '\\mathbf{a}_c = -\\omega^2 \\mathbf{r} = -\\frac{v^2}{r} \\hat{\\mathbf{r}}',
        steps: [
          'Position vector in polar plane: r = r(cos θ î + sin θ ĵ) = r(cos ωt î + sin ωt ĵ).',
          'Differentiating with respect to time gives velocity: v = dr/dt = rω(-sin ωt î + cos ωt ĵ).',
          'Differentiating velocity to get acceleration: a = dv/dt = rω²(-cos ωt î - sin ωt ĵ).',
          'Factoring out: a = -ω² [r(cos ωt î + sin ωt ĵ)] = -ω² r.',
          'The negative sign proves acceleration vector points directly opposite to position vector r, i.e., toward the center.'
        ],
        keyCondition: 'Speed v and radius r are invariant in time.',
        boardTip: 'Conclude clearly: magnitude is v²/r or ω²r, directed radially inward.'
      }
    ],
    jeeTraps: [
      {
        title: 'Shortcut Equation of Trajectory in Terms of Range R',
        detail: 'In JEE Main, questions frequently give coordinates (x, y) and ask for range or angle. Using standard form takes 3 minutes; using shortcut form takes 25 seconds.',
        shortcutFormula: 'y = x \\tan \\theta \\left(1 - \\frac{x}{R}\\right)'
      },
      {
        title: 'Ratio of Maximum Heights for Complementary Angles',
        detail: 'For two projectiles thrown with speed u at complementary angles θ and 90° - θ, the product of maximum heights is H1 · H2 = R² / 16, and sum of times of flight squared is T1² + T2² = 2R / g.',
        shortcutFormula: 'R = 4 \\sqrt{H_1 H_2}'
      }
    ],
    questions: [
      {
        id: 'q3-1',
        chapterId: 3,
        type: 'mcq',
        text: 'A projectile has horizontal range R and maximum height H. If the range is 4√3 times the maximum height (R = 4√3 H), the angle of projection is:',
        options: ['30°', '45°', '60°', '75°'],
        correctOptionIndex: 0,
        explanation: 'We know R = 4H / tan θ. Given R = 4√3 H, we have 4√3 H = 4H / tan θ => tan θ = 1 / √3 => θ = 30°.',
        hint: 'Use the standard relation R tan θ = 4H.',
        difficulty: 'JEE Main',
        yearTag: 'JEE Main 2022'
      },
      {
        id: 'q3-2',
        chapterId: 3,
        type: 'numerical',
        text: 'A ball is projected from ground with speed 20 m/s at angle 30° to horizontal. Taking g = 10 m/s², calculate the horizontal range in meters (use √3 ≈ 1.732). Round to one decimal place.',
        correctNumericalValue: 34.6,
        tolerance: 0.2,
        explanation: 'Range R = (u² sin 2θ) / g = (20² × sin 60°) / 10 = (400 × √3 / 2) / 10 = 20 × 1.732 = 34.64 m.',
        hint: 'Formula: R = (u² sin 2θ) / g.',
        difficulty: 'Board Level'
      }
    ]
  },
  {
    id: 4,
    numberStr: '04',
    title: 'Laws of Motion',
    category: 'mechanics',
    status: 'Active',
    hscMarks: 7,
    jeeMarks: 8,
    tagline: 'Newton\'s Laws, Friction, Banked Curves & Collisions',
    description: 'Inertial & non-inertial reference frames, pseudo forces, static and kinetic friction coefficients, banking of curved roads with and without friction, and 1D/2D elastic collisions.',
    keywords: ['laws of motion', 'newton', 'friction', 'banking of roads', 'collisions', 'momentum', 'impulse', 'pseudo force'],
    keyFormulas: [
      { latex: 'v_{opt} = \\sqrt{r g \\tan \\theta}', description: 'Optimum banking speed (no friction required)' },
      { latex: 'v_{max} = \\sqrt{r g \\left(\\frac{\\mu_s + \\tan \\theta}{1 - \\mu_s \\tan \\theta}\\right)}', description: 'Maximum safe speed on banked curve' },
      { latex: 'f_s \\le \\mu_s N', description: 'Law of Static Friction' },
      { latex: 'e = \\frac{v_2 - v_1}{u_1 - u_2}', description: 'Coefficient of Restitution' }
    ],
    subtopics: [
      {
        id: '4.1',
        title: 'Banking of Roads and Conical Pendulum',
        conceptSummary: 'To prevent skidding of high-speed vehicles on curved roadways, the outer edge of the road is raised above the inner edge at an angle θ. The horizontal component of normal reaction N sin θ provides the essential centripetal force.',
        keyPoints: [
          'At optimum speed v = √(rg tan θ), road surface experiences zero lateral wear; tires require no friction.',
          'Conical pendulum: Period T = 2π √(L cos θ / g), where L is string length and θ is semi-vertical angle.'
        ]
      },
      {
        id: '4.2',
        title: 'Friction on Flat and Inclined Surfaces',
        conceptSummary: 'Friction opposes relative motion. Static friction is self-adjusting up to limiting friction f_max = μs N. Kinetic friction fk = μk N is slightly lower than limiting friction and independent of contact area.',
        keyPoints: [
          'Angle of friction λ: tan λ = μs.',
          'Angle of repose α: Angle of inclined plane at which a body just begins to slide down without push; α = λ => tan α = μs.',
          'Acceleration down rough incline: a = g (sin θ - μk cos θ).'
        ]
      }
    ],
    derivations: [
      {
        id: 'd4-1',
        title: 'Expression for Maximum Safe Speed on a Banked Road with Friction',
        expectedMarks: 4,
        finalEquation: 'v_{max} = \\sqrt{r g \\left[ \\frac{\\mu_s + \\tan \\theta}{1 - \\mu_s \\tan \\theta} \\right]}',
        steps: [
          'Consider a car of mass m negotiating a curve of radius r banked at angle θ with coefficient of friction μs.',
          'At maximum speed, car tends to skid up the incline; static friction fs acts DOWN the incline.',
          'Resolving forces vertically: N cos θ = mg + fs sin θ => N cos θ - μs N sin θ = mg => N(cos θ - μs sin θ) = mg.',
          'Resolving forces horizontally toward center: N sin θ + fs cos θ = m v_max² / r => N(sin θ + μs cos θ) = m v_max² / r.',
          'Dividing horizontal equation by vertical equation: (sin θ + μs cos θ) / (cos θ - μs sin θ) = v_max² / (r g).',
          'Dividing numerator and denominator by cos θ: (tan θ + μs) / (1 - μs tan θ) = v_max² / (r g).',
          'Taking square root gives v_max = √[rg (μs + tan θ) / (1 - μs tan θ)].'
        ],
        keyCondition: 'Vehicle is on the verge of slipping upwards away from circle center.',
        boardTip: 'Draw Free Body Diagram clearly showing N, mg, and friction fs components along horizontal and vertical axes.'
      }
    ],
    jeeTraps: [
      {
        title: 'Static Friction is Self-Adjusting Trap',
        detail: 'Never substitute fs = μs N automatically! Static friction is only as much as needed to balance the driving force (0 ≤ fs ≤ μs N). Only when slipping is impending does fs reach μs N.',
        shortcutFormula: 'f_s = F_{applied} \\quad (\\text{as long as } F_{applied} \\le \\mu_s N)'
      }
    ],
    questions: [
      {
        id: 'q4-1',
        chapterId: 4,
        type: 'mcq',
        text: 'A curved road of radius 100 m is banked at an angle of 45°. Taking g = 10 m/s², the optimum speed of a vehicle on this road without relying on friction is:',
        options: ['10 m/s', '31.6 m/s', '45 m/s', '100 m/s'],
        correctOptionIndex: 1,
        explanation: 'v_opt = √(rg tan θ) = √(100 × 10 × tan 45°) = √1000 ≈ 31.62 m/s.',
        hint: 'Use v = √(rg tan θ).',
        difficulty: 'Board Level'
      }
    ]
  },
  {
    id: 5,
    numberStr: '05',
    title: 'Gravitation',
    category: 'mechanics',
    status: 'Completed',
    hscMarks: 5,
    jeeMarks: 4,
    tagline: 'Kepler\'s Laws, Escape Velocity & Satellite Orbits',
    description: 'Newton\'s universal law of gravitation, variation of g with altitude and depth, gravitational potential energy, escape velocity, and geostationary orbital mechanics.',
    keywords: ['gravitation', 'kepler', 'potential', 'escape velocity', 'satellites', 'orbital velocity', 'geostationary'],
    keyFormulas: [
      { latex: 'v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR}', description: 'Escape Velocity from Planet Surface' },
      { latex: 'v_c = \\sqrt{\\frac{GM}{R+h}}', description: 'Critical Orbital Velocity of Satellite' },
      { latex: 'g_h = g \\left(1 - \\frac{2h}{R}\\right)', description: 'Acceleration due to gravity at altitude h << R' },
      { latex: 'g_d = g \\left(1 - \\frac{d}{R}\\right)', description: 'Acceleration due to gravity at depth d' }
    ],
    subtopics: [
      {
        id: '5.1',
        title: 'Kepler\'s Three Laws of Planetary Motion',
        conceptSummary: '1. Law of Orbits: All planets move in elliptical orbits with the Sun at one focus. 2. Law of Areas: Line joining Sun and planet sweeps equal areas in equal intervals of time (conservation of angular momentum L = const). 3. Law of Periods: T² ∝ r³.',
        keyPoints: [
          'Areal velocity: dA/dt = L / (2m) = constant because gravitational torque is zero (central force).',
          'At perihelion (closest to Sun), speed is maximum; at aphelion (farthest), speed is minimum.'
        ]
      },
      {
        id: '5.2',
        title: 'Escape Velocity and Satellite Dynamics',
        conceptSummary: 'Escape velocity is minimum launch speed required for a projectile to overcome gravitational binding energy and reach infinity with zero kinetic energy. Orbital velocity maintains a circular orbit where centripetal pull equals gravitational force.',
        keyPoints: [
          'Escape velocity is independent of mass and launch angle of the projectile.',
          'Relation between escape and orbital velocity at surface: v_escape = √2 · v_orbital ≈ 1.414 v_c.'
        ]
      }
    ],
    derivations: [
      {
        id: 'd5-1',
        title: 'Expression for Escape Velocity of a Body',
        expectedMarks: 3,
        finalEquation: 'v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR}',
        steps: [
          'Consider body of mass m on Earth surface (mass M, radius R).',
          'Gravitational potential energy on surface: U = -GMm / R.',
          'Initial kinetic energy to escape: K = 1/2 m v_e².',
          'Total mechanical energy on surface: E_initial = 1/2 m v_e² - GMm / R.',
          'At infinity, body escapes gravitational field with minimum velocity v_∞ = 0, so E_final = 0.',
          'By conservation of mechanical energy: 1/2 m v_e² - GMm / R = 0 => 1/2 m v_e² = GMm / R.',
          'Canceling m: v_e² = 2GM / R => v_e = √(2GM / R).',
          'Since g = GM / R², 2GM / R = 2gR, yielding v_e = √(2gR).'
        ],
        keyCondition: 'Assumes zero atmospheric drag and isolated spherical planet.',
        boardTip: 'Calculate numerical value for Earth: v_e = √(2 × 9.8 × 6.4 × 10⁶) = 11.2 km/s.'
      }
    ],
    jeeTraps: [
      {
        title: 'Variation of g with Altitude: Approximation vs Exact Formula',
        detail: 'The formula g_h = g(1 - 2h/R) is ONLY valid when h << R (e.g. h < 300 km). When h is comparable to R (e.g. h = R/2), you MUST use exact formula g_h = g / (1 + h/R)²',
        shortcutFormula: 'g_h = g \\frac{R^2}{(R+h)^2}'
      }
    ],
    questions: [
      {
        id: 'q5-1',
        chapterId: 5,
        type: 'mcq',
        text: 'At what height above the Earth\'s surface does acceleration due to gravity become 25% of its value on the surface? (Radius of Earth = R)',
        options: ['R/2', 'R', '2R', '4R'],
        correctOptionIndex: 1,
        explanation: 'g_h = g / (1 + h/R)² = g / 4 => (1 + h/R)² = 4 => 1 + h/R = 2 => h = R.',
        hint: 'Set g_h / g = 1/4 and solve for h in terms of R.',
        difficulty: 'JEE Main'
      }
    ]
  },
  {
    id: 6,
    numberStr: '06',
    title: 'Mechanical Properties of Solids',
    category: 'mechanics',
    status: 'Pending',
    hscMarks: 4,
    jeeMarks: 4,
    tagline: 'Hooke\'s Law, Stress-Strain & Moduli of Elasticity',
    description: 'Deforming forces, tensile/compressive/shear stress and strain, Hooke\'s law, Young\'s modulus, Bulk modulus, Shear modulus, Poisson\'s ratio, and elastic strain energy density.',
    keywords: ['elasticity', 'stress', 'strain', 'hooke', 'youngs modulus', 'bulk modulus', 'poisson', 'strain energy'],
    keyFormulas: [
      { latex: 'Y = \\frac{F \\cdot L}{A \\cdot \\Delta L}', description: 'Young\'s Modulus of Elasticity' },
      { latex: 'u = \\frac{1}{2} \\times \\text{Stress} \\times \\text{Strain}', description: 'Elastic Strain Energy Density (per unit volume)' },
      { latex: 'K = -\\frac{V \\Delta P}{\\Delta V}', description: 'Bulk Modulus of Fluid/Solid' },
      { latex: '\\sigma = -\\frac{\\Delta d / d}{\\Delta L / L}', description: 'Poisson\'s Ratio' }
    ],
    subtopics: [
      {
        id: '6.1',
        title: 'Stress-Strain Curve & Elastic Limits',
        conceptSummary: 'When wire is loaded, it exhibits proportional limit (Hooke\'s law holds), yield point / elastic limit (permanent set begins), ultimate tensile strength (peak stress before necking), and fracture point.',
        keyPoints: [
          'Ductile materials have wide plastic deformation range between yield and fracture (e.g. copper, mild steel).',
          'Brittle materials fracture almost immediately after elastic limit (e.g. glass, cast iron).',
          'Theoretical limits for Poisson\'s ratio: -1 ≤ σ ≤ 0.5 (practical limits: 0 ≤ σ ≤ 0.5).'
        ]
      }
    ],
    derivations: [
      {
        id: 'd6-1',
        title: 'Strain Energy Stored in a Stretched Wire',
        expectedMarks: 3,
        finalEquation: 'W = \\frac{1}{2} F \\cdot l = \\frac{1}{2} \\times \\text{Stress} \\times \\text{Strain} \\times \\text{Volume}',
        steps: [
          'Consider wire of length L and cross-sectional area A. When extended by x, tension force is F = (Y A / L) x.',
          'Work done in further small elongation dx: dW = F dx = (Y A / L) x dx.',
          'Total work done stretching from x = 0 to x = l: W = ∫₀ˡ (Y A / L) x dx = (Y A / L) [x² / 2]₀ˡ = 1/2 (Y A l / L) l.',
          'Since F = Y A l / L, we get W = 1/2 F · l.',
          'Dividing by volume (A · L): Energy density u = W / (A L) = 1/2 (F/A) (l/L) = 1/2 × Stress × Strain.'
        ],
        keyCondition: 'Deformation remains strictly within proportional elastic limit.',
        boardTip: 'Highlight the 1/2 factor due to average force (0 + F)/2.'
      }
    ],
    jeeTraps: [
      {
        title: 'Temperature Stress with Fixed Ends',
        detail: 'When rod with fixed ends undergoes temperature change ΔT, thermal strain is prevented, creating thermal stress: Stress = Y α ΔT and Force = Y A α ΔT.',
        shortcutFormula: 'F_{thermal} = Y A \\alpha \\Delta T'
      }
    ],
    questions: [
      {
        id: 'q6-1',
        chapterId: 6,
        type: 'mcq',
        text: 'A wire is stretched to double its original length (ΔL = L). If original Young\'s modulus is Y, the new Young\'s modulus is:',
        options: ['Y/2', 'Y', '2Y', '4Y'],
        correctOptionIndex: 1,
        explanation: 'Young\'s modulus is an intrinsic property of the material; it depends on temperature and composition, NOT on dimensions or strain!',
        hint: 'Modulus of elasticity is an intrinsic material property.',
        difficulty: 'Board Level'
      }
    ]
  },
  {
    id: 7,
    numberStr: '07',
    title: 'Thermal Properties of Matter',
    category: 'thermal-sound',
    status: 'Pending',
    hscMarks: 5,
    jeeMarks: 4,
    tagline: 'Thermal Expansion, Calorimetry & Newton\'s Law of Cooling',
    description: 'Linear, superficial and volume thermal expansion, relation between α, β, and γ, molar specific heat capacities, latent heat of phase changes, Newton\'s law of cooling, and thermal conduction.',
    keywords: ['thermal properties', 'thermal expansion', 'calorimetry', 'newton law of cooling', 'conduction', 'specific heat'],
    keyFormulas: [
      { latex: '\\Delta L = L_0 \\alpha \\Delta T', description: 'Linear Thermal Expansion' },
      { latex: '\\alpha : \\beta : \\gamma = 1 : 2 : 3', description: 'Relation between expansion coefficients' },
      { latex: '\\frac{dQ}{dt} = -k (T - T_0)', description: 'Newton\'s Law of Cooling' },
      { latex: '\\frac{dQ}{dt} = \\frac{K A (T_1 - T_2)}{L}', description: 'Fourier Law of Heat Conduction' }
    ],
    subtopics: [
      {
        id: '7.1',
        title: 'Thermal Expansion & Anomalous Expansion of Water',
        conceptSummary: 'Solids and liquids expand on heating. Most liquids expand continuously, but water contracts when heated from 0°C to 4°C, reaching its maximum density at 4°C (1000 kg/m³), allowing aquatic life to survive winter in frozen lakes.',
        keyPoints: [
          'Relation: β = 2α, γ = 3α for isotropic solids.',
          'Bimetallic strip bends toward the metal having smaller α upon heating.'
        ]
      }
    ],
    derivations: [
      {
        id: 'd7-1',
        title: 'Relation Between Linear (α) and Volume (γ) Expansion Coefficients',
        expectedMarks: 2,
        finalEquation: '\\gamma = 3\\alpha',
        steps: [
          'Consider cube of initial side length L₀ and volume V₀ = L₀³.',
          'Upon heating by ΔT, new length is L = L₀(1 + α ΔT).',
          'New volume V = L³ = L₀³(1 + α ΔT)³.',
          'Expanding using binomial theorem for α ΔT << 1: (1 + α ΔT)³ ≈ 1 + 3α ΔT.',
          'Thus V = V₀(1 + 3α ΔT). Comparing with V = V₀(1 + γ ΔT) proves γ = 3α.'
        ],
        keyCondition: 'Isotropic medium where α is identical in all spatial directions.',
        boardTip: 'Mention that higher order terms in (α ΔT)² and (α ΔT)³ are negligible.'
      }
    ],
    jeeTraps: [
      {
        title: 'Newton\'s Law of Cooling Logarithmic vs Linear Form',
        detail: 'In problems like "cools from 80°C to 70°C in 5 min, find time to cool from 70°C to 60°C", use average approximation: (T1 - T2)/t = K [(T1+T2)/2 - T0]. Notice the second cooling step ALWAYS takes longer!',
        shortcutFormula: '\\frac{T_1 - T_2}{t} = K \\left( \\frac{T_1 + T_2}{2} - T_0 \\right)'
      }
    ],
    questions: [
      {
        id: 'q7-1',
        chapterId: 7,
        type: 'mcq',
        text: 'A body cools from 60°C to 50°C in 10 minutes in surroundings at 30°C. The time taken to cool from 50°C to 40°C in the same surroundings will be:',
        options: ['Equal to 10 minutes', 'Less than 10 minutes', 'Greater than 10 minutes', 'Zero'],
        correctOptionIndex: 2,
        explanation: 'According to Newton\'s law of cooling, rate of cooling dQ/dt ∝ (T - T₀). As body temperature approaches surrounding temperature, cooling rate slows down, so time taken increases (> 10 min).',
        hint: 'Rate of cooling is proportional to temperature difference.',
        difficulty: 'Board Level'
      }
    ]
  },
  {
    id: 8,
    numberStr: '08',
    title: 'Sound',
    category: 'thermal-sound',
    status: 'Completed',
    hscMarks: 5,
    jeeMarks: 4,
    tagline: 'Newton-Laplace Formula, Beats & Doppler Effect',
    description: 'Longitudinal mechanical waves, Laplace correction for speed of sound, principle of superposition, acoustic beats, open and closed organ pipes, and non-relativistic Doppler frequency shift.',
    keywords: ['sound', 'doppler effect', 'beats', 'laplace correction', 'organ pipe', 'resonance', 'speed of sound'],
    keyFormulas: [
      { latex: 'v = \\sqrt{\\frac{\\gamma P}{\\rho}}', description: 'Laplace Formula for Speed of Sound in Gas' },
      { latex: 'f_b = |f_1 - f_2|', description: 'Beat Frequency' },
      { latex: 'f_{app} = f_0 \\left(\\frac{v \\pm v_o}{v \\mp v_s}\\right)', description: 'Doppler Apparent Frequency Formula' },
      { latex: 'f_{closed} = \\frac{(2n-1)v}{4L}, \\quad f_{open} = \\frac{nv}{2L}', description: 'Organ Pipe Harmonics' }
    ],
    subtopics: [
      {
        id: '8.1',
        title: 'Laplace Correction to Newton\'s Sound Formula',
        conceptSummary: 'Newton assumed acoustic compressions and rarefactions happen isothermally (PV = const, v = √(P/ρ)), yielding 280 m/s for air (16% error). Laplace corrected that vibrations are rapid adiabatic processes (PV^γ = const, v = √(γP/ρ)), yielding 332 m/s matching experiment.',
        keyPoints: [
          'Speed of sound is independent of gas pressure at constant temperature.',
          'Speed of sound increases with temperature: v ∝ √T.',
          'Speed of sound increases with humidity (moist air has lower density than dry air).'
        ]
      },
      {
        id: '8.2',
        title: 'The Doppler Effect in Sound',
        conceptSummary: 'Apparent shift in perceived frequency when relative motion exists between source of sound and listener. Approaching relative motion increases pitch; receding relative motion decreases pitch.',
        keyPoints: [
          'Moving Source: alters physical wavelength in medium λ\' = (v ∓ v_s) / f_0.',
          'Moving Observer: alters relative speed of wavefront reception (v ± v_o), leaving wavelength unaltered.'
        ]
      }
    ],
    derivations: [
      {
        id: 'd8-1',
        title: 'Doppler Apparent Frequency for Moving Source Approaching Stationary Observer',
        expectedMarks: 3,
        finalEquation: 'f_{app} = f_0 \\left( \\frac{v}{v - v_s} \\right)',
        steps: [
          'Let source S emit frequency f₀ with period T = 1/f₀, moving toward stationary observer O at speed v_s.',
          'In one period T, first wave travels distance vT while source advances distance v_s T.',
          'The effective compressed wavelength in front of source: λ\' = vT - v_s T = (v - v_s) T = (v - v_s) / f₀.',
          'Since observer is stationary, waves arrive at speed v.',
          'Apparent frequency perceived: f_app = v / λ\' = v / [ (v - v_s) / f₀ ] = f₀ [v / (v - v_s)].',
          'Since (v - v_s) < v, f_app > f₀, meaning apparent frequency increases.'
        ],
        keyCondition: 'Medium is stationary, source speed v_s < speed of sound v.',
        boardTip: 'Draw wave crest diagram showing compressed wavefronts in direction of motion.'
      }
    ],
    jeeTraps: [
      {
        title: 'Wind Velocity Addition in Doppler Effect',
        detail: 'When medium (wind) moves with velocity w in direction from source to observer, replace speed of sound v with (v + w). If wind blows opposite, replace v with (v - w).',
        shortcutFormula: 'f_{app} = f_0 \\left[ \\frac{(v + w) \\pm v_o}{(v + w) \\mp v_s} \\right]'
      }
    ],
    questions: [
      {
        id: 'q8-1',
        chapterId: 8,
        type: 'mcq',
        text: 'A siren emitting frequency 600 Hz approaches a stationary observer with speed 30 m/s. Taking speed of sound = 330 m/s, the apparent frequency heard is:',
        options: ['550 Hz', '600 Hz', '660 Hz', '720 Hz'],
        correctOptionIndex: 2,
        explanation: 'f_app = f₀ [v / (v - v_s)] = 600 × [330 / (330 - 30)] = 600 × [330 / 300] = 660 Hz.',
        hint: 'Source approaching stationary observer: denominator has minus sign.',
        difficulty: 'JEE Main'
      }
    ]
  },
  {
    id: 9,
    numberStr: '09',
    title: 'Optics',
    category: 'optics',
    status: 'Active',
    hscMarks: 7,
    jeeMarks: 8,
    tagline: 'Refraction, Prism Dispersion & Lens Maker\'s Formula',
    description: 'Refraction at spherical surfaces, total internal reflection, prism deviation and dispersive power, chromatic aberration, Lens Maker\'s formula, and optical instrument magnification.',
    keywords: ['optics', 'refraction', 'total internal reflection', 'prism', 'lens makers formula', 'dispersion', 'critical angle'],
    keyFormulas: [
      { latex: '\\frac{1}{f} = (\\mu - 1) \\left( \\frac{1}{R_1} - \\frac{1}{R_2} \\right)', description: 'Lens Maker\'s Formula' },
      { latex: '\\sin \\theta_c = \\frac{1}{\\mu}', description: 'Critical Angle for Total Internal Reflection' },
      { latex: '\\mu = \\frac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin\\left(\\frac{A}{2}\\right)}', description: 'Prism Refractive Index Formula' },
      { latex: '\\frac{\\mu_2}{v} - \\frac{\\mu_1}{u} = \\frac{\\mu_2 - \\mu_1}{R}', description: 'Refraction at Single Spherical Interface' }
    ],
    subtopics: [
      {
        id: '9.1',
        title: 'Prism Formula & Minimum Deviation',
        conceptSummary: 'When monochromatic light passes symmetrically through a prism at minimum deviation (δ = δm), ray inside travels parallel to base, angle of incidence equals angle of emergence (i = e), and internal refraction angles are equal (r1 = r2 = A/2).',
        keyPoints: [
          'Deviation δ = i + e - A.',
          'Thin prism deviation: δ = (μ - 1) A.',
          'Angular dispersion θ = δ_v - δ_r = (μ_v - μ_r) A; Dispersive power ω = (μ_v - μ_r) / (μ_y - 1).'
        ]
      },
      {
        id: '9.2',
        title: 'Lens Maker\'s Equation & Lens Immersion in Liquids',
        conceptSummary: 'Focal length of thin lens depends on refractive index of lens material relative to surrounding medium and radii of curvature of both faces.',
        keyPoints: [
          'Equi-convex lens in air (R1 = R, R2 = -R, μ = 1.5): 1/f = (1.5 - 1)(2/R) = 1/R => f = R.',
          'If lens of refractive index μ_g is immersed in liquid of μ_l: focal length increases to f_l = f_air [(μ_g - 1) / (μ_g/μ_l - 1)].',
          'If μ_l > μ_g, lens reverses its nature (convex lens behaves as diverging lens!).'
        ]
      }
    ],
    derivations: [
      {
        id: 'd9-1',
        title: 'Lens Maker\'s Formula for Thin Double Convex Lens',
        expectedMarks: 4,
        finalEquation: '\\frac{1}{f} = (\\mu - 1) \\left( \\frac{1}{R_1} - \\frac{1}{R_2} \\right)',
        steps: [
          'Consider thin double convex lens of refractive index μ placed in air (μ₁ = 1). Let radii be R₁ and R₂.',
          'Refraction at first surface: μ / v₁ - 1 / u = (μ - 1) / R₁ (where v₁ is intermediate image).',
          'Refraction at second surface (v₁ acts as virtual object in denser medium): 1 / v - μ / v₁ = (1 - μ) / R₂ = - (μ - 1) / R₂.',
          'Adding the two surface equations eliminates intermediate image v₁:',
          '1 / v - 1 / u = (μ - 1) [ 1/R₁ - 1/R₂ ].',
          'By definition of principal focal length, when object is at infinity (u = -∞), image forms at focus (v = f):',
          '1 / f - 1 / (-∞) = 1 / f = (μ - 1) [ 1/R₁ - 1/R₂ ].'
        ],
        keyCondition: 'Lens thickness is negligible compared to radii of curvature.',
        boardTip: 'Cartesian sign convention: For biconvex lens, R₁ is positive (+), R₂ is negative (-).'
      }
    ],
    jeeTraps: [
      {
        title: 'Silvering of One Lens Surface',
        detail: 'When one surface of a lens is silvered, it acts as a curved mirror. Total optical power is P = 2 P_lens + P_mirror. Effective focal length: 1/F = 2/f_l + 1/f_m.',
        shortcutFormula: '\\frac{1}{F_{eq}} = \\frac{2}{f_L} + \\frac{1}{f_M}'
      }
    ],
    questions: [
      {
        id: 'q9-1',
        chapterId: 9,
        type: 'mcq',
        text: 'A biconvex lens with equal radii of curvature R = 20 cm and refractive index μ = 1.5 is immersed in water (μ_w = 4/3). Its new focal length in water is:',
        options: ['20 cm', '40 cm', '80 cm', '100 cm'],
        correctOptionIndex: 2,
        explanation: 'In air, 1/f_a = (1.5 - 1)(2/20) = 1/20 => f_a = 20 cm. In water, 1/f_w = (1.5 / (4/3) - 1)(2/20) = (9/8 - 1)(1/10) = (1/8)(1/10) = 1/80 => f_w = 80 cm.',
        hint: 'Use relative refractive index μ_rel = μ_lens / μ_medium.',
        difficulty: 'JEE Main'
      }
    ]
  },
  {
    id: 10,
    numberStr: '10',
    title: 'Electrostatics',
    category: 'electromagnetism',
    status: 'Pending',
    hscMarks: 6,
    jeeMarks: 8,
    tagline: 'Coulomb\'s Law, Gauss\'s Flux & Electric Dipole',
    description: 'Electric force vector formulation, electric dipole moment and torque in uniform field, Gauss\'s law, electric field due to infinitely long wire, charged sheet, and spherical conducting shell.',
    keywords: ['electrostatics', 'coulomb', 'gauss law', 'electric flux', 'dipole', 'potential', 'field lines'],
    keyFormulas: [
      { latex: 'F = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q_1 q_2}{r^2}', description: 'Coulomb\'s Law in Vacuum' },
      { latex: '\\Phi = \\oint \\mathbf{E} \\cdot d\\mathbf{A} = \\frac{Q_{enc}}{\\varepsilon_0}', description: 'Gauss\'s Law of Flux' },
      { latex: 'E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}', description: 'Electric Field of Infinite Line Charge' },
      { latex: 'E = \\frac{\\sigma}{2\\varepsilon_0}', description: 'Electric Field of Non-Conducting Infinite Sheet' }
    ],
    subtopics: [
      {
        id: '10.1',
        title: 'Gauss\'s Law and Cylindrical Symmetry',
        conceptSummary: 'Total electric flux passing through any closed Gaussian surface equals 1/ε₀ times net enclosed charge. For an infinitely long uniformly charged wire of linear charge density λ, a coaxial cylindrical Gaussian surface of radius r and length L yields E = λ / (2πε₀ r).',
        keyPoints: [
          'Flux through flat caps of cylinder is zero because E is parallel to cap faces (E ⊥ dA).',
          'Field is directed radially outward for positive λ.'
        ]
      }
    ],
    derivations: [
      {
        id: 'd10-1',
        title: 'Electric Field Due to Infinitely Long Straight Charged Wire (Gauss Law)',
        expectedMarks: 3,
        finalEquation: 'E = \\frac{\\lambda}{2\\pi \\varepsilon_0 r}',
        steps: [
          'Consider infinite straight wire with uniform linear charge density λ. To find E at distance r, construct coaxial cylinder of radius r and length L.',
          'By radial symmetry, electric field E has equal magnitude everywhere on curved surface and points perpendicular to wire.',
          'Total flux Φ = Φ_curved + Φ_caps. On flat circular ends, E ⊥ dA, so Φ_caps = 0.',
          'On curved surface, E || dA everywhere, so Φ_curved = ∫ E dA = E (2πr L).',
          'Enclosed charge Q_enc = λ L.',
          'By Gauss\'s Law: E (2πr L) = λ L / ε₀.',
          'Canceling L gives E = λ / (2πε₀ r).'
        ],
        keyCondition: 'Wire is infinitely long so end effects and axial field components vanish.',
        boardTip: 'Draw Gaussian cylinder around the line charge showing normal area vectors.'
      }
    ],
    jeeTraps: [
      {
        title: 'Conducting Sheet vs Non-Conducting Sheet Field',
        detail: 'For a thin non-conducting plane sheet with surface charge density σ, E = σ / (2ε₀). But for a CONDUCTING plate, charge distributes on BOTH faces, so E = σ / ε₀.',
        shortcutFormula: 'E_{non-cond} = \\frac{\\sigma}{2\\varepsilon_0}, \\quad E_{conducting} = \\frac{\\sigma}{\\varepsilon_0}'
      }
    ],
    questions: [
      {
        id: 'q10-1',
        chapterId: 10,
        type: 'mcq',
        text: 'A point charge q is placed at the exact center of a cube of edge length a. The electric flux through one face of the cube is:',
        options: ['q / ε₀', 'q / (6 ε₀)', 'q / (8 ε₀)', 'q / (24 ε₀)'],
        correctOptionIndex: 1,
        explanation: 'By Gauss\'s law, total flux through entire cube = q / ε₀. Since cube has 6 symmetric faces, flux through any single face = (1/6) q / ε₀.',
        hint: 'Symmetry argument: 6 equal faces.',
        difficulty: 'Board Level'
      }
    ]
  },
  {
    id: 11,
    numberStr: '11',
    title: 'Electric Current Through Conductors',
    category: 'electromagnetism',
    status: 'Pending',
    hscMarks: 6,
    jeeMarks: 8,
    tagline: 'Drift Velocity, Kirchhoff\'s Laws & Wheatstone Bridge',
    description: 'Microscopic mechanism of electric current, drift velocity and relaxation time, temperature coefficient of resistance, Kirchhoff\'s junction and loop laws, and Wheatstone bridge balance.',
    keywords: ['current', 'drift velocity', 'kirchhoff laws', 'wheatstone bridge', 'potentiometer', 'resistivity', 'temperature coefficient'],
    keyFormulas: [
      { latex: 'I = n e A v_d', description: 'Relation between Current and Drift Velocity' },
      { latex: 'v_d = \\frac{e E \\tau}{m}', description: 'Drift Velocity in terms of Relaxation Time' },
      { latex: 'R_T = R_0 (1 + \\alpha \\Delta T)', description: 'Temperature Dependence of Resistance' },
      { latex: '\\frac{P}{Q} = \\frac{R}{S}', description: 'Wheatstone Bridge Balance Condition' }
    ],
    subtopics: [
      {
        id: '11.1',
        title: 'Drift Velocity & Microscopic Ohm\'s Law',
        conceptSummary: 'Free electrons undergo thermal collisions with lattice ions. Applied electric field E imparts a net average slow drift speed vd = eEτ/m (~1 mm/s). Current density J = n e vd = σ E, which is Ohm\'s law in vector form.',
        keyPoints: [
          'Resistivity ρ = m / (n e² τ), where τ is mean free relaxation time.',
          'For metals: as temperature rises, lattice vibrations increase, τ decreases, so resistance increases (positive α).'
        ]
      }
    ],
    derivations: [
      {
        id: 'd11-1',
        title: 'Condition for Balance of Wheatstone Bridge Using Kirchhoff\'s Laws',
        expectedMarks: 3,
        finalEquation: '\\frac{P}{Q} = \\frac{R}{S}',
        steps: [
          'Consider 4 resistors P, Q, R, S forming loop ABCD with galvanometer G across BD and battery across AC.',
          'At balance condition, galvanometer shows zero deflection (I_g = 0), which means potential at B equals potential at D (V_B = V_D).',
          'Current through branch AB equals current through BC (I₁), and current through AD equals current through DC (I₂).',
          'Applying Kirchhoff\'s Voltage Law (KVL) to loop ABDA: - I₁ P + I₂ R = 0 => I₁ P = I₂ R (Equation 1).',
          'Applying KVL to loop BCDB: - I₁ Q + I₂ S = 0 => I₁ Q = I₂ S (Equation 2).',
          'Dividing Equation 1 by Equation 2: (I₁ P) / (I₁ Q) = (I₂ R) / (I₂ S) => P / Q = R / S.'
        ],
        keyCondition: 'Galvanometer current Ig is zero (null deflection point).',
        boardTip: 'Label current directions on all four arms clearly in the circuit diagram.'
      }
    ],
    jeeTraps: [
      {
        title: 'Symmetry in Resistor Cube and Infinite Ladder',
        detail: 'For equivalent resistance of a cube of 12 equal resistors R: across space diagonal R_eq = (5/6)R; across face diagonal R_eq = (3/4)R; along single edge R_eq = (7/12)R.',
        shortcutFormula: 'R_{space} = \\frac{5}{6}R, \\quad R_{face} = \\frac{3}{4}R, \\quad R_{edge} = \\frac{7}{12}R'
      }
    ],
    questions: [
      {
        id: 'q11-1',
        chapterId: 11,
        type: 'mcq',
        text: 'In a balanced Wheatstone bridge, resistances P = 10 Ω, Q = 20 Ω, R = 30 Ω. What is the value of unknown resistance S?',
        options: ['15 Ω', '30 Ω', '60 Ω', '120 Ω'],
        correctOptionIndex: 2,
        explanation: 'P / Q = R / S => 10 / 20 = 30 / S => 1/2 = 30 / S => S = 60 Ω.',
        hint: 'Use balance formula P/Q = R/S.',
        difficulty: 'Board Level'
      }
    ]
  },
  {
    id: 12,
    numberStr: '12',
    title: 'Magnetism',
    category: 'electromagnetism',
    status: 'Pending',
    hscMarks: 4,
    jeeMarks: 4,
    tagline: 'Magnetic Dipoles, Earth\'s Magnetism & Tangent Law',
    description: 'Magnetic dipole moment of bar magnets and circulating electron, magnetic field lines, Earth\'s magnetic elements (declination, inclination/dip, horizontal component), and tangent law.',
    keywords: ['magnetism', 'magnetic dipole', 'earths field', 'tangent law', 'dip', 'declination', 'permeability'],
    keyFormulas: [
      { latex: 'B_{axial} = \\frac{\\mu_0}{4\\pi} \\frac{2M}{r^3}', description: 'Magnetic Field on Axis of Short Bar Magnet' },
      { latex: 'B_{equatorial} = \\frac{\\mu_0}{4\\pi} \\frac{M}{r^3}', description: 'Magnetic Field on Equator of Short Bar Magnet' },
      { latex: 'B = B_H \\tan \\theta', description: 'Tangent Law of Magnetism' },
      { latex: 'B = \\sqrt{B_H^2 + B_V^2}, \\quad \\tan \\delta = \\frac{B_V}{B_H}', description: 'Earth\'s Magnetic Field Components' }
    ],
    subtopics: [
      {
        id: '12.1',
        title: 'Earth\'s Magnetic Elements',
        conceptSummary: 'Earth acts as a giant magnetic dipole tilted at ~11.3° to its rotational axis. Complete orientation is defined by: 1. Magnetic Declination (angle between geographic and magnetic meridian). 2. Magnetic Dip / Inclination δ (angle total field makes with horizontal). 3. Horizontal component BH = B cos δ.',
        keyPoints: [
          'At magnetic equator: Dip δ = 0°, vertical component BV = 0, total field is purely horizontal.',
          'At magnetic poles: Dip δ = 90°, horizontal component BH = 0, dip circle needle stands vertical.'
        ]
      }
    ],
    derivations: [
      {
        id: 'd12-1',
        title: 'Ratio of Axial to Equatorial Magnetic Field of Short Dipole',
        expectedMarks: 2,
        finalEquation: 'B_{axial} = 2 B_{equatorial}',
        steps: [
          'Magnetic field at distance r along axis of short dipole of moment M: B_axial = (μ₀ / 4π) (2M / r³).',
          'Magnetic field at same distance r along equatorial broadside position: B_eq = (μ₀ / 4π) (M / r³).',
          'Dividing B_axial by B_eq gives exactly 2.',
          'Hence for a given distance, axial magnetic field is double the equatorial magnetic field.'
        ],
        keyCondition: 'Distance r is much larger than length of dipole (r >> 2l).',
        boardTip: 'Remember directions: B_axial is parallel to M; B_equatorial is anti-parallel to M.'
      }
    ],
    jeeTraps: [
      {
        title: 'Apparent Dip in Arbitrary Vertical Plane',
        detail: 'If dip circle is inclined at angle θ to magnetic meridian, the apparent dip δ\' satisfies cot²δ\' = cot²δ + sin²θ or tan δ\' = tan δ / cos θ. True dip is ALWAYS less than or equal to apparent dip!',
        shortcutFormula: '\\tan \\delta\' = \\frac{\\tan \\delta}{\\cos \\theta}'
      }
    ],
    questions: [
      {
        id: 'q12-1',
        chapterId: 12,
        type: 'mcq',
        text: 'At a place where the angle of dip is 45°, what is the ratio of horizontal component to vertical component of Earth\'s magnetic field?',
        options: ['1 : 1', '1 : √3', '√3 : 1', '1 : 2'],
        correctOptionIndex: 0,
        explanation: 'tan δ = BV / BH => tan 45° = 1 => BV = BH => BH : BV = 1 : 1.',
        hint: 'tan δ = BV / BH.',
        difficulty: 'Board Level'
      }
    ]
  },
  {
    id: 13,
    numberStr: '13',
    title: 'Electromagnetic Waves & Communication System',
    category: 'modern',
    status: 'Pending',
    hscMarks: 4,
    jeeMarks: 4,
    tagline: 'Maxwell\'s Waves, EM Spectrum & Modulation Mechanics',
    description: 'Displacement current, transverse nature of EM waves, electromagnetic spectrum sequence, ground, sky, and space wave propagation, and amplitude modulation index.',
    keywords: ['electromagnetic waves', 'em waves', 'communication system', 'displacement current', 'modulation', 'antenna', 'sky wave'],
    keyFormulas: [
      { latex: 'c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} = \\frac{E_0}{B_0}', description: 'Speed of Light in Vacuum' },
      { latex: '\\mu = \\frac{A_m}{A_c}', description: 'Modulation Index in Amplitude Modulation' },
      { latex: 'd = \\sqrt{2 R h_t} + \\sqrt{2 R h_r}', description: 'Maximum Line-of-Sight Transmission Distance' },
      { latex: 'I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt}', description: 'Maxwell\'s Displacement Current' }
    ],
    subtopics: [
      {
        id: '13.1',
        title: 'EM Wave Characteristics & Spectrum Order',
        conceptSummary: 'EM waves are mutual oscillations of electric and magnetic fields perpendicular to each other and to propagation direction (v = E × B). Spectrum sequence by increasing frequency: Radio < Microwave < Infrared < Visible < Ultraviolet < X-rays < Gamma rays.',
        keyPoints: [
          'EM waves carry energy and linear momentum: p = U / c.',
          'Radiation pressure on completely absorbing surface: P = I / c; on reflecting surface: P = 2I / c.'
        ]
      }
    ],
    derivations: [
      {
        id: 'd13-1',
        title: 'Maximum Range of Line-of-Sight (LOS) Space Wave Communication',
        expectedMarks: 3,
        finalEquation: 'd_{max} = \\sqrt{2 R h_t} + \\sqrt{2 R h_r}',
        steps: [
          'Consider transmitting antenna of height h_t on spherical Earth of radius R.',
          'From Pythagoras theorem in right-angled triangle formed with Earth center: (R + h_t)² = R² + d_t².',
          'Expanding: R² + 2R h_t + h_t² = R² + d_t².',
          'Since h_t << R, h_t² is negligible compared to 2R h_t: d_t² ≈ 2R h_t => d_t = √(2R h_t).',
          'Similarly, horizon distance for receiving antenna of height h_r is d_r = √(2R h_r).',
          'Total maximum line of sight transmission distance is d_max = d_t + d_r = √(2R h_t) + √(2R h_r).'
        ],
        keyCondition: 'Direct line of sight propagation free from atmospheric refraction bends.',
        boardTip: 'Remember to keep both heights h_t, h_r and Earth radius R in the same units (meters).'
      }
    ],
    jeeTraps: [
      {
        title: 'Modulation Index Range for Distortion-Free Transmission',
        detail: 'Modulation index μ = Am / Ac must be ≤ 1 (100%). If μ > 1, overmodulation occurs, causing severe envelope distortion and carrier phase reversals.',
        shortcutFormula: '\\mu = \\frac{A_{max} - A_{min}}{A_{max} + A_{min}} \\le 1'
      }
    ],
    questions: [
      {
        id: 'q13-1',
        chapterId: 13,
        type: 'mcq',
        text: 'A TV transmitting antenna has a height of 80 m. How much service area can it cover if Earth\'s radius is 6400 km? (Take π ≈ 3.14)',
        options: ['1608 km²', '3216 km²', '6432 km²', '1024 km²'],
        correctOptionIndex: 1,
        explanation: 'Distance d = √(2 R h) = √(2 × 6.4 × 10⁶ × 80) = √(1024 × 10⁶) = 32 × 10³ m = 32 km. Covered Area A = π d² = 3.14 × 32² = 3.14 × 1024 ≈ 3215.4 km².',
        hint: 'First find horizon distance d = √(2Rh), then Area = π d².',
        difficulty: 'JEE Main'
      }
    ]
  },
  {
    id: 14,
    numberStr: '14',
    title: 'Semiconductors',
    category: 'modern',
    status: 'Pending',
    hscMarks: 5,
    jeeMarks: 4,
    tagline: 'P-N Junction, Rectifiers, Zener Diode & Digital Logic',
    description: 'Intrinsic & extrinsic semiconductors, p-n junction barrier potential, forward/reverse I-V characteristics, half and full wave rectifiers, Zener diode voltage regulator, and truth tables of Boolean logic gates.',
    keywords: ['semiconductors', 'pn junction', 'diode', 'rectifiers', 'zener diode', 'logic gates', 'nand', 'nor', 'truth table'],
    keyFormulas: [
      { latex: 'n_i^2 = n_e \\times n_h', description: 'Mass Action Law in Semiconductors' },
      { latex: '\\eta_{FWR} = \\frac{0.812 R_L}{r_f + R_L} \\approx 81.2\\%', description: 'Maximum Efficiency of Full Wave Rectifier' },
      { latex: '\\text{Ripple Factor } r = \\frac{I_{ac}}{I_{dc}} = 0.482 \\text{ (FWR)}', description: 'Ripple Factor of Full Wave Rectifier' },
      { latex: 'Y = \\overline{A \\cdot B} \\text{ (NAND)}, \\quad Y = \\overline{A + B} \\text{ (NOR)}', description: 'Universal Logic Gates' }
    ],
    subtopics: [
      {
        id: '14.1',
        title: 'P-N Junction Diode & Rectifiers',
        conceptSummary: 'Formed by doping adjacent regions with acceptor (p-type, holes) and donor (n-type, electrons) impurities. Diffusion of majority carriers creates depletion layer with built-in potential barrier (~0.7V for Si, ~0.3V for Ge). Half-wave rectifier utilizes one diode (max efficiency 40.6%); full-wave rectifier uses center-tapped or bridge configuration (max efficiency 81.2%).',
        keyPoints: [
          'Forward bias: narrows depletion layer, conduction occurs exponentially once knee voltage is reached.',
          'Reverse bias: widens depletion layer, only microscopic reverse saturation current flows until breakdown.'
        ]
      },
      {
        id: '14.2',
        title: 'Universal Logic Gates (NAND & NOR)',
        conceptSummary: 'NAND and NOR gates are universal gates because any combinational digital circuit (AND, OR, NOT, XOR) can be constructed using only NAND gates or only NOR gates without requiring any other components.',
        keyPoints: [
          'De Morgan\'s First Theorem: (A + B)\' = A\' · B\'',
          'De Morgan\'s Second Theorem: (A · B)\' = A\' + B\''
        ]
      }
    ],
    derivations: [
      {
        id: 'd14-1',
        title: 'Zener Diode as a DC Voltage Regulator',
        expectedMarks: 3,
        finalEquation: 'V_L = V_Z = \\text{constant}',
        steps: [
          'Zener diode is a heavily doped p-n junction operating in reverse breakdown region where voltage remains constant Vz across huge current changes.',
          'Connect unregulated input DC voltage Vin across series current-limiting resistor Rs, and place Zener diode in parallel with load resistor RL.',
          'Total current I = Iz + IL, with I = (Vin - Vz) / Rs.',
          'Case 1: When Vin increases, diode absorbs extra current into Iz while maintaining Vz constant across RL.',
          'Case 2: When load RL decreases, Iz decreases by same amount, keeping total current and Vz constant.',
          'Hence load voltage VL = Vz remains strictly regulated despite supply fluctuations.'
        ],
        keyCondition: 'Input voltage Vin must remain strictly greater than Zener breakdown voltage Vz.',
        boardTip: 'Draw the circuit diagram with reverse-biased Zener symbol and series resistor Rs.'
      }
    ],
    jeeTraps: [
      {
        title: 'Diode Conduction State in Complex Bridge Networks',
        detail: 'In diode resistor circuits, assume diode is an OPEN circuit first to calculate potential across nodes. If V_p > V_n by at least barrier voltage (0.7V for Si), diode is FORWARD biased and conducts; otherwise it remains OFF.',
        shortcutFormula: 'V_p - V_n > V_{barrier} \\implies \\text{Diode ON (short circuit)}'
      }
    ],
    questions: [
      {
        id: 'q14-1',
        chapterId: 14,
        type: 'mcq',
        text: 'To construct an OR gate using only NAND gates, what is the minimum number of NAND gates required?',
        options: ['2', '3', '4', '5'],
        correctOptionIndex: 1,
        explanation: 'By De Morgan\'s Law, A + B = ((A + B)\')\' = (A\' · B\')\'. We need 1 NAND gate as inverter for A, 1 NAND gate as inverter for B, and 1 NAND gate to combine A\' and B\'. Total = 3 NAND gates.',
        hint: 'Use De Morgan\'s theorem: A + B = (A\' · B\')\'.',
        difficulty: 'JEE Main'
      }
    ]
  }
];
