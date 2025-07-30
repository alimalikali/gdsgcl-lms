"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  BookOpen,
  FileText,
  Award,
  Download,
  TrendingUp,
  Bell,
  GraduationCap,
  Calendar,
  MapPin,
  Phone,
  Mail,
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DatabaseService } from "@/lib/database"
import Link from "next/link"

export function StudentDashboard() {
  const [academicData, setAcademicData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching current student data (in real app, this would come from auth context)
    const currentStudentId = "std_001" // This would come from authentication
    const data = DatabaseService.getStudentAcademicRecord(currentStudentId)
    setAcademicData(data)
    setLoading(false)
  }, [])

  const [announcements] = useState([
    {
      id: 1,
      title: "Mid-term Examination Schedule - Semester 3",
      course: "All Courses",
      date: "2024-12-10",
      content:
        "Mid-term examinations for Semester 3 will begin from December 20th, 2024. Please check your individual course pages for specific dates and times.",
      priority: "high",
    },
    {
      id: 2,
      title: "Assignment Deadline Extended - Data Structures",
      course: "CS-301",
      date: "2024-12-08",
      content:
        "The Array Implementation assignment deadline has been extended to December 15th due to technical issues with the submission portal.",
      priority: "medium",
    },
    {
      id: 3,
      title: "New Library Resources Available",
      course: "General",
      date: "2024-12-05",
      content:
        "New computer science books and online resources have been added to the digital library. Access them through the student portal.",
      priority: "low",
    },
  ])

  const sidebarItems = [
    { icon: BookOpen, label: "Dashboard", href: "/student/dashboard", active: true },
    { icon: BookOpen, label: "My Courses", href: "/student/courses" },
    { icon: FileText, label: "Assignments", href: "/student/assignments" },
    { icon: TrendingUp, label: "Grades", href: "/student/grades" },
    { icon: Award, label: "Transcripts", href: "/student/transcripts" },
    { icon: Calendar, label: "Academic Calendar", href: "/student/calendar" },
  ]

  if (loading) {
    return (
      <DashboardLayout sidebarItems={sidebarItems} title="Student Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--text-accent))] mx-auto mb-4"></div>
            <p className="text-[rgb(var(--text-secondary))]">Loading your academic data...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!academicData) {
    return (
      <DashboardLayout sidebarItems={sidebarItems} title="Student Dashboard">
        <div className="text-center py-12">
          <p className="text-[rgb(var(--text-secondary))]">Unable to load academic data. Please try again.</p>
        </div>
      </DashboardLayout>
    )
  }

  const { student, program, semesterData } = academicData

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "current":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "upcoming":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const currentSemesterData = semesterData.find((sem: any) => sem.status === "current")
  const completedSemesters = semesterData.filter((sem: any) => sem.status === "completed").length

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Student Dashboard">
      <div className="space-y-8">
        {/* Student Info Header */}
        <Card className="lms-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-[rgb(var(--text-accent))]/10 flex items-center justify-center mx-auto mb-3">
                    <GraduationCap className="w-10 h-10 text-[rgb(var(--text-accent))]" />
                  </div>
                  <h3 className="text-lg font-bold text-[rgb(var(--text-primary))]">{student.name}</h3>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">{student.rollNumber}</p>
                  <Badge className="mt-2 bg-[rgb(var(--text-accent))]/10 text-[rgb(var(--text-accent))]">
                    {program.code}
                  </Badge>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <GraduationCap className="w-4 h-4 text-[rgb(var(--text-secondary))]" />
                      <span className="text-[rgb(var(--text-secondary))]">Program:</span>
                      <span className="font-medium text-[rgb(var(--text-primary))]">{program.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="w-4 h-4 text-[rgb(var(--text-secondary))]" />
                      <span className="text-[rgb(var(--text-secondary))]">Father's Name:</span>
                      <span className="font-medium text-[rgb(var(--text-primary))]">{student.fatherName}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="w-4 h-4 text-[rgb(var(--text-secondary))]" />
                      <span className="text-[rgb(var(--text-secondary))]">Email:</span>
                      <span className="font-medium text-[rgb(var(--text-primary))]">{student.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-[rgb(var(--text-secondary))]" />
                      <span className="text-[rgb(var(--text-secondary))]">Phone:</span>
                      <span className="font-medium text-[rgb(var(--text-primary))]">{student.phone}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-[rgb(var(--bg-tertiary))]/30 rounded-lg">
                        <div className="text-2xl font-bold text-[rgb(var(--text-primary))]">
                          {student.currentSemester}/{program.duration}
                        </div>
                        <p className="text-xs text-[rgb(var(--text-secondary))]">Current Semester</p>
                      </div>
                      <div className="text-center p-3 bg-[rgb(var(--bg-tertiary))]/30 rounded-lg">
                        <div className="text-2xl font-bold text-[rgb(var(--text-primary))]">{student.cgpa}</div>
                        <p className="text-xs text-[rgb(var(--text-secondary))]">CGPA</p>
                      </div>
                    </div>
                    <div className="text-center p-3 bg-[rgb(var(--text-accent))]/10 rounded-lg">
                      <div className="text-lg font-bold text-[rgb(var(--text-accent))]">
                        {student.completedCredits}/{program.totalCredits}
                      </div>
                      <p className="text-xs text-[rgb(var(--text-secondary))]">Credits Completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button className="lms-button-primary rounded-xl h-16 flex flex-col space-y-2">
            <Download className="w-6 h-6" />
            <span className="text-sm">Download Transcript</span>
          </Button>
          <Button
            variant="outline"
            className="rounded-xl h-16 flex flex-col space-y-2 border-2 border-[rgb(var(--sidebar-border))] hover:border-[rgb(var(--text-accent))] hover:text-[rgb(var(--text-accent))] bg-transparent"
          >
            <BookOpen className="w-6 h-6" />
            <span className="text-sm">Curriculum Roadmap</span>
          </Button>
          <Button
            variant="outline"
            className="rounded-xl h-16 flex flex-col space-y-2 border-2 border-[rgb(var(--sidebar-border))] hover:border-[rgb(var(--text-accent))] hover:text-[rgb(var(--text-accent))] bg-transparent"
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-sm">Academic Progress</span>
          </Button>
          <Button
            variant="outline"
            className="rounded-xl h-16 flex flex-col space-y-2 border-2 border-[rgb(var(--sidebar-border))] hover:border-[rgb(var(--text-accent))] hover:text-[rgb(var(--text-accent))] bg-transparent"
          >
            <Calendar className="w-6 h-6" />
            <span className="text-sm">Exam Schedule</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Semester Progress */}
          <div className="lg:col-span-2">
            <Card className="lms-card">
              <CardHeader>
                <CardTitle className="text-[rgb(var(--text-primary))]">Academic Progress by Semester</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-4">
                  {semesterData.map((semester: any) => (
                    <AccordionItem
                      key={semester.semester}
                      value={`semester-${semester.semester}`}
                      className="border border-[rgb(var(--sidebar-border))] rounded-xl px-4"
                    >
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between w-full mr-4">
                          <div className="flex items-center space-x-4">
                            <h3 className="text-lg font-semibold text-[rgb(var(--text-primary))]">
                              Semester {semester.semester}
                            </h3>
                            <Badge className={getStatusColor(semester.status)}>{semester.status}</Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            {semester.gpa > 0 && (
                              <span className="font-medium text-[rgb(var(--text-primary))]">GPA: {semester.gpa}</span>
                            )}
                            <span className="text-[rgb(var(--text-secondary))]">{semester.credits} Credits</span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {semester.courses.map((course: any) => (
                            <Card key={course.id} className="border border-[rgb(var(--sidebar-border))]">
                              <CardContent className="p-4">
                                <div className="space-y-3">
                                  <div>
                                    <h4 className="font-medium text-[rgb(var(--text-primary))]">{course.name}</h4>
                                    <p className="text-sm text-[rgb(var(--text-accent))]">{course.code}</p>
                                    <p className="text-sm text-[rgb(var(--text-secondary))]">{course.teacherName}</p>
                                    <p className="text-xs text-[rgb(var(--text-secondary))]">
                                      {course.credits} Credits
                                    </p>
                                  </div>

                                  {course.status === "enrolled" && (
                                    <div className="space-y-2">
                                      <div className="flex justify-between text-sm">
                                        <span className="text-[rgb(var(--text-secondary))]">Attendance</span>
                                        <span className="font-medium text-[rgb(var(--text-primary))]">
                                          {course.attendance}%
                                        </span>
                                      </div>
                                      <Progress value={course.attendance} className="h-2" />
                                    </div>
                                  )}

                                  <div className="flex justify-between items-center">
                                    {course.grade ? (
                                      <div className="text-center">
                                        <span className={`text-lg font-bold ${getGradeColor(course.grade)}`}>
                                          {course.grade}
                                        </span>
                                        <p className="text-xs text-[rgb(var(--text-secondary))]">
                                          {course.percentage}%
                                        </p>
                                      </div>
                                    ) : (
                                      <span className="text-sm text-[rgb(var(--text-secondary))]">In Progress</span>
                                    )}
                                    <Button size="sm" variant="outline" asChild>
                                      <Link href={`/course/${course.courseId}?semester=${semester.semester}`}>
                                        View Course
                                      </Link>
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Semester Stats */}
            {currentSemesterData && (
              <Card className="lms-card">
                <CardHeader>
                  <CardTitle className="text-[rgb(var(--text-primary))]">
                    Current Semester {currentSemesterData.semester}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[rgb(var(--text-secondary))]">Courses</span>
                      <span className="font-medium text-[rgb(var(--text-primary))]">
                        {currentSemesterData.courses.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[rgb(var(--text-secondary))]">Credits</span>
                      <span className="font-medium text-[rgb(var(--text-primary))]">{currentSemesterData.credits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[rgb(var(--text-secondary))]">Avg Attendance</span>
                      <span className="font-medium text-[rgb(var(--text-primary))]">
                        {Math.round(
                          currentSemesterData.courses.reduce((sum: number, c: any) => sum + (c.attendance || 0), 0) /
                            currentSemesterData.courses.length,
                        )}
                        %
                      </span>
                    </div>
                  </div>

                  <Progress
                    value={Math.round(
                      currentSemesterData.courses.reduce((sum: number, c: any) => sum + (c.attendance || 0), 0) /
                        currentSemesterData.courses.length,
                    )}
                    className="h-3"
                  />
                </CardContent>
              </Card>
            )}

            {/* Recent Announcements */}
            <Card className="lms-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-[rgb(var(--text-primary))]">Announcements</CardTitle>
                <Button size="sm" variant="outline">
                  <Bell className="w-4 h-4 mr-1" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="p-4 border border-[rgb(var(--sidebar-border))] rounded-xl hover:bg-[rgb(var(--bg-tertiary))]/30 transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-[rgb(var(--text-primary))] line-clamp-2 flex-1">
                            {announcement.title}
                          </h4>
                          <Badge className={`${getPriorityColor(announcement.priority)} ml-2`}>
                            {announcement.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-[rgb(var(--text-accent))] font-medium">{announcement.course}</p>
                          <span className="text-xs text-[rgb(var(--text-secondary))]">
                            {new Date(announcement.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-[rgb(var(--text-secondary))] line-clamp-2">{announcement.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="lms-card">
              <CardHeader>
                <CardTitle className="text-[rgb(var(--text-primary))]">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-[rgb(var(--text-secondary))]" />
                    <span className="text-[rgb(var(--text-secondary))]">DOB:</span>
                    <span className="font-medium text-[rgb(var(--text-primary))]">
                      {new Date(student.dateOfBirth).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-[rgb(var(--text-secondary))]" />
                    <span className="text-[rgb(var(--text-secondary))]">CNIC:</span>
                    <span className="font-medium text-[rgb(var(--text-primary))]">{student.cnic}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-[rgb(var(--text-secondary))] mt-0.5" />
                    <div>
                      <span className="text-[rgb(var(--text-secondary))]">Address:</span>
                      <p className="font-medium text-[rgb(var(--text-primary))] text-xs leading-relaxed">
                        {student.address}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
