import { getMyAPiUrl } from "Services/Methods/AuthMethods";

export const categoryList: string = getMyAPiUrl() + "/masters/categoryList";
export const itemList: string = getMyAPiUrl() + "/masters/itemList";
export const insertOrder: string = getMyAPiUrl() + "/transaction/insertOrder";


