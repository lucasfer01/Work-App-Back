const webpush = require('../webpush/webpush');
let pushSubscription;

const subscribe = async (req, res, next) => {
    pushSubscription = req.body;
    res.status(200).json();
}

const newMessage = async (req, res, next) => {
    const {title, message} = req.body;

    const payload = JSON.stringify({
        title,
        message,
    });

    try {
        await webpush.sendNotification(pushSubscription, payload);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    subscribe,
    newMessage,
};
