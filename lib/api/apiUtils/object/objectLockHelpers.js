const moment = require('moment');

function isObjectLocked(bucket, objectMD, headers) {
    if (bucket.isObjectLockEnabled()) {
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
        const objectLegalHold = objectMD.getLegalHoldStatus();
        if (objectLegalHold && objectLegalHold.status === 'ON') {
            return true;
        }
        return false;
    }
    return false;
}

module.exports = {
    isObjectLocked,
};
