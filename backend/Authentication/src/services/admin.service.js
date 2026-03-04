
const AdminEntity = require('../entities/admin.entity');
const AdminRepository = require('../repositories/admin.repository');
const bcrypt = require('bcrypt');
const generateToken = require('../../utils/jwt');

class AdminService {


    // Admin Login Service
    static async AdminLogin({ username, password}) {

        // find Admin by username
        const Admin = await AdminRepository.findByUsername(username);
        if (!Admin) {
            throw new Error("Admin Not Found");

        }
       
        // compare password

        const isPasswordValid = await bcrypt.compare(password, Admin.password);
        if (!isPasswordValid) {
            throw new Error("Invalid Password");
        }

        const token = generateToken({
            id:Admin._id,
            role:"ADMIN",
            department:Admin.department
        });

        return  {
            token,
            admin : new AdminEntity(Admin.toJSON())
        };
    
    }

    // create Admin Service

    static async CreateAdmin({ name, username, password, department }) {

        // check if Admin Already exists or not
        const EAdmin = await AdminRepository.findByUsername(username);
        if (EAdmin) {
            throw new Error("Admin Already Exists");
        }

        // hash password

        const hashedPassword = await bcrypt.hash(password, 10);

        // create Admin

        const NewAdmin = await AdminRepository.CreateAdmin({
            name, username, password: hashedPassword, department
        })

        return NewAdmin;
    }

    // 
}


module.exports = AdminService;