"use client"

import { motion } from "framer-motion"
import { BookOpen, Users, Calendar, FileText, BarChart3, MessageSquare, Shield, Smartphone } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Course Content",
      description:
        "Engage with multimedia lessons, videos, and interactive assignments designed for Pakistani curriculum standards.",
      gradient: "from-blue-500 to-cyan-500",
      darkGradient: "dark:from-blue-600 dark:to-cyan-600",
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description:
        "Connect with classmates, join study groups, and participate in discussions with students across all semesters.",
      gradient: "from-green-500 to-emerald-500",
      darkGradient: "dark:from-green-600 dark:to-emerald-600",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description:
        "Never miss a class or deadline with our intelligent calendar system that syncs with your academic schedule.",
      gradient: "from-purple-500 to-pink-500",
      darkGradient: "dark:from-purple-600 dark:to-pink-600",
    },
    {
      icon: FileText,
      title: "Assignment Management",
      description:
        "Submit assignments, track progress, and receive detailed feedback from your instructors all in one place.",
      gradient: "from-orange-500 to-red-500",
      darkGradient: "dark:from-orange-600 dark:to-red-600",
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description:
        "Monitor your academic performance with detailed analytics and insights to improve your learning outcomes.",
      gradient: "from-indigo-500 to-purple-500",
      darkGradient: "dark:from-indigo-600 dark:to-purple-600",
    },
    {
      icon: MessageSquare,
      title: "Real-time Communication",
      description:
        "Stay connected with teachers and peers through instant messaging, announcements, and discussion forums.",
      gradient: "from-teal-500 to-cyan-500",
      darkGradient: "dark:from-teal-600 dark:to-cyan-600",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your data is protected with enterprise-grade security measures ensuring complete privacy and confidentiality.",
      gradient: "from-rose-500 to-pink-500",
      darkGradient: "dark:from-rose-600 dark:to-pink-600",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description:
        "Access your courses anytime, anywhere with our responsive design that works perfectly on all devices.",
      gradient: "from-amber-500 to-orange-500",
      darkGradient: "dark:from-amber-600 dark:to-orange-600",
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Everything You Need for
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {" "}
              Academic Success
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and features you need to excel in your studies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/30 border border-white/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} ${feature.darkGradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">{feature.title}</h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{feature.description}</p>

                {/* Hover Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} ${feature.darkGradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
