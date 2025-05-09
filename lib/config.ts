export const siteConfig = {
  title: "Vibe",
  description: "A modern Next.js starter with authentication, database, storage, AI, and more.",
  shortDescription: "Next.js Starter with Clerk, Supabase, AWS, AI, and more",
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