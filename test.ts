import { DateTime } from "luxon";
import JoiTz from '@lib-tj/joi-date-time-zone'
import Joi, { Root } from "joi";

const joi: Root & { dateTz: any } = Joi.extend(JoiTz);

console.log(joi.attempt("2010-04-03", joi.dateTz().iso().format("dd/MM/yyyy")));

console.log(
  joi.attempt(
    "03/04/2010",
    joi.dateTz().tz("America/Caracas").format("dd/MM/yyyy"),
  ),
);
