interface ICatalogPage {
    id: number;
    name: string;
    type: string;
    parent: ICatalogPage | null;
    order: number;
    icon: number;

    children: ICatalogPage[];
    catalog_items: ICatalogItem[];
}
