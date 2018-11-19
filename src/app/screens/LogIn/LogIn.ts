import { Component, Vue } from "vue-property-decorator";
import * as components from "../../components/index";
import { router } from "../../Router";
import { store } from "../../services/DetailsStore";
import template from "./LogIn.html";

@Component({
    components,
    template
})
export class SignIn extends Vue {

    email = "";
    password = "";
    error = "";

    created() {
        const error = store.details.miaa && store.details.miaa.error;
        if (error) {
            this.email = error.data.email;
            this.error = "Email or password incorrect. Please verify and try again";
        }
    }

    get isFormValid() {
        return this.email && this.password;
    }
}

router.addRoutes([
    { path: "/login", component: SignIn },
]);
