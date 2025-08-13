import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Mail, Phone, Calendar } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      {/* Header Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            Legal Information
          </Badge>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-slate-900">
            Privacy <span className="text-blue-600">Policy</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal
            information.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/90 backdrop-blur border-0 shadow-xl">
            <CardContent className="p-8 lg:p-12">
              <div className="space-y-8">
                {/* Last Updated */}
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-8">
                  <Calendar className="h-4 w-4" />
                  <span>Last updated: January 2025</span>
                </div>

                {/* Introduction */}
                <section className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                    <h2 className="font-serif text-2xl font-bold text-slate-900">Introduction</h2>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Abid Ali ("we," "our," or "us") operates the website abidali.vip (the "Service"). This page informs
                    you of our policies regarding the collection, use, and disclosure of personal data when you use our
                    Service and the choices you have associated with that data.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    We use your data to provide and improve the Service. By using the Service, you agree to the
                    collection and use of information in accordance with this policy.
                  </p>
                </section>

                {/* Information Collection */}
                <section className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-slate-900">Information We Collect</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-2">Personal Information</h3>
                      <p className="text-slate-600 leading-relaxed">
                        When you contact us through our contact form or email, we may collect the following personal
                        information:
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600 ml-4">
                        <li>Full name</li>
                        <li>Email address</li>
                        <li>Company or organization name</li>
                        <li>Project details and requirements</li>
                        <li>Budget and timeline preferences</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-2">Usage Data</h3>
                      <p className="text-slate-600 leading-relaxed">
                        We may collect information about how the Service is accessed and used. This may include your
                        computer's IP address, browser type, browser version, pages visited, time and date of visit, and
                        other diagnostic data.
                      </p>
                    </div>
                  </div>
                </section>

                {/* How We Use Information */}
                <section className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-slate-900">How We Use Your Information</h2>
                  <p className="text-slate-600 leading-relaxed">We use the collected data for various purposes:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 ml-4">
                    <li>To respond to your inquiries and provide customer support</li>
                    <li>To communicate with you about potential projects and services</li>
                    <li>To improve our website and services</li>
                    <li>To send you updates about our services (with your consent)</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </section>

                {/* Data Sharing */}
                <section className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-slate-900">Data Sharing and Disclosure</h2>
                  <p className="text-slate-600 leading-relaxed">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your
                    consent, except in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 ml-4">
                    <li>When required by law or legal process</li>
                    <li>To protect our rights, property, or safety</li>
                    <li>
                      With trusted service providers who assist in operating our website (under strict confidentiality
                      agreements)
                    </li>
                  </ul>
                </section>

                {/* Data Security */}
                <section className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-slate-900">Data Security</h2>
                  <p className="text-slate-600 leading-relaxed">
                    The security of your personal information is important to us. We implement appropriate technical and
                    organizational measures to protect your personal data against unauthorized access, alteration,
                    disclosure, or destruction. However, no method of transmission over the internet or electronic
                    storage is 100% secure.
                  </p>
                </section>

                {/* Data Retention */}
                <section className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-slate-900">Data Retention</h2>
                  <p className="text-slate-600 leading-relaxed">
                    We retain your personal information only for as long as necessary to fulfill the purposes outlined
                    in this Privacy Policy, unless a longer retention period is required or permitted by law. Contact
                    form submissions are typically retained for up to 2 years for business purposes.
                  </p>
                </section>

                {/* Your Rights */}
                <section className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-slate-900">Your Rights</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Depending on your location, you may have the following rights regarding your personal data:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 ml-4">
                    <li>The right to access your personal data</li>
                    <li>The right to rectify inaccurate personal data</li>
                    <li>The right to erase your personal data</li>
                    <li>The right to restrict processing of your personal data</li>
                    <li>The right to data portability</li>
                    <li>The right to object to processing</li>
                  </ul>
                  <p className="text-slate-600 leading-relaxed mt-4">
                    To exercise these rights, please contact us using the information provided below.
                  </p>
                </section>

                {/* Cookies */}
                <section className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-slate-900">Cookies and Tracking</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Our website may use cookies and similar tracking technologies to enhance your browsing experience.
                    Cookies are small data files stored on your device. You can control cookie settings through your
                    browser preferences.
                  </p>
                </section>

                {/* Third-Party Links */}
                <section className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-slate-900">Third-Party Links</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Our website may contain links to third-party websites, including our Upwork profile and project
                    demonstrations. We are not responsible for the privacy practices of these external sites. We
                    encourage you to review their privacy policies.
                  </p>
                </section>

                {/* Changes to Policy */}
                <section className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-slate-900">Changes to This Privacy Policy</h2>
                  <p className="text-slate-600 leading-relaxed">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                    new Privacy Policy on this page and updating the "Last updated" date. Changes are effective
                    immediately upon posting.
                  </p>
                </section>

                {/* Contact Information */}
                <section className="space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-slate-900">Contact Us</h2>
                  <p className="text-slate-600 leading-relaxed">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-blue-50 rounded-lg p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <span className="text-slate-900">
                        <strong>Email:</strong> admin@abidali.vip
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <span className="text-slate-900">
                        <strong>Phone:</strong> +39 3927035373
                      </span>
                    </div>
                  </div>
                </section>

                {/* External Privacy Policy Link */}
                <section className="space-y-4 border-t pt-8">
                  <h2 className="font-serif text-2xl font-bold text-slate-900">Additional Resources</h2>
                  <p className="text-slate-600 leading-relaxed">
                    For more detailed information about our privacy practices, you can also refer to our comprehensive
                    privacy documentation:
                  </p>
                  <a
                    href="https://abidali.vip/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View Detailed Privacy Policy
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
