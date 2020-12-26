interface IUser {
    id: number;
    username: string;

    gender: 'M' | 'F';
    look: string;
    motto: string;

    online: boolean;

    credits: number;
    diamonds: number;
}
