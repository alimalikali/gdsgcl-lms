"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Phone, CreditCard, BookOpen, CheckCircle } from "lucide-react"

interface UserFormData {
  // Basic Information
  name: string
  email: string
  role: "student" | "teacher" | "admin"
  phone: string
  cnic: string
  dateOfBirth: string

  // Additional Information
  fatherName?: string
  address: string

  // Academic Information (for students)
  rollNumber?: string
  program?: string
  semester?: number

  // Professional Information (for teachers)
  employeeId?: string
  designation?: string
  department?: string
  qualification?: string
  specialization?: string
  experience?: number
}

export function SingleUserForm() {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    role: "student",
    phone: "",
    cnic: "",
    dateOfBirth: "",
    address: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Basic validation
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required"
    } else if (!/^\+92-\d{3}-\d{7}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be in format +92-XXX-XXXXXXX"
    }

    if (!formData.cnic.trim()) {
      newErrors.cnic = "CNIC is required"
    } else if (!/^\d{5}-\d{7}-\d{1}$/.test(formData.cnic)) {
      newErrors.cnic = "CNIC must be in format XXXXX-XXXXXXX-X"
    }

    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"

    // Role-specific validation
    if (formData.role === "student") {
      if (!formData.program) newErrors.program = "Program is required for students"
      if (!formData.fatherName?.trim()) newErrors.fatherName = "Father's name is required for students"
    }

    if (formData.role === "teacher") {
      if (!formData.designation?.trim()) newErrors.designation = "Designation is required for teachers"
      if (!formData.department?.trim()) newErrors.department = "Department is required for teachers"
      if (!formData.qualification?.trim()) newErrors.qualification = "Qualification is required for teachers"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate roll number or employee ID
      if (formData.role === "student") {
        const year = new Date().getFullYear()
        const program = formData.program?.toUpperCase().replace(/\s+/g, "-")
        formData.rollNumber = `${program}-${year}-${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`
      } else if (formData.role === "teacher") {
        const dept = formData.department?.toUpperCase().substring(0, 3)
        formData.employeeId = `GDSGC-${dept}-${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`
      }

      setSubmitSuccess(true)

      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          role: "student",
          phone: "",
          cnic: "",
          dateOfBirth: "",
          address: "",
        })
        setSubmitSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Error creating user:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof UserFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const programs = [
    "BS Computer Science",
    "BS Mathematics",
    "ADP Computer Science",
    "BS Physics",
    "BS Chemistry",
    "BS English",
  ]

  const departments = ["Computer Science", "Mathematics", "Physics", "Chemistry", "English", "Urdu"]

  const designations = ["Professor", "Associate Professor", "Assistant Professor", "Lecturer", "Senior Lecturer"]

  return (
    <div className="max-w-4xl mx-auto">
      {submitSuccess && (
        <Alert className="mb-6 border-green-200 bg-green-50 dark:bg-green-900/20">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            User created successfully!
            {formData.rollNumber && ` Roll Number: ${formData.rollNumber}`}
            {formData.employeeId && ` Employee ID: ${formData.employeeId}`}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="contact">Contact & Address</TabsTrigger>
            <TabsTrigger value="academic">Academic/Professional</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter full name"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="user@dyalsingh.edu.pk"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="role">Role *</Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className={errors.dateOfBirth ? "border-red-500" : ""}
                    />
                    {errors.dateOfBirth && <p className="text-sm text-red-600 mt-1">{errors.dateOfBirth}</p>}
                  </div>

                  <div>
                    <Label htmlFor="cnic">CNIC *</Label>
                    <Input
                      id="cnic"
                      value={formData.cnic}
                      onChange={(e) => handleInputChange("cnic", e.target.value)}
                      placeholder="XXXXX-XXXXXXX-X"
                      className={errors.cnic ? "border-red-500" : ""}
                    />
                    {errors.cnic && <p className="text-sm text-red-600 mt-1">{errors.cnic}</p>}
                  </div>

                  {formData.role === "student" && (
                    <div>
                      <Label htmlFor="fatherName">Father's Name *</Label>
                      <Input
                        id="fatherName"
                        value={formData.fatherName || ""}
                        onChange={(e) => handleInputChange("fatherName", e.target.value)}
                        placeholder="Enter father's name"
                        className={errors.fatherName ? "border-red-500" : ""}
                      />
                      {errors.fatherName && <p className="text-sm text-red-600 mt-1">{errors.fatherName}</p>}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+92-XXX-XXXXXXX"
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Enter complete address"
                    rows={3}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address}</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            {formData.role === "student" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>Academic Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="program">Program *</Label>
                      <Select
                        value={formData.program || ""}
                        onValueChange={(value) => handleInputChange("program", value)}
                      >
                        <SelectTrigger className={errors.program ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select program" />
                        </SelectTrigger>
                        <SelectContent>
                          {programs.map((program) => (
                            <SelectItem key={program} value={program}>
                              {program}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.program && <p className="text-sm text-red-600 mt-1">{errors.program}</p>}
                    </div>

                    <div>
                      <Label htmlFor="semester">Current Semester</Label>
                      <Select
                        value={formData.semester?.toString() || ""}
                        onValueChange={(value) => handleInputChange("semester", Number.parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                            <SelectItem key={sem} value={sem.toString()}>
                              Semester {sem}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {formData.role === "teacher" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Professional Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="designation">Designation *</Label>
                      <Select
                        value={formData.designation || ""}
                        onValueChange={(value) => handleInputChange("designation", value)}
                      >
                        <SelectTrigger className={errors.designation ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select designation" />
                        </SelectTrigger>
                        <SelectContent>
                          {designations.map((designation) => (
                            <SelectItem key={designation} value={designation}>
                              {designation}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.designation && <p className="text-sm text-red-600 mt-1">{errors.designation}</p>}
                    </div>

                    <div>
                      <Label htmlFor="department">Department *</Label>
                      <Select
                        value={formData.department || ""}
                        onValueChange={(value) => handleInputChange("department", value)}
                      >
                        <SelectTrigger className={errors.department ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.department && <p className="text-sm text-red-600 mt-1">{errors.department}</p>}
                    </div>

                    <div>
                      <Label htmlFor="qualification">Qualification *</Label>
                      <Input
                        id="qualification"
                        value={formData.qualification || ""}
                        onChange={(e) => handleInputChange("qualification", e.target.value)}
                        placeholder="e.g., PhD Computer Science"
                        className={errors.qualification ? "border-red-500" : ""}
                      />
                      {errors.qualification && <p className="text-sm text-red-600 mt-1">{errors.qualification}</p>}
                    </div>

                    <div>
                      <Label htmlFor="experience">Experience (Years)</Label>
                      <Input
                        id="experience"
                        type="number"
                        value={formData.experience || ""}
                        onChange={(e) => handleInputChange("experience", Number.parseInt(e.target.value) || 0)}
                        placeholder="Years of experience"
                        min="0"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input
                        id="specialization"
                        value={formData.specialization || ""}
                        onChange={(e) => handleInputChange("specialization", e.target.value)}
                        placeholder="e.g., Data Structures, Algorithms, Database Systems"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFormData({
                name: "",
                email: "",
                role: "student",
                phone: "",
                cnic: "",
                dateOfBirth: "",
                address: "",
              })
              setErrors({})
            }}
          >
            Reset Form
          </Button>
          <Button type="submit" disabled={isSubmitting} className="lms-button-primary">
            {isSubmitting ? "Creating User..." : "Create User"}
          </Button>
        </div>
      </form>
    </div>
  )
}
