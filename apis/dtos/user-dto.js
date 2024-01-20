module.exports = (data, extras = {}) => {
    let obj = {
        'id': data._id,
        'name': data.name,
        'email': data.email,
    };
    return {...obj, ...extras}
};