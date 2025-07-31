"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, FileText, CheckCircle, XCircle, AlertTriangle, Users } from "lucide-react"

interface ParsedUser {
  name: string
  email: string
  role: "student" | "teacher" | "admin"
  phone?: string
  cnic?: string
  fatherName?: string
  address?: string
  dateOfBirth?: string
  program?: string
  status: "valid" | "invalid" | "duplicate"
  errors: string[]
}

interface UploadStats {
  total: number
  valid: number
  invalid: number
  duplicates: number
}

export function BulkUserUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [parsedUsers, setParsedUsers] = useState<ParsedUser[]>([])
  const [uploadStats, setUploadStats] = useState<UploadStats>({ total: 0, valid: 0, invalid: 0, duplicates: 0 })
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateCNIC = (cnic: string): boolean => {
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/
    return cnicRegex.test(cnic)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+92-\d{3}-\d{7}$/
    return phoneRegex.test(phone)
  }

  const parseCSV = useCallback((csvText: string): ParsedUser[] => {
    const lines = csvText.split("\n").filter((line) => line.trim())
    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase())

    const requiredFields = ["name", "email", "role"]
    const missingFields = requiredFields.filter((field) => !headers.includes(field))

    if (missingFields.length > 0) {
      throw new Error(`Missing required columns: ${missingFields.join(", ")}`)
    }

    const users: ParsedUser[] = []
    const existingEmails = new Set(["existing@example.com"]) // Mock existing emails

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""))
      const user: ParsedUser = {
        name: "",
        email: "",
        role: "student",
        status: "valid",
        errors: [],
      }

      headers.forEach((header, index) => {
        const value = values[index] || ""
        switch (header) {
          case "name":
            user.name = value
            break
          case "email":
            user.email = value.toLowerCase()
            break
          case "role":
            user.role = value.toLowerCase() as "student" | "teacher" | "admin"
            break
          case "phone":
            user.phone = value
            break
          case "cnic":
            user.cnic = value
            break
          case "fathername":
            user.fatherName = value
            break
          case "address":
            user.address = value
            break
          case "dateofbirth":
            user.dateOfBirth = value
            break
          case "program":
            user.program = value
            break
        }
      })

      // Validation
      if (!user.name) user.errors.push("Name is required")
      if (!user.email) {
        user.errors.push("Email is required")
      } else if (!validateEmail(user.email)) {
        user.errors.push("Invalid email format")
      } else if (existingEmails.has(user.email)) {
        user.status = "duplicate"
        user.errors.push("Email already exists")
      }

      if (!["student", "teacher", "admin"].includes(user.role)) {
        user.errors.push("Role must be student, teacher, or admin")
      }

      if (user.phone && !validatePhone(user.phone)) {
        user.errors.push("Phone must be in format +92-XXX-XXXXXXX")
      }

      if (user.cnic && !validateCNIC(user.cnic)) {
        user.errors.push("CNIC must be in format XXXXX-XXXXXXX-X")
      }

      if (user.errors.length > 0) {
        user.status = "invalid"
      }

      users.push(user)
    }

    return users
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile)
      setParsedUsers([])
      setUploadComplete(false)
    }
  }

  const processFile = async () => {
    if (!file) return

    setIsProcessing(true)
    setUploadProgress(0)

    try {
      const text = await file.text()
      const users = parseCSV(text)

      // Simulate processing delay
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      setParsedUsers(users)

      const stats = {
        total: users.length,
        valid: users.filter((u) => u.status === "valid").length,
        invalid: users.filter((u) => u.status === "invalid").length,
        duplicates: users.filter((u) => u.status === "duplicate").length,
      }
      setUploadStats(stats)
    } catch (error) {
      console.error("Error processing file:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const uploadUsers = async () => {
    const validUsers = parsedUsers.filter((u) => u.status === "valid")

    setIsProcessing(true)
    setUploadProgress(0)

    // Simulate upload process
    for (let i = 0; i < validUsers.length; i++) {
      setUploadProgress((i / validUsers.length) * 100)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    setUploadProgress(100)
    setUploadComplete(true)
    setIsProcessing(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "invalid":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "duplicate":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "invalid":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "duplicate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="csv-file">Select CSV File</Label>
          <Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} className="mt-1" />
        </div>

        {file && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">{file.name}</span>
              <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
            </div>
            <Button onClick={processFile} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Process File"}
            </Button>
          </div>
        )}

        {isProcessing && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Processing...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </div>
        )}
      </div>

      {/* Upload Stats */}
      {parsedUsers.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{uploadStats.total}</p>
                  <p className="text-xs text-gray-600">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-600">{uploadStats.valid}</p>
                  <p className="text-xs text-gray-600">Valid</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <XCircle className="w-4 h-4 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-red-600">{uploadStats.invalid}</p>
                  <p className="text-xs text-gray-600">Invalid</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold text-yellow-600">{uploadStats.duplicates}</p>
                  <p className="text-xs text-gray-600">Duplicates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Upload Actions */}
      {parsedUsers.length > 0 && uploadStats.valid > 0 && !uploadComplete && (
        <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div>
            <p className="font-medium">Ready to upload {uploadStats.valid} valid users</p>
            <p className="text-sm text-gray-600">Invalid and duplicate entries will be skipped</p>
          </div>
          <Button onClick={uploadUsers} disabled={isProcessing} className="lms-button-primary">
            <Upload className="w-4 h-4 mr-2" />
            Upload Users
          </Button>
        </div>
      )}

      {/* Success Message */}
      {uploadComplete && (
        <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            Successfully uploaded {uploadStats.valid} users to the system!
          </AlertDescription>
        </Alert>
      )}

      {/* Preview Table */}
      {parsedUsers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Preview & Validation Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Errors</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parsedUsers.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(user.status)}
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>{user.phone || "-"}</TableCell>
                      <TableCell>
                        {user.errors.length > 0 ? (
                          <div className="space-y-1">
                            {user.errors.map((error, i) => (
                              <p key={i} className="text-xs text-red-600">
                                {error}
                              </p>
                            ))}
                          </div>
                        ) : (
                          <span className="text-green-600 text-xs">No errors</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
