# USAGE

## Custom Format

`const schema = Joi.dateTz().format('YYYY-MM-DD'); // local timezone
const schema = Joi.dateTz().format('YYYY-MM-DD').tz('UTC'); // utc timezone
const schema = Joi.dateTz().format('YYYY-MM-DD').tz('Asia/Kolkata'); // indian timezone 

const schema = Joi.dateTz().iso() // ISO Format` 


# FUTURE PLANS

Adding native date support for extended operations.