export interface LoginModel {
  errorCode: string;
  message: string;
  refCode: string;
  Success: boolean;
  Data: {
    accessToken: string;
    tokenType: string;
  };
  violations: string;
  StatusCode: string;
}
