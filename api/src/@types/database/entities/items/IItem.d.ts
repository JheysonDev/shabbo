interface IItem {
    id: number;
    name: string;
    type: 'floor' | 'wall';
    width: number;
    length: number;
    height: number;
    can_stack: boolean;
    can_walk: boolean;
    can_sit: boolean;
    can_lay: boolean;
    interaction_count: number;
    is_rare: boolean;

    catalog_items: ICatalogItem[];
    rooms: IRoom[];
}
