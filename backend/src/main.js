import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import life360 from "life360-node-api";
import cors from "cors";

const getMembersRoute = async (req, res) => {
  res.json(await getData());
};

const getData = async () => {
  let client = await life360.login(
    process.env.LIFE360_EMAIL,
    process.env.LIFE360_PASSSWORD
  );
  //console.log(client);

  let circles = await client.listCircles();

  for (const circle of circles) {
    //console.log(circle.name);
  }

  let myCircle = circles[0];
  // alternatively, use the circles.findByName to search for your circle by name.
  // let myCircle = circles.findByName('family')
  let members = await myCircle.listMembers();
  console.log(typeof members["0"]);
  //console.log(members[0].firstName);
  //console.log(members[0].location);
  let a = [];

  for (const member of members) {
    delete member.location.api;
    a.push({ firstName: member.firstName, location: member.location });
  }
  console.log(a);
  return a;
  //console.log(a);
};

const app = express();

app.use(cors());

app.get("/members", getMembersRoute);
app.listen(3001);
