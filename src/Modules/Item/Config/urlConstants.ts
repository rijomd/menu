import { getMyAPiUrl } from "Services/Methods/AuthMethods";

export const itemList: string = getMyAPiUrl() + "/masters/itemList";
export const insertItem: string = getMyAPiUrl() + "/masters/insertItem";
export const categoryCompo: string = getMyAPiUrl() + "/masters/categoryCompo";

