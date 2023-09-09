import {CHAR, DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";

class Users extends Model{

}

Users.init({
    id:{
        type:DataTypes.BIGINT.UNSIGNED,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    firstName:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    middleName:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    passport:{
        type:DataTypes.CHAR(9),
        unique:true
    },
    voted:{
        type:DataTypes.DATE,
        allowNull:true
    },
    token:{
        type:DataTypes.STRING(50),
        unique: true,
        allowNull:true
    }

},{
    sequelize,
    tableName:'users',
    modelName:'users',
    timestamps:false
})

export default Users