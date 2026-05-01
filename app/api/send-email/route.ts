import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, subject, text, replyTo } = body

    console.log("Email API called with:", { to, subject, replyTo })
    console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY)
    console.log("RESEND_API_KEY starts with 're_':", process.env.RESEND_API_KEY?.startsWith("re_"))

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set")
      return NextResponse.json({ success: false, error: "Email service not configured" }, { status: 500 })
    }

    // Using Resend API for email sending
    const emailPayload = {
      from: "Abid Ali Portfolio <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            ${(text as string)
              .split("\n")
              .map((line: string) => `<p style="margin: 8px 0;">${line}</p>`)
              .join("")}
          </div>
          <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
            This message was sent from your portfolio website contact form.
          </p>
        </div>
      `,
      text: text,
      reply_to: replyTo,
    }

    console.log("Sending email with payload:", emailPayload)

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    })

    const responseText = await response.text()
    console.log("Resend API response status:", response.status)
    console.log("Resend API response:", responseText)

    if (!response.ok) {
      let errorData
      try {
        errorData = JSON.parse(responseText)
      } catch {
        errorData = { message: responseText }
      }

      console.error("Resend API error:", errorData)
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send email",
          details: errorData,
          status: response.status,
        },
        { status: 500 },
      )
    }

    const data = JSON.parse(responseText)
    console.log("Email sent successfully:", data)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
