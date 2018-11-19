import _ from "lodash";
import { Component, Vue } from "vue-property-decorator";
import * as components from "../../components/index";
import { router } from "../../Router";
import { store } from "../../services/DetailsStore";
import template from "./Register.html";

@Component({
    template,
    components
})
export class Registration extends Vue {

    model = {
        email: undefined,
        password: undefined,
        given_name: undefined,
        family_name: undefined
    };

    error = "";

    created() {
        const error = store.details.miaa && store.details.miaa.error;
        if (error) {
            this.error = "Something went wrong during registration. Please verify your details and try again.";
            this.model = error.data;
        }
    }

    get isFormValid() {
        return !_.findKey(this.model, v => !v);
    }
}

router.addRoutes([
    { path: "/register", component: Registration }
]);
