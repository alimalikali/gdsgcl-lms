import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Users, BookOpen, Award, Target, Eye, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "rgb(var(--bg-primary))" }}>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold" style={{ color: "rgb(var(--text-primary))" }}>
                About <span style={{ color: "rgb(var(--text-accent))" }}>Dyal Singh LMS</span>
              </h1>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: "rgb(var(--text-secondary))" }}>
                Empowering education through technology at Government Dyal Singh Graduate College
              </p>
            </div>
          </div>
        </section>

        {/* College Info */}
        <section className="py-16" style={{ backgroundColor: "rgb(var(--bg-tertiary), 0.3)" }}>
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold" style={{ color: "rgb(var(--text-primary))" }}>
                  Government Dyal Singh Graduate College
                </h2>
                <p className="text-lg leading-relaxed" style={{ color: "rgb(var(--text-secondary))" }}>
                  Established with a vision to provide quality higher education, Government Dyal Singh Graduate College
                  has been a beacon of learning in Karnal, Haryana. Our institution is committed to academic excellence,
                  character building, and holistic development of students.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: "rgb(var(--text-secondary))" }}>
                  With our modern Learning Management System, we bridge the gap between traditional education and
                  digital innovation, ensuring our students are prepared for the challenges of tomorrow.
                </p>
              </div>
              <div className="lms-card p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: "rgb(var(--text-accent), 0.1)" }}
                    >
                      <Users className="w-8 h-8" style={{ color: "rgb(var(--text-accent))" }} />
                    </div>
                    <div className="text-2xl font-bold" style={{ color: "rgb(var(--text-primary))" }}>
                      2,500+
                    </div>
                    <div className="text-sm" style={{ color: "rgb(var(--text-secondary))" }}>
                      Students
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: "rgb(var(--text-accent), 0.1)" }}
                    >
                      <BookOpen className="w-8 h-8" style={{ color: "rgb(var(--text-accent))" }} />
                    </div>
                    <div className="text-2xl font-bold" style={{ color: "rgb(var(--text-primary))" }}>
                      150+
                    </div>
                    <div className="text-sm" style={{ color: "rgb(var(--text-secondary))" }}>
                      Courses
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: "rgb(var(--text-accent), 0.1)" }}
                    >
                      <GraduationCap className="w-8 h-8" style={{ color: "rgb(var(--text-accent))" }} />
                    </div>
                    <div className="text-2xl font-bold" style={{ color: "rgb(var(--text-primary))" }}>
                      50+
                    </div>
                    <div className="text-sm" style={{ color: "rgb(var(--text-secondary))" }}>
                      Faculty
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: "rgb(var(--text-accent), 0.1)" }}
                    >
                      <Award className="w-8 h-8" style={{ color: "rgb(var(--text-accent))" }} />
                    </div>
                    <div className="text-2xl font-bold" style={{ color: "rgb(var(--text-primary))" }}>
                      1,200+
                    </div>
                    <div className="text-sm" style={{ color: "rgb(var(--text-secondary))" }}>
                      Graduates
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="lms-card p-8 text-center">
                <CardContent className="p-0 space-y-4">
                  <div
                    className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
                    style={{ backgroundColor: "rgb(var(--text-accent), 0.1)" }}
                  >
                    <Target className="w-8 h-8" style={{ color: "rgb(var(--text-accent))" }} />
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: "rgb(var(--text-primary))" }}>
                    Our Mission
                  </h3>
                  <p style={{ color: "rgb(var(--text-secondary))" }}>
                    To provide accessible, quality higher education that empowers students with knowledge, skills, and
                    values necessary for personal growth and societal contribution.
                  </p>
                </CardContent>
              </Card>

              <Card className="lms-card p-8 text-center">
                <CardContent className="p-0 space-y-4">
                  <div
                    className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
                    style={{ backgroundColor: "rgb(var(--text-accent), 0.1)" }}
                  >
                    <Eye className="w-8 h-8" style={{ color: "rgb(var(--text-accent))" }} />
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: "rgb(var(--text-primary))" }}>
                    Our Vision
                  </h3>
                  <p style={{ color: "rgb(var(--text-secondary))" }}>
                    To be a leading institution of higher learning that fosters innovation, critical thinking, and
                    excellence in education while embracing technological advancement.
                  </p>
                </CardContent>
              </Card>

              <Card className="lms-card p-8 text-center">
                <CardContent className="p-0 space-y-4">
                  <div
                    className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
                    style={{ backgroundColor: "rgb(var(--text-accent), 0.1)" }}
                  >
                    <Heart className="w-8 h-8" style={{ color: "rgb(var(--text-accent))" }} />
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: "rgb(var(--text-primary))" }}>
                    Our Values
                  </h3>
                  <p style={{ color: "rgb(var(--text-secondary))" }}>
                    Integrity, Excellence, Innovation, Inclusivity, and Social Responsibility guide our commitment to
                    nurturing well-rounded individuals and contributing to society.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
