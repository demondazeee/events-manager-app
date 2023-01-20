import { EventsDataBody } from "./events";


export enum UserRole {
    Admin = 0,
    Manager = 1,
    Member = 2
}

export interface UserDataBody  {
    id: string
    username: string
    role: number;
    accessToken: string
}

export interface UserDataWithEvents {
    user: UserDataBody,
    events: EventsDataBody[]
}

export interface AdminUser extends UserDataBody{

}
export interface ManagerUser extends UserDataBody{

}
export interface MemberUser extends UserDataBody{

}

export interface LoginMemberBody  {
    username: string,
    password: string
}

export interface RegisterUserBody extends LoginMemberBody {
    email: string
}

export interface LoginUserProp {
    path: string,
    userLoginInput: LoginMemberBody
}

export interface RegisterUserProp {
    path: string,
    userRegisterInput: RegisterUserBody
}



export const isAdmin = (data: unknown): data is AdminUser => {
    if(data != null && typeof data === "object"){
        if("role" in data) {
            return data.role === 0
        }
    }
    
    return false
}

export const isManager = (data: unknown): data is ManagerUser => {
    if(data != null && typeof data === "object"){
        if("role" in data) {
            return data.role === 1
        }
    }
    return false
}

export const isMember = (data: unknown): data is MemberUser => {
    if(data != null && typeof data === "object"){
        if("role" in data) {
            return data.role === 2
        }
    }
    return false
}