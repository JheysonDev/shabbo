interface IRoom {
    id: number;
    name: string;
    model: IRoomModel;
    category: INavigatorCategory;
    owner: IUser;

    items: IRoomItem[];
}
