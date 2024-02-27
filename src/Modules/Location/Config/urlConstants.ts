import { getMyAPiUrl } from "Services/Methods/AuthMethods";

export const locationList: string = getMyAPiUrl() + "/masters/locationList";
export const insertLocation: string = getMyAPiUrl() + "/masters/insertLocation";
