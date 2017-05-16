import {NgmDate} from './ngm-date';

export interface DayViewModel{
    date: NgmDate,
    disabled: boolean,
}

export interface WeekViewModel{
    number: number,
    days: DayViewModel[],
}

export interface MonthViewModel{
    firstDate: NgmDate,
    number: number,
    year: number,
    weeks: WeekViewModel[],
    weekdays: number[],
}
export enum NavigationEvent {
    PREV,
    NEXT,
}
