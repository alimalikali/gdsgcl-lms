"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Calendar, Clock, Search, AlertTriangle, CheckCircle } from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import Link from "next/link"

export function StudentAssignments() {
  const [assignments] = useState([
    {
      id: 1,
      title: "Calculus Problem Set 3",
      course: "Advanced Mathematics",
      dueDate: "2024-01-15",
      status: "pending",
      priority: "high",
      points: 100,
      description: "Solve integration problems and show detailed work.",
    },
    {
      id: 2,
      title: "Physics Lab Report #3",
      course: "Physics Fundamentals",
      dueDate: "2024-01-18",
      status: "submitted",
      priority: "medium",
      points: 75,
      grade: 68,
      description: "Document your thermodynamics experiment results.",
    },
    {
      id: 3,
      title: "Programming Assignment",
      course: "Computer Science Basics",
      dueDate: "2024-01-22",
      status: "graded",
      priority: "low",
      points: 150,
      grade: 142,
      description: "Create a data structure implementation in Python.",
    },
    {
      id: 4,
      title: "Literature Essay",
      course: "English Literature",
      dueDate: "2024-01-12",
      status: "overdue",
      priority: "high",
      points: 100,
      description: "Analyze themes in Shakespeare's Hamlet.",
    },
  ])

  const sidebarItems = [
    { icon: FileText, label: "Dashboard", href: "/student/dashboard" },
    { icon: FileText, label: "My Courses", href: "/student/courses" },
    { icon: FileText, label: "Assignments", href: "/student/assignments", active: true },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "submitted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "graded":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "graded":
        return <CheckCircle className="w-4 h-4" />
      case "overdue":
        return <AlertTriangle className="w-4 h-4" />
      case "submitted":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const filterAssignments = (status: string) => {
    if (status === "all") return assignments
    return assignments.filter((assignment) => assignment.status === status)
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="My Assignments">
      <div className="space-y-8">
        {/* Search */}
        <div className="relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            style={{ color: "rgb(var(--text-secondary))" }}
          />
          <Input placeholder="Search assignments..." className="pl-10" />
        </div>

        {/* Assignments Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="graded">Graded</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="lms-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold" style={{ color: "rgb(var(--text-primary))" }}>
                            {assignment.title}
                          </h3>
                          <p className="text-sm" style={{ color: "rgb(var(--text-accent))" }}>
                            {assignment.course}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(assignment.priority)}>{assignment.priority}</Badge>
                          <Badge className={`${getStatusColor(assignment.status)} flex items-center space-x-1`}>
                            {getStatusIcon(assignment.status)}
                            <span>{assignment.status}</span>
                          </Badge>
                        </div>
                      </div>

                      <p style={{ color: "rgb(var(--text-secondary))" }}>{assignment.description}</p>

                      <div
                        className="flex items-center space-x-6 text-sm"
                        style={{ color: "rgb(var(--text-secondary))" }}
                      >
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="w-4 h-4" />
                          <span>{assignment.points} points</span>
                        </div>
                        {assignment.grade && (
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="font-medium">
                              Grade: {assignment.grade}/{assignment.points}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="ml-6">
                      <Button size="sm" className="lms-button-primary rounded-xl" asChild>
                        <Link href={`/assignment/${assignment.id}`}>
                          {assignment.status === "pending" || assignment.status === "overdue" ? "Submit" : "View"}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {["pending", "submitted", "graded", "overdue"].map((status) => (
            <TabsContent key={status} value={status} className="space-y-4">
              {filterAssignments(status).map((assignment) => (
                <Card key={assignment.id} className="lms-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold" style={{ color: "rgb(var(--text-primary))" }}>
                              {assignment.title}
                            </h3>
                            <p className="text-sm" style={{ color: "rgb(var(--text-accent))" }}>
                              {assignment.course}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getPriorityColor(assignment.priority)}>{assignment.priority}</Badge>
                            <Badge className={`${getStatusColor(assignment.status)} flex items-center space-x-1`}>
                              {getStatusIcon(assignment.status)}
                              <span>{assignment.status}</span>
                            </Badge>
                          </div>
                        </div>

                        <p style={{ color: "rgb(var(--text-secondary))" }}>{assignment.description}</p>

                        <div
                          className="flex items-center space-x-6 text-sm"
                          style={{ color: "rgb(var(--text-secondary))" }}
                        >
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileText className="w-4 h-4" />
                            <span>{assignment.points} points</span>
                          </div>
                          {assignment.grade && (
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="font-medium">
                                Grade: {assignment.grade}/{assignment.points}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="ml-6">
                        <Button size="sm" className="lms-button-primary rounded-xl" asChild>
                          <Link href={`/assignment/${assignment.id}`}>
                            {assignment.status === "pending" || assignment.status === "overdue" ? "Submit" : "View"}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
