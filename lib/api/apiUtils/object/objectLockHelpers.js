const moment = require('moment');

/**
 * isObjectLocked - checks whether object is locked or not
 * @param {obect} bucket - bucket metadata
 * @param {object} objectMD - object metadata
 * @param {array} headers - request headers
 * @return {boolean} - indicates whether object is locked or not
 */
function isObjectLocked(bucket, objectMD, headers) {
    if (bucket.isObjectLockEnabled()) {
        const objectLegalHold = objectMD.getLegalHoldStatus();
        if (objectLegalHold && objectLegalHold.status === 'ON') {
            return true;
        }
        const objectRetention = objectMD.getRetentionInfo();
        if (objectRetention) {
            const objectMode = objectRetention.retentionInfo.mode;
            if (objectMode === 'GOVERNANCE' &&
            headers['x-amz-bypass-governance-retention']) {
                return false;
            }
            const objectRetainDate = moment(objectRetention.retentionInfo.retainDate);
            const now = moment();
            // indicates retain until date has expired
            if (now.isAfter(objectRetainDate)) {
                return false;
            }
            return true;
        }
        return false;
    }
    return false;
}

module.exports = {
    isObjectLocked,
};
