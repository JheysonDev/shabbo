import SHabbo from "@SHabbo";

class ItemsManager {
    private items: IItem[];

    constructor() {
        this.items = [];
    }

    async loadItemByID(id: number): Promise<IItem | null> {
        const item_cache = this.items.find((item) => item.id === id);
        if (item_cache) {
            return item_cache;
        }

        const item_db = await SHabbo.getDatabase().getItems().findOne(id);
        if (item_db) {
            const item: IItem = item_db.toInterface();

            this.items.push(item);
            return item;
        }

        return null;
    }
}

export default ItemsManager;
