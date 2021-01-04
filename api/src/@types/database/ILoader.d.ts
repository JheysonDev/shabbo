interface ILoader {
    beforeRun(): Promise<boolean>;
    run(): Promise<void>;
}
