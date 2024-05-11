Joi Extension adding timezone and custom formatting to datetime stirng in Joi. Uses Luxon - [https://moment.github.io/luxon/#/](https://moment.github.io/luxon/#/).

## Custom Format

<code>
const schema = Joi.dateTz().format('YYYY-MM-DD'); // local timezone
const schema = Joi.dateTz().format('YYYY-MM-DD').tz('UTC'); // utc timezone
const schema = Joi.dateTz().format('YYYY-MM-DD').tz('Asia/Kolkata'); // indian timezone

const schema = Joi.dateTz().iso() // ISO Format
</code>

## FUTURE PLANS

Adding native date support for extended operations.
