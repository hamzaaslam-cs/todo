module.exports = (data, extras = {}) => {
    let obj = {
        'title': data.title,
        'description': data.description,
        'status': data.status,
    };
    return {...obj, ...extras}
};