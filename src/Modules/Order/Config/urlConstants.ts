import { getMyAPiUrl } from "Services/Methods/AuthMethods";

export const orderList: string = getMyAPiUrl() + "/transaction/orderList";
export const insertOrder: string = getMyAPiUrl() + "/transaction/insertOrder";

