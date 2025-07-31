"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GraduationCap, Mail, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("student")

  const [studentForm, setStudentForm] = useState({
    email: "",
    password: "",
  })

  const [teacherForm, setTeacherForm] = useState({
    email: "",
    password: "",
  })

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock validation
      if (studentForm.email === "student@dyalsingh.edu.in" && studentForm.password === "password") {
        // Store user session (in real app, use proper auth)
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: 1,
            name: "Priya Sharma",
            email: studentForm.email,
            role: "student",
          }),
        )
        router.push("/student/dashboard")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTeacherLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock validation
      if (teacherForm.email === "teacher@dyalsingh.edu.in" && teacherForm.password === "password") {
        // Store user session (in real app, use proper auth)
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: 2,
            name: "Dr. Rajesh Kumar",
            email: teacherForm.email,
            role: "teacher",
          }),
        )
        router.push("/teacher/dashboard")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <Card className="lms-card">
        <CardHeader className="text-center space-y-4">
          <div
            className="flex items-center justify-center w-16 h-16 rounded-2xl mx-auto"
            style={{ backgroundColor: "rgb(var(--button-bg))", color: "rgb(var(--button-text))" }}
          >
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold" style={{ color: "rgb(var(--text-primary))" }}>
              Welcome Back
            </CardTitle>
            <p className="text-sm" style={{ color: "rgb(var(--text-secondary))" }}>
              Sign in to your Dyal Singh LMS account
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="teacher">Teacher</TabsTrigger>
            </TabsList>

            {error && (
              <Alert className="mb-4 border-red-200" style={{ backgroundColor: "rgb(239, 68, 68, 0.1)" }}>
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-600">{error}</AlertDescription>
              </Alert>
            )}

            <TabsContent value="student">
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                      style={{ color: "rgb(var(--text-secondary))" }}
                    />
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="student@dyalsingh.edu.in"
                      value={studentForm.email}
                      onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                      style={{ color: "rgb(var(--text-secondary))" }}
                    />
                    <Input
                      id="student-password"
                      type="password"
                      placeholder="Enter your password"
                      value={studentForm.password}
                      onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <Link
                    href="/forgot-password"
                    className="hover:underline"
                    style={{ color: "rgb(var(--text-accent))" }}
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full lms-button-primary rounded-xl py-3" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in as Student"
                  )}
                </Button>

                <div className="text-center text-sm" style={{ color: "rgb(var(--text-secondary))" }}>
                  Demo: student@dyalsingh.edu.in / password
                </div>
              </form>
            </TabsContent>

            <TabsContent value="teacher">
              <form onSubmit={handleTeacherLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teacher-email">Email</Label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                      style={{ color: "rgb(var(--text-secondary))" }}
                    />
                    <Input
                      id="teacher-email"
                      type="email"
                      placeholder="teacher@dyalsingh.edu.in"
                      value={teacherForm.email}
                      onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teacher-password">Password</Label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                      style={{ color: "rgb(var(--text-secondary))" }}
                    />
                    <Input
                      id="teacher-password"
                      type="password"
                      placeholder="Enter your password"
                      value={teacherForm.password}
                      onChange={(e) => setTeacherForm({ ...teacherForm, password: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <Link
                    href="/forgot-password"
                    className="hover:underline"
                    style={{ color: "rgb(var(--text-accent))" }}
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full lms-button-primary rounded-xl py-3" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in as Teacher"
                  )}
                </Button>

                <div className="text-center text-sm" style={{ color: "rgb(var(--text-secondary))" }}>
                  Demo: teacher@dyalsingh.edu.in / password
                </div>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm" style={{ color: "rgb(var(--text-secondary))" }}>
            Don't have an account?{" "}
            <Link href="/register" className="font-medium hover:underline" style={{ color: "rgb(var(--text-accent))" }}>
              Register here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
