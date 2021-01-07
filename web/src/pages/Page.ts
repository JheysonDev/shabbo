class Page {
    beforeBuild(): boolean {
        return true;
    }

    buildCSS(): void {}

    async build(): Promise<HTMLElement> {
        return document.createElement('div');
    }
}

export default Page;
