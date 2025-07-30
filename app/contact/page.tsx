import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "rgb(var(--bg-primary))" }}>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold" style={{ color: "rgb(var(--text-primary))" }}>
                Contact <span style={{ color: "rgb(var(--text-accent))" }}>Us</span>
              </h1>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: "rgb(var(--text-secondary))" }}>
                Get in touch with us for any questions, support, or information about our LMS
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="lms-card">
                <CardHeader>
                  <CardTitle style={{ color: "rgb(var(--text-primary))" }}>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Your first name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Your last name" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="What is this regarding?" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us how we can help you..."
                        className="min-h-[120px] resize-none"
                      />
                    </div>

                    <Button className="w-full lms-button-primary rounded-xl">Send Message</Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="lms-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: "rgb(var(--text-accent), 0.1)" }}
                      >
                        <MapPin className="w-6 h-6" style={{ color: "rgb(var(--text-accent))" }} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2" style={{ color: "rgb(var(--text-primary))" }}>
                          Address
                        </h3>
                        <p style={{ color: "rgb(var(--text-secondary))" }}>
                          Government Dyal Singh Graduate College
                          <br />
                          Karnal, Haryana 132001
                          <br />
                          India
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lms-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: "rgb(var(--text-accent), 0.1)" }}
                      >
                        <Phone className="w-6 h-6" style={{ color: "rgb(var(--text-accent))" }} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2" style={{ color: "rgb(var(--text-primary))" }}>
                          Phone
                        </h3>
                        <p style={{ color: "rgb(var(--text-secondary))" }}>
                          Main Office: +91 184 2270XXX
                          <br />
                          LMS Support: +91 184 2270XXX
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lms-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: "rgb(var(--text-accent), 0.1)" }}
                      >
                        <Mail className="w-6 h-6" style={{ color: "rgb(var(--text-accent))" }} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2" style={{ color: "rgb(var(--text-primary))" }}>
                          Email
                        </h3>
                        <p style={{ color: "rgb(var(--text-secondary))" }}>
                          General: info@dyalsingh.edu.in
                          <br />
                          LMS Support: lms@dyalsingh.edu.in
                          <br />
                          Admissions: admissions@dyalsingh.edu.in
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lms-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: "rgb(var(--text-accent), 0.1)" }}
                      >
                        <Clock className="w-6 h-6" style={{ color: "rgb(var(--text-accent))" }} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2" style={{ color: "rgb(var(--text-primary))" }}>
                          Office Hours
                        </h3>
                        <p style={{ color: "rgb(var(--text-secondary))" }}>
                          Monday - Friday: 9:00 AM - 5:00 PM
                          <br />
                          Saturday: 9:00 AM - 1:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
