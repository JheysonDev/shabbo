import PacketComposer from "../PacketComposer";

class OpenCatalogPageComposer extends PacketComposer {
    constructor(page_id: number) {
        super('open_catalog_page');

        this.writeInteger(page_id);
    }
}

export default OpenCatalogPageComposer;
