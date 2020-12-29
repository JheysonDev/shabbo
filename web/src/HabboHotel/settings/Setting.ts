class Setting {
    constructor(
        private readonly key: string,
        private readonly value: string,
    ) {}

    getKey(): string {
        return this.key;
    }

    getValue(): string {
        return this.value;
    }

    getValueAsNumber(): number {
        return Number(this.value);
    }

    getValueAsBoolean(): boolean {
        return this.value === 'true';
    }
}

export default Setting;
