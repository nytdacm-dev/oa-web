export namespace Models {
  export type User = {
    /** 用户 ID */
    userId: number;
    /** 用户名 */
    username: string;
    /** 姓名 */
    name: string;
    /** 超级管理员 */
    superAdmin: boolean;
    /** 管理员 */
    admin: boolean;
    /** 社交账号 */
    socialAccount: {
      codeforces?: string;
      codeforcesRating?: number;
      codeforcesMaxRating?: number;
      codeforcesRank?: string;
    }
  }
}
