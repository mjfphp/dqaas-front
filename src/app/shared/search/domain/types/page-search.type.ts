
import { PageName } from "../../../sort/domain/enums/page-name.enum";
import { SearchParams } from "./search-params.type";

export type PageSearch = {
    pageName: PageName;
    searchParams: SearchParams;
}
