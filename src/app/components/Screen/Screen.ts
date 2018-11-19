import { Component, Prop, Vue } from "vue-property-decorator";
import template from "./Screen.html";

@Component({
    template,
})
export class Screen extends Vue {

    @Prop()
    error;

    @Prop()
    title;

    showFooter = true;

    created() {
        this.showFooter = !!this.$slots.footer;
    }
}
