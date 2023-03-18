export namespace Models {
  export interface User {
    /** 用户 ID */
    userId: number
    /** 用户名 */
    username: string
    /** 姓名 */
    name: string
    /** 社交账号 */
    socialAccount: {
      codeforces?: string
      codeforcesRating?: number
      codeforcesMaxRating?: number
      codeforcesRank?: string
      atCoder?: string
      luogu?: string
      nowcoder?: string
      vjudge?: string
    }
  }

  export interface Group {
    groupId: number
    name: string
    displayName?: string
    showInHomepage?: boolean
    homepageOrder?: number
    users: User[]
    createdAt: number
  }

  export interface Submission {
    submissionId: number
    user: User
    oj: string
    remoteProblemId: string
    name: string
    remoteSubmissionId: string
    contestId: string
    language: string
    status: string
    submitTime: number
  }

  export interface Article {
    articleId: number
    title: string
    content: string
    author: Models.User
  }
}

export interface ListWrapper<T> {
  total?: number
  data?: T[]
}
