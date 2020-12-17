export interface IUserInfo {
    id: number;
    username: string;
}

export interface IUserCurrency {
    credits: number;
    diamonds: number;
}

export type IUserGender = 'M' | 'F';

export interface IUserAvatar {
    look: string;
    gender: IUserGender;
    motto: string;
}

interface IUser {
    info?: IUserInfo;
    currency?: IUserCurrency;
    avatar?: IUserAvatar;
}

export default IUser;
