import { Component, Prop, Vue } from "vue-property-decorator";
import template from "./FormField.html";

@Component({
    template,
})
export class FormField extends Vue {
    @Prop(String) label: string;

    element: HTMLElement = {} as any;

    mounted() {
        this.element = this.$slots.default[0].elm as HTMLElement;
        if (this.element.tagName === "INPUT") {
            this.element.classList.add("form-control");
        }
    }
}
