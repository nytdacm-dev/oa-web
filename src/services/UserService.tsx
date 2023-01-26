import type { Models } from "@/models/models"
import { http, type HttpResponse } from "@/shared/Http"

export namespace UserService {
  export const update = async (data: Omit<Models.User, "userId">): Promise<HttpResponse<Models.User>> => {
    const response = await http.patch<Models.User>("/user", data)
    return response.data
  }
}
