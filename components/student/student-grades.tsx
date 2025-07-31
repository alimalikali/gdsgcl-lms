"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Download, Award, BookOpen, FileText } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export function StudentGrades() {
  const [selectedSemester, setSelectedSemester] = useState("all")

  const [studentInfo] = useState({
    name: "Priya Sharma",
    rollNumber: "BS-2024-001",
    program: "BS Computer Science",
    cgpa: 3.45,
    completedSemesters: 2,
    totalSemesters: 8,
  })

  const [semesterGrades] = useState([
    {
      semester: 1,
      gpa: 3.2,
      credits: 18,
      status: "completed",
      courses: [
        { name: "Mathematics I", code: "MATH-101", credits: 3, grade: "A-", points: 3.7, percentage: 85 },
        { name: "Physics I", code: "PHYS-101", credits: 3, grade: "B+", points: 3.3, percentage: 78 },
        { name: "English I", code: "ENG-101", credits: 3, grade: "A", points: 4.0, percentage: 92 },
        { name: "Computer Fundamentals", code: "CS-101", credits: 3, grade: "A", points: 4.0, percentage: 88 },
        { name: "Islamic Studies", code: "IS-101", credits: 3, grade: "B", points: 3.0, percentage: 75 },
        { name: "Pakistan Studies", code: "PS-101", credits: 3, grade: "B+", points: 3.3, percentage: 80 },
      ],
    },
    {
      semester: 2,
      gpa: 3.5,
      credits: 18,
      status: "completed",
      courses: [
        { name: "Mathematics II", code: "MATH-201", credits: 3, grade: "A", points: 4.0, percentage: 90 },
        { name: "Physics II", code: "PHYS-201", credits: 3, grade: "A-", points: 3.7, percentage: 87 },
        { name: "English II", code: "ENG-201", credits: 3, grade: "B+", points: 3.3, percentage: 82 },
        { name: "Programming Fundamentals", code: "CS-201", credits: 3, grade: "A", points: 4.0, percentage: 91 },
        { name: "Digital Logic Design", code: "CS-202", credits: 3, grade: "A-", points: 3.7, percentage: 86 },
        { name: "Technical Writing", code: "ENG-202", credits: 3, grade: "B", points: 3.0, percentage: 76 },
      ],
    },
    {
      semester: 3,
      gpa: 0,
      credits: 18,
      status: "current",
      courses: [
        { name: "Data Structures", code: "CS-301", credits: 3, grade: null, points: 0, percentage: 75 },
        { name: "Object Oriented Programming", code: "CS-302", credits: 3, grade: null, points: 0, percentage: 68 },
        { name: "Database Systems", code: "CS-303", credits: 3, grade: null, points: 0, percentage: 82 },
        { name: "Computer Networks", code: "CS-304", credits: 3, grade: null, points: 0, percentage: 60 },
        { name: "Statistics", code: "STAT-301", credits: 3, grade: null, points: 0, percentage: 70 },
        { name: "Linear Algebra", code: "MATH-301", credits: 3, grade: null, points: 0, percentage: 85 },
      ],
    },
  ])

  const sidebarItems = [
    { icon: BookOpen, label: "Dashboard", href: "/student/dashboard" },
    { icon: BookOpen, label: "My Courses", href: "/student/courses" },
    { icon: FileText, label: "Assignments", href: "/student/assignments" },
    { icon: TrendingUp, label: "Grades", href: "/student/grades", active: true },
    { icon: Award, label: "Transcripts", href: "/student/transcripts" },
  ]

  const getGradeColor = (grade: string) => {
    if (grade?.startsWith("A")) return "text-green-600 font-semibold"
    if (grade?.startsWith("B")) return "text-blue-600 font-semibold"
    if (grade?.startsWith("C")) return "text-yellow-600 font-semibold"
    return "text-gray-600"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "current":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const filteredSemesters =
    selectedSemester === "all"
      ? semesterGrades
      : semesterGrades.filter((sem) => sem.semester.toString() === selectedSemester)

  const totalCredits = semesterGrades.reduce((acc, sem) => acc + sem.credits, 0)
  const completedCredits = semesterGrades
    .filter((sem) => sem.status === "completed")
    .reduce((acc, sem) => acc + sem.credits, 0)

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Academic Grades">
      <div className="space-y-8">
        {/* Academic Summary */}
        <Card className="lms-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[rgb(var(--text-primary))]">{studentInfo.cgpa}</div>
                <p className="text-sm text-[rgb(var(--text-secondary))]">CGPA</p>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-[rgb(var(--text-primary))]">
                  {studentInfo.completedSemesters}/{studentInfo.totalSemesters}
                </div>
                <p className="text-sm text-[rgb(var(--text-secondary))]">Semesters</p>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-[rgb(var(--text-primary))]">
                  {completedCredits}/{totalCredits}
                </div>
                <p className="text-sm text-[rgb(var(--text-secondary))]">Credits</p>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-[rgb(var(--text-primary))]">A-</div>
                <p className="text-sm text-[rgb(var(--text-secondary))]">Current Grade</p>
              </div>

              <div className="text-center">
                <Button className="lms-button-primary rounded-xl">
                  <Download className="w-4 h-4 mr-2" />
                  Transcript
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Semester Filter */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[rgb(var(--text-primary))]">Semester Grades</h2>
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Semesters</SelectItem>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <SelectItem key={sem} value={sem.toString()}>
                  Semester {sem}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Grades by Semester */}
        <div className="space-y-6">
          {filteredSemesters.map((semester) => (
            <Card key={semester.semester} className="lms-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <CardTitle className="text-[rgb(var(--text-primary))]">Semester {semester.semester}</CardTitle>
                    <Badge className={getStatusColor(semester.status)}>{semester.status}</Badge>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    {semester.gpa > 0 && (
                      <div className="text-center">
                        <div className="font-bold text-[rgb(var(--text-primary))]">{semester.gpa}</div>
                        <div className="text-[rgb(var(--text-secondary))]">GPA</div>
                      </div>
                    )}
                    <div className="text-center">
                      <div className="font-bold text-[rgb(var(--text-primary))]">{semester.credits}</div>
                      <div className="text-[rgb(var(--text-secondary))]">Credits</div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[rgb(var(--sidebar-border))]">
                        <th className="text-left py-3 px-4 font-medium text-[rgb(var(--text-secondary))]">Course</th>
                        <th className="text-left py-3 px-4 font-medium text-[rgb(var(--text-secondary))]">Code</th>
                        <th className="text-center py-3 px-4 font-medium text-[rgb(var(--text-secondary))]">Credits</th>
                        <th className="text-center py-3 px-4 font-medium text-[rgb(var(--text-secondary))]">
                          Progress
                        </th>
                        <th className="text-center py-3 px-4 font-medium text-[rgb(var(--text-secondary))]">Grade</th>
                        <th className="text-center py-3 px-4 font-medium text-[rgb(var(--text-secondary))]">Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {semester.courses.map((course, index) => (
                        <tr key={index} className="border-b border-[rgb(var(--sidebar-border))]/50">
                          <td className="py-4 px-4">
                            <div className="font-medium text-[rgb(var(--text-primary))]">{course.name}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm text-[rgb(var(--text-accent))]">{course.code}</div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="text-sm text-[rgb(var(--text-secondary))]">{course.credits}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <Progress value={course.percentage} className="h-2 flex-1" />
                              <span className="text-sm font-medium text-[rgb(var(--text-primary))] w-12">
                                {course.percentage}%
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            {course.grade ? (
                              <span className={`font-semibold ${getGradeColor(course.grade)}`}>{course.grade}</span>
                            ) : (
                              <span className="text-sm text-[rgb(var(--text-secondary))]">In Progress</span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-center">
                            {course.points > 0 ? (
                              <span className="font-medium text-[rgb(var(--text-primary))]">
                                {course.points.toFixed(1)}
                              </span>
                            ) : (
                              <span className="text-sm text-[rgb(var(--text-secondary))]">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Grade Distribution */}
        <Card className="lms-card">
          <CardHeader>
            <CardTitle className="text-[rgb(var(--text-primary))]">Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {["A", "B", "C", "D", "F"].map((grade) => {
                const count = semesterGrades
                  .flatMap((sem) => sem.courses)
                  .filter((course) => course.grade?.startsWith(grade)).length
                return (
                  <div key={grade} className="text-center p-4 border border-[rgb(var(--sidebar-border))] rounded-xl">
                    <div className="text-2xl font-bold text-[rgb(var(--text-primary))]">{count}</div>
                    <div className="text-sm text-[rgb(var(--text-secondary))]">Grade {grade}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
