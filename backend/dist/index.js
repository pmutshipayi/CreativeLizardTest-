"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const School_1 = require("./entity/School");
const faker_1 = __importDefault(require("faker"));
/*createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));*/
const app = express_1.default();
const port = 8070; // default port to listen
async function generateData(connection) {
    const count = await connection.getRepository(School_1.School)
        .count();
    console.log('count schools: ' + count);
    if (count > 0)
        return count;
    const schools = [];
    for (let i = 0; i < 300; i++) {
        const school = new School_1.School();
        school.name = faker_1.default.company.companyName();
        school.address = faker_1.default.address.streetAddress();
        school.latitude = faker_1.default.address.latitude();
        school.longitude = faker_1.default.address.longitude();
        school.imageLink = faker_1.default.image.imageUrl();
        schools.push(school);
    }
    await connection.createQueryBuilder()
        .insert()
        .into(School_1.School)
        .values(schools)
        .execute();
    return await connection.getRepository(School_1.School).count();
}
typeorm_1.createConnection().then(async (connection) => {
    // define a route handler for the default home page
    app.get("/", async (req, res) => {
        let page = 1;
        let limit = 15;
        if (req.query['page']) {
            page = Number(req.query['page']);
        }
        const count = await generateData(connection);
        const data = await connection.getRepository(School_1.School)
            .createQueryBuilder()
            .skip((page - 1) * limit)
            .take(limit)
            .execute();
        res.send({
            totalPage: count / limit,
            data: data
        });
    });
    // start the Express server
    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
    });
});
//# sourceMappingURL=index.js.map