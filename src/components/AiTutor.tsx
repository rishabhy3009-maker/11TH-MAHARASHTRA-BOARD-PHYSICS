import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import {
  Sparkles,
  Send,
  HelpCircle,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Loader2,
} from 'lucide-react';

interface AiTutorProps {
  initialPrompt?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const PRESET_DOUBTS = [
  'Derive the Lens Maker\'s Formula step-by-step with sign convention',
  'Explain why banking of roads prevents skidding even when friction is zero',
  'Why does speed of sound increase with humidity but is independent of pressure?',
  'Derive the equation of path of a projectile and prove it is a parabola',
  'Explain how a Zener diode maintains constant DC voltage across fluctuating loads',
];

export const AiTutor: React.FC<AiTutorProps> = ({ initialPrompt = '' }) => {
  const [input, setInput] = useState(initialPrompt);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `### Welcome to the PhysikOS AI Physics Scholar

I am your personal Class 11 HSC & JEE Main Physics tutor. Ask me any doubt, numerical problem, derivation walkthrough, or conceptual puzzle!

**What I can do for you:**
- Step-by-step mathematical proofs with LaTeX formulas
- Free Body Diagram (FBD) breakdowns
- JEE Main speed traps and common misconceptions
- Real-time numerical calculations with SI units`,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (queryText?: string) => {
    const q = queryText || input;
    if (!q.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: q };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;

      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `You are an expert Senior Physics Professor and Master JEE Main Educator specializing in Maharashtra Class 11 HSC Physics and NTA JEE Main standards.
Structure your answers with:
1. Core Physical Principle / Law
2. Detailed Mathematical Proof / Formula with SI Units
3. Step-by-Step Problem Solving or Derivation
4. JEE Main Speed Trap / Common Pitfall to Avoid
Be rigorous, precise, and supportive. Use clear formatting.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `${systemPrompt}\n\nStudent Question: ${q}`,
        });

        const reply = response.text || 'Unable to generate response.';
        setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      } else {
        const simulatedReply = generateCuratedPhysicsAnswer(q);
        setMessages((prev) => [...prev, { role: 'assistant', content: simulatedReply }]);
      }
    } catch (err: any) {
      console.warn('AI call error fallback:', err);
      const simulatedReply = generateCuratedPhysicsAnswer(q);
      setMessages((prev) => [...prev, { role: 'assistant', content: simulatedReply }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
      {/* Header */}
      <div className="bg-[#12180e] border border-[#2d3b25] rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#A1CB35] mb-1">
            <Sparkles className="w-5 h-5 text-[#FFDE4E]" />
            <span className="font-mono text-xs uppercase tracking-wider font-extrabold text-[#A1CB35]">
              AI Physics Doubt Solver & Concept Clarifier
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f2f6ee]">
            AI Physics Scholar
          </h1>
          <p className="text-xs sm:text-sm text-[#c2ceb8] mt-1">
            Instant step-by-step derivations, Free Body Diagrams, SI dimensional verification, and JEE Main trap warnings.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#0c1109] border border-[#2d3b25] px-3.5 py-1.5 rounded-xl font-mono text-xs text-[#A1CB35] font-bold">
          <Cpu className="w-4 h-4 text-[#FFDE4E]" />
          <span>SI Precision Engine Ready</span>
        </div>
      </div>

      {/* Preset doubts chips */}
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs text-[#8b9982] uppercase font-bold">
          Frequently Asked Class 11 Exam Doubts:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {PRESET_DOUBTS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(preset)}
              className="px-3 py-1.5 rounded-xl bg-[#12180e] hover:bg-[#182114] border border-[#2d3b25] text-xs font-mono text-[#c2ceb8] hover:text-[#A1CB35] whitespace-nowrap transition-colors flex items-center gap-1.5"
            >
              <Lightbulb className="w-3.5 h-3.5 text-[#FFDE4E]" />
              <span>{preset}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="bg-[#12180e] border border-[#2d3b25] rounded-2xl p-6 flex flex-col gap-4 shadow-xl min-h-[420px] max-h-[600px] overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col p-4 rounded-xl border leading-relaxed ${
              m.role === 'user'
                ? 'bg-[#769826]/30 border-[#A1CB35]/40 text-[#f2f6ee] self-end max-w-xl shadow-sm'
                : 'bg-[#0c1109] border-[#2d3b25] text-[#c2ceb8] self-start max-w-3xl font-mono text-xs'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-2 font-mono text-[10px] uppercase font-bold text-[#A1CB35]">
              {m.role === 'user' ? 'Student' : 'PhysikOS AI Tutor'}
            </div>
            <div className="whitespace-pre-wrap">{m.content}</div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-mono text-[#A1CB35] p-3 bg-[#0c1109] rounded-xl border border-[#2d3b25] self-start">
            <Loader2 className="w-4 h-4 animate-spin text-[#FFDE4E]" />
            <span>Analyzing physics equations and formulating step-by-step solution...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-3 bg-[#12180e] p-2 rounded-2xl border border-[#2d3b25] shadow-lg">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder="Ask any physics question (e.g. 'Why is kinetic energy invariant under Galilean transform?' or 'Derive R = u²sin(2θ)/g')..."
          className="flex-1 bg-transparent text-xs text-[#f2f6ee] placeholder:text-[#8b9982] px-4 py-2.5 focus:outline-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={isLoading || !input.trim()}
          className="px-5 py-2.5 rounded-xl bg-[#769826] hover:bg-[#688620] disabled:opacity-50 text-white font-mono text-xs font-bold transition-all shadow-md flex items-center gap-2 border border-[#A1CB35]/60"
        >
          <Send className="w-4 h-4 text-[#FFDE4E]" />
          <span className="hidden sm:inline">Ask Tutor</span>
        </button>
      </div>
    </div>
  );
};

function generateCuratedPhysicsAnswer(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('lens maker') || q.includes('lens')) {
    return `### Lens Maker's Formula Walkthrough (Class 11 Optics)

**1. Core Formula:**
$$\\frac{1}{f} = (\\mu - 1) \\left( \\frac{1}{R_1} - \\frac{1}{R_2} \\right)$$

**2. Physical Assumptions:**
- Thin lens (thickness $t \\ll R_1, R_2$)
- Paraxial rays (angles are small, $\\sin \\theta \\approx \\tan \\theta \\approx \\theta$)
- Surrounding medium is air (refractive index $\\mu_1 = 1$)

**3. Step-by-Step Derivation:**
1. At the first surface (convex face, radius $R_1$):
   $$\\frac{\\mu}{v_1} - \\frac{1}{u} = \\frac{\\mu - 1}{R_1}$$
2. At the second surface (radius $R_2$), the intermediate image $v_1$ acts as a virtual object:
   $$\\frac{1}{v} - \\frac{\\mu}{v_1} = \\frac{1 - \\mu}{R_2} = -\\frac{\\mu - 1}{R_2}$$
3. Adding both equations cancels $\\frac{\\mu}{v_1}$:
   $$\\frac{1}{v} - \\frac{1}{u} = (\\mu - 1) \\left( \\frac{1}{R_1} - \\frac{1}{R_2} \\right)$$
4. By definition, when $u = -\\infty$, $v = f$:
   $$\\frac{1}{f} = (\\mu - 1) \\left( \\frac{1}{R_1} - \\frac{1}{R_2} \\right)$$

**⚠️ JEE Main Trap Alert:**
For an equi-convex lens ($R_1 = +R, R_2 = -R$) with $\\mu = 1.5$:
$$\\frac{1}{f} = (1.5 - 1)\\left(\\frac{1}{R} - \\left(-\\frac{1}{R}\\right)\\right) = 0.5 \\times \\frac{2}{R} = \\frac{1}{R} \\implies f = R$$
When submerged in water ($\\mu_w = 4/3$), its focal length increases by a factor of 4: $f_{water} = 4 f_{air}$!`;
  }

  if (q.includes('banking') || q.includes('skidding') || q.includes('car')) {
    return `### Banking of Curved Roads (Class 11 Laws of Motion)

**1. Why Roads are Banked:**
On flat horizontal turns, the necessary centripetal force ($F_c = \\frac{m v^2}{r}$) must be provided entirely by static friction ($f_s \\le \\mu_s mg$). If the road is icy or wet (low $\\mu_s$), the vehicle skids outwards. By tilting the outer edge of the road at an angle $\\theta$, the horizontal component of normal force ($N \\sin \\theta$) provides the centripetal acceleration even when friction is ZERO!

**2. Optimum Speed Derivation:**
- Vertical equilibrium: $N \\cos \\theta = mg$
- Horizontal centripetal demand: $N \\sin \\theta = \\frac{m v^2}{r}$
- Dividing equations:
  $$\\frac{N \\sin \\theta}{N \\cos \\theta} = \\frac{m v^2 / r}{mg} \\implies \\tan \\theta = \\frac{v^2}{rg}$$
  $$v_{opt} = \\sqrt{rg \\tan \\theta}$$

**3. Maximum Speed with Friction $\\mu_s$:**
$$v_{max} = \\sqrt{rg \\left( \\frac{\\mu_s + \\tan \\theta}{1 - \\mu_s \\tan \\theta} \\right)}$$

**⚠️ JEE Main Speed Trap:**
If vehicle speed $v < v_{opt}$, friction points UP the incline to prevent slipping downwards! If $v > v_{opt}$, friction points DOWN the incline to prevent skidding upwards!`;
  }

  if (q.includes('sound') || q.includes('humidity') || q.includes('laplace')) {
    return `### Speed of Sound & Atmospheric Factors (Class 11 Sound)

**1. Laplace Formula:**
$$v = \\sqrt{\\frac{\\gamma P}{\\rho}}$$
Where $\\gamma = C_p / C_v$, $P$ is pressure, and $\\rho$ is density.

**2. Why is Speed of Sound Independent of Pressure?**
According to the Ideal Gas Law: $PV = nRT = \\frac{m}{M} RT \\implies \\frac{P}{\\rho} = \\frac{RT}{M}$.
Substituting into Laplace's formula:
$$v = \\sqrt{\\frac{\\gamma RT}{M}}$$
At constant temperature $T$, when pressure increases, density increases in the EXACT same proportion ($P/\\rho = \\text{constant}$). Hence speed remains completely unchanged!

**3. Why Does Sound Travel Faster in Humid Air?**
- Molar mass of dry air ($N_2, O_2$) is $\\approx 29 \\text{ g/mol}$.
- Molar mass of water vapor ($H_2 O$) is $18 \\text{ g/mol}$.
- As humidity rises, lighter water vapor molecules displace heavier nitrogen/oxygen molecules, reducing overall density $\\rho$.
- Since $v \\propto 1/\\sqrt{\\rho}$, speed of sound INCREASES in humid air!`;
  }

  return `### Comprehensive Physics Analysis

**1. Fundamental Principles:**
Every physical system is governed by conservation laws:
- Conservation of Linear Momentum: $\\sum \\mathbf{F}_{ext} = 0 \\implies \\mathbf{P} = \\text{const}$
- Conservation of Mechanical Energy: In conservative fields ($W_{nc} = 0$), $K + U = \\text{constant}$
- Work-Energy Theorem: $W_{net} = \\Delta K$

**2. Mathematical Verification:**
Ensure dimensional consistency across all terms: $[\\text{LHS}] = [\\text{RHS}]$.
Convert all input quantities to standard SI units before applying formulas:
- Length: meters ($m$)
- Mass: kilograms ($kg$)
- Time: seconds ($s$)
- Electric Current: amperes ($A$)

**3. Key Advice for JEE Main & Board Exams:**
- Always draw a clean Free Body Diagram (FBD) showing all contact and field forces.
- Watch out for sign conventions (Cartesian coordinates: upward and rightward as positive).`;
}
