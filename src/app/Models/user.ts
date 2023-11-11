export class User {
    userId!: String;
	firstName:String | undefined;
	lastName:String | undefined;
	email:String | undefined;
	mobile:String | undefined;
	password!: String;
	age:number | undefined;
    dob : String | undefined;
    maritialStatus : String | undefined;
    citizen : String | undefined;
	profilePic: Blob | undefined;
	gender : String | undefined;
}