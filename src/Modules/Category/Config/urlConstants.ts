import { getMyAPiUrl } from "Services/Methods/AuthMethods";

export const categoryList: string = getMyAPiUrl() + "/masters/categoryList";
export const insertCategory: string = getMyAPiUrl() + "/masters/insertCategory";
export const imageUrl: string = "http://localhost:4000/images/";


