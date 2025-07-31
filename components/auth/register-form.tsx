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
import { GraduationCap, Mail, Lock, User, AlertCircle, Phone, BadgeIcon as IdCard } from "lucide-react"
import Link from "next/link"

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [activeTab, setActiveTab] = useState("student")

  const [studentForm, setStudentForm] = useState({
    name: "",
    email: "",
    phone: "",
    studentId: "",
    password: "",
    confirmPassword: "",
  })

  const [teacherForm, setTeacherForm] = useState({
    name: "",
    email: "",
    phone: "",
    employeeId: "",
    department: "",
    password: "",
    confirmPassword: "",
  })

  const handleStudentRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    if (studentForm.password !== studentForm.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess("Registration successful! Please check your email for verification.")

      // Auto redirect after success
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTeacherRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    if (teacherForm.password !== teacherForm.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess("Registration submitted! Your account will be activated after admin approval.")

      // Auto redirect after success
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err) {
      setError("Registration failed. Please try again.")
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
              Join Dyal Singh LMS
            </CardTitle>
            <p className="text-sm" style={{ color: "rgb(var(--text-secondary))" }}>
              Create your account to get started
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

            {success && (
              <Alert className="mb-4 border-green-200" style={{ backgroundColor: "rgb(34, 197, 94, 0.1)" }}>
                <AlertCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-600">{success}</AlertDescription>
              </Alert>
            )}

            <TabsContent value="student">
              <form onSubmit={handleStudentRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-name">Full Name</Label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                      style={{ color: "rgb(var(--text-secondary))" }}
                    />
                    <Input
                      id="student-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={studentForm.name}
                      onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

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
                      placeholder="your.name@student.dyalsingh.edu.in"
                      value={studentForm.email}
                      onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-phone">Phone</Label>
                    <div className="relative">
                      <Phone
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                        style={{ color: "rgb(var(--text-secondary))" }}
                      />
                      <Input
                        id="student-phone"
                        type="tel"
                        placeholder="Phone number"
                        value={studentForm.phone}
                        onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="student-id">Student ID</Label>
                    <div className="relative">
                      <IdCard
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                        style={{ color: "rgb(var(--text-secondary))" }}
                      />
                      <Input
                        id="student-id"
                        type="text"
                        placeholder="Student ID"
                        value={studentForm.studentId}
                        onChange={(e) => setStudentForm({ ...studentForm, studentId: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
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
                      placeholder="Create a password"
                      value={studentForm.password}
                      onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="student-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                      style={{ color: "rgb(var(--text-secondary))" }}
                    />
                    <Input
                      id="student-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={studentForm.confirmPassword}
                      onChange={(e) => setStudentForm({ ...studentForm, confirmPassword: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full lms-button-primary rounded-xl py-3" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    "Register as Student"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="teacher">
              <form onSubmit={handleTeacherRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teacher-name">Full Name</Label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                      style={{ color: "rgb(var(--text-secondary))" }}
                    />
                    <Input
                      id="teacher-name"
                      type="text"
                      placeholder="Dr./Prof. Your Name"
                      value={teacherForm.name}
                      onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

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
                      placeholder="your.name@dyalsingh.edu.in"
                      value={teacherForm.email}
                      onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher-phone">Phone</Label>
                    <div className="relative">
                      <Phone
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                        style={{ color: "rgb(var(--text-secondary))" }}
                      />
                      <Input
                        id="teacher-phone"
                        type="tel"
                        placeholder="Phone number"
                        value={teacherForm.phone}
                        onChange={(e) => setTeacherForm({ ...teacherForm, phone: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employee-id">Employee ID</Label>
                    <div className="relative">
                      <IdCard
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                        style={{ color: "rgb(var(--text-secondary))" }}
                      />
                      <Input
                        id="employee-id"
                        type="text"
                        placeholder="Employee ID"
                        value={teacherForm.employeeId}
                        onChange={(e) => setTeacherForm({ ...teacherForm, employeeId: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    type="text"
                    placeholder="e.g., Mathematics, Physics, Computer Science"
                    value={teacherForm.department}
                    onChange={(e) => setTeacherForm({ ...teacherForm, department: e.target.value })}
                    required
                  />
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
                      placeholder="Create a password"
                      value={teacherForm.password}
                      onChange={(e) => setTeacherForm({ ...teacherForm, password: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teacher-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                      style={{ color: "rgb(var(--text-secondary))" }}
                    />
                    <Input
                      id="teacher-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={teacherForm.confirmPassword}
                      onChange={(e) => setTeacherForm({ ...teacherForm, confirmPassword: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full lms-button-primary rounded-xl py-3" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting Application...
                    </>
                  ) : (
                    "Apply as Teacher"
                  )}
                </Button>

                <div className="text-xs text-center" style={{ color: "rgb(var(--text-secondary))" }}>
                  Teacher accounts require admin approval
                </div>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm" style={{ color: "rgb(var(--text-secondary))" }}>
            Already have an account?{" "}
            <Link href="/login" className="font-medium hover:underline" style={{ color: "rgb(var(--text-accent))" }}>
              Sign in here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
