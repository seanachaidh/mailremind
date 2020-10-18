import { formatString } from "./utils";


describe("#mainutils", function() {
    describe("#formatString", function() {
        it("Should format a string", function() {
            var format: string = "hallo {var1} dit is een {var2}";
            var input: any = {
                "var1": "wereld",
                "var2": "test"
            };
            var expected: string = "hallo wereld dit is een test";
            var got: string = formatString(format, input);
            expect(got).toBe(expected);
        });
    });
});
