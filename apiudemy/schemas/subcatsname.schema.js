module.exports = (sequalize, type) => {
    return sequalize.define('subcatsname', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        catname: {
            type: type.STRING,
            allowNull: false
        },
        subcategories: {
            type: type.STRING,
            allowNull: false
        }
    })
}