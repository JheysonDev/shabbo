interface ICatalogPage {
    id: number;
    name: string;
    parent: ICatalogPage | null;
    order: number;

    children: ICatalogPage[];
    catalog_items: ICatalogItem[];
}
