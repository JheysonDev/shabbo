import { Router } from 'express';

class Controller {
    private router: Router;

    constructor(private name: string) {
        this.router = Router();
    }

    public getName(): string {
        return this.name;
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default Controller;
