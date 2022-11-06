import { LoginDTO, ResetPassDTO, SignUpDTO } from '../../dto';
import { UserModel } from '../../models';
import { HttpData, post } from '../../helpers/apiHelper';
import { LoginModel, ResetPassModel, SignUpModel } from '../../models/Login';

export async function loginAPI({
  ...input
}: LoginDTO): Promise<HttpData<LoginModel>> {
  const result = await post('auth/login', input);
  console.log('resultLoginnnnnnnnnn', result);
  if (result?.error) {
    return result;
  }
  return { data: result?.data as LoginModel };
}
export async function signUpAPI({
  ...input
}: SignUpDTO): Promise<HttpData<SignUpModel>> {
  const result = await post('user/sign-up', input);

  if (result?.error) {
    return result;
  }
  return { data: result?.data as SignUpModel };
}
export async function resetPassAPI({
  ...input
}: ResetPassDTO): Promise<HttpData<ResetPassModel>> {
  const result = await post('user/request-reset-password', input);

  if (result?.error) {
    return result;
  }
  return { data: result?.data as ResetPassModel };
}
