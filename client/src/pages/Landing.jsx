import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Landing = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 selection:bg-violet-200 overflow-hidden">

      <style>{`
        /* ── Hero ── */
        .bg-hero {
          background:
            radial-gradient(ellipse 75% 55% at 65% -5%,  rgba(167,139,250,0.22) 0%, transparent 65%),
            radial-gradient(ellipse 50% 45% at 5%  85%,  rgba(139,92,246,0.12)  0%, transparent 60%),
            radial-gradient(ellipse 45% 40% at 95% 95%,  rgba(196,181,253,0.14) 0%, transparent 55%),
            linear-gradient(160deg, #f5f3ff 0%, #fbfaff 35%, #f8f6ff 65%, #fefcff 100%);
        }
        /* Dot-grid mask over hero */
        .bg-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image: radial-gradient(circle, rgba(139,92,246,0.13) 1px, transparent 1px);
          background-size: 34px 34px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 75% 65% at 50% 25%, black 20%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 75% 65% at 50% 25%, black 20%, transparent 80%);
        }

        /* ── Features ── */
        .bg-features {
          background:
            radial-gradient(ellipse 55% 45% at 50% 105%, rgba(139,92,246,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 35% 30% at 0%   55%,  rgba(167,139,250,0.07) 0%, transparent 55%),
            radial-gradient(ellipse 30% 25% at 100% 10%,  rgba(196,181,253,0.06) 0%, transparent 50%),
            #ffffff;
        }

        /* ── How it Works (dark) ── */
        .bg-how {
          background:
            radial-gradient(ellipse 60% 50% at 12%  18%,  rgba(109,40,217,0.30)  0%, transparent 58%),
            radial-gradient(ellipse 55% 45% at 88%  78%,  rgba(124,58,237,0.24)  0%, transparent 55%),
            radial-gradient(ellipse 40% 30% at 50%  108%, rgba(139,92,246,0.18)  0%, transparent 50%),
            linear-gradient(148deg, #0e0818 0%, #140d26 38%, #0c0717 65%, #0e0818 100%);
        }
        .bg-how::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(139,92,246,0.45) 25%,
            rgba(196,181,253,0.75) 50%,
            rgba(139,92,246,0.45) 75%,
            transparent 100%);
          pointer-events: none;
        }
        .bg-how::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(139,92,246,0.3) 30%,
            rgba(167,139,250,0.5) 50%,
            rgba(139,92,246,0.3) 70%,
            transparent 100%);
          pointer-events: none;
        }

        /* ── CTA ── */
        .bg-cta {
          background:
            radial-gradient(ellipse 65% 80% at 18%  55%, rgba(91,33,182,0.55)   0%, transparent 58%),
            radial-gradient(ellipse 55% 55% at 88%  25%, rgba(167,139,250,0.28) 0%, transparent 52%),
            radial-gradient(ellipse 45% 40% at 50% 115%, rgba(76,29,149,0.45)   0%, transparent 50%),
            linear-gradient(135deg, #6d28d9 0%, #7c3aed 45%, #6d28d9 75%, #5b21b6 100%);
        }
        .bg-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px);
          background-size: 26px 26px;
          pointer-events: none;
        }

        /* ── Footer ── */
        .bg-footer {
          background: linear-gradient(180deg, #ffffff 0%, #faf8ff 100%);
        }

        /* ── Feature card hover ── */
        .feature-card {
          background: #f8fafc;
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .feature-card:hover {
          background: linear-gradient(140deg, #faf5ff 0%, #f3f0ff 100%);
          border-color: rgba(167,139,250,0.38) !important;
          box-shadow: 0 20px 40px rgba(139,92,246,0.1), 0 4px 12px rgba(139,92,246,0.07) !important;
          transform: translateY(-2px);
        }
      `}</style>

      {/* Sticky Glassmorphism Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-md border-b border-slate-200/50 transition-all">
        <div className="flex items-center justify-between p-5 max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-extrabold text-violet-700 tracking-tight flex items-center gap-2">
            <span className="text-3xl"></span> VelocileadCRM
          </Link>
          <div className="space-x-4 flex items-center">
            <Link
              to="/login"
              className="text-slate-600 hover:text-violet-700 font-semibold px-4 py-2 transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="bg-violet-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-violet-700 shadow-md shadow-violet-500/30 hover:shadow-lg hover:shadow-violet-500/40 transition-all active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-hero relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 text-center max-w-full overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-28 left-[6%]   w-80  h-80  bg-violet-300/18 rounded-full blur-[90px]  pointer-events-none" />
        <div className="absolute top-36 right-[5%] w-96  h-96  bg-purple-300/14 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[520px] h-44 bg-violet-400/10 rounded-full blur-[70px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6"
            >
              Supercharge Your Sales <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-500">
                Pipeline with AI.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Stop guessing and start closing.  analyzes your leads, visualizes your pipeline, and provides Google Gemini-powered insights to help you win more deals faster.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Link
                to="/register"
                className="w-full sm:w-auto bg-violet-600 text-white text-lg px-8 py-4 rounded-full font-bold hover:bg-violet-700 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-1 transition-all"
              >
                Start for Free
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 text-lg px-8 py-4 rounded-full font-bold hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all"
              >
                View Dashboard
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-features py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Everything you need to scale</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Enterprise-grade features built for modern sales teams, completely reimagined with Artificial Intelligence.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Feature 1 */}
            <motion.div variants={fadeInUp} className="feature-card p-8 rounded-3xl border border-slate-100 group">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">🤖</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI-Powered Insights</h3>
              <p className="text-slate-600 leading-relaxed">
                Integrated with Google Gemini to automatically analyze prospect data, predict conversion rates, and suggest next steps.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={fadeInUp} className="feature-card p-8 rounded-3xl border border-slate-100 group">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">📊</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Visual Sales Pipeline</h3>
              <p className="text-slate-600 leading-relaxed">
                Track leads through every stage of the funnel with an intuitive, drag-and-drop Kanban style interface.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={fadeInUp} className="feature-card p-8 rounded-3xl border border-slate-100 group">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">🛡️</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Enterprise Security</h3>
              <p className="text-slate-600 leading-relaxed">
                Bank-level protection including strict rate limiting, NoSQL injection defense, and XSS sanitization.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-how relative py-24 text-white overflow-hidden">
        {/* centre soft glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(139,92,246,0.1)_0%,transparent_100%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-white tracking-tight">How Velocilead Works</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto relative"
          >
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent -z-0"></div>

            <motion.div variants={fadeInUp} className="relative z-10">
              <div className="w-20 h-20 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg shadow-violet-900/50 text-violet-400">1</div>
              <h3 className="text-2xl font-semibold mb-3 text-white">Capture Leads</h3>
              <p className="text-slate-400 text-lg leading-relaxed">Log prospects and vital company information directly into your dashboard.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative z-10">
              <div className="w-20 h-20 bg-violet-600 border border-violet-500 rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-[0_0_30px_rgba(124,58,237,0.5)] text-white">2</div>
              <h3 className="text-2xl font-semibold mb-3 text-white">Analyze with AI</h3>
              <p className="text-slate-400 text-lg leading-relaxed">Gemini analyzes the data for instant strategic insights and success probabilities.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative z-10">
              <div className="w-20 h-20 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg shadow-violet-900/50 text-violet-400">3</div>
              <h3 className="text-2xl font-semibold mb-3 text-white">Close the Deal</h3>
              <p className="text-slate-400 text-lg leading-relaxed">Move leads seamlessly through the pipeline and generate real revenue.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cta relative py-20 overflow-hidden">
        {/* Decorative concentric rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full border border-white/[0.055] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-white/[0.055] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[210px] h-[210px] rounded-full border border-white/[0.07]  pointer-events-none" />
        {/* Flare top-right */}
        <div className="absolute -top-10 right-[10%] w-64 h-64 bg-violet-300/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Ready to transform your sales process?</h2>
          <Link
            to="/register"
            className="inline-block bg-white text-violet-700 text-xl px-10 py-4 rounded-full font-bold hover:bg-slate-50 hover:scale-105 shadow-xl transition-all"
          >
            Create Your Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-footer border-t border-slate-200 py-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-xl"></span>
          <span className="text-xl font-bold text-slate-900">VelocileadCRM</span>
        </div>
        <p className="text-slate-500">© {new Date().getFullYear()} VelocileadCRM. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default Landing;