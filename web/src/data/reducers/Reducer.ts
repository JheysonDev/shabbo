import Action from "../actions/Action";

type Reducer<S> = (state: S, action: Action<any>) => S;

export default Reducer;
