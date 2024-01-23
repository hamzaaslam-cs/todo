module.exports = (data, extras = {}) => {
    let obj = {
        'id': data._id,
        'name': data.name,
        'email': data.email,
        'accessToken': data.accessToken,
        'refreshToken': data.refreshToken,
    };
    return {...obj, ...extras}
};