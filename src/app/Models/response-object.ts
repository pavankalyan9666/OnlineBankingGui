import { User } from "./user";

export class ResponseObject {
    user: User = new User;
	responseMessage : String | undefined;
	responseCode : String | undefined; 
}
