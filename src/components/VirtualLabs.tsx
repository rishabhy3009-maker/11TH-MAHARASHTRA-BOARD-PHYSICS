import React, { useState, useEffect, useRef } from 'react';
import {
  calculateProjectile,
  calculateInclineForces,
  calculateSnellAngle,
  calculatePendulumPeriod,
  evaluateLogicGate,
} from '../utils/physicsCalculations';
import {
  FlaskConical,
  Play,
  RotateCcw,
  Sliders,
  ChevronRight,
  Sparkles,
  Layers,
  Activity,
  Zap,
  Eye,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const VirtualLabs: React.FC = () => {
  const [activeSim, setActiveSim] = useState<'projectile' | 'incline' | 'optics' | 'pendulum' | 'logic'>('projectile');

  // SIM 1: Projectile States
  const [projSpeed, setProjSpeed] = useState(30);
  const [projAngle, setProjAngle] = useState(45);
  const [projGravity, setProjGravity] = useState(9.8);
  const [projAnimationTime, setProjAnimationTime] = useState(0);
  const [isFiring, setIsFiring] = useState(false);
  const projCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // SIM 2: Incline States
  const [inclineAngle, setInclineAngle] = useState(30);
  const [inclineMass, setInclineMass] = useState(5);
  const [inclineMu, setInclineMu] = useState(0.3);

  // SIM 3: Optics States
  const [opticsN1, setOpticsN1] = useState(1.0);
  const [opticsN2, setOpticsN2] = useState(1.5);
  const [opticsAngle, setOpticsAngle] = useState(40);

  // SIM 4: Pendulum States
  const [pendulumLength, setPendulumLength] = useState(1.5);
  const [pendulumGravity, setPendulumGravity] = useState(9.8);
  const [pendulumTime, setPendulumTime] = useState(0);

  // SIM 5: Logic Gate States
  const [logicGate, setLogicGate] = useState<'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR'>('AND');
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);

  // Projectile calculations
  const projMetrics = calculateProjectile(projSpeed, projAngle, projGravity);

  // Incline calculations
  const inclineMetrics = calculateInclineForces(inclineMass, inclineAngle, inclineMu, 9.8);

  // Optics calculations
  const opticsMetrics = calculateSnellAngle(opticsN1, opticsN2, opticsAngle);

  // Pendulum calculations
  const pendulumPeriod = calculatePendulumPeriod(pendulumLength, pendulumGravity);

  // Logic calculation
  const logicOutput = evaluateLogicGate(logicGate, inputA, inputB);

  // Projectile animation loop
  useEffect(() => {
    let animId: number;
    if (isFiring) {
      const startTime = performance.now();
      const loop = (now: number) => {
        const elapsed = (now - startTime) / 1000;
        if (elapsed <= projMetrics.timeOfFlight) {
          setProjAnimationTime(elapsed);
          animId = requestAnimationFrame(loop);
        } else {
          setProjAnimationTime(projMetrics.timeOfFlight);
          setIsFiring(false);
        }
      };
      animId = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(animId);
  }, [isFiring, projMetrics.timeOfFlight]);

  // Projectile Canvas rendering
  useEffect(() => {
    if (activeSim !== 'projectile') return;
    const canvas = projCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = '#080c06';
    ctx.fillRect(0, 0, width, height);

    // Coordinate origin at (50, height - 50)
    const ox = 50;
    const oy = height - 50;
    const scale = Math.min((width - 100) / (projMetrics.horizontalRange || 50), (height - 100) / (projMetrics.maxHeight || 20));

    // Grid lines
    ctx.strokeStyle = '#182114';
    ctx.lineWidth = 1;
    for (let x = ox; x < width - 20; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 20);
      ctx.lineTo(x, oy);
      ctx.stroke();
    }
    for (let y = oy; y > 20; y -= 30) {
      ctx.beginPath();
      ctx.moveTo(ox, y);
      ctx.lineTo(width - 20, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#2d3b25';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(width - 20, oy);
    ctx.moveTo(ox, oy);
    ctx.lineTo(ox, 20);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#8b9982';
    ctx.font = '10px JetBrains Mono';
    ctx.fillText('Ground X (m)', width - 90, oy + 25);
    ctx.fillText('Height Y (m)', ox - 40, 30);

    // Full trajectory curve in #A1CB35
    ctx.strokeStyle = '#A1CB35';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const dt = projMetrics.timeOfFlight / 100;
    for (let t = 0; t <= projMetrics.timeOfFlight; t += dt) {
      const rad = (projAngle * Math.PI) / 180;
      const x = projSpeed * Math.cos(rad) * t;
      const y = projSpeed * Math.sin(rad) * t - 0.5 * projGravity * t * t;

      const cx = ox + x * scale;
      const cy = oy - y * scale;
      if (t === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    }
    ctx.stroke();

    // Apex marker in #FFDE4E
    const apexX = ox + (projMetrics.horizontalRange / 2) * scale;
    const apexY = oy - projMetrics.maxHeight * scale;
    ctx.fillStyle = '#FFDE4E';
    ctx.beginPath();
    ctx.arc(apexX, apexY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText(`Apex: ${projMetrics.maxHeight}m`, apexX - 25, apexY - 8);

    // Current animated projectile in #FF9D4D
    const currentRad = (projAngle * Math.PI) / 180;
    const curX = projSpeed * Math.cos(currentRad) * projAnimationTime;
    const curY = Math.max(0, projSpeed * Math.sin(currentRad) * projAnimationTime - 0.5 * projGravity * projAnimationTime * projAnimationTime);
    const ballX = ox + curX * scale;
    const ballY = oy - curY * scale;

    ctx.fillStyle = '#FF9D4D';
    ctx.shadowColor = '#FF9D4D';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(ballX, ballY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Velocity vector at current position in #FFDE4E
    const curVx = projSpeed * Math.cos(currentRad);
    const curVy = projSpeed * Math.sin(currentRad) - projGravity * projAnimationTime;
    ctx.strokeStyle = '#FFDE4E';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(ballX, ballY);
    ctx.lineTo(ballX + curVx * 0.8, ballY - curVy * 0.8);
    ctx.stroke();
  }, [activeSim, projSpeed, projAngle, projGravity, projMetrics, projAnimationTime]);

  // Pendulum continuous ticker
  useEffect(() => {
    if (activeSim !== 'pendulum') return;
    const interval = setInterval(() => {
      setPendulumTime((t) => t + 0.04);
    }, 40);
    return () => clearInterval(interval);
  }, [activeSim]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
      {/* Simulation Selector Hub Header */}
      <div className="bg-[#12180e] border border-[#2d3b25] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#A1CB35] mb-1">
            <FlaskConical className="w-5 h-5 text-[#FF9D4D]" />
            <span className="font-mono text-xs uppercase tracking-wider font-extrabold text-[#A1CB35]">
              Interactive Physics Laboratories • Real-Time Math Engines
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f2f6ee]">
            Virtual Physics Sandboxes
          </h1>
          <p className="text-xs sm:text-sm text-[#c2ceb8] mt-1">
            Simulate real experimental apparatuses with parameter sliders, live vector visualization, and SI precision telemetry.
          </p>
        </div>

        {/* Sim Tabs in 4 Colors */}
        <div className="flex items-center gap-1.5 overflow-x-auto bg-[#0c1109] p-1.5 rounded-xl border border-[#2d3b25]">
          <button
            onClick={() => setActiveSim('projectile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeSim === 'projectile'
                ? 'bg-[#769826] text-white shadow-md border border-[#A1CB35]/60'
                : 'text-[#8b9982] hover:text-[#f2f6ee]'
            }`}
          >
            <span>2D Projectile</span>
          </button>
          <button
            onClick={() => setActiveSim('incline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeSim === 'incline'
                ? 'bg-[#769826] text-white shadow-md border border-[#A1CB35]/60'
                : 'text-[#8b9982] hover:text-[#f2f6ee]'
            }`}
          >
            <span>Incline Friction</span>
          </button>
          <button
            onClick={() => setActiveSim('optics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeSim === 'optics'
                ? 'bg-[#769826] text-white shadow-md border border-[#A1CB35]/60'
                : 'text-[#8b9982] hover:text-[#f2f6ee]'
            }`}
          >
            <span>Snell & TIR</span>
          </button>
          <button
            onClick={() => setActiveSim('pendulum')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeSim === 'pendulum'
                ? 'bg-[#769826] text-white shadow-md border border-[#A1CB35]/60'
                : 'text-[#8b9982] hover:text-[#f2f6ee]'
            }`}
          >
            <span>SHM Pendulum</span>
          </button>
          <button
            onClick={() => setActiveSim('logic')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeSim === 'logic'
                ? 'bg-[#769826] text-white shadow-md border border-[#A1CB35]/60'
                : 'text-[#8b9982] hover:text-[#f2f6ee]'
            }`}
          >
            <span>Logic Gates</span>
          </button>
        </div>
      </div>

      {/* SIMULATION 1: PROJECTILE MOTION */}
      {activeSim === 'projectile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Panel (4 Columns) */}
          <div className="lg:col-span-4 bg-[#12180e] border border-[#2d3b25] rounded-2xl p-5 flex flex-col gap-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#2d3b25] pb-3">
              <span className="font-mono text-xs uppercase text-[#A1CB35] font-extrabold">
                Launch Parameters
              </span>
              <span className="font-mono text-[11px] font-bold text-[#FFDE4E]">Real-time SI</span>
            </div>

            {/* Velocity slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f2f6ee]">Launch Velocity (u)</span>
                <span className="text-[#A1CB35] font-bold">{projSpeed} m/s</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                value={projSpeed}
                onChange={(e) => setProjSpeed(Number(e.target.value))}
                className="w-full h-1.5 bg-[#202a1b] rounded-lg accent-[#A1CB35] cursor-pointer"
              />
            </div>

            {/* Angle slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f2f6ee]">Launch Angle (θ)</span>
                <span className="text-[#FFDE4E] font-bold">{projAngle}°</span>
              </div>
              <input
                type="range"
                min="5"
                max="85"
                value={projAngle}
                onChange={(e) => setProjAngle(Number(e.target.value))}
                className="w-full h-1.5 bg-[#202a1b] rounded-lg accent-[#FFDE4E] cursor-pointer"
              />
            </div>

            {/* Gravity selector */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-mono text-[#f2f6ee]">Planetary Gravity (g)</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setProjGravity(9.8)}
                  className={`p-2 rounded-xl text-xs font-mono transition-all font-bold ${
                    projGravity === 9.8 ? 'bg-[#769826] text-white border border-[#A1CB35]' : 'bg-[#182114] text-[#8b9982]'
                  }`}
                >
                  Earth (9.8)
                </button>
                <button
                  onClick={() => setProjGravity(1.62)}
                  className={`p-2 rounded-xl text-xs font-mono transition-all font-bold ${
                    projGravity === 1.62 ? 'bg-[#769826] text-white border border-[#A1CB35]' : 'bg-[#182114] text-[#8b9982]'
                  }`}
                >
                  Moon (1.6)
                </button>
                <button
                  onClick={() => setProjGravity(3.71)}
                  className={`p-2 rounded-xl text-xs font-mono transition-all font-bold ${
                    projGravity === 3.71 ? 'bg-[#769826] text-white border border-[#A1CB35]' : 'bg-[#182114] text-[#8b9982]'
                  }`}
                >
                  Mars (3.7)
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  setProjAnimationTime(0);
                  setIsFiring(true);
                }}
                disabled={isFiring}
                className="flex-1 bg-[#FF9D4D] hover:bg-[#ff8f38] text-[#0c1109] font-mono text-xs font-extrabold py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isFiring ? 'Launching...' : 'Fire Trajectory'}</span>
              </button>
              <button
                onClick={() => {
                  setIsFiring(false);
                  setProjAnimationTime(0);
                }}
                className="p-2.5 bg-[#182114] hover:bg-[#202a1b] text-[#f2f6ee] border border-[#2d3b25] rounded-xl transition-colors"
                title="Reset Simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Analytical Results HUD */}
            <div className="bg-[#0c1109] border border-[#2d3b25] p-3.5 rounded-xl flex flex-col gap-2 font-mono text-xs">
              <span className="text-[#A1CB35] uppercase font-bold text-[10px]">
                Analytical Predictions (SI)
              </span>
              <div className="flex justify-between border-b border-[#2d3b25] pb-1">
                <span className="text-[#8b9982]">Horizontal Range:</span>
                <span className="text-[#f2f6ee] font-bold">{projMetrics.horizontalRange} m</span>
              </div>
              <div className="flex justify-between border-b border-[#2d3b25] pb-1">
                <span className="text-[#8b9982]">Maximum Height:</span>
                <span className="text-[#FFDE4E] font-bold">{projMetrics.maxHeight} m</span>
              </div>
              <div className="flex justify-between border-b border-[#2d3b25] pb-1">
                <span className="text-[#8b9982]">Time of Flight:</span>
                <span className="text-[#FF9D4D] font-bold">{projMetrics.timeOfFlight} s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b9982]">Initial Vx:</span>
                <span className="text-[#A1CB35]">{projMetrics.vx} m/s</span>
              </div>
            </div>
          </div>

          {/* Simulation Visual Canvas (8 Columns) */}
          <div className="lg:col-span-8 bg-[#12180e] border border-[#2d3b25] rounded-2xl p-4 flex flex-col justify-between shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#2d3b25]">
              <span className="font-mono text-xs text-[#f2f6ee] font-bold">
                Dynamic 2D Trajectory Trace with Kinematic Vectors
              </span>
              <span className="font-mono text-[11px] text-[#A1CB35] font-bold">
                t = {projAnimationTime.toFixed(2)}s / {projMetrics.timeOfFlight}s
              </span>
            </div>

            <div className="relative w-full h-[400px] mt-2 rounded-xl overflow-hidden bg-[#080c06] border border-[#2d3b25]">
              <canvas
                ref={projCanvasRef}
                width={700}
                height={400}
                className="w-full h-full block"
              />
            </div>
          </div>
        </div>
      )}

      {/* SIMULATION 2: INCLINED PLANE & FRICTION */}
      {activeSim === 'incline' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-[#12180e] border border-[#2d3b25] rounded-2xl p-5 flex flex-col gap-4 shadow-lg">
            <span className="font-mono text-xs uppercase text-[#A1CB35] font-extrabold border-b border-[#2d3b25] pb-2">
              Incline & Friction Setup
            </span>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f2f6ee]">Incline Angle (θ)</span>
                <span className="text-[#FFDE4E] font-bold">{inclineAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={inclineAngle}
                onChange={(e) => setInclineAngle(Number(e.target.value))}
                className="w-full h-1.5 bg-[#202a1b] rounded-lg accent-[#FFDE4E] cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f2f6ee]">Block Mass (m)</span>
                <span className="text-[#A1CB35] font-bold">{inclineMass} kg</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={inclineMass}
                onChange={(e) => setInclineMass(Number(e.target.value))}
                className="w-full h-1.5 bg-[#202a1b] rounded-lg accent-[#A1CB35] cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f2f6ee]">Coefficient of Friction (μ)</span>
                <span className="text-[#FF9D4D] font-bold">{inclineMu}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={inclineMu}
                onChange={(e) => setInclineMu(Number(e.target.value))}
                className="w-full h-1.5 bg-[#202a1b] rounded-lg accent-[#FF9D4D] cursor-pointer"
              />
            </div>

            <div className="bg-[#0c1109] border border-[#2d3b25] p-3 rounded-xl flex flex-col gap-2 font-mono text-xs">
              <span className="text-[#A1CB35] uppercase font-bold text-[10px]">
                Free Body Diagram Breakdown
              </span>
              <div className="flex justify-between border-b border-[#2d3b25] pb-1">
                <span className="text-[#8b9982]">Down-plane Force (mg sin θ):</span>
                <span className="text-[#FFDE4E] font-bold">{inclineMetrics.gravitationalDownForce} N</span>
              </div>
              <div className="flex justify-between border-b border-[#2d3b25] pb-1">
                <span className="text-[#8b9982]">Normal Force (mg cos θ):</span>
                <span className="text-[#A1CB35] font-bold">{inclineMetrics.normalForce} N</span>
              </div>
              <div className="flex justify-between border-b border-[#2d3b25] pb-1">
                <span className="text-[#8b9982]">Friction Force:</span>
                <span className="text-[#FF9D4D] font-bold">{inclineMetrics.frictionForce} N</span>
              </div>
              <div className="flex justify-between border-b border-[#2d3b25] pb-1">
                <span className="text-[#8b9982]">Net Acceleration:</span>
                <span className="text-[#f2f6ee] font-bold">{inclineMetrics.netAcceleration} m/s²</span>
              </div>
              <div className="mt-1 pt-1 flex items-center gap-1.5 text-xs font-bold">
                <span className="text-[#8b9982]">State: </span>
                {inclineMetrics.isSliding ? (
                  <span className="text-[#FF9D4D]">SLIDING DOWN (a &gt; 0)</span>
                ) : (
                  <span className="text-[#A1CB35]">STATIONARY (Static Equilibrium)</span>
                )}
              </div>
            </div>
          </div>

          {/* Incline Visualizer */}
          <div className="lg:col-span-8 bg-[#12180e] border border-[#2d3b25] rounded-2xl p-6 flex flex-col justify-between shadow-xl">
            <h3 className="font-mono text-xs text-[#f2f6ee] font-bold mb-4">
              Real-time Incline & Force Vector Diagram
            </h3>

            <div className="relative w-full h-[360px] bg-[#080c06] border border-[#2d3b25] rounded-xl overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 300">
                <line x1="50" y1="250" x2="450" y2="250" stroke="#2d3b25" strokeWidth="2" />

                {(() => {
                  const rad = (inclineAngle * Math.PI) / 180;
                  const rampLen = 320;
                  const xEnd = 50 + rampLen * Math.cos(rad);
                  const yEnd = 250 - rampLen * Math.sin(rad);

                  return (
                    <>
                      <polygon
                        points={`50,250 ${xEnd},${yEnd} ${xEnd},250`}
                        fill="#182114"
                        stroke="#769826"
                        strokeWidth="2.5"
                      />

                      <path
                        d={`M 90 250 A 40 40 0 0 0 ${50 + 40 * Math.cos(rad)} ${250 - 40 * Math.sin(rad)}`}
                        fill="none"
                        stroke="#FFDE4E"
                        strokeWidth="2"
                      />
                      <text x="95" y="245" fill="#FFDE4E" className="font-mono text-[12px] font-bold">
                        θ = {inclineAngle}°
                      </text>

                      {(() => {
                        const midDist = rampLen * 0.55;
                        const bx = 50 + midDist * Math.cos(rad);
                        const by = 250 - midDist * Math.sin(rad);

                        return (
                          <g transform={`translate(${bx}, ${by}) rotate(${-inclineAngle})`}>
                            <rect
                              x="-25"
                              y="-40"
                              width="50"
                              height="40"
                              fill="#202a1b"
                              stroke="#A1CB35"
                              strokeWidth="2"
                              rx="4"
                            />
                            <text
                              x="-14"
                              y="-16"
                              fill="#f2f6ee"
                              className="font-mono text-[11px] font-bold"
                            >
                              {inclineMass}kg
                            </text>

                            {/* Normal force vector in #A1CB35 */}
                            <line x1="0" y1="-20" x2="0" y2="-75" stroke="#A1CB35" strokeWidth="2.5" />
                            <text x="5" y="-65" fill="#A1CB35" className="font-mono text-[10px] font-bold">
                              N = {inclineMetrics.normalForce}N
                            </text>

                            {/* Friction vector in #FF9D4D */}
                            <line x1="0" y1="-20" x2="-45" y2="-20" stroke="#FF9D4D" strokeWidth="2.5" />
                            <text x="-65" y="-25" fill="#FF9D4D" className="font-mono text-[10px] font-bold">
                              f = {inclineMetrics.frictionForce}N
                            </text>

                            {/* Down-plane vector in #FFDE4E */}
                            <line x1="0" y1="-20" x2="55" y2="-20" stroke="#FFDE4E" strokeWidth="2.5" />
                            <text x="40" y="-8" fill="#FFDE4E" className="font-mono text-[10px] font-bold">
                              F_down = {inclineMetrics.gravitationalDownForce}N
                            </text>
                          </g>
                        );
                      })()}
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* SIMULATION 3: OPTICS SNELL & TIR */}
      {activeSim === 'optics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-[#12180e] border border-[#2d3b25] rounded-2xl p-5 flex flex-col gap-4 shadow-lg">
            <span className="font-mono text-xs uppercase text-[#A1CB35] font-extrabold border-b border-[#2d3b25] pb-2">
              Refraction & TIR Controls
            </span>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f2f6ee]">Angle of Incidence (θ₁)</span>
                <span className="text-[#FFDE4E] font-bold">{opticsAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="85"
                value={opticsAngle}
                onChange={(e) => setOpticsAngle(Number(e.target.value))}
                className="w-full h-1.5 bg-[#202a1b] rounded-lg accent-[#FFDE4E] cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f2f6ee]">Medium 1 Refractive Index (n₁)</span>
                <span className="text-[#A1CB35] font-bold">{opticsN1}</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.5"
                step="0.05"
                value={opticsN1}
                onChange={(e) => setOpticsN1(Number(e.target.value))}
                className="w-full h-1.5 bg-[#202a1b] rounded-lg accent-[#A1CB35] cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f2f6ee]">Medium 2 Refractive Index (n₂)</span>
                <span className="text-[#FF9D4D] font-bold">{opticsN2}</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.5"
                step="0.05"
                value={opticsN2}
                onChange={(e) => setOpticsN2(Number(e.target.value))}
                className="w-full h-1.5 bg-[#202a1b] rounded-lg accent-[#FF9D4D] cursor-pointer"
              />
            </div>

            <div className="bg-[#0c1109] border border-[#2d3b25] p-3 rounded-xl flex flex-col gap-2 font-mono text-xs">
              <span className="text-[#A1CB35] uppercase font-bold text-[10px]">
                Optical Results
              </span>
              <div className="flex justify-between border-b border-[#2d3b25] pb-1">
                <span className="text-[#8b9982]">Refracted Angle (θ₂):</span>
                <span className="text-[#A1CB35] font-bold">{opticsMetrics.refractedAngleDeg}°</span>
              </div>
              {opticsMetrics.criticalAngleDeg && (
                <div className="flex justify-between border-b border-[#2d3b25] pb-1">
                  <span className="text-[#8b9982]">Critical Angle (θ_c):</span>
                  <span className="text-[#FFDE4E] font-bold">{opticsMetrics.criticalAngleDeg}°</span>
                </div>
              )}
              <div className="mt-1 pt-1">
                {opticsMetrics.isTotalInternalReflection ? (
                  <div className="bg-[#331812] border border-[#FF9D4D] p-2.5 rounded-xl text-[#FF9D4D] font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>TOTAL INTERNAL REFLECTION (TIR)</span>
                  </div>
                ) : (
                  <div className="bg-[#1a2e16] border border-[#A1CB35] p-2.5 rounded-xl text-[#A1CB35] font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Transmitted Refraction</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-[#12180e] border border-[#2d3b25] rounded-2xl p-6 flex flex-col justify-between shadow-xl">
            <h3 className="font-mono text-xs text-[#f2f6ee] font-bold mb-4">
              Ray Tracing Across Optical Interface
            </h3>

            <div className="relative w-full h-[360px] bg-[#080c06] border border-[#2d3b25] rounded-xl overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 300">
                <rect x="0" y="150" width="500" height="150" fill="#12180e" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="#769826" strokeWidth="2" />
                <text x="20" y="140" fill="#8b9982" className="font-mono text-[11px]">
                  Medium 1 (n = {opticsN1})
                </text>
                <text x="20" y="175" fill="#8b9982" className="font-mono text-[11px]">
                  Medium 2 (n = {opticsN2})
                </text>

                <line x1="250" y1="30" x2="250" y2="270" stroke="#2d3b25" strokeWidth="1.5" strokeDasharray="4 4" />

                {(() => {
                  const rad1 = (opticsAngle * Math.PI) / 180;
                  const len = 120;
                  const x1 = 250 - len * Math.sin(rad1);
                  const y1 = 150 - len * Math.cos(rad1);

                  const isTIR = opticsMetrics.isTotalInternalReflection;
                  const rad2 = (opticsMetrics.refractedAngleDeg * Math.PI) / 180;
                  const x2 = isTIR
                    ? 250 + len * Math.sin(rad1)
                    : 250 + len * Math.sin(rad2);
                  const y2 = isTIR
                    ? 150 - len * Math.cos(rad1)
                    : 150 + len * Math.cos(rad2);

                  return (
                    <>
                      {/* Incident ray in #FFDE4E */}
                      <line x1={x1} y1={y1} x2="250" y2="150" stroke="#FFDE4E" strokeWidth="2.5" />
                      <circle cx={x1} cy={y1} r="3" fill="#FFDE4E" />

                      {/* Refracted in #A1CB35, Reflected in #FF9D4D */}
                      <line
                        x1="250"
                        y1="150"
                        x2={x2}
                        y2={y2}
                        stroke={isTIR ? '#FF9D4D' : '#A1CB35'}
                        strokeWidth="2.5"
                      />
                      <circle cx={x2} cy={y2} r="3" fill={isTIR ? '#FF9D4D' : '#A1CB35'} />
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* SIMULATION 4: SHM PENDULUM */}
      {activeSim === 'pendulum' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-[#12180e] border border-[#2d3b25] rounded-2xl p-5 flex flex-col gap-4 shadow-lg">
            <span className="font-mono text-xs uppercase text-[#A1CB35] font-extrabold border-b border-[#2d3b25] pb-2">
              Pendulum Parameters
            </span>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f2f6ee]">String Length (L)</span>
                <span className="text-[#A1CB35] font-bold">{pendulumLength} m</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={pendulumLength}
                onChange={(e) => setPendulumLength(Number(e.target.value))}
                className="w-full h-1.5 bg-[#202a1b] rounded-lg accent-[#A1CB35] cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f2f6ee]">Gravity (g)</span>
                <span className="text-[#FFDE4E] font-bold">{pendulumGravity} m/s²</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="25.0"
                step="0.2"
                value={pendulumGravity}
                onChange={(e) => setPendulumGravity(Number(e.target.value))}
                className="w-full h-1.5 bg-[#202a1b] rounded-lg accent-[#FFDE4E] cursor-pointer"
              />
            </div>

            <div className="bg-[#0c1109] border border-[#2d3b25] p-3 rounded-xl flex flex-col gap-2 font-mono text-xs">
              <span className="text-[#A1CB35] uppercase font-bold text-[10px]">
                Oscillation Telemetry
              </span>
              <div className="flex justify-between border-b border-[#2d3b25] pb-1">
                <span className="text-[#8b9982]">Time Period T = 2π√(L/g):</span>
                <span className="text-[#A1CB35] font-bold">{pendulumPeriod} s</span>
              </div>
              <div className="flex justify-between border-b border-[#2d3b25] pb-1">
                <span className="text-[#8b9982]">Frequency f = 1/T:</span>
                <span className="text-[#FFDE4E] font-bold">{(1 / pendulumPeriod).toFixed(3)} Hz</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b9982]">Angular Frequency ω:</span>
                <span className="text-[#FF9D4D] font-bold">{(2 * Math.PI / pendulumPeriod).toFixed(3)} rad/s</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-[#12180e] border border-[#2d3b25] rounded-2xl p-6 flex flex-col justify-between shadow-xl">
            <h3 className="font-mono text-xs text-[#f2f6ee] font-bold mb-4">
              Real-time Harmonic Bob Animation
            </h3>

            <div className="relative w-full h-[360px] bg-[#080c06] border border-[#2d3b25] rounded-xl overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                <line x1="120" y1="30" x2="280" y2="30" stroke="#769826" strokeWidth="4" />

                {(() => {
                  const omega = (2 * Math.PI) / pendulumPeriod;
                  const currentTheta = 0.35 * Math.cos(omega * pendulumTime);
                  const lPx = pendulumLength * 80;
                  const bobX = 200 + lPx * Math.sin(currentTheta);
                  const bobY = 30 + lPx * Math.cos(currentTheta);

                  return (
                    <>
                      <line x1="200" y1="30" x2={bobX} y2={bobY} stroke="#c2ceb8" strokeWidth="2" />

                      <circle cx={bobX} cy={bobY} r="16" fill="#769826" stroke="#A1CB35" strokeWidth="2.5" />
                      <circle cx={bobX} cy={bobY} r="4" fill="#FFDE4E" />

                      <line
                        x1={bobX}
                        y1={bobY}
                        x2={bobX - 40 * Math.sin(currentTheta)}
                        y2={bobY}
                        stroke="#FF9D4D"
                        strokeWidth="2.5"
                      />
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* SIMULATION 5: DIGITAL LOGIC GATES */}
      {activeSim === 'logic' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-[#12180e] border border-[#2d3b25] rounded-2xl p-5 flex flex-col gap-4 shadow-lg">
            <span className="font-mono text-xs uppercase text-[#A1CB35] font-extrabold border-b border-[#2d3b25] pb-2">
              Gate Selection & Inputs
            </span>

            <div className="grid grid-cols-3 gap-2">
              {(['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setLogicGate(g)}
                  className={`p-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    logicGate === g
                      ? 'bg-[#769826] text-white shadow-md border border-[#A1CB35]'
                      : 'bg-[#182114] text-[#8b9982]'
                  }`}
                >
                  {g} Gate
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center justify-between bg-[#0c1109] p-3 rounded-xl border border-[#2d3b25]">
                <span className="font-mono text-xs text-[#f2f6ee]">Input Switch A:</span>
                <button
                  onClick={() => setInputA(!inputA)}
                  className={`px-3 py-1 rounded-lg font-mono text-xs font-bold transition-all ${
                    inputA ? 'bg-[#A1CB35] text-[#0c1109]' : 'bg-[#202a1b] text-[#8b9982]'
                  }`}
                >
                  {inputA ? '1 (HIGH)' : '0 (LOW)'}
                </button>
              </div>

              {logicGate !== 'NOT' && (
                <div className="flex items-center justify-between bg-[#0c1109] p-3 rounded-xl border border-[#2d3b25]">
                  <span className="font-mono text-xs text-[#f2f6ee]">Input Switch B:</span>
                  <button
                    onClick={() => setInputB(!inputB)}
                    className={`px-3 py-1 rounded-lg font-mono text-xs font-bold transition-all ${
                      inputB ? 'bg-[#A1CB35] text-[#0c1109]' : 'bg-[#202a1b] text-[#8b9982]'
                    }`}
                  >
                    {inputB ? '1 (HIGH)' : '0 (LOW)'}
                  </button>
                </div>
              )}
            </div>

            <div className="bg-[#0c1109] border border-[#2d3b25] p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#8b9982] uppercase block">Output (Y):</span>
                <span className={`text-xl font-mono font-extrabold ${logicOutput ? 'text-[#A1CB35]' : 'text-[#FF9D4D]'}`}>
                  {logicOutput ? '1 (HIGH)' : '0 (LOW)'}
                </span>
              </div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  logicOutput
                    ? 'bg-[#A1CB35] text-black shadow-[0_0_20px_#A1CB35]'
                    : 'bg-[#202a1b] text-[#8b9982]'
                }`}
              >
                <Zap className="w-5 h-5 fill-current" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-[#12180e] border border-[#2d3b25] rounded-2xl p-6 flex flex-col justify-between shadow-xl">
            <h3 className="font-mono text-xs text-[#f2f6ee] font-bold mb-4">
              Truth Table for {logicGate} Gate
            </h3>

            <div className="overflow-x-auto bg-[#080c06] border border-[#2d3b25] rounded-xl p-4">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#2d3b25] text-[#A1CB35]">
                    <th className="p-2">Input A</th>
                    {logicGate !== 'NOT' && <th className="p-2">Input B</th>}
                    <th className="p-2">Output Y</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {logicGate === 'NOT' ? (
                    [false, true].map((a, i) => {
                      const out = evaluateLogicGate('NOT', a);
                      const isCurrent = inputA === a;
                      return (
                        <tr
                          key={i}
                          className={`border-b border-[#182114] ${
                            isCurrent ? 'bg-[#769826]/40 text-white font-bold' : 'text-[#8b9982]'
                          }`}
                        >
                          <td className="p-2">{a ? 1 : 0}</td>
                          <td className="p-2 text-[#A1CB35]">{out ? 1 : 0}</td>
                          <td className="p-2 text-[#FFDE4E]">{isCurrent ? '← Active State' : ''}</td>
                        </tr>
                      );
                    })
                  ) : (
                    [
                      [false, false],
                      [false, true],
                      [true, false],
                      [true, true],
                    ].map(([a, b], i) => {
                      const out = evaluateLogicGate(logicGate, a, b);
                      const isCurrent = inputA === a && inputB === b;
                      return (
                        <tr
                          key={i}
                          className={`border-b border-[#182114] ${
                            isCurrent ? 'bg-[#769826]/40 text-white font-bold' : 'text-[#8b9982]'
                          }`}
                        >
                          <td className="p-2">{a ? 1 : 0}</td>
                          <td className="p-2">{b ? 1 : 0}</td>
                          <td className="p-2 text-[#A1CB35]">{out ? 1 : 0}</td>
                          <td className="p-2 text-[#FFDE4E]">{isCurrent ? '← Active State' : ''}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
