import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Marketing Dashboard</h1>
        <p className="text-gray-500">Friday, April 25, 2025</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today's Scheduled Posts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Today's Scheduled Posts</CardTitle>
            <Button variant="link" className="text-primary p-0 h-auto">
              View All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1 h-4 w-4"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="text-center min-w-16">
                    <div className="text-sm font-medium text-gray-500">9:30 AM</div>
                    <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-700 hover:bg-blue-100">
                      Instagram
                    </Badge>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">Product Launch Announcement</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Introducing our new spring collection with exclusive early-bird discounts.
                    </p>

                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="text-center min-w-16">
                    <div className="text-sm font-medium text-gray-500">12:00 PM</div>
                    <Badge variant="secondary" className="mt-1 bg-green-100 text-green-700 hover:bg-green-100">
                      Twitter
                    </Badge>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">Industry News Update</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Breaking: New market trends show 32% increase in digital engagement. Our analysis coming soon!
                    </p>

                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="text-center min-w-16">
                    <div className="text-sm font-medium text-gray-500">3:45 PM</div>
                    <Badge variant="secondary" className="mt-1 bg-purple-100 text-purple-700 hover:bg-purple-100">
                      LinkedIn
                    </Badge>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">Case Study Publication</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      How we helped TechCorp increase conversion rates by 45% in just 3 months.
                    </p>

                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Performance Overview</CardTitle>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                This Week
              </Badge>
              <Badge variant="outline">Last Week</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gray-50 p-3 rounded-xl">
                <div className="text-sm text-gray-500">Engagement</div>
                <div className="text-xl font-semibold mt-1">8,742</div>
                <div className="text-xs text-green-600 flex items-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3 mr-1"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                  <span>12.3%</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl">
                <div className="text-sm text-gray-500">Reach</div>
                <div className="text-xl font-semibold mt-1">24,591</div>
                <div className="text-xs text-green-600 flex items-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3 mr-1"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                  <span>8.7%</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl">
                <div className="text-sm text-gray-500">Conversions</div>
                <div className="text-xl font-semibold mt-1">1,283</div>
                <div className="text-xs text-red-600 flex items-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3 mr-1"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                  <span>2.1%</span>
                </div>
              </div>
            </div>

            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Performance Chart</p>
            </div>
          </CardContent>
        </Card>

        {/* Smart Suggestions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Smart Suggestions</CardTitle>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
              >
                <path d="M12 2v8" />
                <path d="m4.93 10.93 1.41 1.41" />
                <path d="M2 18h2" />
                <path d="M20 18h2" />
                <path d="m19.07 10.93-1.41 1.41" />
                <path d="M22 22H2" />
                <path d="m16 6-4 4-4-4" />
                <path d="M16 18a4 4 0 0 0-8 0" />
              </svg>
              <span>AI Generated</span>
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">Optimize Post Timing</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Your audience is most active between 7-9 PM. Consider rescheduling your evening posts to this
                      timeframe for 28% higher engagement.
                    </p>

                    <div className="flex gap-2 mt-3">
                      <Button size="sm">Apply</Button>
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <line x1="10" y1="9" x2="8" y2="9" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">Content Gap Opportunity</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Your competitors are getting traction with tutorial content. Consider creating a how-to series for
                      your product features.
                    </p>

                    <div className="flex gap-2 mt-3">
                      <Button size="sm">Create Series</Button>
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M7 20l4-16m2 16l4-16" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">Trending Hashtag Alert</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      #SustainableBusiness is trending in your industry. Add this to your next post about your
                      eco-friendly initiatives.
                    </p>

                    <div className="flex gap-2 mt-3">
                      <Button size="sm">Use Hashtag</Button>
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trending Topics */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Trending Topics</CardTitle>
            <select className="bg-white border border-gray-200 text-gray-600 px-3 py-1 text-sm rounded pr-8">
              <option>Your Industry</option>
              <option>Technology</option>
              <option>Marketing</option>
              <option>E-commerce</option>
            </select>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">High Relevance</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-green-600"
                  >
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                  </svg>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="hover:bg-primary/5 cursor-pointer">
                    #SustainableBusiness
                  </Badge>
                  <Badge variant="outline" className="hover:bg-primary/5 cursor-pointer">
                    #DigitalTransformation
                  </Badge>
                  <Badge variant="outline" className="hover:bg-primary/5 cursor-pointer">
                    #CustomerExperience
                  </Badge>
                  <Badge variant="outline" className="hover:bg-primary/5 cursor-pointer">
                    #RemoteWork
                  </Badge>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Medium Relevance</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-yellow-600"
                  >
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                  </svg>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="hover:bg-primary/5 cursor-pointer">
                    #ArtificialIntelligence
                  </Badge>
                  <Badge variant="outline" className="hover:bg-primary/5 cursor-pointer">
                    #FutureOfWork
                  </Badge>
                  <Badge variant="outline" className="hover:bg-primary/5 cursor-pointer">
                    #DataPrivacy
                  </Badge>
                  <Badge variant="outline" className="hover:bg-primary/5 cursor-pointer">
                    #InnovationStrategy
                  </Badge>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Emerging Topics</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-blue-600"
                  >
                    <path d="M22 2 11 13" />
                    <path d="M22 2 15 22 11 13 2 9 22 2z" />
                  </svg>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="hover:bg-primary/5 cursor-pointer">
                    #CircularEconomy
                  </Badge>
                  <Badge variant="outline" className="hover:bg-primary/5 cursor-pointer">
                    #Web3Marketing
                  </Badge>
                  <Badge variant="outline" className="hover:bg-primary/5 cursor-pointer">
                    #AugmentedReality
                  </Badge>
                  <Badge variant="outline" className="hover:bg-primary/5 cursor-pointer">
                    #VoiceSearch
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
