"use client"

import Image from "next/image"
import { colorSchemes, type Template } from "../lib/template-dataset"

interface TemplatePreviewProps {
  template: Template
  className?: string
}

export default function TemplatePreview({ template, className = "" }: TemplatePreviewProps) {
  const { data } = template
  const currentColorScheme = colorSchemes[data.colorScheme as keyof typeof colorSchemes]

  const getContainerClass = () => {
    switch (data.format) {
      case "square":
        return "aspect-square"
      case "vertical":
        return "aspect-[9/16]"
      case "horizontal":
        return "aspect-[16/9]"
      default:
        return "aspect-[4/3]"
    }
  }

  const renderLayout = () => {
    switch (data.layout) {
      case "modern":
        return (
          <div
            className={`flex ${data.format === "vertical" ? "flex-col" : data.format === "horizontal" ? "flex-row" : "flex-row"} items-center gap-4`}
          >
            <div className="flex-1 space-y-2">
              <h1
                className={`${data.format === "vertical" ? "text-lg" : data.format === "horizontal" ? "text-2xl" : "text-xl"} font-black tracking-tight text-gray-900 leading-none`}
              >
                {data.name}
              </h1>
              <p
                className={`${data.format === "horizontal" ? "text-sm" : "text-xs"} tracking-[0.2em] text-gray-700 font-medium`}
              >
                {data.profession}
              </p>
              <div className={`${data.format === "horizontal" ? "w-12 h-1" : "w-8 h-0.5"} bg-gray-900`}></div>
              <blockquote
                className={`${data.format === "horizontal" ? "text-sm" : "text-xs"} text-gray-600 font-light leading-relaxed`}
              >
                {data.quote.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < data.quote.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </blockquote>
            </div>
            <div
              className={`${data.format === "vertical" ? "w-16 h-16" : data.format === "horizontal" ? "w-24 h-24" : "w-20 h-20"} rounded-lg overflow-hidden shadow-lg`}
            >
              <Image
                src={data.imageUrl || "/placeholder.svg"}
                alt="Profile Photo"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )

      case "minimal":
        return (
          <div className={`${data.format === "horizontal" ? "flex items-center gap-6" : "text-center"} space-y-3`}>
            <div
              className={`${data.format === "vertical" ? "w-12 h-12" : data.format === "horizontal" ? "w-20 h-20" : "w-16 h-16"} ${data.format === "horizontal" ? "" : "mx-auto"} rounded-full overflow-hidden border-2 border-white shadow-sm`}
            >
              <Image
                src={data.imageUrl || "/placeholder.svg"}
                alt="Profile Photo"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`${data.format === "horizontal" ? "flex-1" : ""} space-y-1`}>
              <h1
                className={`${data.format === "vertical" ? "text-sm" : data.format === "horizontal" ? "text-xl" : "text-lg"} font-light tracking-[0.3em] text-gray-800`}
              >
                {data.name}
              </h1>
              <p
                className={`${data.format === "horizontal" ? "text-sm" : "text-xs"} tracking-[0.2em] text-gray-500 uppercase`}
              >
                {data.profession}
              </p>
              <div
                className={`${data.format === "horizontal" ? "w-8 h-px" : "w-6 h-px"} bg-gray-300 ${data.format === "horizontal" ? "" : "mx-auto"}`}
              ></div>
              <blockquote
                className={`${data.format === "horizontal" ? "text-sm" : "text-xs"} text-gray-600 font-light leading-relaxed`}
              >
                {data.quote.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < data.quote.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </blockquote>
            </div>
          </div>
        )

      case "creative":
        return (
          <div className="relative">
            <div
              className={`grid ${data.format === "vertical" ? "grid-cols-1 gap-2" : data.format === "horizontal" ? "grid-cols-4 gap-4" : "grid-cols-3 gap-2"} items-center`}
            >
              <div
                className={`${data.format === "vertical" ? "col-span-1" : data.format === "horizontal" ? "col-span-3" : "col-span-2"} space-y-1`}
              >
                <div className="transform -rotate-1">
                  <h1
                    className={`${data.format === "vertical" ? "text-sm" : data.format === "horizontal" ? "text-2xl" : "text-lg"} font-black text-gray-900 leading-none`}
                  >
                    {data.name.split(" ")[0]}
                  </h1>
                  <h1
                    className={`${data.format === "vertical" ? "text-sm" : data.format === "horizontal" ? "text-2xl" : "text-lg"} font-black text-gray-900 leading-none transform translate-x-2`}
                  >
                    {data.name.split(" ")[1] || ""}
                  </h1>
                </div>
                <div className="transform rotate-1 bg-white p-1 shadow-sm inline-block">
                  <p
                    className={`${data.format === "horizontal" ? "text-sm" : "text-xs"} tracking-[0.1em] text-gray-700 font-bold`}
                  >
                    {data.profession}
                  </p>
                </div>
                <div
                  className={`transform -rotate-1 bg-gray-900 text-white p-2 ${data.format === "horizontal" ? "text-sm" : "text-xs"}`}
                >
                  <blockquote className="font-light leading-relaxed">
                    {data.quote.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < data.quote.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </blockquote>
                </div>
              </div>
              <div className="transform rotate-2">
                <div
                  className={`${data.format === "vertical" ? "w-16 h-16" : data.format === "horizontal" ? "w-24 h-24" : "w-20 h-20"} rounded-xl overflow-hidden shadow-lg border-2 border-white`}
                >
                  <Image
                    src={data.imageUrl || "/placeholder.svg"}
                    alt="Profile Photo"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      default: // classic
        return (
          <div
            className={`grid ${data.format === "vertical" ? "grid-cols-1 gap-3" : data.format === "horizontal" ? "grid-cols-3 gap-6" : "grid-cols-2 gap-4"} items-center`}
          >
            <div className="flex justify-center">
              <div
                className={`${data.format === "vertical" ? "w-16 h-16" : data.format === "horizontal" ? "w-24 h-24" : "w-20 h-20"} rounded-full overflow-hidden bg-white/20 backdrop-blur-sm`}
              >
                <Image
                  src={data.imageUrl || "/placeholder.svg"}
                  alt="Profile Photo"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className={`${data.format === "horizontal" ? "col-span-2" : ""} space-y-2`}>
              <div className="space-y-1">
                <h1
                  className={`${data.format === "vertical" ? "text-sm" : data.format === "horizontal" ? "text-xl" : "text-lg"} font-light tracking-[0.2em] text-gray-800 leading-tight`}
                >
                  {data.name}
                </h1>
                <p
                  className={`${data.format === "horizontal" ? "text-sm" : "text-xs"} tracking-[0.1em] text-gray-600 font-light`}
                >
                  {data.profession}
                </p>
              </div>

              <div
                className={`w-px ${data.format === "vertical" ? "h-4" : data.format === "horizontal" ? "h-8" : "h-6"} bg-gray-400 mx-auto`}
              ></div>

              <blockquote
                className={`${data.format === "horizontal" ? "text-sm" : "text-xs"} text-gray-600 font-light tracking-wide leading-relaxed`}
              >
                {data.quote.split("\n").map((line, index) => (
                  <span key={index}>
                    "{line}"{index < data.quote.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </blockquote>
            </div>
          </div>
        )
    }
  }

  return (
    <div
      className={`relative rounded-lg overflow-hidden ${getContainerClass()} ${className}`}
      style={{
        background: `linear-gradient(to right, ${currentColorScheme.from}, ${currentColorScheme.to})`,
      }}
    >
      <div className="p-4 h-full flex items-center justify-center">{renderLayout()}</div>
    </div>
  )
}
