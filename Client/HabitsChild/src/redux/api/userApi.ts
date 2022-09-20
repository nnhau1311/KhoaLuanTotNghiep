import { LoginDTO } from '../../dto';
import { UserModel } from '../../models';
import { HttpData, post } from '../../helpers/apiHelper';

export async function loginAPI({
  ...input
}: LoginDTO): Promise<HttpData<UserModel>> {
  const result = await post('user/login', input);
  if (result?.error) {
    return result;
  }
  return { data: result?.data as UserModel };
}
