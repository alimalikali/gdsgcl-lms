"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload, FileText, Calendar, Clock, CheckCircle, AlertTriangle, X } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import Link from "next/link"
import { useDropzone } from "react-dropzone"

interface AssignmentSubmissionProps {
  assignmentId: string
}

export function AssignmentSubmission({ assignmentId }: AssignmentSubmissionProps) {
  const [assignment] = useState({
    id: assignmentId,
    title: "Calculus Problem Set 3",
    course: "Advanced Mathematics",
    instructor: "Dr. Rajesh Kumar",
    description:
      "Solve the following calculus problems focusing on integration techniques and applications. Show all work and provide detailed explanations for each solution.",
    dueDate: "2024-01-15T23:59:00",
    maxPoints: 100,
    status: "pending",
    submittedAt: null,
    grade: null,
    feedback: null,
  })

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [comments, setComments] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    // Handle success/error
  }

  const sidebarItems = [
    { icon: FileText, label: "Dashboard", href: "/student/dashboard" },
    { icon: FileText, label: "Assignments", href: "/student/assignments", active: true },
  ]

  const isOverdue = new Date() > new Date(assignment.dueDate)
  const timeUntilDue = new Date(assignment.dueDate).getTime() - new Date().getTime()
  const daysUntilDue = Math.ceil(timeUntilDue / (1000 * 60 * 60 * 24))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "graded":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Assignment Submission">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/student/assignments">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))]">{assignment.title}</h1>
            <p className="text-[rgb(var(--text-secondary))]">
              {assignment.course} • {assignment.instructor}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Assignment Details */}
            <Card className="lms-card">
              <CardHeader>
                <CardTitle className="text-[rgb(var(--text-primary))]">Assignment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[rgb(var(--text-secondary))] leading-relaxed">{assignment.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[rgb(var(--bg-tertiary))]/30 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-[rgb(var(--text-accent))]" />
                    <div>
                      <p className="text-sm font-medium text-[rgb(var(--text-primary))]">Due Date</p>
                      <p className="text-xs text-[rgb(var(--text-secondary))]">
                        {new Date(assignment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[rgb(var(--text-accent))]" />
                    <div>
                      <p className="text-sm font-medium text-[rgb(var(--text-primary))]">Time Left</p>
                      <p className="text-xs text-[rgb(var(--text-secondary))]">
                        {isOverdue ? "Overdue" : `${daysUntilDue} days`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-[rgb(var(--text-accent))]" />
                    <div>
                      <p className="text-sm font-medium text-[rgb(var(--text-primary))]">Max Points</p>
                      <p className="text-xs text-[rgb(var(--text-secondary))]">{assignment.maxPoints} points</p>
                    </div>
                  </div>
                </div>

                {isOverdue && (
                  <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <p className="text-sm text-red-600 dark:text-red-400">
                      This assignment is overdue. Late submissions may receive reduced points.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card className="lms-card">
              <CardHeader>
                <CardTitle className="text-[rgb(var(--text-primary))]">Upload Files</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-[rgb(var(--text-accent))] bg-[rgb(var(--text-accent))]/5"
                      : "border-[rgb(var(--sidebar-border))] hover:border-[rgb(var(--text-accent))] hover:bg-[rgb(var(--bg-tertiary))]/30"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-12 h-12 text-[rgb(var(--text-accent))] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[rgb(var(--text-primary))] mb-2">
                    {isDragActive ? "Drop files here" : "Upload your assignment"}
                  </h3>
                  <p className="text-[rgb(var(--text-secondary))] mb-4">Drag and drop files here, or click to browse</p>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Supported formats: PDF, DOC, DOCX, PNG, JPG (Max 10MB)
                  </p>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-[rgb(var(--text-primary))]">Uploaded Files</h4>
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-[rgb(var(--sidebar-border))] rounded-xl"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-[rgb(var(--text-accent))]" />
                          <div>
                            <p className="font-medium text-[rgb(var(--text-primary))]">{file.name}</p>
                            <p className="text-sm text-[rgb(var(--text-secondary))]">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Comments */}
            <Card className="lms-card">
              <CardHeader>
                <CardTitle className="text-[rgb(var(--text-primary))]">Comments (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add any comments or notes about your submission..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Submission Status */}
            <Card className="lms-card">
              <CardHeader>
                <CardTitle className="text-[rgb(var(--text-primary))]">Submission Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                </div>

                {assignment.submittedAt && (
                  <div className="text-center">
                    <p className="text-sm text-[rgb(var(--text-secondary))]">Submitted on</p>
                    <p className="font-medium text-[rgb(var(--text-primary))]">
                      {new Date(assignment.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {assignment.grade && (
                  <div className="text-center">
                    <p className="text-sm text-[rgb(var(--text-secondary))]">Grade</p>
                    <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">
                      {assignment.grade}/{assignment.maxPoints}
                    </p>
                  </div>
                )}

                <Button
                  className="w-full lms-button-primary rounded-xl"
                  onClick={handleSubmit}
                  disabled={uploadedFiles.length === 0 || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Submit Assignment
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="lms-card">
              <CardHeader>
                <CardTitle className="text-[rgb(var(--text-primary))]">Submission Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm text-[rgb(var(--text-secondary))]">
                  <p>• Upload all required files before submitting</p>
                  <p>• Ensure files are properly named</p>
                  <p>• Check file size limits (10MB max)</p>
                  <p>• Review your work before final submission</p>
                  <p>• Contact instructor for technical issues</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
