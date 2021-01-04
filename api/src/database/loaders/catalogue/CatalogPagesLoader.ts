import CatalogPage, { CatalogPageType } from "@Database/entities/catalogue/CatalogPage";
import { DeepPartial } from "typeorm";
import LogsManager from "@Logs";
import SHabbo from "@SHabbo";

interface Page {
    parent: DeepPartial<CatalogPage>;
    children?: Page[];
}

class CatalogPagesLoader implements ILoader {
    async beforeRun(): Promise<boolean> {
        const pages = await SHabbo.getDatabase().getCatalogPages().find({ take: 1 });
        return pages.length === 0;
    }

    async run(): Promise<void> {
        const pages: Page[] = [
            { parent: { name: 'Front Page', type: CatalogPageType.Frontpage } },
            {
                parent: { name: 'Furniture' },
                children: [
                    {
                        parent: { name: 'Public Rooms' },
                        children: [
                            {
                                parent: { name: 'Classic Rooms' },
                                children: [
                                    { parent: { name: 'Battle Ball' } },
                                    { parent: { name: 'Ice Cafe' } },
                                    { parent: { name: 'Habburgers' } },
                                    { parent: { name: 'Hotel View' } },
                                    { parent: { name: 'Star Lounge' } },
                                    { parent: { name: 'Tea Room' } },
                                    { parent: { name: 'Welcome Lounge' } },
                                ],
                            },
                            {
                                parent: { name: 'News Rooms' },
                                children: [
                                    { parent: { name: 'Club Mammoth' } },
                                    { parent: { name: 'Club NX' } },
                                    { parent: { name: 'Coffee House' } },
                                    { parent: { name: 'Franks Office' } },
                                    { parent: { name: 'Hallway' } },
                                    { parent: { name: 'HC Lounge' } },
                                    { parent: { name: 'Infobus Park' } },
                                    { parent: { name: 'Library' } },
                                    { parent: { name: 'Lido' } },
                                    { parent: { name: 'Picnic' } },
                                    { parent: { name: 'Theatredome' } },
                                    { parent: { name: 'Welcome Lounge' } },
                                ],
                            },
                        ],
                    },
                    {
                        parent: { name: 'New Furni' },
                        children: [
                            { parent: { name: 'Presets HC 2021' } },
                            { parent: { name: 'Messy' } },
                        ],
                    },
                    {
                        parent: { name: 'HC' },
                        children: [
                            { parent: { name: 'Executive HC' } },
                            { parent: { name: 'Presets HC' } },
                            { parent: { name: 'Presets VIP' } },
                        ],
                    },
                    {
                        parent: { name: 'Furni by Item' },
                        children: [
                            { parent: { name: 'Carpets' } },
                            { parent: { name: 'Lighting' } },
                            { parent: { name: 'Rollers' } },
                            { parent: { name: 'Spaces' } },
                            { parent: { name: 'Teleporters' } },
                            { parent: { name: 'Televisions' } },
                            {
                                parent: { name: 'Vegetation' },
                                children: [
                                    { parent: { name: 'Flowers' } },
                                ],
                            },
                            { parent: { name: 'Wall Decoration' } },
                            { parent: { name: 'Windows' } },
                        ],
                    },
                    {
                        parent: { name: 'Furni by Line' },
                        children: [
                            { parent: { name: 'Accessories' } },
                            { parent: { name: 'Africa' } },
                            { parent: { name: 'Alhambra' } },
                            { parent: { name: 'American Animals' } },
                            { parent: { name: 'American Idol' } },
                            { parent: { name: 'Ancients' } },
                            { parent: { name: 'Anna' } },
                            { parent: { name: 'Arctic' } },
                            { parent: { name: 'Area' } },
                            { parent: { name: 'Artist Studio' } },
                            { parent: { name: 'Asian' } },
                            { parent: { name: 'Attic' } },
                            { parent: { name: 'Automobile' } },
                            { parent: { name: 'Base' } },
                            { parent: { name: 'Baazar' } },
                            {
                                parent: { name: 'Bathroom' },
                                children: [
                                    { parent: { name: 'Classic' } },
                                    { parent: { name: 'Modern' } },
                                ],
                            },
                            { parent: { name: 'Bensalem' } },
                            { parent: { name: 'Bling' } },
                            { parent: { name: 'Bohemian Festival' } },
                            { parent: { name: 'Boutique' } },
                            { parent: { name: 'Camping' } },
                            { parent: { name: 'Candy' } },
                            { parent: { name: 'Candyland' } },
                            { parent: { name: 'Celestial' } },
                            { parent: { name: 'Chess Set' } },
                            { parent: { name: 'Childline' } },
                            { parent: { name: 'Chocolatier' } },
                            { parent: { name: 'Coco' } },
                            { parent: { name: 'Coral Kingdom' } },
                            { parent: { name: 'Country' } },
                            { parent: { name: 'Cubie' } },
                            { parent: { name: 'Cyberpunk' } },
                            { parent: { name: 'Dessert Cafe' } },
                            { parent: { name: 'Diner' } },
                            { parent: { name: 'Dinosaur' } },
                            { parent: { name: 'Drago' } },
                            { parent: { name: 'Ecotron' } },
                            {
                                parent: { name: 'Elegant' },
                                children: [
                                    { parent: { name: 'Dark' } },
                                    { parent: { name: 'Light' } },
                                ],
                            },
                            { parent: { name: 'Executive' } },
                            { parent: { name: 'Exotic Statues' } },
                            { parent: { name: 'Flower Power' } },
                            { parent: { name: 'Furnimatic' } },
                            { parent: { name: 'Gaming' } },
                            { parent: { name: 'Garage Band' } },
                            { parent: { name: 'Gardening' } },
                            { parent: { name: 'Glass' } },
                            { parent: { name: 'Gothic' } },
                            { parent: { name: 'Gothic Cafe' } },
                            {
                                parent: { name: 'Greek' },
                                children: [
                                    { parent: { name: 'Classic' } },
                                    { parent: { name: '2019' } },
                                ],
                            },
                            { parent: { name: 'Grunge' } },
                            { parent: { name: 'Hollywood' } },
                            { parent: { name: 'Hospital' } },
                            { parent: { name: 'Hygge' } },
                            { parent: { name: 'India' } },
                            { parent: { name: 'Japan' } },
                            { parent: { name: 'Jet Set' } },
                            {
                                parent: { name: 'Kitchen' },
                                children: [
                                    { parent: { name: 'Classic' } },
                                    { parent: { name: 'Modern' } },
                                ],
                            },
                            { parent: { name: 'Kuurna' } },
                            { parent: { name: 'Laundry' } },
                            { parent: { name: 'Lodge' } },
                            { parent: { name: 'Lost Tribe' } },
                            { parent: { name: 'Mall' } },
                            { parent: { name: 'Mayan' } },
                            { parent: { name: 'Military' } },
                            { parent: { name: 'Mode' } },
                            {
                                parent: { name: 'Modern' },
                                children: [
                                    { parent: { name: 'Dark' } },
                                    { parent: { name: 'Light' } },
                                ],
                            },
                            { parent: { name: 'MTV Studio' } },
                            { parent: { name: 'Mystic' } },
                            { parent: { name: 'Neon' } },
                            {
                                parent: { name: 'Olympics' },
                                children: [
                                    { parent: { name: 'London 2012' } },
                                    { parent: { name: '2016' } },
                                ],
                            },
                            { parent: { name: 'Organic' } },
                            {
                                parent: { name: 'Palooza' },
                                children: [
                                    { parent: { name: '2013' } },
                                    { parent: { name: '2014' } },
                                ],
                            },
                            { parent: { name: 'Paris' } },
                            { parent: { name: 'Pastel' } },
                            { parent: { name: 'Picnic' } },
                            { parent: { name: 'Pirate' } },
                            { parent: { name: 'Plastic' } },
                            { parent: { name: 'Pride 2019' } },
                            { parent: { name: 'Prison' } },
                            {
                                parent: { name: 'Pura' },
                                children: [
                                    { parent: { name: 'Dark' } },
                                    { parent: { name: 'Light' } },
                                ],
                            },
                            {
                                parent: { name: 'Rainy Day' },
                                children: [
                                    { parent: { name: '2019' } },
                                    { parent: { name: '2020' } },
                                ],
                            },
                            { parent: { name: 'Recording Room' } },
                            { parent: { name: 'Relax' } },
                            { parent: { name: 'Romantique' } },
                            { parent: { name: 'Runway' } },
                            { parent: { name: 'Santorini' } },
                            { parent: { name: 'School' } },
                            { parent: { name: 'Science Fiction' } },
                            { parent: { name: 'Shalimar' } },
                            { parent: { name: 'SPA' } },
                            { parent: { name: 'Spiderwick' } },
                            { parent: { name: 'Sports' } },
                            { parent: { name: 'Stars' } },
                            { parent: { name: 'Steampunk' } },
                            { parent: { name: 'Stranded Jungle' } },
                            { parent: { name: 'Sunlight City' } },
                            { parent: { name: 'Sunset Cafe' } },
                            { parent: { name: 'Supermarket' } },
                            { parent: { name: 'Tiki' } },
                            { parent: { name: 'Tokyo' } },
                            { parent: { name: 'Twilight' } },
                            { parent: { name: 'University' } },
                            { parent: { name: 'Urban' } },
                            { parent: { name: 'USVA' } },
                            { parent: { name: 'Vikings' } },
                            { parent: { name: 'Virus' } },
                            { parent: { name: 'Waasa' } },
                            { parent: { name: 'Wedding' } },
                            { parent: { name: 'Wild West' } },
                            {
                                parent: { name: 'Zen Garden' },
                                children: [
                                    { parent: { name: 'Zen Garden (2018)' } },
                                    { parent: { name: 'Harmony Garden (2020)' } },
                                ],
                            },
                        ],
                    },
                    {
                        parent: { name: 'Furni by Season' },
                        children: [
                            {
                                parent: { name: 'Christmas' },
                                children: [
                                    { parent: { name: 'Classic' } },
                                    { parent: { name: 'Castle (2012)' } },
                                    { parent: { name: 'Santa\'s Workshop (2013)' } },
                                    { parent: { name: 'Tropical Christmas (2014)' } },
                                    { parent: { name: 'Christmas in Bavaria (2015)' } },
                                    { parent: { name: 'Christmas Fortress (2016)' } },
                                    { parent: { name: 'Victorian Christmas (2017)' } },
                                    { parent: { name: 'Winter City (2018)' } },
                                    { parent: { name: 'Log Cabin (2019)' } },
                                    { parent: { name: 'Winter Cabin (2019)' } },
                                    { parent: { name: 'Winter Palace (2019)' } },
                                    { parent: { name: 'Enchanted Forest (2020)' } },
                                ],
                            },
                            {
                                parent: { name: 'Easter' },
                                children: [
                                    { parent: { name: 'Classic' } },
                                    { parent: { name: 'Lagomorph (2014)' } },
                                    { parent: { name: 'Farm (2017)' } },
                                    { parent: { name: 'Easter Garden (2018)' } },
                                    { parent: { name: 'Fairy Tale (2019)' } },
                                    { parent: { name: 'Alpine Heights (2020)' } },
                                ],
                            },
                            {
                                parent: { name: 'Halloween' },
                                children: [
                                    { parent: { name: 'Voodoo (2010)' } },
                                    { parent: { name: 'Fair (2012)' } },
                                    { parent: { name: 'Apocalypse (2015)' } },
                                    { parent: { name: 'Cursed Caves (2017)' } },
                                    { parent: { name: 'Infected Laboratory (2018)' } },
                                    { parent: { name: 'Witches (2019)' } },
                                    { parent: { name: 'Impossible House (2020)' } },
                                ],
                            },
                            {
                                parent: { name: 'New Years' },
                                children: [
                                    { parent: { name: '2010' } },
                                    { parent: { name: '2011' } },
                                    { parent: { name: '2012' } },
                                    { parent: { name: '2014' } },
                                    { parent: { name: '2015' } },
                                    { parent: { name: '2021' } },
                                ],
                            },
                            {
                                parent: { name: 'Summer' },
                                children: [
                                    { parent: { name: 'Classic' } },
                                    { parent: { name: '2017' } },
                                ],
                            },
                            {
                                parent: { name: 'Valentines' },
                                children: [
                                    { parent: { name: 'Classic' } },
                                    { parent: { name: 'Venice (2013)' } },
                                    { parent: { name: 'Ancient Japan (2015)' } },
                                    { parent: { name: 'Wedding (2017)' } },
                                ],
                            },
                        ],
                    },
                    {
                        parent: { name: 'Pets' },
                        children: [
                            { parent: { name: 'Accessories' } },
                            {
                                parent: { name: 'Babies' },
                                children: [
                                    { parent: { name: 'Food & Toys' } },
                                    { parent: { name: 'Kitten' } },
                                    { parent: { name: 'Piglets' } },
                                    { parent: { name: 'Pupples' } },
                                ],
                            },
                            { parent: { name: 'Bear' } },
                            { parent: { name: 'Bunny' } },
                            { parent: { name: 'Cat' } },
                            { parent: { name: 'Chick' } },
                            { parent: { name: 'Croc' } },
                            { parent: { name: 'Dog' } },
                            { parent: { name: 'Dragon' } },
                            { parent: { name: 'Frog' } },
                            {
                                parent: { name: 'Horse' },
                                children: [
                                    { parent: { name: 'Accessories' } },
                                    { parent: { name: 'Buy' } },
                                    { parent: { name: 'Dyes' } },
                                    { parent: { name: 'Hair Styles' } },
                                    { parent: { name: 'Jump Race' } },
                                    { parent: { name: 'Saddles' } },
                                ],
                            },
                            { parent: { name: 'Lion' } },
                            { parent: { name: 'Monkey' } },
                            { parent: { name: 'Obbah Mobbah' } },
                            { parent: { name: 'Pig' } },
                            { parent: { name: 'Rhinno' } },
                            { parent: { name: 'Spider' } },
                            { parent: { name: 'Terrier' } },
                            { parent: { name: 'Turtle' } },
                        ],
                    },
                    {
                        parent: { name: 'Groups' },
                        children: [
                            { parent: { name: 'Create a Group' } },
                            { parent: { name: 'Forum' } },
                            { parent: { name: 'Furni' } },
                        ],
                    },
                    {
                        parent: { name: 'Games' },
                        children: [
                            { parent: { name: 'Battle Banzai' } },
                            { parent: { name: 'Bunny Run' } },
                            { parent: { name: 'Freeze' } },
                            { parent: { name: 'Football' } },
                            { parent: { name: 'Snowboarding' } },
                            { parent: { name: 'Ice Hockey' } },
                        ],
                    },
                    {
                        parent: { name: 'Wired' },
                        children: [
                            { parent: { name: 'Add-Ons' } },
                            { parent: { name: 'Conditions' } },
                            { parent: { name: 'Effects' } },
                            { parent: { name: 'Leaderboards' } },
                            { parent: { name: 'Sound FX' } },
                            { parent: { name: 'Triggers' } },
                        ],
                    },
                    {
                        parent: { name: 'Marketplace' },
                        children: [
                            { parent: { name: 'My Sales' } },
                            { parent: { name: 'Offers' } },
                        ],
                    },
                ],
            },
            {
                parent: { name: 'Special' },
                children: [
                    { parent: { name: 'Badge Display' } },
                    { parent: { name: 'Bots' } },
                    {
                        parent: { name: 'Construction' },
                        children: [
                            { parent: { name: 'Black Holes' } },
                            {
                                parent: { name: 'Blocks' },
                                children: [
                                    { parent: { name: 'Alphabet' } },
                                    { parent: { name: 'Art Deco' } },
                                    { parent: { name: 'Brick' } },
                                    { parent: { name: 'Cone' } },
                                    { parent: { name: 'Cylinder' } },
                                    { parent: { name: 'Flower Hedge' } },
                                    { parent: { name: 'Glass' } },
                                    { parent: { name: 'Glass Panel' } },
                                    { parent: { name: 'Grass' } },
                                    { parent: { name: 'Half Cylinder' } },
                                    { parent: { name: 'Hemisphere' } },
                                    { parent: { name: 'Industrial' } },
                                    { parent: { name: 'Large' } },
                                    { parent: { name: 'Lava' } },
                                    { parent: { name: 'Marble' } },
                                    { parent: { name: 'Metal' } },
                                    { parent: { name: 'Metal Crate' } },
                                    { parent: { name: 'Pyramid' } },
                                    { parent: { name: 'Quarter Round' } },
                                    { parent: { name: 'Round' } },
                                    { parent: { name: 'Sand' } },
                                    { parent: { name: 'Simple Wood' } },
                                    { parent: { name: 'Small' } },
                                    { parent: { name: 'Sphere' } },
                                    { parent: { name: 'Standing Half Cylinder' } },
                                    { parent: { name: 'Standing Triangular' } },
                                    { parent: { name: 'Stone' } },
                                    { parent: { name: 'Tile' } },
                                    { parent: { name: 'Terra' } },
                                    { parent: { name: 'Triangular Prism' } },
                                    { parent: { name: 'Water' } },
                                    { parent: { name: 'Wedge' } },
                                    { parent: { name: 'Wool' } },
                                ],
                            },
                            { parent: { name: 'Room Backgrounds' } },
                            { parent: { name: 'Stack Tiles' } },
                        ],
                    },
                    {
                        parent: { name: 'Clothing' },
                        children: [
                            { parent: { name: 'Accessories' } },
                            { parent: { name: 'Dresses' } },
                            { parent: { name: 'Hairdos' } },
                            {
                                parent: { name: 'Hats' },
                                children: [
                                    { parent: { name: 'Emoji' } },
                                    { parent: { name: 'Party' } },
                                ],
                            },
                            { parent: { name: 'Jackets' } },
                            { parent: { name: 'Outfits' } },
                            { parent: { name: 'Shirts' } },
                            { parent: { name: 'Shoes' } },
                            { parent: { name: 'Skirts' } },
                            { parent: { name: 'Trousers' } },
                        ],
                    },
                    {
                        parent: { name: 'Diamonds Furnis' },
                        children: [
                            { parent: { name: 'Arctic Gold' } },
                        ],
                    },
                    {
                        parent: { name: 'Exchange' },
                        children: [
                            { parent: { name: 'Credits' } },
                            { parent: { name: 'Diamonds' } },
                        ],
                    },
                    { parent: { name: 'Limited Edition' } },
                    {
                        parent: { name: 'Music' },
                        children: [
                            { parent: { name: 'Jukebox' } },
                            { parent: { name: 'Hits' } },
                        ],
                    },
                    { parent: { name: 'Trophies' } },
                ],
            },
            {
                parent: { name: 'Staffs' },
                children: [
                    { parent: { name: 'Classical Rares' } },
                    {
                        parent: { name: 'Craftables' },
                        children: [
                            { parent: { name: 'Plushies' } },
                        ],
                    },
                    { parent: { name: 'Collectibles' } },
                    { parent: { name: 'Diamond Paintings' } },
                    { parent: { name: 'Gallery' } },
                    {
                        parent: { name: 'Rares by Type' },
                        children: [
                            { parent: { name: 'Amber Lamps' } },
                            { parent: { name: 'Dragon Lamps' } },
                            { parent: { name: 'Elephants' } },
                            { parent: { name: 'Fans' } },
                            { parent: { name: 'Fountains' } },
                            { parent: { name: 'Holos' } },
                            { parent: { name: 'Ice Cream Machines' } },
                            { parent: { name: 'Laser Gates' } },
                            { parent: { name: 'Marquees' } },
                            { parent: { name: 'Monoliths' } },
                            { parent: { name: 'Parasols' } },
                            { parent: { name: 'Pillars' } },
                            { parent: { name: 'Pillows' } },
                            { parent: { name: 'Screens' } },
                            { parent: { name: 'Sleeping Bags' } },
                            { parent: { name: 'Smoke Machines' } },
                            { parent: { name: 'StrayPixels' } },
                        ],
                    },
                    { parent: { name: 'Super Rares' } },
                    { parent: { name: 'Trophies' } },
                    { parent: { name: 'Ultra Rares' } },
                ],
            },
        ];

        const mapPage = async (page: Page, order: number): Promise<void> => {
            const parent = await SHabbo.getDatabase().getCatalogPages().create({ ...page.parent, order }).save();

            const children: Page[] = page.children ?? [];
            if (children.length) {
                let i: number = 1;

                for await (const child of children) {
                    child.parent.parent = parent;
                    await mapPage(child, i++);
                }
            }
        }

        let i: number = 1;
        for await (const page of pages) {
            await mapPage(page, i++);
        }

        LogsManager.success('Default catalog pages inserted.');
    }
}

export default CatalogPagesLoader;
