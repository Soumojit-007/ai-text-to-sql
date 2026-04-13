// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function Landing() {
//   const navigate = useNavigate();

//   return (
//     <div className="h-screen flex flex-col justify-center items-center relative overflow-hidden">

//       {/* Background Glow */}
//       <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
//       <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

//       {/* Main Content */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="glass p-10 text-center space-y-6 max-w-xl"
//       >
//         <h1 className="text-4xl font-bold">
//           QueryForge
//         </h1>

//         <p className="text-gray-400 text-sm leading-relaxed">
//           QueryForge is an AI-powered data copilot that transforms natural language
//           into SQL queries. Upload your data, ask questions, and get instant insights.
//         </p>

//         <p className="text-gray-500 text-xs">
//           Built to simplify data exploration using AI, making analytics accessible to everyone.
//         </p>

//         {/* CTA Button */}
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate("/auth")}
//           className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition"
//         >
//           Explore Now →
//         </motion.button>
//       </motion.div>

//       {/* Floating Elements (3D feel) */}
//       <motion.div
//         className="absolute top-20 left-20 w-16 h-16 bg-white/10 rounded-xl backdrop-blur-lg"
//         animate={{ y: [0, -20, 0] }}
//         transition={{ repeat: Infinity, duration: 4 }}
//       />

//       <motion.div
//         className="absolute bottom-20 right-20 w-20 h-20 bg-white/10 rounded-xl backdrop-blur-lg"
//         animate={{ y: [0, 20, 0] }}
//         transition={{ repeat: Infinity, duration: 5 }}
//       />
//     </div>
//   );
// }





import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function Landing() {
  const navigate = useNavigate();

  // Cursor glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <div className="min-h-screen bg-[#040405] text-white overflow-hidden relative">

        {/* 🌌 Gradient Background */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1f] via-[#1a1040] to-[#05050a]" /> */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0a0a1f] via-[#1a1040] to-[#05050a]" />
        {/* Glow blobs */}
        <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[120px] top-[-200px] left-[-200px]" />
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[120px] bottom-[-200px] right-[-200px]" />

        {/* Cursor Glow */}
        <motion.div
          className="pointer-events-none fixed w-[350px] h-[350px] rounded-full bg-purple-500/20 blur-[100px] z-0"
          style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        />

        {/* Noise */}
        <div className="pointer-events-none fixed inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Navbar */}
        <div className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="font-semibold tracking-wide text-lg">QueryForge</h1>

            <MagneticButton onClick={() => navigate("/auth")}>
              Get Started
            </MagneticButton>
          </div>
        </div>

        {/* HERO */}
        <section className="pt-40 pb-32 px-6 text-center relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="absolute w-[900px] h-[900px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 blur-[140px] rounded-full top-[-400px] left-[-400px]"
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-8 relative z-10"
          >
            <h1 className="text-5xl sm:text-7xl font-bold leading-tight tracking-tight">
              Build Queries
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Instantly
              </span>
            </h1>

            {/* ✅ Improved Description */}
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              QueryForge is your AI-powered data copilot that converts natural language
              into optimized SQL queries in seconds. Upload your datasets, ask questions
              in plain English, and unlock powerful insights without writing a single line of SQL.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton onClick={() => navigate("/auth")}>
                Start Building →
              </MagneticButton>

              <button className="px-8 py-4 rounded-xl border border-white/20 backdrop-blur-lg hover:bg-white/5 transition">
                Live Demo
              </button>
            </div>
          </motion.div>
        </section>

        {/* Demo */}
        <section className="px-6 pb-32">
          <div className="max-w-6xl mx-auto">
            <TiltCard>
              <div className="p-6 bg-[#0f172a] rounded-2xl border border-white/10 text-sm font-mono">
                <TypingDemo />
              </div>
            </TiltCard>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 pb-32">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              "AI-Powered SQL Generation",
              "Seamless Data Upload",
              "Real-Time Insights"
            ].map((f, i) => (
              <TiltCard key={i}>
                <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <h3 className="text-lg font-semibold mb-3">{f}</h3>
                  <p className="text-gray-400 text-sm">
                    Experience next-gen analytics powered by AI.
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ✅ Proper Footer */}
        <footer className="border-t border-white/10 py-10 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-sm text-gray-400">

            <div>
              <h2 className="text-white font-semibold mb-3">QueryForge</h2>
              <p>
                AI-powered data analytics platform designed to simplify SQL and
                accelerate decision making.
              </p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-3">Product</h3>
              <ul className="space-y-2">
                <li>Features</li>
                <li>Pricing</li>
                <li>Docs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-3">Company</h3>
              <ul className="space-y-2">
                <li>About</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

          </div>

          <div className="text-center mt-8 text-gray-500 text-xs">
            © 2026 QueryForge. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}

/* Magnetic Button */
function MagneticButton({ children, onClick }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-500/20"
    >
      {children}
    </motion.button>
  );
}

/* Tilt */
function TiltCard({ children }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY }}
      className="transition-transform will-change-transform"
    >
      {children}
    </motion.div>
  );
}

/* Typing */
function TypingDemo() {
  const text = `> revenue last 30 days\nSELECT SUM(revenue) FROM sales;`;
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return <pre className="text-green-400 whitespace-pre-wrap">{displayed}</pre>;
}