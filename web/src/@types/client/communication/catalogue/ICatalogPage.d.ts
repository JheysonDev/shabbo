interface ICatalogPage {
    id: number;
    name: string;
    type: CatalogPageType;
    parent: number;
    order: number;
    icon: number;

    children: number;
}
