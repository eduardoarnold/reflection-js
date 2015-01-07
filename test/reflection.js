var assert = require("assert");
var reflection = require("../lib/reflection");

describe("Reflection", function () {

    describe("#call()", function () {
        it("should execute the given function", function () {
            var obj = {
                a: function () {
                    return "cool";
                }
            };

            assert.strictEqual(reflection(obj).call("a"), "cool");
            assert.strictEqual(reflection(obj).call("b"), undefined);
        });
    });
    
    describe("#owns()", function () {
        it("should return true when the object owns a property, otherwise false", function () {
            var obj = {
                a: "a",
                b: {
                    a: "b.a",
                    b: "b.b"
                },
                c: {
                    a: {
                        a: "c.a.a"
                    }
                }
            };

            assert.strictEqual(reflection(obj).owns("a"), true);
            assert.strictEqual(reflection(obj).owns("b"), true);
            assert.strictEqual(reflection(obj).owns("b.a"), true);
            assert.strictEqual(reflection(obj).owns("c.a.a"), true);
            assert.strictEqual(reflection(obj).owns("c.a.z"), false);
            assert.strictEqual(reflection(obj).owns("z"), false);
        });
    });
    
    describe("#methods()", function () {
        it("should return an array with all object methods", function () {
            var obj = {
                a: "a",
                fa: function () {},
                fb: function () {}
            };

            var methods = reflection(obj).methods();

            assert.deepEqual(methods, ["fa", "fb"]);
        });
    });

    describe("#properties()", function () {
        it("should return an array with all object properties", function () {
            var obj = {
                a: "a",
                b: "b",
                c: "c",
                fa: function () {}
            };

            var properties = reflection(obj).properties();

            assert.deepEqual(properties, ["a", "b", "c"]);
        });
    });
    
    describe("#set()", function () {
        it("should set the value of a property", function () {
            var obj = {
                a: "a",
                b: null,
                c: {
                    a: "c.a",
                    b: null
                }
            };

            reflection(obj).set("b", "b");
            reflection(obj).set("c.b", "c.b");
            reflection(obj).set("d.a.b.c.d.e", "d.a.b.c.d.e");

            assert.strictEqual(obj.b, "b");
            assert.strictEqual(obj.c.b, "c.b");
            assert.strictEqual(obj.d.a.b.c.d.e, "d.a.b.c.d.e");
        });
    });
});