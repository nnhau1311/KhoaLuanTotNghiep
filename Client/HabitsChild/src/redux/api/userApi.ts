import { userData } from '../../configs';
import {
  ChangePassDTO,
  LoginDTO,
  ResetPassDTO,
  SignUpDTO,
  UpdateInforDTO,
} from '../../dto';

import { get, HttpData, post } from '../../helpers/apiHelper';
import {
  ChangePassModel,
  inforUserModel,
  UpdateInforModel,
} from '../../models';
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
export async function getInforUser(): Promise<HttpData<inforUserModel>> {
  const result = await get('user/me');
  // console.log('resultApi', result);
  if (result?.error) {
    return result;
  }
  return { data: result?.data as inforUserModel };
}
export async function changePassAPI({
  ...input
}: ChangePassDTO): Promise<HttpData<ChangePassModel>> {
  const result = await post('user/change-password', input);

  if (result?.error) {
    return result;
  }
  return { data: result?.data as ChangePassModel };
}
export async function UpdateInforAPI({
  ...input
}: UpdateInforDTO): Promise<HttpData<UpdateInforModel>> {
  const result = await post('user/update-infor/' + userData.userId, input);

  if (result?.error) {
    return result;
  }
  return { data: result?.data as UpdateInforModel };
}
