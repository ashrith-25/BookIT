// const express = require('express')
// const router = express.Router();

// const buses = require('../models/BusesModel.js')
// /**
//  * @swagger
//  * /buses/insert:
//  *   post:
//  *     summary: Insert a new bus into the system.
//  *     requestBody:
//  *       description: Bus data to be inserted.
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 description: The name of the bus.
//  *               source:
//  *                 type: string
//  *                 description: The source of the bus.
//  *               destination:
//  *                 type: string
//  *                 description: The destination of the bus.
//  *               startdate:
//  *                 type: string
//  *                 format: date
//  *                 description: The start date of the bus.
//  *               starttime:
//  *                 type: string
//  *                 format: time
//  *                 description: The start time of the bus.
//  *               endtime:
//  *                 type: string
//  *                 format: time
//  *                 description: The end time of the bus.
//  *               bustype:
//  *                 type: string
//  *                 description: The type of bus.
//  *               busclass:
//  *                 type: string
//  *                 description: The class of the bus.
//  *               no_of_tickets_available:
//  *                 type: integer
//  *                 description: The number of tickets available for the bus.
//  *               rating:
//  *                 type: number
//  *                 description: The rating of the bus.
//  *               ticket_cost:
//  *                 type: number
//  *                 description: The cost of a ticket for the bus.
//  *     responses:
//  *       200:
//  *         description: Bus inserted.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 msg:
//  *                   type: string
//  *                   description: The success message.
//  *                   example: "Bus inserted"
//  *       400:
//  *         description: Invalid request body.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 msg:
//  *                   type: string
//  *                   description: The error message.
//  *                   example: "Invalid request body"
//  *       500:
//  *         description: Internal server error.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 msg:
//  *                   type: string
//  *                   description: The error message.
//  *                   example: "Internal server error"
//  */

// router.post("/insert", async (req, res) => {
//   const {
//     name,
//     source,
//     destination,
//     startdate,
//     starttime,
//     endtime,
//     bustype,
//     busclass,
//     traveltime,
//     no_of_tickets_available,
//     rating,
//     ticket_cost,
//   } = req.body;

//   const date1 = new Date();
//   date1.setHours(starttime.split(":")[0], starttime.split(":")[1], 0, 0);

//   const date2 = new Date();
//   date2.setHours(endtime.split(":")[0], endtime.split(":")[1], 0, 0);

//   const diff = Math.abs(date2 - date1); // difference in milliseconds

//   const hours = Math.floor(diff / 1000 / 60 / 60);
//   const minutes = Math.floor((diff / 1000 / 60 / 60 - hours) * 60);

//   try {
//     await new buses({
//       name,
//       source: source.toLowerCase(),
//       destination: destination.toLowerCase(),
//       startdate,
//       starttime,
//       endtime,
//       bustype,
//       busclass,
//       traveltime: `${hours}hr ${minutes}min`,
//       no_of_tickets_available,
//       rating,
//       ticket_cost,
//     }).save();
//     res.json({ msg: "Bus inserted" });
//   } catch (error) {
//     res.json({ msg: "error" });
//   }
// });

// /**
//  * @swagger
//  * /buses/search:
//  *   post:
//  *     summary: Search for available buses.
//  *     description: Search for all available buses between a source and a destination on a given date.
//  *     requestBody:
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               source:
//  *                 type: string
//  *                 description: The starting point of the journey.
//  *               destination:
//  *                 type: string
//  *                 description: The end point of the journey.
//  *               date:
//  *                 type: string
//  *                 format: date
//  *                 description: The date of the journey in ISO format (YYYY-MM-DD).
//  *             required:
//  *               - source
//  *               - destination
//  *               - date
//  *     responses:
//  *       '200':
//  *         description: A list of available buses matching the search criteria.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 msg:
//  *                   type: array
//  *                   items:
//  *                     type: object
//  *                     properties:
//  *                       _id:
//  *                         type: string
//  *                         description: The unique ID of the bus.
//  *                       source:
//  *                         type: string
//  *                         description: The starting point of the journey.
//  *                       destination:
//  *                         type: string
//  *                         description: The end point of the journey.
//  *                       date:
//  *                         type: string
//  *                         format: date
//  *                         description: The date of the journey in ISO format (YYYY-MM-DD).
//  *         examples:
//  *           application/json:
//  *             msg: [{ _id: "6079715dd8f28c4134bea120", source: "delhi", destination: "jaipur", date: "2023-03-27" }]
//  *       '404':
//  *         description: No buses were found for the search criteria.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 msg:
//  *                   type: string
//  *                   description: A message indicating no buses were found for the search criteria.
//  *             examples:
//  *               application/json:
//  *                 msg: No buses found
//  *       '500':
//  *         description: An error occurred while searching for buses.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 msg:
//  *                   type: string
//  *                   description: A message indicating that an error occurred while searching for buses.
//  *             examples:
//  *               application/json:
//  *                 msg: An error occurred while searching for buses.
//  */

// router.post("/search", async (req, res) => {
//   const { source, destination, date } = req.body;

//   const allbuses = await buses.find({
//     $and: [
//       { source: source.toLowerCase() },
//       { destination: destination.toLowerCase() },
//       { date: date },
//     ],
//   });

//   if (allbuses.length !== 0) res.json({ msg: allbuses });
//   else res.json({ msg: "No buses found" });
// });

// module.exports = router;

// import redisclient from "../Redis/redis";

const express = require("express");
const router = express.Router();

const buses = require("../models/BusesModel.js");
// const redisClient = require("../Redis/redis");

// const { redisclient } = require("../Redis/redis.js");

// const Redis = require("redis");
// const redisclient = Redis.createClient();

// const timeout = 3600;

/**
 * @swagger
 * /buses/insert:
 *   post:
 *     summary: Insert a new bus into the system.
 *     requestBody:
 *       description: Bus data to be inserted.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the bus.
 *               source:
 *                 type: string
 *                 description: The source of the bus.
 *               destination:
 *                 type: string
 *                 description: The destination of the bus.
 *               startdate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the bus.
 *               starttime:
 *                 type: string
 *                 format: time
 *                 description: The start time of the bus.
 *               endtime:
 *                 type: string
 *                 format: time
 *                 description: The end time of the bus.
 *               bustype:
 *                 type: string
 *                 description: The type of bus.
 *               busclass:
 *                 type: string
 *                 description: The class of the bus.
 *               no_of_tickets_available:
 *                 type: integer
 *                 description: The number of tickets available for the bus.
 *               rating:
 *                 type: number
 *                 description: The rating of the bus.
 *               ticket_cost:
 *                 type: number
 *                 description: The cost of a ticket for the bus.
 *     responses:
 *       200:
 *         description: Bus inserted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: The success message.
 *                   example: "Bus inserted"
 *       400:
 *         description: Invalid request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: The error message.
 *                   example: "Invalid request body"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: The error message.
 *                   example: "Internal server error"
 */

router.post("/insert", async (req, res) => {
  console.log(req.body);
  const {
    name,
    source,
    destination,
    startdate,
    starttime,
    endtime,
    bustype,
    busclass,
    traveltime,
    no_of_tickets_available,
    rating,
    ticket_cost,
    via,
  } = req.body;

  // const via = via_list;/

  const date1 = new Date();
  date1.setHours(starttime.split(":")[0], starttime.split(":")[1], 0, 0);

  const date2 = new Date();
  date2.setHours(endtime.split(":")[0], endtime.split(":")[1], 0, 0);

  const diff = Math.abs(date2 - date1); // difference in milliseconds

  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60 / 60 - hours) * 60);

  try {
    await new buses({
      name,
      source: source.toLowerCase(),
      destination: destination.toLowerCase(),
      startdate,
      starttime,
      endtime,
      bustype,
      busclass,
      traveltime: `${hours}hr ${minutes}min`,
      no_of_tickets_available,
      rating,
      ticket_cost,
      via,
    }).save();
    res.json({ msg: "Bus inserted" });
  } catch (error) {
    res.json({ msg: "error" });
  }
});

/**
 * @swagger
 * /buses/search:
 *   post:
 *     summary: Search for available buses.
 *     description: Search for all available buses between a source and a destination on a given date.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               source:
 *                 type: string
 *                 description: The starting point of the journey.
 *               destination:
 *                 type: string
 *                 description: The end point of the journey.
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the journey in ISO format (YYYY-MM-DD).
 *             required:
 *               - source
 *               - destination
 *               - date
 *     responses:
 *       '200':
 *         description: A list of available buses matching the search criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique ID of the bus.
 *                       source:
 *                         type: string
 *                         description: The starting point of the journey.
 *                       destination:
 *                         type: string
 *                         description: The end point of the journey.
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: The date of the journey in ISO format (YYYY-MM-DD).
 *         examples:
 *           application/json:
 *             msg: [{ _id: "6079715dd8f28c4134bea120", source: "delhi", destination: "jaipur", date: "2023-03-27" }]
 *       '404':
 *         description: No buses were found for the search criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating no buses were found for the search criteria.
 *             examples:
 *               application/json:
 *                 msg: No buses found
 *       '500':
 *         description: An error occurred while searching for buses.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating that an error occurred while searching for buses.
 *             examples:
 *               application/json:
 *                 msg: An error occurred while searching for buses.
 */

// const allbuses = await buses.find({
//   $and: [
//     {
//       $or: [
//         { source: source.toLowerCase() },
//         { via: { $regex: source.toLowerCase(), $options: "i" } },
//       ],
//     },
//     {
//       $or: [
//         { destination: destination.toLowerCase() },
//         { via: { $regex: destination.toLowerCase(), $options: "i" } },
//       ],
//     },
//     { date: date },
//   ],
// });

// await redisclient.set(redisKey, JSON.stringify(allbuses));
// myFunction();

// if (allbuses.length !== 0) res.json({ msg: allbuses });
// else res.json({ msg: "No buses found" });

// const redis_post = (req, res, next) => {
//   const { source, destination, date } = req.body;
//   const redisKey = `${source.toLowerCase()}:${destination.toLowerCase()}:${date}`;
//   req.redisKey = redisKey;
//   console.log(req.redisKey);

//   redisclient.get(redisKey, (err, data) => {
//     console.log("in redis get");
//     if (err) {
//       throw err;
//     } else if (data) {
//       console.log("hit");
//       res.json({ msg: JSON.parse(data) });
//     } else {
//       console.log("miss");
//       next();
//     }
//   });
// };

// const get_post = async (req, res) => {
//   try {
//     const allbuses = await buses.find({
//       $and: [
//         {
//           $or: [
//             { source: source.toLowerCase() },
//             { via: { $regex: source.toLowerCase(), $options: "i" } },
//           ],
//         },
//         {
//           $or: [
//             { destination: destination.toLowerCase() },
//             { via: { $regex: destination.toLowerCase(), $options: "i" } },
//           ],
//         },
//         { date: date },
//       ],
//     });
//     if (allbuses.length !== 0) {
//       await redisclient.set(req.redisKey, JSON.stringify(allbuses));
//       return res.json({ msg: allbuses });
//     } else res.json({ msg: "no buses found" });
//   } catch (e) {
//     console.log(e);
//   }
// };

// router.post("/search", redis_post, get_post);

router.post("/search", async (req, res) => {
  const { source, destination, date } = req.body;

  // const expression = `search?source=${source}?destination=${destination}?date=${date}`;

  const redisKey = `${source.toLowerCase()}:${destination.toLowerCase()}:${date}`;

  // , (err, result) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log("Value:", result);
  //     res.json({ msg: JSON.parse(result) });
  //   }
  // });
  // console.log("c" + c);

  // const c = await redisClient.get(redisKey);
  // if (c != null) {
  //   console.log("hit");
  //   return res.json({ msg: JSON.parse(c) });
  // } else {
  //   console.log("miss");
  const allbuses = await buses.find({
    $and: [
      {
        $and: [
          {
            $or: [
              { source: source.toLowerCase() },
              { via: { $regex: source.toLowerCase(), $options: "i" } },
            ],
          },
          {
            $or: [
              { destination: destination.toLowerCase() },
              { via: { $regex: destination.toLowerCase(), $options: "i" } },
            ],
          },
        ],
      },
      { startdate: date },
    ],
  });
  console.log(allbuses);
  if (allbuses.length == 0) {
    console.log("in else part");
    return res.json({ msg: "No buses found" });
  } else {
    // await redisClient.set(redisKey, JSON.stringify(allbuses));
    return res.json({ msg: allbuses });
  }
  // }

  // const redisData = JSON.parse(await redisclient.get(redisKey));

  // const redisData = JSON.parse(await redisclient.get(redisKey));

  // if (redisData) {
  //   console.log("hit");
  //   return res.json({ msg: JSON.stringify(redisData) });
  // } else {
  //   console.log("miss");
  //   const allbuses = await buses.find({
  //     $and: [
  //       {
  //         $or: [
  //           { source: source.toLowerCase() },
  //           { via: { $regex: source.toLowerCase(), $options: "i" } },
  //         ],
  //       },
  //       {
  //         $or: [
  //           { destination: destination.toLowerCase() },
  //           { via: { $regex: destination.toLowerCase(), $options: "i" } },
  //         ],
  //       },
  //       { date: date },
  //     ],
  //   });
  //   if (allbuses.length !== 0) {
  //     await redisclient.set(redisKey, JSON.stringify(allbuses));
  //     return res.json({ msg: allbuses });
  //   } else res.json({ msg: "No buses found" });
  // }

  // Check if the result is in Redis

  // const allbuses = await buses.find({
  //   $and: [

  //     {
  //       $or: [
  //         { source: source.toLowerCase() },
  //         { via: { $regex: source.toLowerCase(), $options: "i" } },
  //       ],
  //     },
  //     {
  //       $or: [
  //         { destination: destination.toLowerCase() },
  //         { via: { $regex: destination.toLowerCase(), $options: "i" } },
  //       ],
  //     },
  //     { date: date },
  //   ],
  // });
  //-------------------------------------------------------------------------
  // const allbuses = await buses.find({
  //   $and: [
  //     {
  //       $and: [
  //         {
  //           $or: [
  //             { source: source.toLowerCase() },
  //             { via: { $regex: source.toLowerCase(), $options: "i" } },
  //           ],
  //         },
  //         {
  //           $or: [
  //             { destination: destination.toLowerCase() },
  //             { via: { $regex: destination.toLowerCase(), $options: "i" } },
  //           ],
  //         },
  //       ],
  //     },
  //     { startdate: date },
  //   ],
  // });

  // if (allbuses.length !== 0) {
  //   // Store the result in Redis with an expiration time of 1 hour
  //   res.json({ msg: allbuses });
  // } else {
  //   res.json({ msg: "No buses found" });
  // }
});

module.exports = router;
