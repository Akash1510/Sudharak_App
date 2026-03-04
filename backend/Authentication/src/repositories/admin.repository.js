
const AdminEntity = require("../entities/admin.entity")
const AdminModel = require("../models/admin.model");


class AdminRepository {


    // story is  i thinke this is Muncipaal DashBoard so deparment wise already data has 
    // stored into the collection and deparrment head provide info about their usename and password


    // find by username 

    static async findByUsername(username) {

        return AdminModel.findOne({username});

    }

    // create Admin

    static async CreateAdmin({ name, username, password, department }) {
        const AdminData = await AdminModel.create({
            name, username, password, department
        });

        return AdminData ? new AdminEntity(AdminData.toJSON()) : null;
    }


}


module.exports = AdminRepository;