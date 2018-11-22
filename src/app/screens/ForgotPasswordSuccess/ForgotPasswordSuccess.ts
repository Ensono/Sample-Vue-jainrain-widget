import { Component, Vue } from "vue-property-decorator";
import { NavLink, Screen } from "../../components/index";
import { router } from "../../Router";
import template from "./ForgotPasswordSuccess.html";

@Component({
    components: {
        Screen,
        NavLink
    },
    template,
})
export class ForgotPasswordSuccess extends Vue {

}

router.addRoutes([
    { path: "/forgotPasswordSuccess", component: ForgotPasswordSuccess},
]);
