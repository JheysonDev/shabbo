import PacketComposer from "../PacketComposer";

class PongComposer extends PacketComposer {
    constructor(private beat: number) {
        super('pong');
    }

    async execute(): Promise<void> {
        this.writeInteger(this.beat);
    }
}

export default PongComposer;
