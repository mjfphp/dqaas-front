import { FilterType } from "../enums/filter-type.enum"

export type Filter = {
    type: FilterType;
    column: string;
    singleValue: string | null;
    multipleValues: string[] | null;
}
