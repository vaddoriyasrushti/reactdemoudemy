module.exports=(sequalize,type)=>{
    return sequalize.define('signups',{
        userid:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        fullname:{
            type:type.STRING,
            allowNull: false
        },
        email:{
            type:type.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type:type.STRING,
            allowNull: false
        },
        role:{
            type:type.INTEGER,
            defaultValue: 2
        }
   
        
    });
}