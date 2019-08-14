import React from "react";
// redux
import store from "./store.js";
import { Provider } from "react-redux";

// router dom
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Importamos los componentes
import  Header  from './Components/Header';
import  Productos  from './Components/Productos';
import  NuevoProducto  from './Components/NuevoProducto';
import  EditarProducto  from './Components/EditarProducto';

function App() {
    return (
      <Router>
          <Provider store={store}>
              <Header />
              <div className="container">
                  <Switch>
                    <Route exact path="/" component={Productos} />
                    <Route exact path="/productos/nuevo" component={NuevoProducto} />
                    <Route exact path="/productos/editar/:id" component={EditarProducto} />
                  </Switch>
              </div>
          </Provider>
      </Router>
    );
}

export default App;
