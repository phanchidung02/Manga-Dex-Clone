import { IAuth } from "@/app/interfaces/login.interface";
import { api } from "@/services/apiInstance";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<TokenResponse, IAuth>({
      query: (queryArg) => ({
        url: `/api/login`,
        method: "POST",
        body: queryArg,
      }),
    }),
    checkAuth: build.query<AuthResponse, void>({
      query: () => ({
        url: `/api/check-auth`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as authService };

interface AuthResponse {
  result: string; // e.g., "ok"
  isAuthenticated: boolean; // Indicates if the user is authenticated
  roles: string[]; // Array of roles
  permissions: string[]; // Array of permissions
}


export interface TokenResponse {
  access_token: string; // The access token (string, can be empty)
  client_type: string; // The client type, e.g., "personal"
  expires_in: number; // Token expiration time in seconds
  not_before_policy: number; // Policy timestamp (number)
  refresh_expires_in: number; // Refresh token expiration time in seconds
  refresh_token: string; // The refresh token (string, can be empty)
  scope: string; // Scope of the token
  session_state: string; // Session state identifier
  token_type: string;
}

export interface RegisterApiArg {
  companyName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  position?: string;
  companyTitle?: string;
}

export interface LoginApiArg {
  company_name: string;
  email: string;
  password: string;
}
export type ForgotPasswordDto = {
  email: string;
};
export type NewPasswordDto = {
  token: string;
  email: string;
  newPassword: string;
};

export interface GoogleLogInResponse {
  token: string;
}

export interface GoogleLogInPayload {
  idToken: string;
}

export const {
  useLoginMutation,
  useLazyCheckAuthQuery
} = injectedRtkApi;
