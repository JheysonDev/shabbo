class Page {
    beforeBuild(): boolean {
        return true;
    }

    buildCSS(): void {}

    build(): HTMLElement {
        return document.createElement('div');
    }
}

export default Page;
