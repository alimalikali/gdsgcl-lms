"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Play,
  CheckCircle,
  Clock,
  FileText,
  Download,
  BookOpen,
  Users,
  Calendar,
  GraduationCap,
  Target,
  Award,
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DatabaseService } from "@/lib/database"
import Link from "next/link"

interface CourseDetailsProps {
  courseId: string
}

export function CourseDetails({ courseId }: CourseDetailsProps) {
  const [courseData, setCourseData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const course = DatabaseService.getCourseById(courseId)
    if (course) {
      const teacher = DatabaseService.getTeacherById(course.teacherId)
      const program = DatabaseService.getProgramById(course.programId)
      const assignments = DatabaseService.getAssignmentsByCourse(courseId)
      const lectures = DatabaseService.getLecturesByCourse(courseId)

      // Get student's enrollment data (in real app, this would come from auth context)
      const studentId = "std_001"
      const enrollments = DatabaseService.getEnrollmentsByStudent(studentId)
      const enrollment = enrollments.find((e) => e.courseId === courseId)

      // Get submissions for this course
      const submissions = DatabaseService.getSubmissionsByStudent(studentId)
      const courseSubmissions = submissions.filter((s) => assignments.some((a) => a.id === s.assignmentId))

      setCourseData({
        course,
        teacher,
        program,
        assignments,
        lectures,
        enrollment,
        submissions: courseSubmissions,
      })
    }
    setLoading(false)
  }, [courseId])

  const sidebarItems = [
    { icon: BookOpen, label: "Dashboard", href: "/student/dashboard" },
    { icon: BookOpen, label: "My Courses", href: "/student/courses", active: true },
    { icon: FileText, label: "Assignments", href: "/student/assignments" },
  ]

  if (loading) {
    return (
      <DashboardLayout sidebarItems={sidebarItems} title="Course Details">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--text-accent))] mx-auto mb-4"></div>
            <p className="text-[rgb(var(--text-secondary))]">Loading course details...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!courseData) {
    return (
      <DashboardLayout sidebarItems={sidebarItems} title="Course Details">
        <div className="text-center py-12">
          <p className="text-[rgb(var(--text-secondary))]">Course not found.</p>
        </div>
      </DashboardLayout>
    )
  }

  const { course, teacher, program, assignments, lectures, enrollment, submissions } = courseData

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "graded":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const completedLectures = lectures.filter((l: any) => l.completed).length
  const progressPercentage = lectures.length > 0 ? (completedLectures / lectures.length) * 100 : 0

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Course Details">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/student/courses">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))]">{course.name}</h1>
              <Badge className="bg-[rgb(var(--text-accent))]/10 text-[rgb(var(--text-accent))]">
                Semester {course.semester}
              </Badge>
            </div>
            <div className="flex items-center space-x-4 text-sm text-[rgb(var(--text-secondary))]">
              <span>{course.code}</span>
              <span>•</span>
              <span>{teacher.name}</span>
              <span>•</span>
              <span>{program.name}</span>
              <span>•</span>
              <span>{course.credits} Credits</span>
            </div>
          </div>
        </div>

        {/* Course Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Current Lecture */}
            <Card className="lms-card">
              <CardContent className="p-0">
                <div className="aspect-video bg-[rgb(var(--bg-tertiary))] rounded-t-2xl flex items-center justify-center">
                  <Button size="lg" className="lms-button-primary rounded-full w-16 h-16">
                    <Play className="w-8 h-8 ml-1" />
                  </Button>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[rgb(var(--text-primary))] mb-2">
                    Current Topic: {course.syllabus[2]?.topic || "Course Introduction"}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-[rgb(var(--text-secondary))]">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.syllabus[2]?.hours || 3} hours
                    </span>
                    <span className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-1" />
                      Week {course.syllabus[2]?.week || 3}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      Enrolled Students
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="lectures">Lectures</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="grades">Assessment</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card className="lms-card">
                  <CardHeader>
                    <CardTitle className="text-[rgb(var(--text-primary))]">Course Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[rgb(var(--text-secondary))] leading-relaxed mb-6">{course.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-[rgb(var(--text-primary))] mb-3 flex items-center">
                          <Target className="w-4 h-4 mr-2" />
                          Prerequisites
                        </h4>
                        {course.prerequisites.length > 0 ? (
                          <ul className="space-y-2">
                            {course.prerequisites.map((prereq: string, index: number) => (
                              <li key={index} className="flex items-center text-sm text-[rgb(var(--text-secondary))]">
                                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                {prereq}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-[rgb(var(--text-secondary))]">No prerequisites required</p>
                        )}
                      </div>

                      <div>
                        <h4 className="font-semibold text-[rgb(var(--text-primary))] mb-3 flex items-center">
                          <Award className="w-4 h-4 mr-2" />
                          Learning Outcomes
                        </h4>
                        <ul className="space-y-2">
                          {course.learningOutcomes.map((outcome: string, index: number) => (
                            <li key={index} className="flex items-start text-sm text-[rgb(var(--text-secondary))]">
                              <span className="w-2 h-2 rounded-full bg-[rgb(var(--text-accent))] mt-2 mr-3 flex-shrink-0"></span>
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lms-card">
                  <CardHeader>
                    <CardTitle className="text-[rgb(var(--text-primary))]">Course Syllabus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {course.syllabus.map((week: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border border-[rgb(var(--sidebar-border))] rounded-xl"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-[rgb(var(--text-accent))]/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-[rgb(var(--text-accent))]">{week.week}</span>
                            </div>
                            <div>
                              <h5 className="font-medium text-[rgb(var(--text-primary))]">{week.topic}</h5>
                              <p className="text-sm text-[rgb(var(--text-secondary))]">Week {week.week}</p>
                            </div>
                          </div>
                          <div className="text-sm text-[rgb(var(--text-secondary))]">{week.hours} hours</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lectures" className="space-y-4">
                {lectures.map((lecture: any) => (
                  <Card key={lecture.id} className="lms-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              lecture.completed
                                ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                                : "bg-[rgb(var(--bg-tertiary))] text-[rgb(var(--text-secondary))]"
                            }`}
                          >
                            {lecture.completed ? <CheckCircle className="w-5 h-5" /> : <Play className="w-4 h-4" />}
                          </div>
                          <div>
                            <h4 className="font-semibold text-[rgb(var(--text-primary))]">{lecture.title}</h4>
                            <p className="text-sm text-[rgb(var(--text-secondary))]">{lecture.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-[rgb(var(--text-secondary))] mt-1">
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {lecture.duration} min
                              </span>
                              <span>Week {lecture.week}</span>
                              <span className="capitalize">{lecture.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {lecture.resources.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {lecture.resources.length} resources
                            </Badge>
                          )}
                          <Button size="sm" variant="ghost">
                            {lecture.completed ? "Review" : "Start"}
                          </Button>
                        </div>
                      </div>

                      {lecture.resources.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-[rgb(var(--sidebar-border))]">
                          <h5 className="text-sm font-medium text-[rgb(var(--text-primary))] mb-2">Resources:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {lecture.resources.map((resource: any, idx: number) => (
                              <div key={idx} className="flex items-center space-x-2 text-sm">
                                <FileText className="w-4 h-4 text-[rgb(var(--text-accent))]" />
                                <span className="text-[rgb(var(--text-primary))]">{resource.title}</span>
                                <span className="text-[rgb(var(--text-secondary))]">({resource.size})</span>
                                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                  <Download className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="assignments" className="space-y-4">
                {assignments.map((assignment: any) => {
                  const submission = submissions.find((s: any) => s.assignmentId === assignment.id)
                  return (
                    <Card key={assignment.id} className="lms-card">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-[rgb(var(--text-primary))]">{assignment.title}</h4>
                                <p className="text-sm text-[rgb(var(--text-secondary))] mt-1">
                                  {assignment.description}
                                </p>
                                <Badge className="mt-2 capitalize">{assignment.type}</Badge>
                              </div>
                              <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                            </div>

                            <div className="flex items-center space-x-6 text-sm text-[rgb(var(--text-secondary))]">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Due: {new Date(assignment.dueDate).toLocaleDateString()}
                              </span>
                              <span className="flex items-center">
                                <Award className="w-4 h-4 mr-1" />
                                {assignment.totalMarks} marks
                              </span>
                              {submission && (
                                <span className="flex items-center">
                                  <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                                  Submitted: {new Date(submission.submissionDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>

                            {submission && submission.marksObtained && (
                              <div className="p-3 bg-[rgb(var(--bg-tertiary))]/30 rounded-lg">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-[rgb(var(--text-primary))]">
                                    Grade: {submission.marksObtained}/{assignment.totalMarks}
                                  </span>
                                  <span className="text-sm font-bold text-[rgb(var(--text-accent))]">
                                    {Math.round((submission.marksObtained / assignment.totalMarks) * 100)}%
                                  </span>
                                </div>
                                {submission.feedback && (
                                  <p className="text-sm text-[rgb(var(--text-secondary))] mt-2">
                                    <strong>Feedback:</strong> {submission.feedback}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="ml-6">
                            <Button size="sm" className="lms-button-primary rounded-xl" asChild>
                              <Link href={`/assignment/${assignment.id}`}>
                                {submission ? "View Submission" : "Submit"}
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </TabsContent>

              <TabsContent value="grades" className="space-y-6">
                <Card className="lms-card">
                  <CardHeader>
                    <CardTitle className="text-[rgb(var(--text-primary))]">Assessment Criteria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {course.assessmentCriteria.map((criteria: any, index: number) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-[rgb(var(--text-primary))]">{criteria.type}</span>
                            <span className="text-sm text-[rgb(var(--text-secondary))]">
                              Weight: {criteria.weightage}%
                            </span>
                          </div>
                          <Progress value={criteria.weightage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {enrollment && enrollment.grade && (
                  <Card className="lms-card">
                    <CardHeader>
                      <CardTitle className="text-[rgb(var(--text-primary))]">Your Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-[rgb(var(--text-accent))]/10 rounded-lg">
                          <div className="text-3xl font-bold text-[rgb(var(--text-accent))]">{enrollment.grade}</div>
                          <p className="text-sm text-[rgb(var(--text-secondary))]">Final Grade</p>
                        </div>
                        <div className="text-center p-4 bg-[rgb(var(--bg-tertiary))]/30 rounded-lg">
                          <div className="text-2xl font-bold text-[rgb(var(--text-primary))]">
                            {enrollment.percentage}%
                          </div>
                          <p className="text-sm text-[rgb(var(--text-secondary))]">Percentage</p>
                        </div>
                        <div className="text-center p-4 bg-[rgb(var(--bg-tertiary))]/30 rounded-lg">
                          <div className="text-2xl font-bold text-[rgb(var(--text-primary))]">
                            {enrollment.attendance}%
                          </div>
                          <p className="text-sm text-[rgb(var(--text-secondary))]">Attendance</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card className="lms-card">
              <CardHeader>
                <CardTitle className="text-[rgb(var(--text-primary))]">Course Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[rgb(var(--text-primary))]">
                    {Math.round(progressPercentage)}%
                  </div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    {completedLectures} of {lectures.length} lectures completed
                  </p>
                </div>
                <Progress value={progressPercentage} className="h-3" />
                <Button className="w-full lms-button-primary rounded-xl">Continue Learning</Button>
              </CardContent>
            </Card>

            {/* Course Information */}
            <Card className="lms-card">
              <CardHeader>
                <CardTitle className="text-[rgb(var(--text-primary))]">Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[rgb(var(--text-secondary))]">Instructor</span>
                    <span className="font-medium text-[rgb(var(--text-primary))]">{teacher.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[rgb(var(--text-secondary))]">Designation</span>
                    <span className="font-medium text-[rgb(var(--text-primary))]">{teacher.designation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[rgb(var(--text-secondary))]">Department</span>
                    <span className="font-medium text-[rgb(var(--text-primary))]">{teacher.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[rgb(var(--text-secondary))]">Credits</span>
                    <span className="font-medium text-[rgb(var(--text-primary))]">{course.credits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[rgb(var(--text-secondary))]">Semester</span>
                    <span className="font-medium text-[rgb(var(--text-primary))]">{course.semester}</span>
                  </div>
                  {enrollment && (
                    <div className="flex justify-between">
                      <span className="text-[rgb(var(--text-secondary))]">Attendance</span>
                      <span className="font-medium text-[rgb(var(--text-primary))]">{enrollment.attendance}%</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Teacher Contact */}
            <Card className="lms-card">
              <CardHeader>
                <CardTitle className="text-[rgb(var(--text-primary))]">Contact Instructor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[rgb(var(--text-accent))]/10 flex items-center justify-center mx-auto mb-3">
                    <GraduationCap className="w-8 h-8 text-[rgb(var(--text-accent))]" />
                  </div>
                  <h4 className="font-semibold text-[rgb(var(--text-primary))]">{teacher.name}</h4>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">{teacher.designation}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-[rgb(var(--text-secondary))]" />
                    <span className="text-[rgb(var(--text-secondary))]">Qualification:</span>
                  </div>
                  <p className="text-[rgb(var(--text-primary))] text-xs leading-relaxed ml-6">
                    {teacher.qualification}
                  </p>

                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-[rgb(var(--text-secondary))]" />
                    <span className="text-[rgb(var(--text-secondary))]">Experience:</span>
                    <span className="font-medium text-[rgb(var(--text-primary))]">{teacher.experience} years</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[rgb(var(--sidebar-border))]">
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
