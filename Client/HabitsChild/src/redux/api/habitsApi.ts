import {
  AddHabitsDTO,
  CheckInHabitDTO,
  DeleteHabitDTO,
  HabitDetailDTO,
  ListHabitsDTO,
} from '../../dto';
import { get, getPage, HttpData, post } from '../../helpers/apiHelper';
import {
  AddHabitsModel,
  CheckInHabitModel,
  DeleteHabitModel,
  HabitDetailModel,
  ListHabits,
  ListHabitsManager,
} from '../../models';

export async function getListHabits({
  ...input
}: ListHabitsDTO): Promise<HttpData<ListHabits>> {
  const result = await getPage('user-habits/get-habits', input);

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
export async function detailHabitsAPI({
  ...input
}: HabitDetailDTO): Promise<HttpData<HabitDetailModel>> {
  const result = await get('user-habits/get-habits/' + input.userHabitsId);

  if (result?.error) {
    return result;
  }
  return { data: result?.data as HabitDetailModel };
}
export async function deleteHabitsAPI({
  ...input
}: DeleteHabitDTO): Promise<HttpData<DeleteHabitModel>> {
  const result = await get('user-habits/delete-habits/' + input.userHabitsId);

  if (result?.error) {
    return result;
  }
  return { data: result?.data as DeleteHabitModel };
}
export async function checkInHabitsAPI({
  ...input
}: CheckInHabitDTO): Promise<HttpData<CheckInHabitModel>> {
  const result = await post('user-habits/attendance-habits-content', input);

  if (result?.error) {
    return result;
  }
  return { data: result?.data as CheckInHabitModel };
}
