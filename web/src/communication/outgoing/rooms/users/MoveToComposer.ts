import PacketComposer from "../../PacketComposer";

class MoveToComposer extends PacketComposer {
    constructor(x: number, y: number) {
        super('move_to');

        this.writeInteger(x);
        this.writeInteger(y);
    }
}

export default MoveToComposer;
