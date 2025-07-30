"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Award, Calendar, GraduationCap, Printer, Share } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export function StudentTranscripts() {
  const [studentInfo] = useState({
    name: "Priya Sharma",
    rollNumber: "BS-2024-001",
    fatherName: "Rajesh Sharma",
    program: "Bachelor of Science in Computer Science",
    batch: "2024-2028",
    cgpa: 3.45,
    totalCredits: 36,
    completedCredits: 36,
    dateOfBirth: "1998-05-15",
    admissionDate: "2024-08-15",
  })

  const [transcriptData] = useState([
    {
      semester: 1,
      year: "2024",
      gpa: 3.2,
      credits: 18,
      courses: [
        { name: "Mathematics I", code: "MATH-101", credits: 3, grade: "A-", points: 3.7 },
        { name: "Physics I", code: "PHYS-101", credits: 3, grade: "B+", points: 3.3 },
        { name: "English I", code: "ENG-101", credits: 3, grade: "A", points: 4.0 },
        { name: "Computer Fundamentals", code: "CS-101", credits: 3, grade: "A", points: 4.0 },
        { name: "Islamic Studies", code: "IS-101", credits: 3, grade: "B", points: 3.0 },
        { name: "Pakistan Studies", code: "PS-101", credits: 3, grade: "B+", points: 3.3 },
      ],
    },
    {
      semester: 2,
      year: "2024",
      gpa: 3.5,
      credits: 18,
      courses: [
        { name: "Mathematics II", code: "MATH-201", credits: 3, grade: "A", points: 4.0 },
        { name: "Physics II", code: "PHYS-201", credits: 3, grade: "A-", points: 3.7 },
        { name: "English II", code: "ENG-201", credits: 3, grade: "B+", points: 3.3 },
        { name: "Programming Fundamentals", code: "CS-201", credits: 3, grade: "A", points: 4.0 },
        { name: "Digital Logic Design", code: "CS-202", credits: 3, grade: "A-", points: 3.7 },
        { name: "Technical Writing", code: "ENG-202", credits: 3, grade: "B", points: 3.0 },
      ],
    },
  ])

  const sidebarItems = [
    { icon: GraduationCap, label: "Dashboard", href: "/student/dashboard" },
    { icon: GraduationCap, label: "My Courses", href: "/student/courses" },
    { icon: FileText, label: "Assignments", href: "/student/assignments" },
    { icon: Award, label: "Grades", href: "/student/grades" },
    { icon: Award, label: "Transcripts", href: "/student/transcripts", active: true },
  ]

  const handleDownloadTranscript = () => {
    // In a real app, this would generate and download a PDF
    console.log("Downloading transcript...")
  }

  const handlePrintTranscript = () => {
    window.print()
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Academic Transcripts">
      <div className="space-y-8">
        {/* Actions */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[rgb(var(--text-primary))]">Official Transcript</h2>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handlePrintTranscript}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="outline">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button className="lms-button-primary rounded-xl" onClick={handleDownloadTranscript}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Official Transcript */}
        <Card className="lms-card print:shadow-none print:border-none">
          <CardContent className="p-8 print:p-6">
            {/* Header */}
            <div className="text-center mb-8 print:mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[rgb(var(--text-accent))]/10 flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-[rgb(var(--text-accent))]" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))] mb-2">
                Government Dyal Singh Graduate College
              </h1>
              <p className="text-lg text-[rgb(var(--text-secondary))] mb-1">Karnal, Haryana, India</p>
              <p className="text-lg font-semibold text-[rgb(var(--text-accent))]">OFFICIAL TRANSCRIPT</p>
            </div>

            {/* Student Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 print:mb-6">
              <div className="space-y-3">
                <div className="flex justify-between border-b border-[rgb(var(--sidebar-border))] pb-1">
                  <span className="font-medium text-[rgb(var(--text-secondary))]">Student Name:</span>
                  <span className="font-semibold text-[rgb(var(--text-primary))]">{studentInfo.name}</span>
                </div>
                <div className="flex justify-between border-b border-[rgb(var(--sidebar-border))] pb-1">
                  <span className="font-medium text-[rgb(var(--text-secondary))]">Roll Number:</span>
                  <span className="font-semibold text-[rgb(var(--text-primary))]">{studentInfo.rollNumber}</span>
                </div>
                <div className="flex justify-between border-b border-[rgb(var(--sidebar-border))] pb-1">
                  <span className="font-medium text-[rgb(var(--text-secondary))]">Father's Name:</span>
                  <span className="font-semibold text-[rgb(var(--text-primary))]">{studentInfo.fatherName}</span>
                </div>
                <div className="flex justify-between border-b border-[rgb(var(--sidebar-border))] pb-1">
                  <span className="font-medium text-[rgb(var(--text-secondary))]">Date of Birth:</span>
                  <span className="font-semibold text-[rgb(var(--text-primary))]">
                    {new Date(studentInfo.dateOfBirth).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between border-b border-[rgb(var(--sidebar-border))] pb-1">
                  <span className="font-medium text-[rgb(var(--text-secondary))]">Program:</span>
                  <span className="font-semibold text-[rgb(var(--text-primary))]">{studentInfo.program}</span>
                </div>
                <div className="flex justify-between border-b border-[rgb(var(--sidebar-border))] pb-1">
                  <span className="font-medium text-[rgb(var(--text-secondary))]">Batch:</span>
                  <span className="font-semibold text-[rgb(var(--text-primary))]">{studentInfo.batch}</span>
                </div>
                <div className="flex justify-between border-b border-[rgb(var(--sidebar-border))] pb-1">
                  <span className="font-medium text-[rgb(var(--text-secondary))]">Admission Date:</span>
                  <span className="font-semibold text-[rgb(var(--text-primary))]">
                    {new Date(studentInfo.admissionDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[rgb(var(--sidebar-border))] pb-1">
                  <span className="font-medium text-[rgb(var(--text-secondary))]">Current CGPA:</span>
                  <span className="font-bold text-[rgb(var(--text-accent))] text-lg">{studentInfo.cgpa}</span>
                </div>
              </div>
            </div>

            {/* Academic Record */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[rgb(var(--text-primary))] border-b-2 border-[rgb(var(--text-accent))] pb-2">
                Academic Record
              </h3>

              {transcriptData.map((semester) => (
                <div key={semester.semester} className="space-y-4">
                  <div className="flex items-center justify-between bg-[rgb(var(--bg-tertiary))]/30 p-3 rounded-lg">
                    <h4 className="text-lg font-semibold text-[rgb(var(--text-primary))]">
                      Semester {semester.semester} - {semester.year}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="font-medium text-[rgb(var(--text-primary))]">GPA: {semester.gpa}</span>
                      <span className="text-[rgb(var(--text-secondary))]">Credits: {semester.credits}</span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-[rgb(var(--sidebar-border))]">
                          <th className="text-left py-2 px-3 font-semibold text-[rgb(var(--text-secondary))]">
                            Course Title
                          </th>
                          <th className="text-left py-2 px-3 font-semibold text-[rgb(var(--text-secondary))]">
                            Course Code
                          </th>
                          <th className="text-center py-2 px-3 font-semibold text-[rgb(var(--text-secondary))]">
                            Credits
                          </th>
                          <th className="text-center py-2 px-3 font-semibold text-[rgb(var(--text-secondary))]">
                            Grade
                          </th>
                          <th className="text-center py-2 px-3 font-semibold text-[rgb(var(--text-secondary))]">
                            Points
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {semester.courses.map((course, index) => (
                          <tr key={index} className="border-b border-[rgb(var(--sidebar-border))]/50">
                            <td className="py-2 px-3 text-[rgb(var(--text-primary))]">{course.name}</td>
                            <td className="py-2 px-3 text-[rgb(var(--text-accent))]">{course.code}</td>
                            <td className="py-2 px-3 text-center text-[rgb(var(--text-secondary))]">
                              {course.credits}
                            </td>
                            <td className="py-2 px-3 text-center font-semibold text-[rgb(var(--text-primary))]">
                              {course.grade}
                            </td>
                            <td className="py-2 px-3 text-center text-[rgb(var(--text-secondary))]">
                              {course.points.toFixed(1)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 pt-6 border-t-2 border-[rgb(var(--sidebar-border))]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-[rgb(var(--bg-tertiary))]/30 rounded-lg">
                  <div className="text-2xl font-bold text-[rgb(var(--text-primary))]">{studentInfo.totalCredits}</div>
                  <div className="text-sm text-[rgb(var(--text-secondary))]">Total Credits Attempted</div>
                </div>
                <div className="text-center p-4 bg-[rgb(var(--bg-tertiary))]/30 rounded-lg">
                  <div className="text-2xl font-bold text-[rgb(var(--text-primary))]">
                    {studentInfo.completedCredits}
                  </div>
                  <div className="text-sm text-[rgb(var(--text-secondary))]">Credits Earned</div>
                </div>
                <div className="text-center p-4 bg-[rgb(var(--text-accent))]/10 rounded-lg">
                  <div className="text-3xl font-bold text-[rgb(var(--text-accent))]">{studentInfo.cgpa}</div>
                  <div className="text-sm text-[rgb(var(--text-secondary))]">Cumulative GPA</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-[rgb(var(--sidebar-border))] text-center">
              <p className="text-sm text-[rgb(var(--text-secondary))] mb-2">
                This is an official transcript issued by Government Dyal Singh Graduate College
              </p>
              <p className="text-xs text-[rgb(var(--text-secondary))]">
                Generated on: {new Date().toLocaleDateString()} | Document ID: GDSGC-{studentInfo.rollNumber}-
                {new Date().getFullYear()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Documents */}
        <Card className="lms-card">
          <CardHeader>
            <CardTitle className="text-[rgb(var(--text-primary))]">Additional Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                <Award className="w-6 h-6" />
                <span>Degree Certificate</span>
                <span className="text-xs text-[rgb(var(--text-secondary))]">Available after graduation</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                <FileText className="w-6 h-6" />
                <span>Provisional Certificate</span>
                <span className="text-xs text-[rgb(var(--text-secondary))]">Available after completion</span>
              </Button>

              <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                <Calendar className="w-6 h-6" />
                <span>Character Certificate</span>
                <span className="text-xs text-[rgb(var(--text-secondary))]">Request from admin</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
