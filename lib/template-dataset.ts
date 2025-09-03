export interface Template {
  id: string
  name: string
  category: string
  description: string
  data: {
    name: string
    profession: string
    quote: string
    imageUrl: string
    colorScheme: string
    layout: "classic" | "modern" | "minimal" | "creative"
    format: "classic" | "square" | "vertical" | "horizontal"
  }
  tags: string[]
}

export const templateDataset: Template[] = [
  {
    id: "photographer-classic",
    name: "Classic Photographer",
    category: "Photography",
    description: "Elegant and professional photography portfolio",
    data: {
      name: "RAJ SINGH",
      profession: "FASHION PHOTOGRAPHER",
      quote: "A PICTURE IS A SECRET ABOUT A SECRET.\nTHE MORE IT TELLS YOU THE LESS YOU KNOW.",
      imageUrl: "/placeholder.svg?height=400&width=400&text=Professional+Portrait",
      colorScheme: "beige",
      layout: "classic",
      format: "horizontal",
    },
    tags: ["photography", "fashion", "elegant", "professional"],
  },
  {
    id: "designer-modern-square",
    name: "Modern Designer Square",
    category: "Design",
    description: "Contemporary design portfolio optimized for Instagram posts",
    data: {
      name: "ALEX CHEN",
      profession: "UI/UX DESIGNER",
      quote: "DESIGN IS NOT JUST WHAT IT LOOKS LIKE.\nDESIGN IS HOW IT WORKS.",
      imageUrl: "/placeholder.svg?height=400&width=400&text=Designer+Portrait",
      colorScheme: "blue",
      layout: "modern",
      format: "square",
    },
    tags: ["design", "ui", "ux", "modern", "tech", "square", "instagram"],
  },
  {
    id: "artist-creative-vertical",
    name: "Creative Artist Vertical",
    category: "Art",
    description: "Vibrant vertical template perfect for Instagram stories",
    data: {
      name: "MAYA PATEL",
      profession: "DIGITAL ARTIST",
      quote: "CREATIVITY TAKES COURAGE.\nART IS THE LIE THAT ENABLES US TO REALIZE THE TRUTH.",
      imageUrl: "/placeholder.svg?height=500&width=400&text=Artist+Portrait",
      colorScheme: "purple",
      layout: "creative",
      format: "vertical",
    },
    tags: ["art", "creative", "digital", "vibrant", "artistic", "vertical", "stories"],
  },
  {
    id: "writer-minimal-horizontal",
    name: "Minimal Writer Horizontal",
    category: "Writing",
    description: "Clean horizontal template for website banners and headers",
    data: {
      name: "JAMES WRIGHT",
      profession: "CONTENT WRITER",
      quote: "THE FIRST DRAFT OF ANYTHING IS SHIT.\nWRITING IS REWRITING.",
      imageUrl: "/placeholder.svg?height=300&width=400&text=Writer+Portrait",
      colorScheme: "green",
      layout: "minimal",
      format: "horizontal",
    },
    tags: ["writing", "content", "minimal", "clean", "author", "horizontal", "banner"],
  },
  {
    id: "musician-vibrant-square",
    name: "Vibrant Musician Square",
    category: "Music",
    description: "Dynamic square template for music posts",
    data: {
      name: "SOFIA RODRIGUEZ",
      profession: "MUSIC PRODUCER",
      quote: "MUSIC IS THE UNIVERSAL LANGUAGE.\nIT SPEAKS TO THE SOUL WHEN WORDS FAIL.",
      imageUrl: "/placeholder.svg?height=400&width=400&text=Music+Producer",
      colorScheme: "pink",
      layout: "creative",
      format: "square",
    },
    tags: ["music", "producer", "vibrant", "dynamic", "performer", "square"],
  },
  {
    id: "chef-warm-horizontal",
    name: "Warm Chef Horizontal",
    category: "Culinary",
    description: "Warm horizontal template for food website headers",
    data: {
      name: "MARCO ROSSI",
      profession: "EXECUTIVE CHEF",
      quote: "COOKING IS LIKE LOVE.\nIT SHOULD BE ENTERED INTO WITH ABANDON OR NOT AT ALL.",
      imageUrl: "/placeholder.svg?height=300&width=400&text=Chef+Portrait",
      colorScheme: "beige",
      layout: "classic",
      format: "horizontal",
    },
    tags: ["chef", "culinary", "food", "warm", "cooking", "horizontal", "website"],
  },
  {
    id: "bailey-premium-logo",
    name: "Bailey Premium Logo",
    category: "Branding",
    description: "Modern colorful logo design with gradient effects on dark background",
    data: {
      name: "BAILEY",
      profession: "premium",
      quote: "PREMIUM QUALITY MEETS MODERN DESIGN.\nELEVATE YOUR BRAND WITH STYLE.",
      imageUrl: "/placeholder.svg?height=400&width=400&text=Colorful+Logo+Design&bg=000000",
      colorScheme: "gradient",
      layout: "modern",
      format: "square",
    },
    tags: ["branding", "logo", "premium", "modern", "colorful", "gradient", "business"],
  },
]

export const colorSchemes = {
  beige: { from: "#c4a484", to: "#e8ddd4", name: "Warm Beige" },
  blue: { from: "#7c9cbf", to: "#b8d4f0", name: "Ocean Blue" },
  green: { from: "#8fbc8f", to: "#c8e6c9", name: "Sage Green" },
  purple: { from: "#b19cd9", to: "#e1bee7", name: "Lavender" },
  pink: { from: "#f8bbd9", to: "#fce4ec", name: "Rose Pink" },
  gradient: { from: "#ff6b35", to: "#f7931e", name: "Vibrant Gradient" },
}

export const professionTemplates = {
  photographer: ["photography", "fashion", "portrait", "wedding", "commercial"],
  designer: ["ui", "ux", "graphic", "web", "brand"],
  artist: ["digital", "traditional", "illustration", "fine art", "concept"],
  writer: ["content", "copywriter", "author", "journalist", "blogger"],
  musician: ["producer", "composer", "performer", "dj", "sound engineer"],
  chef: ["executive", "pastry", "sous", "private", "restaurant"],
  developer: ["frontend", "backend", "fullstack", "mobile", "devops"],
  consultant: ["business", "marketing", "strategy", "finance", "hr"],
  branding: ["logo", "identity", "premium", "corporate", "startup"],
}