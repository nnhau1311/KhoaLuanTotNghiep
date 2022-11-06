export interface ItemHabit {
  contentCode: string;
  typeContent: string;
  body: string;
  typeOfFinishCourse: string;
  numberDateExecute: number;
  totalCourse: string;
  executeCourse: string;
  status: number;
  startDate: string;
  endDate: string;
  updateDate: string;
}
export interface ItemHabitManager {
  typeOfFinishCourse: string;
  totalCourse: string;
  numberDateExecute: number;
  typeContent: string;
  body: string;
}
export interface HabitData {
  id: string;
  userId: string;
  habitsId: string;
  typeOfFinishCourse: string;
  totalCourse: string;
  executeCourse: string;
  status: number;
  startDate: string;
  endDate: string;
  createDate: string;
  updateDate: string;
  habitsContents: ItemHabit[];
}
export interface HabitDataManager {
  id: string;
  habitsName: string;
  habitsType: string;
  typeOfFinishCourse: string;
  totalCourse: string;
  numberDateExecute: string;

  habitsContentList: ItemHabitManager[];
}
export interface ListHabits {
  errorCode: string;
  message: string;
  refCode: string;
  Success: boolean;
  Data: {
    content: HabitData[];
    pageable: {
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      offset: number;
      pageSize: number;
      pageNumber: number;
      paged: boolean;
      unpaged: boolean;
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  };
  violations: string;
  StatusCode: string;
}
export interface ListHabitsManager {
  errorCode: string;
  message: string;
  refCode: string;
  Success: boolean;
  Data: {
    content: HabitDataManager[];
    pageable: {
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      offset: number;
      pageSize: number;
      pageNumber: number;
      paged: boolean;
      unpaged: boolean;
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  };
  violations: string;
  StatusCode: string;
}
export interface AddHabitsModel {
  errorCode: string;
  message: string;
  refCode: string;
  Success: boolean;
  Data: {
    id: string;
    userId: string;
    habitsId: string;
    typeOfFinishCourse: string;
    totalCourse: string;
    executeCourse: string;
    status: 0;
    startDate: string;
    endDate: string;
    createDate: string;
    updateDate: string;
    habitsContents: Array<any>;
    violations: string;
    StatusCode: string;
  };
}
