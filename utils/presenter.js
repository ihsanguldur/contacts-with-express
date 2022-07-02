function successPresenter(res, message, data) {
    return res.status(200).json({
        success: true,
        message,
        data
    });
}

function errorPresenter(res, message, status) {
    return res.status(status).json({
        success: false,
        message,
        data: null
    });
}

module.exports = {
    successPresenter,
    errorPresenter
}