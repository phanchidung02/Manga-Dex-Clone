import { api } from "@/services/apiInstance";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<UserResponse, void>({
      query: () => ({
        url: `/api/me`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as userService };

export interface UserResponse {
  result: string; // Giá trị ví dụ: "ok"
  response: string; // Giá trị ví dụ: "entity"
  data: DataEntity; // Đối tượng data
}

interface DataEntity {
  id: string; // UUID, ví dụ: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  type: string; // Loại dữ liệu, ví dụ: "user"
  attributes: Attributes; // Thuộc tính người dùng
  relationships: Relationship[]; // Danh sách các mối quan hệ
}

interface Attributes {
  username: string; // Tên người dùng, ví dụ: "string"
  roles: string[]; // Danh sách vai trò, ví dụ: ["string"]
  version: number; // Phiên bản, ví dụ: 1
}

interface Relationship {
  id: string; // UUID, ví dụ: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  type: string; // Loại quan hệ, ví dụ: "string"
  related: string; // Quan hệ liên kết, ví dụ: "monochrome"
  attributes: Record<string, any>; // Các thuộc tính bổ sung
}

export const { useLazyGetMeQuery } = injectedRtkApi;
