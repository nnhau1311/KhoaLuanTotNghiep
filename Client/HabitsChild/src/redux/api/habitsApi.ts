import { AddHabitsDTO } from '../../dto';
import { get, HttpData, post } from '../../helpers/apiHelper';
import { AddHabitsModel, ListHabits, ListHabitsManager } from '../../models';

export async function getListHabits(): Promise<HttpData<ListHabits>> {
  const result = await get('user-habits/get-habits');

  if (result?.error) {
    return result;
  }
  return { data: result?.data as ListHabits };
}
export async function getListHabitsManager(): Promise<
  HttpData<ListHabitsManager>
> {
  const result = await get('habits/get-all');

  if (result?.error) {
    return result;
  }
  return { data: result?.data as ListHabitsManager };
}
export async function addHabitsAPI({
  ...input
}: AddHabitsDTO): Promise<HttpData<AddHabitsModel>> {
  const result = await post('user-habits/create-a-new', input);

  if (result?.error) {
    return result;
  }
  return { data: result?.data as AddHabitsModel };
}
