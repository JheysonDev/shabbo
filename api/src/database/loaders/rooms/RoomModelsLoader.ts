import LogsManager from "@Logs";
import SHabbo from "@SHabbo";

class RoomModelsLoader implements ILoader {
    async beforeRun(): Promise<boolean> {
        const room_models = await SHabbo.getDatabase().getRoomModels().find({ take: 1 });
        return room_models.length === 0;
    }

    async run(): Promise<void> {
        // Model A
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 1,
            name: 'Model A',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 1,
                door: '1;5;0;2',
                floor: `
                    xxxxxxxxxx
                    xx00000000
                    xx00000000
                    xx00000000
                    xx00000000
                    x000000000
                    xx00000000
                    xx00000000
                    xx00000000
                    xx00000000
                    xx00000000
                    xx00000000
                    xx00000000
                    xx00000000
                `,
            }).save(),
            order: 1,
        }).save();

        // Model B
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 2,
            name: 'Model B',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 2,
                door: '1;5;0;2',
                floor: `
                    xxxxxxxxxxxxx
                    xxxxxx0000000
                    xxxxxx0000000
                    xxxxxx0000000
                    xxxxxx0000000
                    x000000000000
                    xx00000000000
                    xx00000000000
                    xx00000000000
                    xx00000000000
                    xx00000000000
                `,
            }).save(),
            order: 2,
        }).save();

        // Model C
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 3,
            name: 'Model C',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 3,
                door: '1;3;0;2',
                floor: `
                    xxxxxxxx
                    xx000000
                    xx000000
                    x0000000
                    xx000000
                    xx000000
                    xx000000
                `,
            }).save(),
            order: 3,
        }).save();

        // Model D
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 4,
            name: 'Model D',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 4,
                door: '1;7;0;2',
                floor: `
                    xxxxxxxx
                    xx000000
                    xx000000
                    xx000000
                    xx000000
                    xx000000
                    xx000000
                    x0000000
                    xx000000
                    xx000000
                    xx000000
                    xx000000
                    xx000000
                    xx000000
                    xx000000
                `,
            }).save(),
            order: 4
        }).save();

        // Model E
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 5,
            name: 'Model E',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 5,
                door: '1;3;0;2',
                floor: `
                    xxxxxxxxxxxx
                    xx0000000000
                    xx0000000000
                    x00000000000
                    xx0000000000
                    xx0000000000
                    xx0000000000
                    xx0000000000
                    xx0000000000
                `,
            }).save(),
            order: 5,
        }).save();

        // Model F
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 6,
            name: 'Model F',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 6,
                door: '2;5;0;2',
                floor: `
                    xxxxxxxxxxx
                    xxxxxxx0000
                    xxxxxxx0000
                    xxx00000000
                    xxx00000000
                    xx000000000
                    xxx00000000
                    x0000000000
                    x0000000000
                    x0000000000
                    x0000000000
                `,
            }).save(),
            order: 6,
        }).save();

        // Model G
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 7,
            name: 'Model G',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 7,
                door: '1;6;1;2',
                floor: `
                    xxxxxxxxxxxx
                    xxxxxxx00000
                    xxxxxxx00000
                    xxxxxxx00000
                    xx1111000000
                    xx1111000000
                    x11111000000
                    xx1111000000
                    xx1111000000
                    xxxxxxx00000
                    xxxxxxx00000
                    xxxxxxx00000
                `,
            }).save(),
            order: 7,
        }).save();

        // Model H
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 8,
            name: 'Model H',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 8,
                door: '3;3;1;2',
                floor: `
                    xxxxxxxxx
                    xxx111111
                    xxx111111
                    xx1111111
                    xxx111111
                    xxx111111
                    xxx000000
                    xxx000000
                    x00000000
                    x00000000
                    x00000000
                    x00000000
                `,
            }).save(),
            order: 8,
        }).save();

        // Model I
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 9,
            name: 'Model I',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 9,
                door: '1;10;0;2',
                floor: `
                    xxxxxxxxxxxxxxxxxx
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    x00000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                    xx0000000000000000
                `,
            }).save(),
            order: 9,
        }).save();

        // Model J
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 10,
            name: 'Model J',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 10,
                door: '1;10;0;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxx0000000000
                    xxxxxxxxxxxx0000000000
                    xxxxxxxxxxxx0000000000
                    xxxxxxxxxxxx0000000000
                    xxxxxxxxxxxx0000000000
                    xxxxxxxxxxxx0000000000
                    xx00000000000000000000
                    xx00000000000000000000
                    xx00000000000000000000
                    x000000000000000000000
                    xx00000000000000000000
                    xx00000000000000000000
                    xx00000000000000000000
                    xx00000000000000000000
                    xx00000000000000000000
                    xx00000000000000000000
                    xx0000000000xxxxxxxxxx
                    xx0000000000xxxxxxxxxx
                    xx0000000000xxxxxxxxxx
                    xx0000000000xxxxxxxxxx
                    xx0000000000xxxxxxxxxx
                    xx0000000000xxxxxxxxxx
                `,
            }).save(),
            order: 10,
        }).save();

        // Model K
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 11,
            name: 'Model K',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 11,
                door: '1;13;0;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxx00000000
                    xxxxxxxxxxxxxxxxxx00000000
                    xxxxxxxxxxxxxxxxxx00000000
                    xxxxxxxxxxxxxxxxxx00000000
                    xxxxxxxxxx0000000000000000
                    xxxxxxxxxx0000000000000000
                    xxxxxxxxxx0000000000000000
                    xxxxxxxxxx0000000000000000
                    xx000000000000000000000000
                    xx000000000000000000000000
                    xx000000000000000000000000
                    xx000000000000000000000000
                    x0000000000000000000000000
                    xx000000000000000000000000
                    xx000000000000000000000000
                    xx000000000000000000000000
                    xxxxxxxxxx0000000000000000
                    xxxxxxxxxx0000000000000000
                    xxxxxxxxxx0000000000000000
                    xxxxxxxxxx0000000000000000
                    xxxxxxxxxx0000000000000000
                    xxxxxxxxxx0000000000000000
                    xxxxxxxxxx0000000000000000
                    xxxxxxxxxx0000000000000000
                    xxxxxxxxxx0000000000000000
                    xxxxxxxxxx0000000000000000
                `,
            }).save(),
            order: 11,
        }).save();

        // Model L
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 12,
            name: 'Model L',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 12,
                door: '1;16;0;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxxx
                    xx00000000000000000000
                    xx00000000000000000000
                    xx00000000000000000000
                    xx00000000000000000000
                    xx00000000000000000000
                    xx00000000000000000000
                    xx00000000000000000000
                    xx00000000000000000000
                    xx00000000xxxx00000000
                    xx00000000xxxx00000000
                    xx00000000xxxx00000000
                    xx00000000xxxx00000000
                    xx00000000xxxx00000000
                    xx00000000xxxx00000000
                    xx00000000xxxx00000000
                    x000000000xxxx00000000
                    xx00000000xxxx00000000
                    xx00000000xxxx00000000
                    xx00000000xxxx00000000
                    xx00000000xxxx00000000
                `,
            }).save(),
            order: 12,
        }).save();

        // Model M
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 13,
            name: 'Model M',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 13,
                door: '1;15;0;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxx00000000xxxxxxxxxx
                    xxxxxxxxxxxx00000000xxxxxxxxxx
                    xxxxxxxxxxxx00000000xxxxxxxxxx
                    xxxxxxxxxxxx00000000xxxxxxxxxx
                    xxxxxxxxxxxx00000000xxxxxxxxxx
                    xxxxxxxxxxxx00000000xxxxxxxxxx
                    xxxxxxxxxxxx00000000xxxxxxxxxx
                    xxxxxxxxxxxx00000000xxxxxxxxxx
                    xxxxxxxxxxxx00000000xxxxxxxxxx
                    xxxxxxxxxxxx00000000xxxxxxxxxx
                    xx0000000000000000000000000000
                    xx0000000000000000000000000000
                    xx0000000000000000000000000000
                    xx0000000000000000000000000000
                    x00000000000000000000000000000
                    xx0000000000000000000000000000
                    xx0000000000000000000000000000
                    xx0000000000000000000000000000
                    xxxxxxxxxxxx00000000xxxxxxxxxx
                    xxxxxxxxxxxx00000000xxxxxxxxxx
                    xxxxxxxxxxxx00000000xxxxxxxxxx
                    xxxxxxxxxxxx00000000xxxxxxxxxx
                    xxxxxxxxxxxx00000000xxxxxxxxxx
                    xxxxxxxxxxxx00000000xxxxxxxxxx
                    xxxxxxxxxxxx00000000xxxxxxxxxx
                    xxxxxxxxxxxx00000000xxxxxxxxxx
                    xxxxxxxxxxxx00000000xxxxxxxxxx
                    xxxxxxxxxxxx00000000xxxxxxxxxx                
                `,
            }).save(),
            order: 13,
        }).save();

        // Model N
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 14,
            name: 'Model N',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 14,
                door: '1;16;0;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxxx
                    xx00000000000000000000
                    xx00000000000000000000
                    xx00000000000000000000
                    xx00000000000000000000
                    xx00000000000000000000
                    xx00000000000000000000
                    xx000000xxxxxxxx000000
                    xx000000x000000x000000
                    xx000000x000000x000000
                    xx000000x000000x000000
                    xx000000x000000x000000
                    xx000000x000000x000000
                    xx000000x000000x000000
                    xx000000xxxxxxxx000000
                    xx00000000000000000000
                    x000000000000000000000
                    xx00000000000000000000
                    xx00000000000000000000
                    xx00000000000000000000
                    xx00000000000000000000
                `,
            }).save(),
            order: 14,
        }).save();

        // Model O
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 15,
            name: 'Model O',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 15,
                door: '1;18;1;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxx11111111xxxx
                    xxxxxxxxxxxxxx11111111xxxx
                    xxxxxxxxxxxxxx11111111xxxx
                    xxxxxxxxxxxxxx11111111xxxx
                    xxxxxxxxxxxxxx11111111xxxx
                    xxxxxxxxxxxxxx11111111xxxx
                    xxxxxxxxxxxxxx11111111xxxx
                    xxxxxxxxxxxxxx00000000xxxx
                    xxxxxxxxxx0000000000000000
                    xxxxxxxxxx0000000000000000
                    xxxxxxxxxx0000000000000000
                    xxxxxxxxxx0000000000000000
                    xxxxxxxxxx0000000000000000
                    xxxxxxxxxx0000000000000000
                    xx111111100000000000000000
                    xx111111100000000000000000
                    xx111111100000000000000000
                    x1111111100000000000000000
                    xx111111100000000000000000
                    xx111111100000000000000000
                    xx111111100000000000000000
                    xx111111100000000000000000
                    xxxxxxxxxx0000000000000000
                    xxxxxxxxxx0000000000000000
                    xxxxxxxxxx0000000000000000
                    xxxxxxxxxx0000000000000000
                `,
            }).save(),
            order: 15,
        }).save();

        // Model P
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 16,
            name: 'Model P',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 16,
                door: '1;23;2;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxx
                    xxxxxxxx222222222222
                    xxxxxxxx222222222222
                    xxxxxxxx222222222222
                    xxxxxxxx222222222222
                    xxxxxxxx222222222222
                    xxxxxxxx222222222222
                    xxxxxxxx22222222xxxx
                    xxxxxxxx11111111xxxx
                    xx222221111111111111
                    xx222221111111111111
                    xx222221111111111111
                    xx222221111111111111
                    xx222221111111111111
                    xx222221111111111111
                    xx222221111111111111
                    xx222221111111111111
                    xx2222xx11111111xxxx
                    xx2222xx00000000xxxx
                    xx2222xx000000000000
                    xx2222xx000000000000
                    xx2222xx000000000000
                    xx2222xx000000000000
                    x22222xx000000000000
                    xx2222xx000000000000                
                `,
            }).save(),
            order: 16,
        }).save();

        // Model Q
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 17,
            name: 'Model Q',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 17,
                door: '10;4;2;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxx22222222
                    xxxxxxxxxxx22222222
                    xxxxxxxxxxx22222222
                    xxxxxxxxxx222222222
                    xxxxxxxxxxx22222222
                    xxxxxxxxxxx22222222
                    x222222222222222222
                    x222222222222222222
                    x222222222222222222
                    x222222222222222222
                    x222222222222222222
                    x222222222222222222
                    x2222xxxxxxxxxxxxxx
                    x2222xxxxxxxxxxxxxx
                    x2222211111xx000000
                    x222221111110000000
                    x222221111110000000
                    x2222211111xx000000
                    xx22xxx1111xxxxxxxx
                    xx11xxx1111xxxxxxxx
                    x1111xx1111xx000000
                    x1111xx111110000000
                    x1111xx111110000000
                    x1111xx1111xx000000
                `,
            }).save(),
            order: 17,
        }).save();

        // Model R
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 18,
            name: 'Model R',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 18,
                door: '10;4;3;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxx33333333333333
                    xxxxxxxxxxx33333333333333
                    xxxxxxxxxxx33333333333333
                    xxxxxxxxxx333333333333333
                    xxxxxxxxxxx33333333333333
                    xxxxxxxxxxx33333333333333
                    xxxxxxx333333333333333333
                    xxxxxxx333333333333333333
                    xxxxxxx333333333333333333
                    xxxxxxx333333333333333333
                    xxxxxxx333333333333333333
                    xxxxxxx333333333333333333
                    x4444433333xxxxxxxxxxxxxx
                    x4444433333xxxxxxxxxxxxxx
                    x44444333333222xx000000xx
                    x44444333333222xx000000xx
                    xxx44xxxxxxxx22xx000000xx
                    xxx33xxxxxxxx11xx000000xx
                    xxx33322222211110000000xx
                    xxx33322222211110000000xx
                    xxxxxxxxxxxxxxxxx000000xx
                    xxxxxxxxxxxxxxxxx000000xx
                    xxxxxxxxxxxxxxxxx000000xx
                    xxxxxxxxxxxxxxxxx000000xx
                `,
            }).save(),
            order: 18,
        }).save();

        // Model S
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 19,
            name: 'Model S',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 19,
                door: '1;3;2;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xx222222222222222222222222222
                    xx222222222222222222222222222
                    x2222222222222222222222222222
                    xx222222222222222222222222222
                    xx2222xxxxxx222222xxxxxxx2222
                    xx2222xxxxxx111111xxxxxxx2222
                    xx2222xx111111111111111xx2222
                    xx2222xx111111111111111xx2222
                    xx2222xx11xxx1111xxxx11xx2222
                    xx2222xx11xxx0000xxxx11xx2222
                    xx22222111x00000000xx11xx2222
                    xx22222111x00000000xx11xx2222
                    xx22222111x00000000xx11xx2222
                    xx22222111x00000000xx11xx2222
                    xx22222111x00000000xx11xx2222
                    xx22222111x00000000xx11xx2222
                    xx2222xx11xxxxxxxxxxx11xx2222
                    xx2222xx11xxxxxxxxxxx11xx2222
                    xx2222xx111111111111111xx2222
                    xx2222xx111111111111111xx2222
                    xx2222xxxxxxxxxxxxxxxxxxx2222
                    xx2222xxxxxxxxxxxxxxxxxxx2222
                    xx222222222222222222222222222
                    xx222222222222222222222222222
                    xx222222222222222222222222222
                    xx222222222222222222222222222
                `,
            }).save(),
            order: 19,
        }).save();

        // Model T
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 20,
            name: 'Model T',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 20,
                door: '1;17;1;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxxxxx
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    x11111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                    xx1111100000000000000000
                `,
            }).save(),
            order: 20,
        }).save();

        // Model U
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 21,
            name: 'Model U',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 21,
                door: '1;3;2;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxx
                    xx222221111111111111
                    xx222221111111111111
                    x2222221111111111111
                    xx222221111111111111
                    xx222221111111111111
                    xx222221111111111111
                    xxxxxxxxx1111xxxxxxx
                    xxxxxxxxx0000xxxxxxx
                    xx000000x0000x000000
                    xx000000x0000x000000
                    xx00000000000x000000
                    xx00000000000x000000
                    xx000000000000000000
                    xx000000000000000000
                    xxxxxxxxx00000000000
                    xx000000x00000000000
                    xx000000x0000xxxxxxx
                    xx00000000000x000000
                    xx00000000000x000000
                    xx00000000000x000000
                    xx00000000000x000000
                    xxxxxxxxx0000x000000
                    xx000000x0000x000000
                    xx000000x0000x000000
                    xx000000000000000000
                    xx000000000000000000
                    xx000000000000000000
                    xx000000000000000000
                `,
            }).save(),
            order: 21,
        }).save();

        // Model V
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 22,
            name: 'Model V',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 22,
                door: '1;3;2;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xx2222xx1111111111xx11111111
                    xx2222xx1111111111xx11111111
                    x222222111111111111111111111
                    xx22222111111111111111111111
                    xx22222111111111111111111111
                    xx22222111111111111111111111
                    xx2222xx1111111111xx11111111
                    xx2222xx1111111111xx11111111
                    xx2222xx1111111111xxxx1111xx
                    xx2222xx1111111111xxxx0000xx
                    xxxxxxxx1111111111xx00000000
                    xxxxxxxx1111111111xx00000000
                    xx22222111111111111000000000
                    xx22222111111111111000000000
                    xx22222111111111111000000000
                    xx22222111111111111000000000
                    xx2222xx1111111111xx00000000
                    xx2222xx1111111111xx00000000
                    xx2222xxxx1111xxxxxxxxxxxxxx
                    xx2222xxxx0000xxxxxxxxxxxxxx
                    xx2222x0000000000xxxxxxxxxxx
                    xx2222x0000000000xxxxxxxxxxx
                    xx2222x0000000000xxxxxxxxxxx
                    xx2222x0000000000xxxxxxxxxxx
                    xx2222x0000000000xxxxxxxxxxx
                    xx2222x0000000000xxxxxxxxxxx
                `,
            }).save(),
            order: 22,
        }).save();

        // Model W
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 23,
            name: 'Model W',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 23,
                door: '1;12;0;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxx
                    xx000000000000000000
                    xx000000000000000000
                    xx000000000000000000
                    xx000000000000000000
                    xx000000000000000000
                    xx000000000000000000
                    xxxx00xxx0000xxx00xx
                    xx000000x0000x000000
                    xx000000x0000x000000
                    xx000000x0000x000000
                    xx000000x0000x000000
                    x0000000x0000x000000
                    xx000000x0000x000000
                    xx000000x0000x000000
                    xx000000x0000x000000
                    xx000000x0000x000000
                    xx000000x0000x000000
                    xx000000xxxxxx000000
                    xx000000000000000000
                    xx000000000000000000
                    xx000000000000000000
                    xx000000000000000000
                    xx000000000000000000
                    xx000000000000000000
                `,
            }).save(),
            order: 23,
        }).save();

        // Model X
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 24,
            name: 'Model X',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 24,
                door: '1;3;0;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xx00000000xx0000000000xx0000
                    xx00000000xx0000000000xx0000
                    x000000000xx0000000000xx0000
                    xx00000000xx0000000000xx0000
                    xx00000000xx0000xx0000xx0000
                    xx00000000xx0000xx0000xx0000
                    xx00000000xx0000xx0000000000
                    xx00000000xx0000xx0000000000
                    xxxxxx0000xx0000xx0000000000
                    xxxxxx0000xx0000xx0000000000
                    xxxxxx0000xx0000xxxxxxxxxxxx
                    xxxxxx0000xx0000xxxxxxxxxxxx
                    xx00000000xx0000000000000000
                    xx00000000xx0000000000000000
                    xx00000000xx0000000000000000
                    xx00000000xx0000000000000000
                    xx0000xxxxxxxxxxxxxxxxxx0000
                    xx0000xxxxxxxxxxxxxxxxxx0000
                    xx00000000000000000000000000
                    xx00000000000000000000000000
                    xx00000000000000000000000000
                    xx00000000000000000000000000
                `,
            }).save(),
            order: 24,
        }).save();

        // Model Y
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 25,
            name: 'Model Y',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 25,
                door: '1;9;0;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxx00000000000000000000
                    xxxxxxxxxxxx00000000000000000000
                    xxxxxxxxxxxx00000000000000000000
                    xx00000000xx00000000000000000000
                    xx00000000xx00000000000000000000
                    xx00000000xx00000000000000000000
                    xx00000000xx00000000000000000000
                    xx00000000xx00000000000000000000
                    x000000000xx00000000000000000000
                    xx00000000xx00000000000000000000
                    xx00000000xx00000000000000000000
                    xx00000000xx00000000000000000000
                    xx00000000xx00000000000000000000
                    xx00000000xx00000000000000000000
                    xx00000000xx00000000000000000000
                    xxxxxxxxxxxx00000000000000000000
                    xxxxxxxxxxxx00000000000000000000
                    xxxxxxxxxxxx00000000000000000000
                `,
            }).save(),
            order: 25,
        }).save();

        // Model Z
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 26,
            name: 'Model Z',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 26,
                door: '1;4;0;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xx00000000xx00000000xx00000000xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xx00000000xx00000000xx00000000xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xx00000000xx00000000xx00000000xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx0000
                    x000000000xx00000000xx00000000xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx0000
                    xx00000000xx00000000xx00000000xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx0000
                    xx00000000xx00000000xx00000000xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx0000
                    xx00000000xx00000000xx00000000xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xx00000000xx00000000xx00000000xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                `,
            }).save(),
            order: 26,
        }).save();

        // Model AA
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 27,
            name: 'Model AA',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 27,
                door: '1;10;10;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxeeeeeeeeeeeeeeeedcba9888888888888
                    xxeeeeeeeeeeeeeeeexxxxxx88888888888
                    xxeeeeeeeeeeeeeeeexxxxxx88888888888
                    xxeeeeeeeeeeeeeeeexxxxxx88888888888
                    xxeeeeeeeeeeeeeeeexxxxxx88888888888
                    xxdxxxxxxxxxxxxxxxxxxxxx88888888888
                    xxcxxxxxxxxxxxxxxxxxxxxx88888888888
                    xxbxxxxxxxxxxxxxxxxxxxxx88888888888
                    xxaxxxxxxxxxxxxxxxxxxxxx88888888888
                    xaaaaaaaaaaaaaaaaaxxxxxxxxxxxxxxxxx
                    xxaaaaaaaaaaaaaaaaxxxxxxxxxxxxxxxxx
                    xxaaaaaaaaaaaaaaaaxxxxxxxxxxxxxxxxx
                    xxaaaaaaaaaaaaaaaaxxxx6666666666666
                    xxaaaaaaaaaaaaaaaaxxxx6666666666666
                    xxaaaaaaaaaaaaaaaaxxxx6666666666666
                    xxaaaaaaaaaaaaaaaaxxxx6666666666666
                    xxaaaaaaaaaaaaaaaaxxxx6666666666666
                    xxaaaaaaaaaaaaaaaa98766666666666666
                    xxaaaaaaaaaaaaaaaaxxxxxxxxxxxx5xxxx
                    xxaaaaaaaaaaaaaaaaxxxxxxxxxxxx4xxxx
                    xxaaaaaaaaaaaaaaaaxxxxxxxxxxxx3xxxx
                    xxaaaaaaaaaaaaaaaaxxx3333333333xxxx
                    xxaaaaaaaaaaaaaaaaxxx3333333333xxxx
                    xxaaaaaaaaaaaaaaaaxxx3333333333xxxx
                    xxaaaaaaaaaaaaaaaaxxx3333333333xxxx
                    xxaaaaaaaaaaaaaaaaxxx3333333333xxxx
                    xxaaaaaaaaaaaaaaaaxxx3333333333xxxx
                    xxaaaaaaaaaaaaaaaaxxx3333333333xxxx
                    xxaaaaaaaaaaaaaaaaxxx3333333333xxxx
                    xxaaaaaaaaaaaaaaaaxxx3333333333xxxx
                    xxaaaaaaaaaaaaaaaaxxx3333333333xxxx
                    xxxxxxxxxxxxxxxxx9xxx3333333333xxxx
                    xxxxxxxxxxxxxxxxx8xxx3333333333xxxx
                    xxxxxxxxxxxxxxxxx7xxx3333333333xxxx
                    xxxx777777777xxxx6xxx3333333333xxxx
                    xxxx777777777xxxx5xxxxxxxxxxxxxxxxx
                    xxxx777777777xxxx4xxxxxxxxxxxxxxxxx
                    xxxx777777777xxxx3xxxxxxxxxxxxxxxxx
                    xxxx777777777xxxx2xxxxxxxxxxxxxxxxx
                    xxfffffffffxxxxxx1xxxxxxxxxxxxxxxxx
                    xxfffffffffxxxxxx111111111111111111
                    xxfffffffffxxxxxx111111111111111111
                    xxfffffffffxxxxxx111111111111111111
                    xxfffffffffxxxxxx111111111111111111
                    xxfffffffffxxxxxx111111111111111111
                    xxfffffffffxxxxxx111111111111111111
                    xxxxxxxxxxxxxxxxx111111111111111111
                    xxxxxxxxxxxxxxxxx111111111111111111
                    xx000000000xxxxxx111111111111111111
                    xx000000000xxxxxx111111111111111111
                    xx000000000xxxxxx111111111111111111
                    xx000000000xxxxxx111111111111111111
                    xx000000000xxxxxx111111111111111111
                    xx000000000xxxxxx111111111111111111
                    xx000000000xxxxxxxxxxxxxxxxxxxxxxxx
                    xx000000000xxxxxxxxxxxxxxxxxxxxxxxx
                    xx000000000xxxxxxxxxxxxxxxxxxxxxxxx
                    xx000000000xxxxxxxxxxxxxxxxxxxxxxxx
                    xx000000000xxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xx000000000xxxxxxxxxxxxxxxxxxxxxxxx
                    xx000000000xxxxxxxxxxxxxxxxxxxxxxxx
                    xx000000000xxxxxxxxxxxxxxxxxxxxxxxx
                    xx000000000xxxxxxxxxxxxxxxxxxxxxxxx
                    xx000000000xxxxxxxxxxxxxxxxxxxxxxxx
                    xx000000000xxxxxxxxxxxxxxxxxxxxxxxx
                    xx000000000xxxxxxxxxxxxxxxxxxxxxxxx
                    xx000000000xxxxxxxxxxxxxxxxxxxxxxxx
                    xx000000000xxxxxxxxxxxxxxxxxxxxxxxx
                    xx000000000xxxxxxxxxxxxxxxxxxxxxxxx
                    xx000000000xxxxxxxxxxxxxxxxxxxxxxxx
                `,
            }).save(),
            order: 27,
        }).save();

        // Model AB
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 28,
            name: 'Model AB',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 28,
                door: '1;15;14;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xxjjjjjjjjjjjjjx0000xxxxxxxxxx
                    xxjjjjjjjjjjjjjx0000xxxxxxxxxx
                    xxjjjjjjjjjjjjjx0000xxxxxxxxxx
                    xxjjjjjjjjjjjjjx0000xxxxxxxxxx
                    xxjjjjjjjjjjjjjx0000xxxxxxxxxx
                    xxjjjjjjjjjjjjjx0000xxxxxxxxxx
                    xxjjjjjjjjjjjjjx0000xxxxxxxxxx
                    xxjjjjjjjjjjjjjx0000xxxxxxxxxx
                    xxxxxxxxxxxxxiix0000xxxxxxxxxx
                    xxxxxxxxxxxxxhhx0000xxxxxxxxxx
                    xxxxxxxxxxxxxggx0000xxxxxxxxxx
                    xxxxxxxxxxxxxffx0000xxxxxxxxxx
                    xxxxxxxxxxxxxeex0000xxxxxxxxxx
                    xxeeeeeeeeeeeeex0000xxxxxxxxxx
                    xeeeeeeeeeeeeeex0000xxxxxxxxxx
                    xxeeeeeeeeeeeeex0000xxxxxxxxxx
                    xxeeeeeeeeeeeeex0000xxxxxxxxxx
                    xxeeeeeeeeeeeeex0000xxxxxxxxxx
                    xxeeeeeeeeeeeeex0000xxxxxxxxxx
                    xxeeeeeeeeeeeeex0000xxxxxxxxxx
                    xxeeeeeeeeeeeeex0000xxxxxxxxxx
                    xxeeeeeeeeeeeeex0000xxxxxxxxxx
                    xxeeeeeeeeeeeeex0000xxxxxxxxxx
                    xxxxxxxxxxxxxddx00000000000000
                    xxxxxxxxxxxxxccx00000000000000
                    xxxxxxxxxxxxxbbx00000000000000
                    xxxxxxxxxxxxxaax00000000000000
                    xxaaaaaaaaaaaaax00000000000000
                    xxaaaaaaaaaaaaax00000000000000
                    xxaaaaaaaaaaaaax00000000000000
                    xxaaaaaaaaaaaaax00000000000000
                    xxaaaaaaaaaaaaax00000000000000
                    xxaaaaaaaaaaaaax00000000000000
                    xxaaaaaaaaaaaaax00000000000000
                    xxaaaaaaaaaaaaax00000000000000
                    xxaaaaaaaaaaaaax00000000000000
                    xxaaaaaaaaaaaaax00000000000000
                    xxxxxxxxxxxxx99x0000xxxxxxxxxx
                    xxxxxxxxxxxxx88x0000xxxxxxxxxx
                    xxxxxxxxxxxxx77x0000xxxxxxxxxx
                    xxxxxxxxxxxxx66x0000xxxxxxxxxx
                    xxxxxxxxxxxxx55x0000xxxxxxxxxx
                    xxxxxxxxxxxxx44x0000xxxxxxxxxx
                    xx4444444444444x0000xxxxxxxxxx
                    xx4444444444444x0000xxxxxxxxxx
                    xx4444444444444x0000xxxxxxxxxx
                    xx4444444444444x0000xxxxxxxxxx
                    xx4444444444444x0000xxxxxxxxxx
                    xx4444444444444x0000xxxxxxxxxx
                    xx4444444444444x0000xxxxxxxxxx
                    xx4444444444444x0000xxxxxxxxxx
                    xx4444444444444x0000xxxxxxxxxx
                    xx4444444444444x0000xxxxxxxxxx
                    xxxxxxxxxxxxx33x0000xxxxxxxxxx
                    xxxxxxxxxxxxx22x0000xxxxxxxxxx
                    xxxxxxxxxxxxx11x0000xxxxxxxxxx
                    xxxxxxxxxxxxx00x0000xxxxxxxxxx
                    xx000000000000000000xxxxxxxxxx
                    xx000000000000000000xxxxxxxxxx
                    xx000000000000000000xxxxxxxxxx
                    xx000000000000000000xxxxxxxxxx
                    xx000000000000000000xxxxxxxxxx
                    xx000000000000000000xxxxxxxxxx
                    xx000000000000000000xxxxxxxxxx
                    xx000000000000000000xxxxxxxxxx              
                `,
            }).save(),
            order: 28,
        }).save();

        // Model AC
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 29,
            name: 'Model AC',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 29,
                door: '1;10;0;2',
                floor: `
                    xxxxxxxxxxxxxxxxx
                    xxxx0000000000000
                    xxxx0000000000000
                    xxxx0000000000000
                    xxxx0000000000000
                    xxxx0000000000000
                    xxxx0000000000000
                    xx000000000000000
                    xx000000000000000
                    xx000000000000000
                    x0000000000000000
                    xx000000000000000
                    xx000000000000000
                    xx000000000000000
                `,
            }).save(),
            order: 29,
        }).save();

        // Model AD
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 30,
            name: 'Model AD',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 30,
                door: '1;10;0;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxx
                    xxxxxxxxxxaaaaaaaaaaa
                    xxxxxxxxxxaaaaaaaaaaa
                    xxxxxxxxxxaaaaaaaaaaa
                    xxxxxxxxxxaaaaaaaaaaa
                    xx00000000xxxxxaaaaaa
                    xx00000000xxxxxaaaaaa
                    xx00000000xxxxxaaaaaa
                    xx00000000xxxxxaaaaaa
                    xx0000000000000aaaaaa
                    x00000000000000aaaaaa
                    xx0000000000000aaaaaa
                    xx0000000000000aaaaaa
                    xx0000000000000xxxxxx
                    xx0000000000000xxxxxx
                    xx0000000000000xxxxxx
                    xx0000000000000xxxxxx
                    xx0000000000000xxxxxx
                    xx0000000000000xxxxxx
                `,
            }).save(),
            order: 30,
        }).save();

        // Model AE
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 31,
            name: 'Model AE',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 31,
                door: '1;10;0;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    x000000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                    xx00000000000000000000000000000000
                `,
            }).save(),
            order: 31,
        }).save();

        // Model AF
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 32,
            name: 'Model AF',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 32,
                door: '1;15;0;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xx222222222x000000000000000000000000
                    xx222222222x000000000000000000000000
                    xx222222222x000000000000000000000000
                    xx222222222x000000000000000000000000
                    xx222222222x000000000000000000000000
                    xx222222222x000000000000000000000000
                    xx222222222x000000000000000000000000
                    xx222222222x000000000000000000000000
                    xx222222222x00000000xxxxxxxx00000000
                    xx11xxxxxxxx00000000xxxxxxxx00000000
                    xx00x000000000000000xxxxxxxx00000000
                    xx00x000000000000000xxxxxxxx00000000
                    xx000000000000000000xxxxxxxx00000000
                    xx000000000000000000xxxxxxxx00000000
                    x0000000000000000000xxxxxxxx00000000
                    xx000000000000000000xxxxxxxx00000000
                    xx00x000000000000000xxxxxxxx00000000
                    xx00x000000000000000xxxxxxxx00000000
                    xx00xxxxxxxxxxxxxxxxxxxxxxxx00000000
                    xx00xxxxxxxxxxxxxxxxxxxxxxxx00000000
                    xx00x0000000000000000000000000000000
                    xx00x0000000000000000000000000000000
                    xx0000000000000000000000000000000000
                    xx0000000000000000000000000000000000
                    xx0000000000000000000000000000000000
                    xx0000000000000000000000000000000000
                    xx00x0000000000000000000000000000000
                    xx00x0000000000000000000000000000000
                `,
            }).save(),
            order: 32,
        }).save();

        // Model AG
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 33,
            name: 'Model AG',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 33,
                door: '1;17;0;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxxxxxx
                    xx222222xx00000000xxxxxxx
                    xx222222xx00000000xxxxxxx
                    xx2222221000000000xxxxxxx
                    xx2222221000000000xxxxxxx
                    xx222222xx00000000xxxxxxx
                    xx222222xx00000000xxxxxxx
                    xx222222xxxxxxxxxxxxxxxxx
                    xx222222xkkkkkkxxiiiiiiii
                    xx222222xkkkkkkxxiiiiiiii
                    xx222222xkkkkkkjiiiiiiiii
                    xx222222xkkkkkkjiiiiiiiii
                    xx222222xkkkkkkxxiiiiiiii
                    xxxx11xxxkkkkkkxxiiiiiiii
                    xxxx00xxxkkkkkkxxxxxxxxxx
                    xx000000xkkkkkkxxxxxxxxxx
                    xx000000xkkkkkkxxxxxxxxxx
                    x0000000xkkkkkkxxxxxxxxxx
                    xx000000xkkkkkkxxxxxxxxxx
                    xx000000xkkkkkkxxxxxxxxxx
                    xx000000xxxjjxxxxxxxxxxxx
                    xx000000xxxiixxxxxxxxxxxx
                    xx000000xiiiiiixxxxxxxxxx
                    xxxxxxxxxiiiiiixxxxxxxxxx
                    xxxxxxxxxiiiiiixxxxxxxxxx
                    xxxxxxxxxiiiiiixxxxxxxxxx
                    xxxxxxxxxiiiiiixxxxxxxxxx
                    xxxxxxxxxiiiiiixxxxxxxxxx
                    xxxxxxxxxiiiiiixxxxxxxxxx
                    xxxxxxxxxiiiiiixxxxxxxxxx
                `,
            }).save(),
            order: 33,
        }).save();

        // Model AH
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 34,
            name: 'Model AH',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 34,
                door: '1;15;5;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    xx5555555555555555555555555xxxxxxx
                    xx5555555555555555555555555xxxxxxx
                    xx5555555555555555555555555xxxxxxx
                    xx5555555555555555555555555xxxxxxx
                    xx5555555555555555555555555xxxxxxx
                    xx5555555555555555555555555xxxxxxx
                    xx5555555555xxxxxxxxxxxxxxxxxxxxxx
                    xx55555555554321000000000000000000
                    xx55555555554321000000000000000000
                    xx5555555555xxxxx00000000000000000
                    xx555555x44x0000000000000000000000
                    xx555555x33x0000000000000000000000
                    xx555555x22x0000000000000000000000
                    xx555555x11x0000000000000000000000
                    x5555555x00x0000000000000000000000
                    xx555555x0000000000000000000000000
                    xx555555x0000000000000000000000000
                    xx555555x0000000000000000000000000
                    xx555555x0000000000000000000000000
                    xx555555x0000000000000000000000000
                    xx555555x0000000000000000000000000
                    xx555555x0000000000000000000000000
                    xx555555x0000000000000000000000000
                    xx555555x0000000000000000000000000
                    xx555555x0000000000000000000000000
                    xxxxxxxxx0000000000000000000000000
                    xxxxxxxxx0000000000000000000000000
                    xxxxxxxxx0000000000000000000000000
                    xxxxxxxxx0000000000000000000000000
                    xxxxxxxxx0000000000000000000000000
                    xxxxxxxxx0000000000000000000000000
                    xxxxxxxxx0000000000000000000000000
                `,
            }).save(),
            order: 34,
        }).save();

        // Model AI
        await SHabbo.getDatabase().getNavigatorRooms().create({
            id: 35,
            name: 'Model AI',
            model: await SHabbo.getDatabase().getRoomModels().create({
                id: 35,
                door: '1;17;0;2',
                floor: `
                    xxxxxxxxxxxxxxxxxxxxxxxx
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    x00000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                    xx0000000000000000000000
                `,
            }).save(),
            order: 35,
        }).save();

        LogsManager.success('Default room models and navigator rooms inserted.');
    }
}

export default RoomModelsLoader;
