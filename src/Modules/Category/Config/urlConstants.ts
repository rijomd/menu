import { getMyAPiUrl } from "Services/Methods/AuthMethods";

export const categoryList: string = getMyAPiUrl() + "/masters/categoryList";
export const insertCategory: string = getMyAPiUrl() + "/masters/insertCategory";

