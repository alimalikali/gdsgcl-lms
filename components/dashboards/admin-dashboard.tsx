"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  BookOpen,
  FileText,
  Settings,
  MoreHorizontal,
  Search,
  UserPlus,
  Shield,
  ShieldCheck,
  Crown,
  TrendingUp,
  Activity,
  Download,
} from "lucide-react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { BulkUserUpload } from "@/components/admin/bulk-user-upload"
import { SingleUserForm } from "@/components/admin/single-user-form"

export function AdminDashboard() {
  const [users] = useState([
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      email: "rajesh.kumar@dyalsingh.edu.in",
      role: "teacher",
      status: "active",
      lastLogin: "2 hours ago",
      courses: 3,
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@student.dyalsingh.edu.in",
      role: "student",
      status: "active",
      lastLogin: "1 day ago",
      courses: 5,
    },
    {
      id: 3,
      name: "Prof. Anita Singh",
      email: "anita.singh@dyalsingh.edu.in",
      role: "teacher",
      status: "active",
      lastLogin: "3 hours ago",
      courses: 2,
    },
    {
      id: 4,
      name: "Rahul Verma",
      email: "rahul.verma@student.dyalsingh.edu.in",
      role: "student",
      status: "suspended",
      lastLogin: "1 week ago",
      courses: 4,
    },
  ])

  const [courses] = useState([
    {
      id: 1,
      title: "Advanced Mathematics",
      instructor: "Dr. Rajesh Kumar",
      students: 45,
      status: "active",
      createdAt: "2024-01-01",
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      instructor: "Prof. Anita Singh",
      students: 38,
      status: "active",
      createdAt: "2024-01-05",
    },
    {
      id: 3,
      title: "Computer Science Basics",
      instructor: "Dr. Vikash Gupta",
      students: 52,
      status: "draft",
      createdAt: "2024-01-10",
    },
  ])

  const [activeTab, setActiveTab] = useState("overview")

  const sidebarItems = [
    { icon: Activity, label: "Dashboard", href: "/admin/dashboard", active: true },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: BookOpen, label: "Courses", href: "/admin/courses" },
    { icon: FileText, label: "Reports", href: "/admin/reports" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ]

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="w-4 h-4" />
      case "teacher":
        return <ShieldCheck className="w-4 h-4" />
      case "student":
        return <Shield className="w-4 h-4" />
      default:
        return <Shield className="w-4 h-4" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "teacher":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "student":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const downloadSampleCSV = () => {
    const sampleData = [
      ["name", "email", "role", "phone", "cnic", "fatherName", "address", "dateOfBirth", "program"],
      [
        "Muhammad Ahmad Khan",
        "ahmad.khan@student.dyalsingh.edu.pk",
        "student",
        "+92-300-1234567",
        "37405-1234567-1",
        "Abdul Rahman Khan",
        "House No. 123, Street 5, Satellite Town, Gujranwala",
        "2003-03-15",
        "BS-CS",
      ],
      [
        "Dr. Muhammad Tariq",
        "tariq@dyalsingh.edu.pk",
        "teacher",
        "+92-302-1234567",
        "37405-2345678-2",
        "",
        "Model Town, Gujranwala",
        "1980-05-20",
        "",
      ],
      [
        "Fatima Shahid",
        "fatima@student.dyalsingh.edu.pk",
        "student",
        "+92-301-2345678",
        "37405-3456789-3",
        "Muhammad Shahid Ali",
        "Block B, Model Town, Gujranwala",
        "2003-07-22",
        "BS-MATH",
      ],
    ]

    const csvContent = sampleData.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sample_users.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Admin Dashboard">
      <div className="space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="bulk-upload">Bulk Upload</TabsTrigger>
            <TabsTrigger value="add-user">Add User</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="lms-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[rgb(var(--text-secondary))]">Total Users</p>
                      <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">1,247</p>
                      <p className="text-xs text-green-600">+12% from last month</p>
                    </div>
                    <Users className="w-8 h-8 text-[rgb(var(--text-accent))]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="lms-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[rgb(var(--text-secondary))]">Active Courses</p>
                      <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">89</p>
                      <p className="text-xs text-green-600">+5% from last month</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-[rgb(var(--text-accent))]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="lms-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[rgb(var(--text-secondary))]">Teachers</p>
                      <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">47</p>
                      <p className="text-xs text-blue-600">+3 new this month</p>
                    </div>
                    <ShieldCheck className="w-8 h-8 text-[rgb(var(--text-accent))]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="lms-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[rgb(var(--text-secondary))]">Students</p>
                      <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">1,200</p>
                      <p className="text-xs text-green-600">+8% from last month</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-[rgb(var(--text-accent))]" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Course Statistics */}
            <Card className="lms-card">
              <CardHeader>
                <CardTitle className="text-[rgb(var(--text-primary))]">Course Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Title</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium text-[rgb(var(--text-primary))]">{course.title}</TableCell>
                        <TableCell className="text-[rgb(var(--text-secondary))]">{course.instructor}</TableCell>
                        <TableCell className="text-[rgb(var(--text-secondary))]">{course.students}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
                        </TableCell>
                        <TableCell className="text-[rgb(var(--text-secondary))]">
                          {new Date(course.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Course</DropdownMenuItem>
                              <DropdownMenuItem>Edit Course</DropdownMenuItem>
                              <DropdownMenuItem>View Analytics</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Delete Course</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {/* User Management */}
            <Card className="lms-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-[rgb(var(--text-primary))]">User Management</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgb(var(--text-secondary))]" />
                    <Input placeholder="Search users..." className="pl-10 w-64" />
                  </div>
                  <Button className="lms-button-primary rounded-xl" onClick={() => setActiveTab("add-user")}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Courses</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium text-[rgb(var(--text-primary))]">{user.name}</TableCell>
                        <TableCell className="text-[rgb(var(--text-secondary))]">{user.email}</TableCell>
                        <TableCell>
                          <Badge className={`${getRoleColor(user.role)} flex items-center space-x-1 w-fit`}>
                            {getRoleIcon(user.role)}
                            <span>{user.role}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                        </TableCell>
                        <TableCell className="text-[rgb(var(--text-secondary))]">{user.lastLogin}</TableCell>
                        <TableCell className="text-[rgb(var(--text-secondary))]">{user.courses}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit User</DropdownMenuItem>
                              <DropdownMenuItem>Change Role</DropdownMenuItem>
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                {user.status === "active" ? "Suspend" : "Activate"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bulk-upload" className="space-y-6">
            <Card className="lms-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-[rgb(var(--text-primary))]">Bulk User Upload</CardTitle>
                  <p className="text-sm text-[rgb(var(--text-secondary))] mt-1">
                    Upload multiple users at once using a CSV file
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={downloadSampleCSV}
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Sample CSV</span>
                </Button>
              </CardHeader>
              <CardContent>
                <BulkUserUpload />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add-user" className="space-y-6">
            <Card className="lms-card">
              <CardHeader>
                <CardTitle className="text-[rgb(var(--text-primary))]">Add New User</CardTitle>
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  Create a new user account for student, teacher, or admin
                </p>
              </CardHeader>
              <CardContent>
                <SingleUserForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
