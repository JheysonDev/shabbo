import SHabbo from "@SHabbo";
import "@Assets/styles/general.scss";

try {
    const app = new SHabbo();
    app.run();
} catch (e) {
    console.error('SHabbo Manager', e);
}
