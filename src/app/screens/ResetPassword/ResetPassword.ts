import { Component, Vue } from "vue-property-decorator";
import { FormField, Password, Screen } from "../../components/index";
import { router } from "../../Router";
import { store } from "../../services/DetailsStore";
import template from "./ResetPassword.html";

@Component({
    components: {
        FormField,
        Password,
        Screen,
    },
    template,
})
export class ResetPassword extends Vue {

    newPassword = "";
    newPasswordConfirm = "";

    errorMessage = "";

    details: any;

    created() {
        this.details = store.details;
    }

    get isFormValid() {
        return this.newPassword && this.newPassword === this.newPasswordConfirm;
    }
}

router.addRoutes([
    { path: "/resetPassword", component: ResetPassword }
]);
