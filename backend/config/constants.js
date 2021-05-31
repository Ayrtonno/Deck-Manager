const { totp } = require("otplib")

const defaultOptions = totp.allOptions()
const TOTPGenerator = totp.create({
    ...defaultOptions,
    // 1 day in seconds (60 seconds for 60 minutes for 24 hours)
    step: 24 * 60 * 60,
    // 7 days in seconds (60 seconds for 60 minutes for 24 hours for 7 days)
    window: 7 * 24 * 60 * 60,
})

const constants = {
    tokenSecret: "W1gP2Vdkj0cvOkOs",
    TOTPGenerator
}




exports.constants = constants