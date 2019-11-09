'use strict';

import jQuery from 'jquery';
window.$ = jQuery;
import functionsInit from './functionModules/functions';
import 'babel-polyfill';

const App = function () {
    this.initializeApp = function () {
        functionsInit();
    };
};

const app = new App();
app.initializeApp();
