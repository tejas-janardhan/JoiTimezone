"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const JoiTz = () => {
    return {
        type: "dateTz",
        messages: {
            "tz.invalidString": "{{#label}} is of the wrong format provided",
            "tz.invalidFormat": "{{#label}} is of invalid datetime format",
            "tz.invalidISO": "{{#label}} is not of the iso format",
            "tz.noSelection": "No parsing type selected",
            "tz.invalidZone": "No timezone selected",
        },
        coerce(value, helpers) {
            var _a, _b, _c;
            // Only called when prefs.convert is true
            const zone = (_b = (_a = helpers.schema.$_getRule("tz")) === null || _a === void 0 ? void 0 : _a.args) === null || _b === void 0 ? void 0 : _b["timezone"];
            const opts = Object.assign({}, (zone ? { setZone: zone, zone } : {}));
            if (helpers.schema.$_getFlag("iso")) {
                const newValue = luxon_1.DateTime.fromISO(value, opts);
                return { value: newValue };
            }
            const formatRule = helpers.schema.$_getRule("format");
            if (formatRule) {
                const formatString = (_c = formatRule === null || formatRule === void 0 ? void 0 : formatRule.args) === null || _c === void 0 ? void 0 : _c["formatString"].trim();
                const newValue = luxon_1.DateTime.fromFormat(value, formatString, opts);
                return { value: newValue };
            }
            return { value };
        },
        validate(value, helpers) {
            if (typeof value === "string") {
                return { errors: helpers.error("tz.noSelection") };
            }
            if (!value.isValid) {
                if (helpers.schema.$_getFlag("iso")) {
                    return { errors: helpers.error("tz.invalidISO") };
                }
                if (helpers.schema.$_getRule("format")) {
                    return { errors: helpers.error("tz.invalidString") };
                }
            }
            return { value: value.toJSDate() };
        },
        rules: {
            format: {
                args: [
                    {
                        name: "formatString",
                        assert: (value) => typeof value === "string",
                        message: "must be a string",
                    },
                ],
                method: function (formatString) {
                    return this.$_addRule({ name: "format", args: { formatString } });
                },
                validate: function (value) {
                    return value;
                },
            },
            iso: {
                method: function () {
                    return this.$_setFlag("iso", true);
                },
                validate: function (value) {
                    return value;
                },
            },
            tz: {
                args: [
                    {
                        name: "timezone",
                        assert: (value) => {
                            return luxon_1.DateTime.local().setZone(value).isValid;
                        },
                        ref: false,
                        message: "must be a valid timezone",
                    },
                ],
                method: function (timezone) {
                    return this.$_addRule({ name: "tz", args: { timezone } });
                },
                validate: function (value) {
                    return value;
                },
            },
        },
    };
};
exports.default = JoiTz;
