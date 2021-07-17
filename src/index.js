import React from "react";
import ReactDom from "react-dom";
import { JournalApp } from "./JournalApp";

/* Para que podemos trabajar con sass necesitamos instalar los modulos node-sass */

import './styles/styles.scss';
ReactDom.render(<JournalApp/>, document.getElementById("root"));
