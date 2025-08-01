"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { DatabaseService } from "@/lib/database"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

export function SingleUserForm() {
  const [activeTab, setActiveTab] = useState("basic-info")
  const [userRole, setUserRole] = useState<"student" | "teacher" | "admin">("student")
  const [date, setDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student" as "student" | "teacher" | "admin",
    phone: "",
    cnic: "",
    fatherName: "",
    address: "",
    dateOfBirth: "",
    program: "BS-CS",
    department: "Computer Science",
    designation: "Lecturer",
    qualification: "",
    specialization: "",
    experience: 0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: "student" | "teacher" | "admin") => {
    setUserRole(value)
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    setDate(date)
    if (date) {
      setFormData((prev) => ({ ...prev, dateOfBirth: format(date, "yyyy-MM-dd") }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Convert form data to BulkUser format
      const userData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        phone: formData.phone,
        cnic: formData.cnic,
        fatherName: formData.fatherName,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth,
        program: formData.program,
        department: formData.department,
        designation: formData.designation,
        qualification: formData.qualification,
        specialization: formData.specialization,
        experience: Number(formData.experience),
      }

      // Call database service to create user
      await DatabaseService.bulkCreateUsers([userData])

      // Show success message
      setSubmitSuccess(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          role: "student",
          phone: "",
          cnic: "",
          fatherName: "",
          address: "",
          dateOfBirth: "",
          program: "BS-CS",
          department: "Computer Science",
          designation: "Lecturer",
          qualification: "",
          specialization: "",
          experience: 0,
        })
        setDate(undefined)
        setSubmitSuccess(false)
        setActiveTab("basic-info")
      }, 3000)
    } catch (error) {
      console.error("Error creating user:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateCNIC = (cnic: string) => {
    return cnic === "" || /^\d{5}-\d{7}-\d{1}$/.test(cnic)
  }

  const validatePhone = (phone: string) => {
    return phone === "" || /^\+\d{2}-\d{3}-\d{7}$/.test(phone)
  }

  const isFormValid = () => {
    const hasBasicInfo = formData.name && formData.email && validateEmail(formData.email)
    const hasValidContactInfo = validateCNIC(formData.cnic) && validatePhone(formData.phone)

    let hasRoleSpecificInfo = true
    if (userRole === "student") {
      hasRoleSpecificInfo = !!formData.program
    } else if (userRole === "teacher") {
      hasRoleSpecificInfo = !!formData.department
    }

    return hasBasicInfo && hasValidContactInfo && hasRoleSpecificInfo
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitSuccess && (
        <Alert className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>User has been successfully created.</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic-info">Basic Information</TabsTrigger>
          <TabsTrigger value="contact-info">Contact & Address</TabsTrigger>
          <TabsTrigger value="role-info">
            {userRole === "student" ? "Academic Info" : userRole === "teacher" ? "Professional Info" : "Admin Info"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info" className="space-y-4 pt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {formData.email && !validateEmail(formData.email) && (
                <p className="text-sm text-red-500 mt-1">Please enter a valid email address</p>
              )}
            </div>

            <div>
              <Label>
                User Role <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                defaultValue={userRole}
                onValueChange={(value) => handleRoleChange(value as "student" | "teacher" | "admin")}
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teacher" id="teacher" />
                  <Label htmlFor="teacher">Teacher</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin">Admin</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="button" onClick={() => setActiveTab("contact-info")}>
                Next
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact-info" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+92-300-1234567"
                value={formData.phone}
                onChange={handleInputChange}
              />
              {formData.phone && !validatePhone(formData.phone) && (
                <p className="text-sm text-red-500 mt-1">Format: +XX-XXX-XXXXXXX</p>
              )}
            </div>

            <div>
              <Label htmlFor="cnic">CNIC</Label>
              <Input
                id="cnic"
                name="cnic"
                placeholder="12345-1234567-1"
                value={formData.cnic}
                onChange={handleInputChange}
              />
              {formData.cnic && !validateCNIC(formData.cnic) && (
                <p className="text-sm text-red-500 mt-1">Format: XXXXX-XXXXXXX-X</p>
              )}
            </div>
          </div>

          {userRole === "student" && (
            <div>
              <Label htmlFor="fatherName">Father's Name</Label>
              <Input
                id="fatherName"
                name="fatherName"
                placeholder="Enter father's name"
                value={formData.fatherName}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              placeholder="Enter full address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="pt-4 flex justify-between">
            <Button type="button" variant="outline" onClick={() => setActiveTab("basic-info")}>
              Previous
            </Button>
            <Button type="button" onClick={() => setActiveTab("role-info")}>
              Next
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="role-info" className="space-y-4 pt-4">
          {userRole === "student" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="program">
                  Program <span className="text-red-500">*</span>
                </Label>
                <Select
                  name="program"
                  value={formData.program}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, program: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BS-CS">BS Computer Science</SelectItem>
                    <SelectItem value="BS-MATH">BS Mathematics</SelectItem>
                    <SelectItem value="ADP-CS">ADP Computer Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {userRole === "teacher" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="department">
                  Department <span className="text-red-500">*</span>
                </Label>
                <Select
                  name="department"
                  value={formData.department}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="designation">Designation</Label>
                <Select
                  name="designation"
                  value={formData.designation}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, designation: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Professor">Professor</SelectItem>
                    <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                    <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                    <SelectItem value="Lecturer">Lecturer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  name="qualification"
                  placeholder="PhD Computer Science (University of Punjab)"
                  value={formData.qualification}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="specialization">Specialization (comma separated)</Label>
                <Input
                  id="specialization"
                  name="specialization"
                  placeholder="Data Structures, Algorithms, Database Systems"
                  value={formData.specialization}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="experience">Experience (years)</Label>
                <Input
                  id="experience"
                  name="experience"
                  type="number"
                  min="0"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {userRole === "admin" && (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
              <p className="text-yellow-800 dark:text-yellow-300">
                Admin accounts have full system access. No additional information is required.
              </p>
            </div>
          )}

          <div className="pt-4 flex justify-between">
            <Button type="button" variant="outline" onClick={() => setActiveTab("contact-info")}>
              Previous
            </Button>
            <Button type="submit" disabled={!isFormValid() || isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create User"
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  )
}
