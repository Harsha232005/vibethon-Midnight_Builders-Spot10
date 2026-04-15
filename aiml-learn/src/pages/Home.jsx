import { useState } from "react";
import {
  BookOpen,
  Code2,
  Gamepad2,
  ClipboardList,
  Globe,
  BarChart3,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Brain,
  Zap,
} from "lucide-react";

const NAV_LINKS = ["Home", "Learn", "Quiz", "Dashboard"];

const FEATURES = [
  {
    icon: BookOpen,
    title: "Interactive Learning Modules",
    desc: "Step-by-step lessons with embedded visuals, examples, and inline exercises that adapt to your pace.",
    color: "from-blue-500 to-indigo-500",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    icon: Code2,
    title: "Coding Playground",
    desc: "Write, run, and debug Python and ML code directly in the browser with instant feedback.",
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-50",
    text: "text-violet-600",
  },
  {
    icon: Gamepad2,
    title: "AI Mini Games",
    desc: "Reinforce concepts through fun, bite-sized games that make abstract AI ideas click.",
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-50",
    text: "text-pink-600",
  },
  {
    icon: ClipboardList,
    title: "Quizzes & Assessments",
    desc: "Test your knowledge with adaptive quizzes and get detailed explanations for every answer.",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
  {
    icon: Globe,
    title: "Real-world Simulations",
    desc: "Apply your skills to real datasets and scenarios used in industry AI/ML pipelines.",
    color: "from-teal-500 to-emerald-500",
    bg: "bg-teal-50",
    text: "text-teal-600",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    desc: "Visual dashboards show your streaks, completed topics, quiz scores, and skill growth over time.",
    color: "from-cyan-500 to-blue-500",
    bg: "bg-cyan-50",
    text: "text-cyan-600",
  },
];

const STATS = [
  { value: "50+", label: "Learning Modules" },
  { value: "200+", label: "Practice Problems" },
  { value: "10K+", label: "Active Learners" },
  { value: "95%", label: "Completion Rate" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans antialiased">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow">
                <Brain size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Learn
              </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold shadow hover:shadow-md hover:scale-105 transition-all duration-200">
                Get Started
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3 shadow-lg">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 py-1 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <button className="mt-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold shadow">
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        {/* Decorative blobs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-200 rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-200 rounded-full opacity-30 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-200 shadow-sm text-sm font-medium text-blue-600 mb-8">
            <Sparkles size={14} className="text-yellow-500" />
            Powered by Interactive AI Tools
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight max-w-4xl mx-auto">
            Learn{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI & Machine Learning
            </span>{" "}
            the Interactive Way
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Understand concepts, practice hands-on, and explore real-world AI
            applications — all in one beautifully crafted platform.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
              Start Learning
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </button>
            <button className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold text-base shadow hover:shadow-md hover:border-blue-300 hover:text-blue-600 hover:scale-105 transition-all duration-200">
              <Zap size={18} className="text-yellow-500" />
              Try Quiz
            </button>
          </div>

          {/* Stats Row */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">
              What's inside
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Everything you need to master AI
            </h2>
            <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
              From theory to hands-on practice, our platform covers every angle
              of modern AI and ML learning.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color, bg, text }) => (
              <div
                key={title}
                className="group relative bg-white rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient top accent */}
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bg} mb-5`}
                >
                  <Icon size={22} className={text} />
                </div>

                <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>

                <div
                  className={`mt-5 inline-flex items-center gap-1 text-xs font-semibold ${text} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                >
                  Explore <ArrowRight size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Ready to start your AI journey?
          </h2>
          <p className="mt-4 text-blue-100 text-lg">
            Join thousands of learners already building tomorrow's skills today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3.5 rounded-xl bg-white text-blue-600 font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
              Create Free Account
            </button>
            <button className="px-8 py-3.5 rounded-xl border border-white/40 text-white font-semibold text-base hover:bg-white/10 transition-all duration-200">
              Browse Curriculum
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-950 text-gray-400 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Brain size={14} className="text-white" />
            </div>
            <span className="text-white font-bold text-sm">AI Learn</span>
          </div>
          <p className="text-sm text-center">
            Built for{" "}
            <span className="text-purple-400 font-semibold">VIBETHON</span> ·{" "}
            Team{" "}
            <span className="text-blue-400 font-semibold">
              {"<Your Team Name>"}
            </span>
          </p>
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} AI Learn. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}