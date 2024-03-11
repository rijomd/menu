import { getMyAPiUrl } from "Services/Methods/AuthMethods";

export const insertSettings: string = getMyAPiUrl() + "/misc/insertSettings";
export const settingList: string = getMyAPiUrl() + "/misc/settingList";

