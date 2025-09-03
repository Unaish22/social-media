import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-['Pacifico'] text-primary">
                Social Media Maestro
              </Link>
              <nav className="hidden md:flex ml-10 space-x-8">
                <Link href="#" className="text-gray-700 hover:text-primary font-medium">
                  Product
                </Link>
                <Link href="#" className="text-gray-700 hover:text-primary font-medium">
                  Resources
                </Link>
                <Link href="#" className="text-gray-700 hover:text-primary font-medium">
                  Company
                </Link>
                <Link href="#" className="text-gray-700 hover:text-primary font-medium">
                  Plans & Pricing
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-primary font-medium">
                Sign in
              </Link>
              <Link href="/onboarding">
                <Button className="whitespace-nowrap">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="w-full pt-28 pb-16 md:py-32 bg-gradient-to-r from-blue-50 to-indigo-50"
        style={{
          backgroundImage:
            "url('https://readdy.ai/api/search-image?query=modern%20social%20media%20dashboard%20interface%20with%20soft%20gradient%20background%2C%20professional%20design%2C%20clean%20layout%2C%20statistics%20charts%2C%20content%20calendar%2C%20social%20media%20icons%2C%20blue%20and%20purple%20color%20scheme%2C%20high-quality%203D%20rendering%2C%20photorealistic%2C%20right%20side%20focused%20content%20with%20left%20side%20having%20clean%20gradient%20background%20for%20text&width=1920&height=800&seq=1&orientation=landscape')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center w-full">
            <div className="md:w-1/2 text-left mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Master Your Socials</h1>
              <p className="text-xl text-gray-700 mb-8 max-w-lg">
                Effortlessly elevate your social media strategy with our intuitive tools. Save time, increase
                engagement, and grow your audience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/onboarding">
                  <Button size="lg" className="whitespace-nowrap">
                    Join us now
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="whitespace-nowrap">
                  Request demo
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full w-12 h-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://readdy.ai/api/search-image?query=modern%20social%20media%20dashboard%20interface%20with%20soft%20gradient%20background%2C%20professional%20design%2C%20clean%20layout%2C%20statistics%20charts%2C%20content%20calendar%2C%20social%20media%20icons%2C%20blue%20and%20purple%20color%20scheme%2C%20high-quality%203D%20rendering%2C%20photorealistic%2C%20right%20side%20focused%20content%20with%20left%20side%20having%20clean%20gradient%20background%20for%20text&width=1920&height=800&seq=1&orientation=landscape"
                alt="Social Media Dashboard"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your social media presence in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-primary"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Post Scheduler</h3>
              <p className="text-gray-600 mb-6">
                Plan and schedule your content across multiple platforms. Set it and forget it with our automated
                publishing system.
              </p>
              <img
                src="https://readdy.ai/api/search-image?query=social%20media%20content%20calendar%20interface%20with%20scheduled%20posts%2C%20clean%20modern%20UI%20design%2C%20professional%20layout%2C%20content%20preview%20cards%2C%20time%20slots%20visualization%2C%20soft%20color%20palette%20with%20blue%20accents&width=400&height=250&seq=2&orientation=landscape"
                alt="Post Scheduler"
                className="w-full h-48 object-cover object-top rounded-lg"
              />
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-primary"
                >
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Dashboard</h3>
              <p className="text-gray-600 mb-6">
                Track performance with real-time analytics. Understand your audience and optimize your content strategy with actionable insights.
              </p>
              <img
                src="https://readdy.ai/api/search-image?query=social%20media%20analytics%20dashboard%20with%20charts%2C%20graphs%2C%20engagement%20metrics%2C%20audience%20demographics%2C%20performance%20indicators%2C%20clean%20modern%20UI%20design%2C%20professional%20layout%20with%20data%20visualization%2C%20blue%20and%20white%20color%20scheme&width=400&height=250&seq=3&orientation=landscape"
                alt="Analytics Dashboard"
                className="w-full h-48 object-cover object-top rounded-lg"
              />
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-primary"
                >
                  <path d="M7 20l4-16m2 16l4-16" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Hashtag Generator</h3>
              <p className="text-gray-600 mb-6">
                Discover trending hashtags that boost your visibility. Our AI-powered tool suggests the most effective
                tags for your content.
              </p>
              <img
                src="https://readdy.ai/api/search-image?query=social%20media%20hashtag%20generator%20interface%20showing%20trending%20hashtags%2C%20tag%20cloud%20visualization%2C%20category%20filters%2C%20suggested%20hashtags%20with%20engagement%20metrics%2C%20clean%20modern%20UI%20design%2C%20professional%20layout%20with%20blue%20accent%20colors&width=400&height=250&seq=4&orientation=landscape"
                alt="Hashtag Generator"
                className="w-full h-48 object-cover object-top rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Social Media Strategy?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Join thousands of brands and creators who are growing their audience and saving time with Social Media Maestro.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Column 1 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Enterprise
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    What's New
                  </Link>
                </li>
              </ul>
            </div>
            {/* Column 2 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Guides & Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    API Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            {/* Column 3 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
            {/* Column 4 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Plans & Pricing</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Personal
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Professional
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Enterprise
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Compare Plans
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <Link href="/" className="text-2xl font-['Pacifico'] text-white">
                  Social Media Maestro
                </Link>
                <p className="text-gray-400 mt-2">© 2025 Social Media Maestro. All rights reserved.</p>
              </div>
              <div className="flex space-x-6">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 8a6 6 0 1 1-8 8" />
                  </svg>
                </Link>
                {/* Add more social icons as needed */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
