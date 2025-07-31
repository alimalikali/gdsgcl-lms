import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Users, Clock, Star, Search } from "lucide-react"

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      title: "Advanced Mathematics",
      instructor: "Dr. Rajesh Kumar",
      description:
        "Master advanced mathematical concepts including calculus, linear algebra, and differential equations.",
      students: 45,
      duration: "12 weeks",
      rating: 4.8,
      level: "Advanced",
      category: "Mathematics",
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      instructor: "Prof. Anita Sharma",
      description: "Comprehensive introduction to physics principles, mechanics, and thermodynamics.",
      students: 38,
      duration: "10 weeks",
      rating: 4.6,
      level: "Intermediate",
      category: "Physics",
    },
    {
      id: 3,
      title: "Computer Science Basics",
      instructor: "Dr. Vikash Gupta",
      description: "Introduction to programming, data structures, and computer science fundamentals.",
      students: 52,
      duration: "14 weeks",
      rating: 4.9,
      level: "Beginner",
      category: "Computer Science",
    },
    {
      id: 4,
      title: "English Literature",
      instructor: "Dr. Priya Mehta",
      description: "Explore classic and contemporary literature with critical analysis and interpretation.",
      students: 35,
      duration: "16 weeks",
      rating: 4.7,
      level: "Intermediate",
      category: "Literature",
    },
    {
      id: 5,
      title: "Chemistry Laboratory",
      instructor: "Prof. Suresh Patel",
      description: "Hands-on chemistry experiments and practical applications of chemical principles.",
      students: 28,
      duration: "12 weeks",
      rating: 4.5,
      level: "Intermediate",
      category: "Chemistry",
    },
    {
      id: 6,
      title: "History of India",
      instructor: "Dr. Meera Singh",
      description: "Comprehensive study of Indian history from ancient times to modern era.",
      students: 42,
      duration: "15 weeks",
      rating: 4.8,
      level: "Beginner",
      category: "History",
    },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "rgb(var(--bg-primary))" }}>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold" style={{ color: "rgb(var(--text-primary))" }}>
                Available <span style={{ color: "rgb(var(--text-accent))" }}>Courses</span>
              </h1>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: "rgb(var(--text-secondary))" }}>
                Explore our comprehensive range of courses designed to enhance your knowledge and skills
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8" style={{ backgroundColor: "rgb(var(--bg-tertiary), 0.3)" }}>
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                  style={{ color: "rgb(var(--text-secondary))" }}
                />
                <Input placeholder="Search courses..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">All Categories</Button>
                <Button variant="outline">Mathematics</Button>
                <Button variant="outline">Science</Button>
                <Button variant="outline">Literature</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Card key={course.id} className="lms-card hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium" style={{ color: "rgb(var(--text-primary))" }}>
                            {course.rating}
                          </span>
                        </div>
                      </div>

                      <h3
                        className="text-xl font-semibold group-hover:text-[rgb(var(--text-accent))] transition-colors"
                        style={{ color: "rgb(var(--text-primary))" }}
                      >
                        {course.title}
                      </h3>

                      <p className="text-sm font-medium" style={{ color: "rgb(var(--text-accent))" }}>
                        {course.instructor}
                      </p>

                      <p style={{ color: "rgb(var(--text-secondary))" }} className="line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    <div
                      className="flex items-center justify-between text-sm"
                      style={{ color: "rgb(var(--text-secondary))" }}
                    >
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students} students</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    <div className="pt-4 space-y-2">
                      <Button className="w-full lms-button-primary rounded-xl">
                        <BookOpen className="w-4 h-4 mr-2" />
                        View Course
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
