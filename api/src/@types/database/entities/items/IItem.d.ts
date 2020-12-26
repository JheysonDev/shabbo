interface IItem {
    id: number;
    name: string;
    width: number;
    height: number;
    length: number;
    can_walk: boolean;
    can_sit: boolean;
    interaction_count: number;

    catalog_items: ICatalogItem[];
    rooms: IRoom[];
}
