import Component from "../Component";

class MainComponent extends Component {
    build(): void {
        this.container.x = 0;
        this.container.y = 0;

        this.container.sortableChildren = true;

        this.addToStage();
        this.setActive(true);
    }

    dispose(): void {
        this.removeFromStage();
        this.setActive(false);
    }
}

export default MainComponent;
