export namespace Models {
  export type User = {
    /** 用户 ID */
    userId: number;
    /** 用户名 */
    username: string;
    /** 姓名 */
    name: string;
    /** 社交账号 */
    socialAccount: {
      codeforces?: string;
      codeforcesRating?: number;
      codeforcesMaxRating?: number;
      codeforcesRank?: string;
      github?: string;
      website?: string;
      atCoder?: string;
      luogu?: string;
      nowcoder?: string;
    }
  }

  export type Group = {
    groupId: number,
    name: string,
    displayName?: string,
    showInHomepage?: boolean,
    homepageOrder?: number,
    users: User[],
    createdAt: number,
  }

  export type Submission = {
    submissionId: number,
    user: User,
    oj: string,
    remoteProblemId: string,
    name: string,
    remoteSubmissionId: string,
    contestId: string,
    language: string,
    status: string,
    submitTime: number,
  }
}

export type ListWrapper<T> = {
  total?: number,
  data?: T[],
}
