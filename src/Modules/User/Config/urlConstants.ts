import { getMyAPiUrl } from "Services/Methods/AuthMethods";

export const userList: string = getMyAPiUrl() + "/user/userList";
export const insertUser: string = getMyAPiUrl() + "/user/insertUser";
export const locationCompo: string = getMyAPiUrl() + "/masters/locationCompo";

