"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Users,
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  GraduationCap,
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export function TeacherDashboard() {
  const [selectedSemester, setSelectedSemester] = useState("3")

  const [teacherInfo] = useState({
    name: "Dr. Rajesh Kumar",
    department: "Computer Science",
    totalCourses: 12,
    totalStudents: 284,
    activeSemesters: [1, 2, 3, 4, 5, 6, 7, 8],
  })

  const [coursesBySemester] = useState({
    "1": [
      {
        id: 1,
        title: "Mathematics I",
        code: "MATH-101",
        program: "BS Computer Science",
        students: 45,
        lectures: 24,
        assignments: 8,
        status: "active",
        lastUpdated: "2 days ago",
        credits: 3,
      },
      {
        id: 2,
        title: "Computer Fundamentals",
        code: "CS-101",
        program: "BS Computer Science",
        students: 45,
        lectures: 20,
        assignments: 6,
        status: "active",
        lastUpdated: "1 week ago",
        credits: 3,
      },
    ],
    "2": [
      {
        id: 3,
        title: "Mathematics II",
        code: "MATH-201",
        program: "BS Computer Science",
        students: 42,
        lectures: 26,
        assignments: 9,
        status: "active",
        lastUpdated: "3 days ago",
        credits: 3,
      },
    ],
    "3": [
      {
        id: 4,
        title: "Data Structures",
        code: "CS-301",
        program: "BS Computer Science",
        students: 38,
        lectures: 30,
        assignments: 10,
        status: "active",
        lastUpdated: "1 day ago",
        credits: 3,
      },
      {
        id: 5,
        title: "Linear Algebra",
        code: "MATH-301",
        program: "BS Computer Science",
        students: 38,
        lectures: 28,
        assignments: 8,
        status: "active",
        lastUpdated: "2 days ago",
        credits: 3,
      },
    ],
  })

  const [submissions] = useState([
    {
      id: 1,
      studentName: "Priya Sharma",
      course: "Data Structures",
      semester: 3,
      assignment: "Binary Tree Implementation",
      status: "pending",
      submittedAt: "2 hours ago",
    },
    {
      id: 2,
      studentName: "Rahul Kumar",
      course: "Linear Algebra",
      semester: 3,
      assignment: "Matrix Operations",
      status: "graded",
      submittedAt: "1 day ago",
    },
    {
      id: 3,
      studentName: "Anita Singh",
      course: "Data Structures",
      semester: 3,
      assignment: "Sorting Algorithms",
      status: "pending",
      submittedAt: "3 hours ago",
    },
  ])

  const sidebarItems = [
    { icon: BookOpen, label: "Dashboard", href: "/teacher/dashboard", active: true },
    { icon: BookOpen, label: "My Courses", href: "/teacher/courses" },
    { icon: FileText, label: "Assignments", href: "/teacher/assignments" },
    { icon: Users, label: "Students", href: "/teacher/students" },
    { icon: Calendar, label: "Schedule", href: "/teacher/schedule" },
    { icon: GraduationCap, label: "Semester Manager", href: "/teacher/semesters" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "graded":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "late":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "graded":
        return <CheckCircle className="w-4 h-4" />
      case "late":
        return <AlertCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      default:
        return null
    }
  }

  const currentCourses = coursesBySemester[selectedSemester] || []

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Teacher Dashboard">
      <div className="space-y-8">
        {/* Teacher Info Header */}
        <Card className="lms-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[rgb(var(--text-accent))]/10 flex items-center justify-center mx-auto mb-2">
                  <GraduationCap className="w-8 h-8 text-[rgb(var(--text-accent))]" />
                </div>
                <h3 className="font-semibold text-[rgb(var(--text-primary))]">{teacherInfo.name}</h3>
                <p className="text-sm text-[rgb(var(--text-secondary))]">{teacherInfo.department} Department</p>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-[rgb(var(--text-primary))]">{teacherInfo.totalCourses}</div>
                <p className="text-sm text-[rgb(var(--text-secondary))]">Total Courses</p>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-[rgb(var(--text-primary))]">{teacherInfo.totalStudents}</div>
                <p className="text-sm text-[rgb(var(--text-secondary))]">Total Students</p>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-[rgb(var(--text-primary))]">8</div>
                <p className="text-sm text-[rgb(var(--text-secondary))]">Active Semesters</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Semester Selector */}
        <Card className="lms-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-[rgb(var(--text-primary))]">Semester Management</CardTitle>
            <div className="flex items-center space-x-4">
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <SelectItem key={sem} value={sem.toString()}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="lms-button-primary rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCourses.map((course) => (
                <Card
                  key={course.id}
                  className="border border-[rgb(var(--sidebar-border))] hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-[rgb(var(--text-primary))] line-clamp-2">{course.title}</h3>
                          <p className="text-sm text-[rgb(var(--text-accent))] font-medium">{course.code}</p>
                          <p className="text-xs text-[rgb(var(--text-secondary))]">{course.program}</p>
                        </div>
                        <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-[rgb(var(--text-secondary))]">
                          <Users className="w-4 h-4 mr-2" />
                          {course.students} students
                        </div>
                        <div className="flex items-center text-sm text-[rgb(var(--text-secondary))]">
                          <BookOpen className="w-4 h-4 mr-2" />
                          {course.lectures} lectures
                        </div>
                        <div className="flex items-center text-sm text-[rgb(var(--text-secondary))]">
                          <FileText className="w-4 h-4 mr-2" />
                          {course.assignments} assignments
                        </div>
                        <div className="flex items-center text-sm text-[rgb(var(--text-secondary))]">
                          <Clock className="w-4 h-4 mr-2" />
                          {course.credits} credits
                        </div>
                        <div className="flex items-center text-sm text-[rgb(var(--text-secondary))]">
                          <Calendar className="w-4 h-4 mr-2" />
                          Updated {course.lastUpdated}
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {currentCourses.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <BookOpen className="w-12 h-12 text-[rgb(var(--text-secondary))] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-[rgb(var(--text-primary))] mb-2">
                    No courses in Semester {selectedSemester}
                  </h3>
                  <p className="text-[rgb(var(--text-secondary))] mb-4">Create your first course for this semester</p>
                  <Button className="lms-button-primary rounded-xl">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Course
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Submissions */}
        <Card className="lms-card">
          <CardHeader>
            <CardTitle className="text-[rgb(var(--text-primary))]">Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between p-4 border border-[rgb(var(--sidebar-border))] rounded-xl hover:bg-[rgb(var(--bg-tertiary))]/30 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[rgb(var(--text-accent))]/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[rgb(var(--text-accent))]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[rgb(var(--text-primary))]">{submission.studentName}</h4>
                      <p className="text-sm text-[rgb(var(--text-secondary))]">
                        {submission.course} (Sem {submission.semester}) • {submission.assignment}
                      </p>
                      <p className="text-xs text-[rgb(var(--text-secondary))]">Submitted {submission.submittedAt}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Badge className={`${getStatusColor(submission.status)} flex items-center space-x-1`}>
                      {getStatusIcon(submission.status)}
                      <span>{submission.status}</span>
                    </Badge>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
