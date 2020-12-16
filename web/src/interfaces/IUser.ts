export enum IUserGender {
    Male = 'M',
    Female = 'F',
}

interface IUser {
    id: number;
    username: string;
    gender: IUserGender;
    look: string;
    motto: string;
    online: boolean;
    credits: number;
    diamonds: number;
}

export default IUser;
