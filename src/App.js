import React from "react";
// redux
import store from "./store.js";
import { Provider } from "react-redux";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <h2>Desde app</h2>
            </div>
        </Provider>
    );
}

export default App;
