import SHabbo from "@SHabbo";
import PacketComposer from "../PacketComposer";

class CatalogPagesComposer extends PacketComposer {
    constructor(private pages: ICatalogPage[]) {
        super('catalog_pages');
    }

    async execute(): Promise<void> {
        this.writeInteger(this.pages.length);

        if (this.pages.length) {
            for await (const page of this.pages) {
                if (page.type === 'default') {
                    await SHabbo.getHotel().getCatalogueManager().loadPagesByParentID(page.id);
                }

                this.writeInteger(page.id);
                this.writeString(page.name);
                this.writeString(page.type);
                this.writeInteger(page.parent?.id ?? 0);
                this.writeInteger(page.order);
                this.writeInteger(page.icon);
                this.writeInteger(page.children.length);
            }
        }
    }
}

export default CatalogPagesComposer;
