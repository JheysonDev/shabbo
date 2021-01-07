import Component from "../Component";

class MainComponent extends Component {
    async build(): Promise<void> {
        this.container.x = 0;
        this.container.y = 0;

        this.container.sortableChildren = true;

        this.addToStage();
        this.setActive(true);
    }

    async dispose(): Promise<void> {
        this.removeFromStage();
        this.setActive(false);
    }
}

export default MainComponent;
