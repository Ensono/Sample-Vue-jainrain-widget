import _ from "lodash";
import { Component, Prop, Vue } from "vue-property-decorator";
import template from "./PasswordMeter.html";
import { getPasswordStrength } from "./PasswordStrengthCalculator";

// TODO: minimal, expose a property on the component to override the default mapping.
// Optionally, provide factory style mapping to change this default map for all instances created.
const defaultStrengthToStatusClassMap = {
    40: "bg-danger",
    80: "bg-warning",
    100: "bg-success",
};

@Component({
    template,
})
export class PasswordMeter extends Vue {

    @Prop()
    password = undefined;

    get strength() {
        return getPasswordStrength(this.password);
    }

    get statusClass() {
        const strength = this.strength;

        return _.find(defaultStrengthToStatusClassMap, (className, threshold) => {
            return strength <= parseInt(threshold, 10);
        });
    }
}
