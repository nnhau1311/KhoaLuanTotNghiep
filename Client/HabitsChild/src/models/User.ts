export interface inforUserModel {
  errorCode: string;
  message: string;
  refCode: string;
  Success: true;
  Data: {
    id: string;
    sessionId: string;
    username: string;
    password: string;
    status: number;
    expirationJWTDate: string;
    createDate: string;
    updateDate: string;
    role: string;
    email: string;
    userFullName: string;
  };
  violations: string;
  StatusCode: string;
}
export interface ChangePassModel {
  errorCode: string;
  message: string;
  refCode: string;
  Success: true;
  Data: string;
  violations: string;
  StatusCode: string;
}
export interface UpdateInforModel {
  errorCode: string;
  message: string;
  refCode: string;
  Success: true;
  Data: string;
  violations: string;
  StatusCode: string;
}
