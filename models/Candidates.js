import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";
import Users from "./Users.js";
import Parties from "./Parties.js";

class Candidates extends Model{

}

Candidates.init({
    id:{
        type:DataTypes.BIGINT.UNSIGNED,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    votes:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        defaultValue: 0
    }

},{
    sequelize,
    tableName:'candidates',
    modelName:'candidates',
    timestamps:false
})

Candidates.belongsTo(Users,{
    foreignKey:'userId',
    onDelete:'cascade',
    onUpdate:'cascade',
    as:'user'
})
Users.hasMany(Candidates,{
    foreignKey:'userId',
    onDelete:'cascade',
    onUpdate:'cascade',
    as:'candidates'
})

Candidates.belongsTo(Parties,{
    foreignKey:'partyId',
    onDelete:'cascade',
    onUpdate:'cascade',
    as:'party'
})
Parties.hasMany(Candidates,{
    foreignKey:'partyId',
    onDelete:'cascade',
    onUpdate:'cascade',
    as:'candidates'
})



export default Candidates
