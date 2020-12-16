import PacketComposer from "../PacketComposer";

class PingComposer extends PacketComposer {
    constructor(private beat: number) {
        super('ping');
    }

    async execute(): Promise<void> {
        this.writeInteger(this.beat);
    }
}

export default PingComposer;
