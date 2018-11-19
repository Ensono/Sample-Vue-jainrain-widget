import { expect } from "chai";
import "mocha";
import { getPasswordStrength } from "./PasswordStrengthCalculator";

// TODO: fix "this"
// tslint rule disabled because arrow functions can mess with mocha "this"
// tslint:disable:only-arrow-functions
describe("The password strength calculator", function() {

    it("should return 0 when no password is provided", function() {
        expect(getPasswordStrength("")).to.equal(0);
    });
});
