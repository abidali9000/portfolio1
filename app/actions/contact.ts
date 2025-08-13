"use server"

interface ContactFormData {
  name: string
  email: string
  company?: string
  budget?: string
  service: string
  timeline?: string
  message: string
}

export async function submitContactForm(formData: FormData) {
  try {
    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: (formData.get("company") as string) || undefined,
      budget: (formData.get("budget") as string) || undefined,
      service: formData.get("service") as string,
      timeline: (formData.get("timeline") as string) || undefined,
      message: formData.get("message") as string,
    }

    // Validate required fields
    if (!data.name || !data.email || !data.service || !data.message) {
      return { success: false, error: "Please fill in all required fields." }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return { success: false, error: "Please enter a valid email address." }
    }

    // Create email content
    const emailContent = `
New Contact Form Submission from Abid Ali Portfolio

Contact Information:
- Name: ${data.name}
- Email: ${data.email}
- Company: ${data.company || "Not provided"}

Project Details:
- Service Needed: ${data.service}
- Budget: ${data.budget || "Not specified"}
- Timeline: ${data.timeline || "Not specified"}

Message:
${data.message}

---
This message was sent from the contact form on abidali.vip
Contact Phone: +39 3927035373
Submitted at: ${new Date().toLocaleString("en-US", { timeZone: "Europe/Rome" })} (Italy Time)
    `.trim()

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "admin@abidali.vip",
        subject: `New Contact Form Submission from ${data.name}`,
        text: emailContent,
        replyTo: data.email,
      }),
    })

    if (!response.ok) {
      console.error("Failed to send email via API")
      // Still return success to user, but log the issue
    }

    return { success: true }
  } catch (error) {
    console.error("Contact form submission error:", error)
    return { success: false, error: "Failed to send message. Please try again." }
  }
}
