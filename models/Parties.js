import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";

class Parties extends Model{

}
Parties.init({
    id:{
        type:DataTypes.BIGINT.UNSIGNED,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    name:{
        type: DataTypes.STRING(30),
        allowNull: false
    }
},{
    sequelize,
    tableName:'parties',
    modelName:'parties',
    timestamps:false
})

export default Parties