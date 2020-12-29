interface ICatalogPage {
    id: number;
    name: string;
    parent: ICatalogPage | null;
    order: number;
    icon: number;

    children: ICatalogPage[];
    catalog_items: ICatalogItem[];
}
