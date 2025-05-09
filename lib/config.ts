export const siteConfig = {
  title: "Vibe",
  description: "vibe hackathon project",
  shortDescription: "vibe hackathon project",
  url: "vibe.vercel.app",
  shareImage: "",
  x: "",
  github: "",
  logo: ""
} as const

export type SiteConfig = {
  title: string
  description: string
  shortDescription: string
  url: string
  shareImage: string
  x: string
  github: string
  logo: string
}