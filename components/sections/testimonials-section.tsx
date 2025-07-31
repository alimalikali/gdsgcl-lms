"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ahmad Hassan",
      role: "BS Computer Science, 6th Semester",
      content:
        "This LMS has completely transformed how I study. The interactive content and real-time feedback from professors make learning so much more engaging. I can access all my courses from anywhere!",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
      gradient: "from-blue-500 to-cyan-500",
      darkGradient: "dark:from-blue-600 dark:to-cyan-600",
    },
    {
      name: "Fatima Khan",
      role: "ADP English Literature, 4th Semester",
      content:
        "As a working student, the flexibility this platform offers is incredible. I can catch up on lectures, submit assignments, and collaborate with classmates even during my busy schedule.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
      gradient: "from-purple-500 to-pink-500",
      darkGradient: "dark:from-purple-600 dark:to-pink-600",
    },
    {
      name: "Dr. Muhammad Tariq",
      role: "Professor, Mathematics Department",
      content:
        "The analytics and progress tracking features help me understand each student's learning journey. I can provide personalized feedback and identify students who need extra support.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
      gradient: "from-green-500 to-emerald-500",
      darkGradient: "dark:from-green-600 dark:to-emerald-600",
    },
    {
      name: "Ayesha Malik",
      role: "BS Psychology, 8th Semester",
      content:
        "The collaborative features are amazing! Study groups, peer discussions, and project collaboration have made my final semester so much more productive and enjoyable.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
      gradient: "from-orange-500 to-red-500",
      darkGradient: "dark:from-orange-600 dark:to-red-600",
    },
    {
      name: "Prof. Saira Ahmed",
      role: "Head of English Department",
      content:
        "This system has streamlined our entire academic process. From course management to student assessment, everything is now more efficient and transparent.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
      gradient: "from-indigo-500 to-purple-500",
      darkGradient: "dark:from-indigo-600 dark:to-purple-600",
    },
    {
      name: "Hassan Ali",
      role: "ADP Business Administration, 2nd Semester",
      content:
        "The mobile app is fantastic! I can study during my commute, participate in discussions, and never miss important announcements. It's like having the entire college in my pocket.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
      gradient: "from-teal-500 to-cyan-500",
      darkGradient: "dark:from-teal-600 dark:to-cyan-600",
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
            What Our
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {" "}
              Community Says
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Hear from students and faculty who are already experiencing the benefits of our platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/30 border border-white/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full relative overflow-hidden">
                {/* Quote Icon */}
                <div
                  className={`absolute top-6 right-6 w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonial.gradient} ${testimonial.darkGradient} flex items-center justify-center opacity-20`}
                >
                  <Quote className="w-6 h-6 text-white" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonial.gradient} ${testimonial.darkGradient} flex items-center justify-center`}
                  >
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-2xl object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} ${testimonial.darkGradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
