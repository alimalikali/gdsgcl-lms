"use client"

import { motion } from "framer-motion"
import { Users, BookOpen, GraduationCap, Award } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      number: "2,500+",
      label: "Active Students",
      description: "Enrolled across all programs",
      gradient: "from-blue-500 to-cyan-500",
      darkGradient: "dark:from-blue-600 dark:to-cyan-600",
    },
    {
      icon: BookOpen,
      number: "150+",
      label: "Courses Available",
      description: "Across BS & ADP programs",
      gradient: "from-green-500 to-emerald-500",
      darkGradient: "dark:from-green-600 dark:to-emerald-600",
    },
    {
      icon: GraduationCap,
      number: "85+",
      label: "Expert Faculty",
      description: "Qualified instructors",
      gradient: "from-purple-500 to-pink-500",
      darkGradient: "dark:from-purple-600 dark:to-pink-600",
    },
    {
      icon: Award,
      number: "95%",
      label: "Success Rate",
      description: "Student completion rate",
      gradient: "from-orange-500 to-red-500",
      darkGradient: "dark:from-orange-600 dark:to-red-600",
    },
  ]

  return (
    <section className="py-20 relative bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Trusted by Thousands of
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {" "}
              Students
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Join the largest community of learners at Government Dyal Singh Graduate College
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/30 border border-white/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} ${stat.darkGradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </div>

                {/* Number */}
                <div className="text-4xl font-bold text-slate-800 dark:text-white mb-2">{stat.number}</div>

                {/* Label */}
                <div className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">{stat.label}</div>

                {/* Description */}
                <div className="text-sm text-slate-500 dark:text-slate-400">{stat.description}</div>

                {/* Hover Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} ${stat.darkGradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
