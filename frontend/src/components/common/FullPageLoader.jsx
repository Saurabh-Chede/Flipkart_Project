import { useEffect, useState } from "react";

const MESSAGES = [
  "Connecting to server...",
  "Waking up services...",
  "Loading products...",
  "Almost ready...",
];

export default function FullPageLoader() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 1900);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient">
      {/* Ambient floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particleConfig.map((p, i) => (
          <span
            key={i}
            className="ambient-dot absolute rounded-full bg-white"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDuration: p.duration,
              animationDelay: p.delay,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      {/* Radial glow behind logo */}
      <div className="absolute top-[18%] w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="relative mb-14 select-none">
        <span className="logo-fade text-white text-4xl font-extrabold italic tracking-tight">
          Flip
          <span className="text-[#FFE500]">kart</span>
        </span>
        <span className="logo-shine absolute inset-0 text-4xl font-extrabold italic tracking-tight">
          Flipkart
        </span>
      </div>

      {/* Truck stage */}
      <div className="relative w-80 h-32 overflow-hidden">
        {/* Floating package particles around the truck */}
        {packageConfig.map((p, i) => (
          <div
            key={i}
            className="package-float absolute"
            style={{
              left: p.left,
              top: p.top,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12">
              <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" fill="#FFE500" opacity="0.85" />
              <path d="M0.5 4 H11.5 M6 4 V11.5" stroke="#2874F0" strokeWidth="0.8" />
            </svg>
          </div>
        ))}

        {/* Truck: horizontal drive wrapper */}
        <div className="truck-drive absolute bottom-2">
          {/* Suspension wrapper: bounce + tilt */}
          <div className="truck-suspension">
            <svg width="144" height="84" viewBox="0 0 96 56">
              {/* Cargo box */}
              <rect x="2" y="10" width="52" height="30" rx="3" fill="#FFE500" />
              <rect x="16" y="19" width="24" height="14" rx="1.5" fill="#2874F0" opacity="0.85" />
              <path d="M16 24 L28 19 L40 24" stroke="#FFE500" strokeWidth="1.5" fill="none" />

              {/* Cab */}
              <path d="M54 20 H74 L86 32 V40 H54 Z" fill="#FFFFFF" />
              <path d="M60 24 H72 L80 32 H60 Z" fill="#2874F0" opacity="0.5" />

              {/* Wheels */}
              <circle cx="18" cy="42" r="7" fill="#1A1A1A" />
              <circle cx="72" cy="42" r="7" fill="#1A1A1A" />
            </svg>
          </div>
        </div>

        {/* Road, scrolling */}
        <div className="road-strip absolute bottom-3 left-0 right-0 h-1" />
      </div>

      {/* Progress bar */}
      <div className="mt-10 w-64 h-1.5 rounded-full bg-white/15 overflow-hidden">
        <div className="progress-fill h-full rounded-full bg-gradient-to-r from-[#FFE500] to-white" />
      </div>

      {/* Rotating loading messages */}
      <div className="mt-5 h-5 relative w-64 text-center">
        <span key={msgIndex} className="message-fade absolute inset-0 text-white/85 text-sm font-medium tracking-wide">
          {MESSAGES[msgIndex]}
        </span>
      </div>

      <style>{`
        .bg-gradient {
          background: linear-gradient(135deg, #1A56DB 0%, #2874F0 45%, #4F94FF 100%);
          background-size: 200% 200%;
          animation: gradientShift 8s ease-in-out infinite;
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .ambient-dot {
          animation-name: floatUp;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes floatUp {
          0%   { transform: translateY(0); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(-40px); opacity: 0; }
        }

        .logo-fade {
          display: inline-block;
          animation: logoPulse 3.2s ease-in-out infinite;
        }
        @keyframes logoPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.82; }
        }

        .logo-shine {
          background: linear-gradient(
            110deg,
            transparent 30%,
            rgba(255,255,255,0.75) 48%,
            transparent 66%
          );
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shineSweep 3.2s ease-in-out infinite;
        }
        @keyframes shineSweep {
          0%   { background-position: 150% 0; }
          60%  { background-position: -50% 0; }
          100% { background-position: -50% 0; }
        }

        /* Truck drives fully off-stage at both ends, so the loop reset is invisible */
        .truck-drive {
          animation: driveAcross 4s linear infinite;
        }
        @keyframes driveAcross {
          0%   { left: -165px; }
          100% { left: 320px; }
        }

        .truck-suspension {
          animation: suspension 0.32s ease-in-out infinite;
          transform-origin: 50% 100%;
        }
        @keyframes suspension {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-1.5px) rotate(-0.6deg); }
        }

        .road-strip {
          background-image: repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.9) 0px,
            rgba(255,255,255,0.9) 16px,
            transparent 16px,
            transparent 32px
          );
          animation: roadScroll 0.4s linear infinite;
        }
        @keyframes roadScroll {
          from { background-position: 0 0; }
          to   { background-position: -32px 0; }
        }

        .package-float {
          animation-name: packageDrift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes packageDrift {
          0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
          20%  { opacity: 0.9; }
          80%  { opacity: 0.9; }
          100% { transform: translateY(-22px) rotate(12deg); opacity: 0; }
        }

        .progress-fill {
          animation: progressLoop 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          box-shadow: 0 0 8px rgba(255, 229, 0, 0.6);
        }
        @keyframes progressLoop {
          0%   { width: 0%; opacity: 1; }
          65%  { width: 90%; opacity: 1; }
          80%  { width: 90%; opacity: 1; }
          92%  { width: 90%; opacity: 0; }
          93%  { width: 0%; opacity: 0; }
          100% { width: 0%; opacity: 1; }
        }

        .message-fade {
          animation: messageFade 1.9s ease-in-out;
        }
        @keyframes messageFade {
          0%   { opacity: 0; transform: translateY(4px); }
          15%  { opacity: 1; transform: translateY(0); }
          85%  { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-4px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .bg-gradient, .ambient-dot, .logo-fade, .logo-shine, .truck-drive,
          .truck-suspension, .road-strip, .package-float,
          .progress-fill, .message-fade {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

const particleConfig = [
  { left: "12%", top: "70%", size: "4px", opacity: 0.5, duration: "5.5s", delay: "0s" },
  { left: "22%", top: "40%", size: "3px", opacity: 0.4, duration: "6.5s", delay: "1.2s" },
  { left: "78%", top: "60%", size: "5px", opacity: 0.5, duration: "5s", delay: "0.6s" },
  { left: "85%", top: "30%", size: "3px", opacity: 0.35, duration: "7s", delay: "2s" },
  { left: "48%", top: "78%", size: "4px", opacity: 0.4, duration: "6s", delay: "1.6s" },
  { left: "35%", top: "22%", size: "3px", opacity: 0.35, duration: "6.8s", delay: "0.3s" },
  { left: "65%", top: "15%", size: "4px", opacity: 0.45, duration: "5.8s", delay: "2.4s" },
  { left: "8%", top: "18%", size: "3px", opacity: 0.3, duration: "7.2s", delay: "1s" },
];

const packageConfig = [
  { left: "10%", top: "10%", duration: "2.6s", delay: "0s" },
  { left: "85%", top: "20%", duration: "3.1s", delay: "0.8s" },
  { left: "50%", top: "0%", duration: "2.8s", delay: "1.6s" },
  { left: "70%", top: "60%", duration: "3.4s", delay: "0.4s" },
];