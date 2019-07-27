module.exports=(sequalize,type)=>{
    return sequalize.define('categories',{
        id:{
            type:type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        categoriesname:{
            type:type.STRING,
            unique: true
        },
        categoriesicon:type.STRING

    });
}