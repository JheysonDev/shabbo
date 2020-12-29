import Component from "../Component";

class Main extends Component {
    build(): boolean {
        this.container.x = 0;
        this.container.y = 0;

        this.container.sortableChildren = true;

        this.addToStage();
        return true;
    }

    dispose(): boolean {
        this.removeFromStage();
        return true;
    }
}

export default Main;
