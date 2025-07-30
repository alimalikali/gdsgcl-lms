"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "How do I enroll in courses through the LMS?",
      answer:
        "Course enrollment is handled by the academic office. Once you're registered for a semester, you'll automatically have access to all your enrolled courses in the LMS. You'll receive login credentials via email or SMS.",
    },
    {
      question: "Can I access the platform on my mobile phone?",
      answer:
        "Yes! Our LMS is fully responsive and works perfectly on smartphones and tablets. You can access all features including lectures, assignments, discussions, and grades from any device with an internet connection.",
    },
    {
      question: "How do I submit assignments and projects?",
      answer:
        "Navigate to your course page, click on the specific assignment, and use the submission portal. You can upload documents, images, or other required files. The system will automatically timestamp your submission and send confirmation.",
    },
    {
      question: "What if I miss a live lecture or class?",
      answer:
        "Don't worry! All live sessions are automatically recorded and available in your course materials within 24 hours. You can watch them anytime and even download them for offline viewing.",
    },
    {
      question: "How can I communicate with my teachers and classmates?",
      answer:
        "The platform includes multiple communication tools: direct messaging with instructors, course discussion forums, study group chats, and announcement boards. You'll also receive email notifications for important updates.",
    },
    {
      question: "Is my academic data secure and private?",
      answer:
        "Absolutely. We use bank-level encryption and follow international data protection standards. Your grades, personal information, and academic records are completely secure and only accessible to authorized personnel.",
    },
    {
      question: "How do I check my grades and academic progress?",
      answer:
        "Your grades are available in real-time in the 'Grades' section. You can view individual assignment scores, semester progress, GPA calculations, and generate official transcripts when needed.",
    },
    {
      question: "What technical requirements do I need?",
      answer:
        "You just need a device with internet connection and a modern web browser (Chrome, Firefox, Safari, or Edge). For the best experience, we recommend a stable internet connection of at least 2 Mbps.",
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Frequently Asked
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {" "}
              Questions
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Find answers to common questions about using our Learning Management System
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/30 border border-white/50 dark:border-slate-700/50 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-slate-800 dark:text-white pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-6 text-slate-600 dark:text-slate-300 leading-relaxed">{faq.answer}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
