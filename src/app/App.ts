import Vue from "vue";
import template from "./App.html";
import { router } from "./Router";
import "./screens/index";
import { store } from "./services/DetailsStore";

export function start(el: HTMLElement | string, screen: string, details: any) {
    store.details = details;

    const app = new Vue({
        el,
        router: router,
        template: template,
    });

    router.push("/" + screen);

    return app;
}
