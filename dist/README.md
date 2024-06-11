Joi Extension adding timezone and custom formatting to datetime stirng in Joi. Uses Luxon - [https://moment.github.io/luxon/#/](https://moment.github.io/luxon/#/).

## Getting Started

<code></code>

## Custom Format

<code>
import JoiTz from '@lib-tj/joi-date-time-zone'

const joi: Root & { dateTz: any } = Joi.extend(JoiTz);

const schema = Joi.dateTz().format('YYYY-MM-DD'); // local timezone
const schema = Joi.dateTz().format('YYYY-MM-DD').tz('UTC'); // utc timezone
const schema = Joi.dateTz().format('YYYY-MM-DD').tz('Asia/Kolkata'); // indian timezone

const schema = Joi.dateTz().iso() // ISO Format
</code>

## FUTURE PLANS

Adding native date support for extended operations.
