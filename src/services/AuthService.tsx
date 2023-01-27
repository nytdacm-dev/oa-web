import type { Models } from "@/models/models"
import { http, type HttpResponse } from "@/shared/Http"

export namespace AuthService {
  export const signup = async (username: string, password: string): Promise<HttpResponse<Models.User>> => {
    const response = await http.post<Models.User>("/auth/signup", { username, password })
    return response.data
  }
}
