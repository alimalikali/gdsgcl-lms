"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, BookOpen, Users, Award, Clock } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-blue-900/10 dark:to-indigo-900/10"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-200/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-purple-200/40 dark:bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Award className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Government Dyal Singh Graduate College
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className="text-slate-800 dark:text-white">Transform Your</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Learning Journey
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-2xl">
                Experience the future of education with our comprehensive Learning Management System designed
                specifically for Pakistani higher education institutions.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Button
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl px-8 py-6 text-lg font-semibold shadow-xl shadow-blue-500/25 dark:shadow-blue-500/5 transition-all duration-300 hover:shadow-2xl hover:scale-105"
                asChild
              >
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group rounded-2xl px-8 py-6 text-lg font-semibold border-2 border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                asChild
              >
                <Link href="/demo">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex items-center space-x-8 pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white dark:border-slate-800 flex items-center justify-center text-white text-sm font-semibold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-semibold text-slate-800 dark:text-white">2,500+ Students</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Already learning</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-white">4.9/5</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Rating</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-white/50 dark:border-slate-700/50 overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Student Dashboard</h3>
                    <p className="text-blue-100">Welcome back, Ahmad!</p>
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 space-y-4">
                {/* Progress Card */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-4 border border-green-200/50 dark:border-green-700/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-800 dark:text-green-300">Semester Progress</span>
                    <span className="text-sm text-green-600 dark:text-green-400">75%</span>
                  </div>
                  <div className="w-full bg-green-200 dark:bg-green-700/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>

                {/* Course Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-3 border border-blue-200/50 dark:border-blue-700/30">
                    <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                    <div className="text-sm font-medium text-blue-800 dark:text-blue-300">Mathematics</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">Next: Calculus</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-3 border border-purple-200/50 dark:border-purple-700/30">
                    <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
                    <div className="text-sm font-medium text-purple-800 dark:text-purple-300">Physics</div>
                    <div className="text-xs text-purple-600 dark:text-purple-400">Due: Assignment</div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Recent Activity</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-2 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-slate-600 dark:text-slate-300">Completed: Chapter 5 Quiz</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-slate-600 dark:text-slate-300">New: Assignment uploaded</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-500/70 dark:to-orange-600/70 rounded-2xl rotate-12 opacity-80 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 dark:from-pink-500/70 dark:to-purple-600/70 rounded-2xl -rotate-12 opacity-80 animate-pulse delay-1000"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
