"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Upload, AlertCircle, CheckCircle, XCircle, FileWarning } from "lucide-react"
import { type BulkUser, DatabaseService } from "@/lib/database"

export function BulkUserUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [parsedData, setParsedData] = useState<BulkUser[]>([])
  const [validationErrors, setValidationErrors] = useState<Record<number, string[]>>({})
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadResult, setUploadResult] = useState<{
    success: number
    failed: number
    errors: string[]
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      parseCSV(selectedFile)
    }
  }

  const parseCSV = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const lines = text.split("\n")
      const headers = lines[0].split(",").map((header) => header.trim())

      const data: BulkUser[] = []
      const errors: Record<number, string[]> = {}

      // Start from index 1 to skip headers
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue // Skip empty lines

        const values = lines[i].split(",").map((value) => value.trim())
        const rowErrors: string[] = []
        const user: Partial<BulkUser> = {}

        // Map CSV values to user object
        headers.forEach((header, index) => {
          if (values[index] !== undefined) {
            user[header as keyof BulkUser] = values[index]
          }
        })

        // Validate required fields
        if (!user.name) rowErrors.push("Name is required")
        if (!user.email) {
          rowErrors.push("Email is required")
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
          rowErrors.push("Email format is invalid")
        }
        if (!user.role) {
          rowErrors.push("Role is required")
        } else if (!["student", "teacher", "admin"].includes(user.role as string)) {
          rowErrors.push("Role must be student, teacher, or admin")
        }

        // Validate CNIC format if provided
        if (user.cnic && !/^\d{5}-\d{7}-\d{1}$/.test(user.cnic)) {
          rowErrors.push("CNIC format should be XXXXX-XXXXXXX-X")
        }

        // Validate phone format if provided
        if (user.phone && !/^\+\d{2}-\d{3}-\d{7}$/.test(user.phone)) {
          rowErrors.push("Phone format should be +XX-XXX-XXXXXXX")
        }

        // Add role-specific validations
        if (user.role === "student" && !user.program) {
          rowErrors.push("Program is required for students")
        }

        if (user.role === "teacher" && !user.department) {
          rowErrors.push("Department is required for teachers")
        }

        if (rowErrors.length > 0) {
          errors[i] = rowErrors
        }

        data.push(user as BulkUser)
      }

      setParsedData(data)
      setValidationErrors(errors)
    }
    reader.readAsText(file)
  }

  const handleUpload = async () => {
    if (parsedData.length === 0 || Object.keys(validationErrors).length > 0) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return 95
        }
        return prev + 5
      })
    }, 200)

    try {
      // Filter out users with validation errors
      const validUsers = parsedData.filter((_, index) => !validationErrors[index + 1])

      // Call the database service to create users
      const result = await DatabaseService.bulkCreateUsers(validUsers)

      setUploadResult(result)
      setUploadProgress(100)
    } catch (error) {
      setUploadResult({
        success: 0,
        failed: parsedData.length,
        errors: [(error as Error).message],
      })
    } finally {
      clearInterval(progressInterval)
      setIsUploading(false)
    }
  }

  const resetUpload = () => {
    setFile(null)
    setParsedData([])
    setValidationErrors({})
    setUploadResult(null)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const validCount = parsedData.length - Object.keys(validationErrors).length
  const hasErrors = Object.keys(validationErrors).length > 0

  return (
    <div className="space-y-6">
      {!file ? (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-10 text-center">
          <input type="file" accept=".csv" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Upload CSV File</h3>
              <p className="text-sm text-muted-foreground mt-1">Drag and drop your CSV file here, or click to browse</p>
            </div>
            <Button onClick={() => fileInputRef.current?.click()} className="mt-4">
              Select File
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">{file.name}</h3>
              <p className="text-sm text-muted-foreground">
                {parsedData.length} records found • {validCount} valid • {Object.keys(validationErrors).length} with
                errors
              </p>
            </div>
            <Button variant="outline" onClick={resetUpload}>
              Change File
            </Button>
          </div>

          {hasErrors && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Validation Errors</AlertTitle>
              <AlertDescription>Please fix the errors below before uploading.</AlertDescription>
            </Alert>
          )}

          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Row</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parsedData.map((user, index) => {
                  const rowNumber = index + 1
                  const hasError = validationErrors[rowNumber]
                  return (
                    <TableRow key={index} className={hasError ? "bg-red-50 dark:bg-red-900/10" : ""}>
                      <TableCell>{rowNumber}</TableCell>
                      <TableCell>{user.name || "—"}</TableCell>
                      <TableCell>{user.email || "—"}</TableCell>
                      <TableCell>
                        {user.role && (
                          <Badge
                            variant={
                              user.role === "student" ? "default" : user.role === "teacher" ? "secondary" : "outline"
                            }
                          >
                            {user.role}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {hasError ? (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <XCircle className="h-3 w-3" />
                            <span>Invalid</span>
                          </Badge>
                        ) : (
                          <Badge
                            variant="success"
                            className="flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          >
                            <CheckCircle className="h-3 w-3" />
                            <span>Valid</span>
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {hasError && (
                          <div className="text-xs text-red-600 dark:text-red-400">
                            {validationErrors[rowNumber].map((error, i) => (
                              <div key={i}>{error}</div>
                            ))}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {isUploading ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          ) : uploadResult ? (
            <Alert
              variant={uploadResult.failed > 0 ? "destructive" : "default"}
              className={
                uploadResult.failed === 0 ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300" : ""
              }
            >
              {uploadResult.failed === 0 ? <CheckCircle className="h-4 w-4" /> : <FileWarning className="h-4 w-4" />}
              <AlertTitle>Upload {uploadResult.failed === 0 ? "Complete" : "Completed with Errors"}</AlertTitle>
              <AlertDescription>
                Successfully added {uploadResult.success} users.
                {uploadResult.failed > 0 && <div>Failed to add {uploadResult.failed} users.</div>}
                {uploadResult.errors.length > 0 && (
                  <ul className="list-disc pl-5 mt-2 text-sm">
                    {uploadResult.errors.slice(0, 3).map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                    {uploadResult.errors.length > 3 && <li>...and {uploadResult.errors.length - 3} more errors</li>}
                  </ul>
                )}
              </AlertDescription>
            </Alert>
          ) : (
            <div className="flex justify-end">
              <Button onClick={handleUpload} disabled={hasErrors || parsedData.length === 0}>
                Upload {validCount} Users
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
