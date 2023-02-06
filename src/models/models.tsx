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
    }
  }
}

export type ListWrapper<T> = {
  total?: number,
  data?: T[],
}
