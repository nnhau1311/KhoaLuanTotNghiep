export interface AddHabitsDTO {
  habitsId: string;
  dateStart: string;
}
export interface ListHabitsDTO {
  pageNumber: number;
}
export interface HabitDetailDTO {
  userHabitsId?: number;
}
export interface DeleteHabitDTO {
  userHabitsId?: number;
}
export interface CheckInHabitDTO {
  habitsId?: string;
  listHabitsContentCode?: Array<string>;
  userHabitsId?: string;
}
