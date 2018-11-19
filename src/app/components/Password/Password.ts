import { Component, Prop, Vue } from "vue-property-decorator";
import template from "./Password.html";
import { PasswordMeter } from "./PasswordMeter";

@Component({
    components: {
        PasswordMeter,
    },
    template,
})
export class Password extends Vue {

    @Prop(Boolean)
    showMeter: boolean;

    isPasswordShown = false;

    element: HTMLInputElement = {} as any;

    mounted() {
        this.element = this.$slots.default[0].elm as HTMLInputElement;
        if (this.element.type !== "password") {
            throw new Error('Can only slot an input field of type "password" in Password component.');
        }

        this.element.classList.add("form-control");
    }

    onVisiblePasswordInput(value) {
        const event = new Event("input", {
            bubbles: true,
            cancelable: true,
        });
        this.element.value = value;
        this.element.dispatchEvent(event);
    }
}
