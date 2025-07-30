"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Search, Play, Users, Calendar, GraduationCap } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DatabaseService } from "@/lib/database"
import Link from "next/link"

export function StudentCourses() {
  const [academicData, setAcademicData] = useState<any>(null)
  const [selectedSemester, setSelectedSemester] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get current student data
    const currentStudentId = "std_001"
    const data = DatabaseService.getStudentAcademicRecord(currentStudentId)
    setAcademicData(data)
    setLoading(false)
  }, [])

  const sidebarItems = [
    { icon: BookOpen, label: "Dashboard", href: "/student/dashboard" },
    { icon: BookOpen, label: "My Courses", href: "/student/courses", active: true },
    { icon: BookOpen, label: "Assignments", href: "/student/assignments" },
  ]

  if (loading) {
    return (
      <DashboardLayout sidebarItems={sidebarItems} title="My Courses">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--text-accent))] mx-auto mb-4"></div>
            <p className="text-[rgb(var(--text-secondary))]">Loading your courses...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!academicData) {
    return (
      <DashboardLayout sidebarItems={sidebarItems} title="My Courses">
        <div className="text-center py-12">
          <p className="text-[rgb(var(--text-secondary))]">Unable to load course data.</p>
        </div>
      </DashboardLayout>
    )
  }

  const { student, program, semesterData } = academicData

  // Filter courses based on semester and search
  const filteredSemesters = semesterData.filter((semester: any) => {
    if (selectedSemester !== "all" && semester.semester.toString() !== selectedSemester) {
      return false
    }

    if (searchQuery) {
      return semester.courses.some(
        (course: any) =>
          course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.teacherName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "enrolled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getGradeColor = (grade: string) => {
    if (grade?.startsWith("A")) return "text-green-600 font-semibold"
    if (grade?.startsWith("B")) return "text-blue-600 font-semibold"
    if (grade?.startsWith("C")) return "text-yellow-600 font-semibold"
    return "text-gray-600"
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="My Courses">
      <div className="space-y-8">
        {/* Header with student info */}
        <Card className="lms-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-[rgb(var(--text-accent))]/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-[rgb(var(--text-accent))]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[rgb(var(--text-primary))]">{student.name}</h2>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    {student.rollNumber} • {program.name}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[rgb(var(--text-accent))]">{student.cgpa}</div>
                <p className="text-sm text-[rgb(var(--text-secondary))]">CGPA</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{ color: "rgb(var(--text-secondary))" }}
            />
            <Input
              placeholder="Search courses, codes, or instructors..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                {Array.from({ length: program.duration }, (_, i) => i + 1).map((sem) => (
                  <SelectItem key={sem} value={sem.toString()}>
                    Semester {sem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="lms-button-primary rounded-xl">Browse All Courses</Button>
          </div>
        </div>

        {/* Courses by Semester */}
        <div className="space-y-8">
          {filteredSemesters.map((semester: any) => (
            <div key={semester.semester} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[rgb(var(--text-primary))]">Semester {semester.semester}</h3>
                <div className="flex items-center space-x-4 text-sm">
                  {semester.gpa > 0 && (
                    <span className="font-medium text-[rgb(var(--text-primary))]">GPA: {semester.gpa}</span>
                  )}
                  <span className="text-[rgb(var(--text-secondary))]">{semester.credits} Credits</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      semester.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : semester.status === "current"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {semester.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {semester.courses.map((course: any) => (
                  <Card key={course.id} className="lms-card hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-[rgb(var(--text-primary))] line-clamp-2">
                              {course.name}
                            </h4>
                            <p className="text-sm text-[rgb(var(--text-accent))] font-medium">{course.code}</p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}
                          >
                            {course.status}
                          </span>
                        </div>
                        <p className="text-sm text-[rgb(var(--text-secondary))]">{course.teacherName}</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center text-[rgb(var(--text-secondary))]">
                            <BookOpen className="w-4 h-4 mr-1" />
                            Credits
                          </span>
                          <span className="font-medium text-[rgb(var(--text-primary))]">{course.credits}</span>
                        </div>

                        {course.status === "enrolled" && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-[rgb(var(--text-secondary))]">Attendance</span>
                              <span className="font-medium text-[rgb(var(--text-primary))]">{course.attendance}%</span>
                            </div>
                            <Progress value={course.attendance} className="h-2" />
                          </div>
                        )}

                        {course.grade && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[rgb(var(--text-secondary))]">Final Grade</span>
                            <div className="text-center">
                              <span className={`text-lg font-bold ${getGradeColor(course.grade)}`}>{course.grade}</span>
                              <p className="text-xs text-[rgb(var(--text-secondary))]">{course.percentage}%</p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-2 text-xs text-[rgb(var(--text-secondary))]">
                          <Calendar className="w-3 h-3" />
                          <span>Year: {course.year}</span>
                          <span>•</span>
                          <span>Semester {course.semester}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" className="flex-1 lms-button-primary rounded-xl" asChild>
                          <Link href={`/course/${course.courseId}?semester=${semester.semester}`}>
                            <Play className="w-4 h-4 mr-1" />
                            {course.status === "enrolled" ? "Continue" : "View"}
                          </Link>
                        </Button>
                        {course.status === "enrolled" && (
                          <Button size="sm" variant="outline">
                            <Users className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredSemesters.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-[rgb(var(--text-secondary))] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[rgb(var(--text-primary))] mb-2">No courses found</h3>
            <p className="text-[rgb(var(--text-secondary))] mb-4">
              {searchQuery ? "Try adjusting your search terms" : "No courses available for the selected semester"}
            </p>
            {searchQuery && (
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
