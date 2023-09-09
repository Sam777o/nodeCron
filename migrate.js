import {Users, Parties, Candidates,Doors} from "./models/index";

(async () => {
    await Users.sync({alter: true});
    await Parties.sync({alter: true});
    await Candidates.sync({alter: true});
    await Doors.sync({alter:true})
    process.exit(0)
})()
