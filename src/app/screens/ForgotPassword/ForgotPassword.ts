import { Component, Vue } from "vue-property-decorator";
import { FormField, NavLink, Screen } from "../../components/index";
import { router } from "../../Router";
import { store } from "../../services/DetailsStore";
import template from "./ForgotPassword.html";

@Component({
    components: {
        FormField,
        Screen,
        NavLink
    },
    template: template,
})
export class ForgotPassword extends Vue {

    email = "";
    details;

    created() {
        this.details = store.details;
    }

}

router.addRoutes([
    { component: ForgotPassword, path: "/forgotPassword" }
]);
