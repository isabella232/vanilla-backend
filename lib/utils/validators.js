function validateObject(fields, allowExtra, allowMissing, obj) {
  const fieldNames = fields.map(f => f.name);
  const objectFieldNames = Object.keys(obj);

  let unrecognizedFields = [];
  if (!allowExtra) {
    unrecognizedFields = objectFieldNames.filter(
      f => fieldNames.indexOf(f) === -1
    );
  }

  let missingFields = [];
  if (!allowMissing) {
    missingFields = fieldNames.filter(f => objectFieldNames.indexOf(f) === -1);
  }

  return (
    (allowExtra || unrecognizedFields.length === 0) &&
    (allowMissing || missingFields.length === 0) &&
    fields.every(
      field =>
        (allowMissing && missingFields.indexOf(field.name)) ||
        field.validate(obj[field.name])
    )
  );
}

function sanitizeObject(fields, obj) {
  return fields.reduce((o, field) => {
    o[field.name] = obj[field.name]; // eslint-disable-line
    return o;
  }, {});
}

function objectValidator(fields, allowExtra = false, allowMissing = false) {
  return {
    validate: validateObject.bind(null, fields, allowExtra, allowMissing),
    sanitize: sanitizeObject.bind(null, fields)
  };
}

module.exports = { validateObject, sanitizeObject, objectValidator };
