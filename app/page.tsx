import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Globe, Chrome, Database, ArrowRight, Star, Users, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  const services = [
    {
      icon: <Database className="h-8 w-8 text-blue-600" />,
      title: "Custom CMS Solutions",
      description: "Tailored content management systems built to fit your unique business needs and workflows.",
    },
    {
      icon: <Code className="h-8 w-8 text-blue-600" />,
      title: "Web Development",
      description: "Full-stack web applications using modern technologies like React, Next.js, and Node.js.",
    },
    {
      icon: <Chrome className="h-8 w-8 text-blue-600" />,
      title: "Chrome Extensions",
      description: "Powerful browser extensions that enhance productivity and streamline workflows.",
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Custom Coding",
      description: "Bespoke software solutions and integrations tailored to your specific requirements.",
    },
  ]

  const stats = [
    { icon: <Star className="h-5 w-5" />, value: "120+", label: "Projects Completed" },
    { icon: <Users className="h-5 w-5" />, value: "30+", label: "Happy Clients" },
    { icon: <Award className="h-5 w-5" />, value: "5★", label: "Average Rating" },
  ]

  const testimonials = [
    {
      image: "/images/review-wordpress.png",
      alt: "WordPress 4 Pages Website - 5.0 stars, $607.50 project",
    },
    {
      image: "/images/review-donations.png",
      alt: "Custom Donations Payment System - 5.0 stars, $1,112.50 project",
    },
    {
      image: "/images/review-dashboard.png",
      alt: "Custom Dashboard for Mass Messages - 5.0 stars, $1,100.00 project",
    },
    {
      image: "/images/review-squarespace.png",
      alt: "Multi-page Form for Squarespace - 5.0 stars, $1,400.00 project",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                Available for Freelance Work
              </Badge>
              <h1 className="font-serif text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Transforming Ideas into <span className="text-blue-600">Custom Digital Solutions</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Expert in CMS Development, Web Solutions, and Chrome Extensions. I help businesses build powerful,
                scalable digital experiences that drive results.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                <Link href="/projects">
                  Explore My Work <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 border-blue-200 hover:bg-blue-50 bg-transparent"
              >
                <a
                  href="https://www.upwork.com/freelancers/~01c94e6af3f2725140"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hire Me on Upwork
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="text-blue-600">{stat.icon}</div>
                  <div>
                    <div className="font-bold text-2xl text-slate-900">{stat.value}</div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <p className="text-sm text-slate-500 mb-3 font-medium">Verified on Upwork:</p>
              <div className="inline-block">
                <a
                  href="https://www.upwork.com/freelancers/~01c94e6af3f2725140"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:scale-105 transition-transform duration-200"
                >
                  <Image
                    src="/images/upwork-badge.png"
                    alt="Abid Ali - 100% Job Success Score and Top Rated on Upwork"
                    width={300}
                    height={80}
                    className="rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur-2xl opacity-20"></div>
              <Image
                src="/images/abid-formal.jpg"
                alt="Abid Ali - Freelance Developer"
                width={400}
                height={500}
                className="relative rounded-2xl shadow-2xl object-cover w-full h-[500px]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-slate-900">Services I Offer</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur"
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="container mx-auto px-4 py-16 bg-white/50">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-slate-900">Client Success Stories</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Real feedback from satisfied clients on Upwork - all 5-star reviews
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group">
              <a
                href="https://www.upwork.com/freelancers/~01c94e6af3f2725140"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.alt}
                  width={600}
                  height={200}
                  className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-auto"
                />
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            asChild
            className="text-lg px-8 border-blue-200 hover:bg-blue-50 bg-transparent"
          >
            <a href="https://www.upwork.com/freelancers/~01c94e6af3f2725140" target="_blank" rel="noopener noreferrer">
              View All Reviews on Upwork <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 border-0 text-white">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold">Ready to Start Your Project?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Let's discuss how I can help transform your ideas into powerful digital solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="text-lg px-8">
                <Link href="/contact">
                  Get In Touch <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                <a
                  href="https://www.upwork.com/freelancers/~01c94e6af3f2725140"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Upwork Profile
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
