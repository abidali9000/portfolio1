import { Navigation } from "@/components/navigation"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Clock, MessageSquare, Users } from "lucide-react"

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "admin@abidali.vip",
      description: "Get in touch for project inquiries",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      value: "+39 3927035373",
      description: "Available for urgent consultations",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Response Time",
      value: "Within 24 hours",
      description: "Quick turnaround on all inquiries",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      value: "Remote Worldwide",
      description: "Serving clients globally",
    },
  ]

  const services = [
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Project Consultation",
      description: "Free initial consultation to discuss your project requirements and timeline",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Team Collaboration",
      description: "Available for both solo projects and team-based development work",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      {/* Header Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            Let's Work Together
          </Badge>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-slate-900">
            Get In <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your ideas into powerful digital solutions? Let's discuss your project and explore how I
            can help bring your vision to life.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600 flex-shrink-0">{info.icon}</div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{info.title}</h3>
                      <p className="text-lg font-medium text-blue-600">{info.value}</p>
                      <p className="text-sm text-slate-600">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-4">What I Offer</h3>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <Card key={index} className="bg-white/80 backdrop-blur border-0">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-blue-600 mt-1">{service.icon}</div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">{service.title}</h4>
                          <p className="text-sm text-slate-600">{service.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">Send Me a Message</h2>
                  <p className="text-slate-600">
                    Fill out the form below and I'll get back to you within 24 hours to discuss your project.
                  </p>
                </div>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
