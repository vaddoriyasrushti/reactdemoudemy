module.exports = (sequalize, type) => {
    return sequalize.define('subcategories', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        catname: {
            type: type.STRING,
            allowNull: false
        },
        // subcatid: {
        //     type: type.INTEGER,
        //     allowNull: false
        // },
        allsubtosub: {
            type: type.STRING,
            allowNull: false
        },
        // topicid: {
        //     type: type.INTEGER,
        //     allowNull: false
        // },
        populartopic: {
            type: type.STRING,
            allowNull: false
        },
        topicimage: {
            type: type.STRING,
            allowNull: false
        },
        description: {
            type: type.STRING,
            allowNull: false
        },
        author: {
            type: type.STRING,
            allowNull: false
        },
        price: {
            type: type.DOUBLE,
            allowNull: false
        },
        videos: {
            type: type.STRING,
            allowNull: false
        }
    })
}