export interface LoginDTO {
  username: string;
  password: string;
}
export interface SignUpDTO {
  userName: string;
  userFullName: string;
  userPassword: string;
  email: string;
  role: string;
}
export interface ResetPassDTO {
  userInfor: string;
}
