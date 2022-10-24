import { LoginDTO } from '../../dto';
import { UserModel } from '../../models';
import { HttpData, post } from '../../helpers/apiHelper';
import { LoginModel } from '../../models/Login';

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
