const { errors } = require('arsenal');

function checkObjectLock(bucket, headers) {
    const retentionObj = {};
    const mode = headers['x-amz-object-lock-mode'];
    const retainDate = headers['x-amz-object-lock-retain-until-date'];
    const legalHold = headers['x-amz-object-lock-legal-hold-status'];

    if ((mode && !retainDate) || (!mode && retainDate)) {
        retentionObj.error = errors.InvalidArgument.customizeDescription(
            'x-amz-object-lock-retain-until-date and x-amz-object-lock-mode ' +
            'must both be supplied');
        return retentionObj;
    }

    const validModes = new Set(['GOVERNANCE', 'COMPLIANCE']);
    const validLegalHoldVal = new Set(['ON', 'OFF']);
    return retentionObj;
}

module.exports = checkObjectLock;
