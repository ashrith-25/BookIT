const express = require("express");
const router = express.Router();

const buses = require("../models/BusesModel.js");
const users = require("../models/UserModel.js");

/**
 * @swagger
 * /admin/fetch_users_count:
 *   get:
 *     summary: Get the count of all users
 *     description: Returns the total number of users in the database.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A JSON object containing the user count
 *         schema:
 *           type: object
 *           properties:
 *             users_count:
 *               type: integer
 *               description: The total number of users in the database
 *       500:
 *         description: Internal server error
 */

router.get("/fetch_users_count", (req, res) => {
  try {
    users.find({}, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ users_count: docs.length });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * @swagger
 * /admin/fetch_users:
 *   get:
 *     summary: Get all users.
 *     description: Retrieve all users from the database.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error.
 *     tags:
 *       - Users
 */

router.get("/fetch_users", (req, res) => {
  try {
    users.find({}, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        res.json(docs);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * @swagger
 * /admin/delete_user:
 *   post:
 *     summary: Delete a user by email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user to be deleted
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *                   example: User deleted successfully
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *                   example: User not found
 *       500:
 *         description: Internal server error
 */

router.post("/delete_user", async (req, res) => {
  try {
    const email = req.body.email;
    const response = await users.findOneAndDelete({ email });

    if (response) {
      res.json({ msg: `User deleted successfully` });
    } else {
      res.json({ msg: " " });
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * @swagger
 * /admin/fetch_buses_count:
 *   get:
 *     summary: Get the number of buses in the database.
 *     description: Retrieve the number of buses stored in the database.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns the number of buses in the database.
 *         schema:
 *           type: object
 *           properties:
 *             buses_count:
 *               type: integer
 *               description: The number of buses in the database.
 */

router.get("/fetch_buses_count", (req, res) => {
  try {
    buses.find({}, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ buses_count: docs.length });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * @swagger
 * /admin/fetch_busses:
 *   get:
 *     summary: Retrieves a list of all buses
 *     description: Returns a JSON array of all buses in the database.
 *     responses:
 *       200:
 *         description: A list of all buses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bus'
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Buses
 */

router.get("/fetch_busses", (req, res) => {
  try {
    buses.find({}, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        res.json(docs);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * @swagger
 * /admin/delete_bus:
 *   post:
 *     summary: Delete a bus from the database
 *     requestBody:
 *       description: The name of the bus to delete
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busname:
 *                 type: string
 *                 description: The name of the bus to delete
 *             example:
 *               busname: "My Bus"
 *     responses:
 *       200:
 *         description: Bus deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating that the bus was deleted successfully
 *                   example: "Bus deleted successfully"
 *       404:
 *         description: Bus not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A message indicating that the bus was not found
 *                   example: "Bus not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message indicating the internal server error
 *                   example: "Internal server error"
 */

router.post("/delete_bus", async (req, res) => {
  try {
    const name = req.body.busname;
    const response = await buses.findOneAndDelete({ name });

    if (response) {
      res.json({ msg: `Bus deleted successfully` });
    } else {
      res.json({ msg: " " });
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * @swagger
 * /admin/edit_bus:
 *   post:
 *     summary: Update a bus record by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditBusDetails'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *                   example: Bus Updated Successfully
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *                   example: Bad Request
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *                   example: Internal Server Error
 */

// router.post("/edit_bus", async (req, res) => {
//   try {
//     const data = req.body.editBusDetails;
//     const response = await buses.findByIdAndUpdate(data._id, data, {
//       new: true,
//     });

//     if (response) {
//       res.json({ msg: "Bus Updated Sucessfully" });
//     } else {
//       res.json({ msg: " " });
//     }
//   } catch (e) {
//     console.log(e);
//   }
// });

router.put("/edit_bus/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const data = req.body.editBusDetails;
    console.log(data);
    const response = await buses.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (response) {
      res.json({ msg: "Bus Updated Sucessfully" });
    } else {
      res.json({ msg: " " });
    }
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
