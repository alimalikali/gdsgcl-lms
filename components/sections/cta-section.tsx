"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, BookOpen, Users } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800"></div>
    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fillOpacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <motion.div
          className="text-center space-y-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-5 h-5 text-white mr-3" />
            <span className="text-white font-medium tracking-wide">
              Transform Your Educational Journey Today
            </span>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              Ready to Begin Your
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                Learning Adventure
              </span>
              ?
            </h2>

            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto font-light leading-relaxed">
              Join thousands of students and educators at Government Dyal Singh Graduate College 
              who are already experiencing the future of education through our innovative platform.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="group relative overflow-hidden bg-white text-blue-700 hover:bg-blue-50 rounded-2xl px-10 py-6 text-xl font-bold shadow-2xl shadow-black/20 transition-all duration-300 hover:shadow-2xl hover:scale-105 border-0"
              asChild
            >
              <Link href="/register">
                <span className="relative z-10 flex items-center">
                  Start Learning Now
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group rounded-2xl px-10 py-6 text-xl font-bold border-2 border-white/30 hover:border-white/50 hover:bg-white/10 bg-transparent text-white backdrop-blur-sm transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/demo">
                <span className="flex items-center">
                  Watch Demo
                </span>
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 pt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 text-white/90">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">2,500+</div>
                <div className="text-sm text-blue-200">Active Students</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-white/90">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">150+</div>
                <div className="text-sm text-blue-200">Courses Available</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-white/90">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-5 h-5 bg-yellow-400 rounded-full"></div>
                ))}
              </div>
              <div>
                <div className="text-2xl font-bold">4.9/5</div>
                <div className="text-sm text-blue-200">Student Rating</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
