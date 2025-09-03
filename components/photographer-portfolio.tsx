import Image from "next/image"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#c4a484] to-[#e8ddd4] flex items-center justify-center p-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Profile Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm">
              <Image
                src="/images/profile-photo.jpg"
                alt="Fashion Photographer Portrait"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right side - Text Content */}
        <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light tracking-[0.3em] text-gray-800 leading-tight">
              RAJ SINGH
            </h1>
            <p className="text-sm lg:text-base tracking-[0.2em] text-gray-600 font-light">FASHION PHOTOGRAPHER</p>
          </div>

          {/* Vertical line separator */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-px h-16 bg-gray-400"></div>
          </div>

          {/* Quote */}
          <div className="max-w-md">
            <blockquote className="text-xs lg:text-sm text-gray-600 font-light tracking-wide leading-relaxed">
              "A PICTURE IS A SECRET ABOUT A SECRET.
              <br />
              THE MORE IT TELLS YOU THE LESS YOU KNOW."
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  )
}
