import { PageName } from "../enums/page-name.enum";
import { SortConfig } from "./sort-config.type";

export type PageSort = {
    pageName: PageName;
    sortConfig: SortConfig;
}
