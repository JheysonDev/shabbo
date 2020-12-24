interface IUserInfo {
    id: number;
    username: string;
}

interface IUserCurrency {
    credits: number;
    diamonds: number;
}

type IUserGender = 'M' | 'F';

interface IUserAvatar {
    look: string;
    gender: IUserGender;
    motto: string;
}

interface IUser {
    info?: IUserInfo;
    currency?: IUserCurrency;
    avatar?: IUserAvatar;
}
