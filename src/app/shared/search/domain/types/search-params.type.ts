import { SortConfig } from "../../../sort/domain/types/sort-config.type"
import { Filter } from "./filter.type"

export type SearchParams = {
    pageIndex: number;
    pageSize: number;
    sort: SortConfig;
    filters: Filter[];
}
