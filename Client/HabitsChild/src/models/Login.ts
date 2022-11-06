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
export interface SignUpModel {
  errorCode: string;
  message: string;
  refCode: string;
  Success: boolean;
  Data: {
    id: string;
    sessionId: string;
    username: string;
    password: string;
    status: number;
    role: string;
    email: string;
    userFullName: string;
  };
  violations: string;
  StatusCode: '200';
}
export interface ResetPassModel {
  errorCode: string;
  message: string;
  refCode: string;
  Success: true;
  Data: string;
  violations: string;
  StatusCode: string;
}
