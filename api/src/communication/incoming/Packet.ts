class Packet {
    private data: string[];
    private position: number;

    constructor(data: string) {
        this.data = data ? data.split('||') : [];
        this.position = -1;
    }

    async readString(): Promise<string> {
        if (this.data.length === this.position + 1) {
            throw new Error('No more data.');
        }

        const data: string = this.data[++this.position];

        if (!data.length) {
            throw new Error('No data.');
        }

        return data;
    }

    async readInteger(): Promise<number> {
        const number: number = Number(await this.readString());

        if (isNaN(number)) {
            throw new Error('The data is not an integer.');
        }

        return number;
    }

    async readBoolean(): Promise<boolean> {
        const data: string = await this.readString();

        if (data !== 'false' && data !== 'true') {
            throw new Error('The data is not a boolean.');
        }

        return data === 'true';
    }
}

export default Packet;
