module.exports = (theFunc) => async (req, res, next) => {
    // Promise.resolve(theFunc(req, res, next)).catch(next);
    try {
        await theFunc(req, res, next)
    } catch (err) {
        next(err);
    }
};