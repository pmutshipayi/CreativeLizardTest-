import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import express from "express";
import { School } from "./entity/School";
import faker from 'faker'

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


const app = express();
const port = 8070; // default port to listen


async function generateData(connection: Connection) {

    const count = await connection.getRepository(School)
        .count();
    console.log('count schools: ' + count);
    if (count > 0) return count;

    const schools: School[] = [];
    for (let i = 0; i < 300; i++) {
        const school: School = new School();
        school.name = faker.company.companyName();
        school.address = faker.address.streetAddress();
        school.latitude = faker.address.latitude();
        school.longitude = faker.address.longitude();
        school.imageLink = faker.image.imageUrl();
        schools.push(school);
    }

    await connection.createQueryBuilder()
        .insert()
        .into(School)
        .values(schools)
        .execute();

    return await connection.getRepository(School).count();
}

createConnection().then(async connection => {

    // define a route handler for the default home page
    app.get("/", async (req, res) => {

        let page = 1;
        let limit = 15;

        if (req.query['page']) {
            page = Number(req.query['page']);
        }

        const count = await generateData(connection);

        const data = await connection.getRepository(School)
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

