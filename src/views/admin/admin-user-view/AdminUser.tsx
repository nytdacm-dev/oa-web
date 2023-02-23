export interface AdminUser {
  userId?: number
  username?: string
  name?: string
  superAdmin?: boolean
  admin?: boolean
  active?: boolean
  lastActive?: number
  socialAccount?: {
    codeforces?: string
    codeforcesRating?: number
    codeforcesMaxRating?: number
    codeforcesRank?: string
  }
  registerTime?: number
}
