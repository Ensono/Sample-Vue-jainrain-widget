import _ from "lodash";

class DetailsStore {

    private $details: any = {};

    set details(value) {
        _.merge(this.$details, value);
    }

    get details() {
        return this.$details;
    }
}

export const store = new DetailsStore();
