import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    template: "<div><slot></slot></div>"
})
export class NavLink extends Vue {
    @Prop(String)
    path: string;

    mounted() {
        const element = this.$slots.default[0].elm as HTMLElement;
        const target = getTarget(this.path);

        if (element.tagName === "A") {
            (element as HTMLAnchorElement).href = target;
        } else {
            element.addEventListener("click", () => {
                location.href = target;
            });
        }
    }
}

function getTarget(path: string): string {
    const parts = location.href.split("/");

    if (parts.pop() === "") {
        parts.pop();
    }

    parts.push(path);

    return parts.join("/");
}
