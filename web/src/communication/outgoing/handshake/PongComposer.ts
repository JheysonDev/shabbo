import PacketComposer from "../PacketComposer";

class PongComposer extends PacketComposer {
    constructor(beat: number) {
        super('pong');

        this.writeInteger(beat);
    }
}

export default PongComposer;
