import { type ExtensionFactory } from "joi";
import { DateTime } from "luxon";

const JoiTz: ExtensionFactory = () => {
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
      // Only called when prefs.convert is true
      const zone = helpers.schema.$_getRule("tz")?.args?.["timezone"];
      const opts = {
        ...(zone ? { setZone: zone, zone } : {}),
      };

      if (helpers.schema.$_getFlag("iso")) {
        const newValue = DateTime.fromISO(value, opts);
        return { value: newValue };
      }

      const formatRule = helpers.schema.$_getRule("format");

      if (formatRule) {
        const formatString = formatRule?.args?.["formatString"].trim();
        const newValue = DateTime.fromFormat(value, formatString, opts);
        return { value: newValue };
      }

      return { value };
    },
    validate(value: DateTime, helpers) {
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
              return DateTime.local().setZone(value).isValid;
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

export default JoiTz;
