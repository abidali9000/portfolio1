"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const projectLinks = [
    { name: "Image to Text", href: "https://abidali.vip/scanner/" },
    { name: "LinkedIn Extension", href: "https://abidali.vip/linkreach/" },
    { name: "3D Human Anatomy", href: "https://abidali.vip/anatomy/" },
    { name: "3D Operation Theatre", href: "https://abidali.vip/Room/" },
    { name: "Interactive Form", href: "https://abidali.vip/referral" },
    { name: "Course Page", href: "https://abidali.vip/top-surgeon/success" },
    { name: "Generate GitHub Repo", href: "https://abidali.vip/github" },
    { name: "Code Builder", href: "https://html.abidali.vip/" },
    { name: "Data Science Project", href: "https://abidali.vip/datascience" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-serif text-xl font-bold text-blue-600">
            Abid Ali
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Home
            </Link>
            <a
              href="https://abidali.vip/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Old Projects
            </a>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium hover:text-blue-600 transition-colors">
                New Projects <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {projectLinks.map((project) => (
                  <DropdownMenuItem key={project.name} asChild>
                    <a href={project.href} target="_blank" rel="noopener noreferrer" className="w-full">
                      {project.name}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>

            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <a
                href="https://www.upwork.com/freelancers/~01c94e6af3f2725140"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hire Me on Upwork
              </a>
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/" className="block text-sm font-medium hover:text-blue-600 transition-colors">
              Home
            </Link>
            <a
              href="https://abidali.vip/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Old Projects
            </a>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">New Projects:</p>
              {projectLinks.map((project) => (
                <a
                  key={project.name}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block pl-4 text-sm hover:text-blue-600 transition-colors"
                >
                  {project.name}
                </a>
              ))}
            </div>
            <Link href="/contact" className="block text-sm font-medium hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="block text-sm font-medium hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
              <a
                href="https://www.upwork.com/freelancers/~01c94e6af3f2725140"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hire Me on Upwork
              </a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
