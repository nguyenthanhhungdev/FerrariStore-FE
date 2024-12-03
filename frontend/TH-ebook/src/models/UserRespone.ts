import {User} from "./User.ts";

class UserRespone {
    username: string;
    email: string;
    password: string;
    avatar: string;

    constructor(user: User) {
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.avatar = user.avatar;
    }
}
export  {UserRespone}