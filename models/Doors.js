import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";

class Doors extends Model{

}
Doors.init({
    id:{
        type:DataTypes.BIGINT.UNSIGNED,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    status:{
        type: DataTypes.STRING(255),
        allowNull: false,
    }
},{
    sequelize,
    tableName:'doors',
    modelName:'doors',
    timestamps:false
})

export default Doors