const express = require("express");
const JWT = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const router = express.Router();

const users = require("../models/UserModel.js");
const validateUser = require("../validation/SignUpValidation.js");
const AuthorizeUser = require("../auth/Authorize.js");

let finalOTP = "";
let passwordchangeOTP = "";

router.post("/sendOTP", async (req, res) => {
  const { firstname, lastname, email } = req.body;

  const msg = validateUser(req.body);
  if (msg !== undefined) {
    return res.json(msg);
  }

  const user = await users.findOne({ email }).lean();
  if (user) return res.json({ msg: "User exists with this email" });

  let OTP = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "bookitofficialmail@gmail.com",
      pass: "dwcazjzmubagpbtp",
    },
  });

  let mailOptions = {
    from: ' "Verify your email" <bookitofficialmail@gmail.com>',
    to: email,
    subject: "Your OTP",
    html: `Dear ${firstname + " " + lastname},<br></br><br></br>
             <b>Your one time password is</b> - <h1>${OTP}</h1>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      finalOTP = OTP;
      res.json({ msg: "OTP sent to your email" });
    }
  });
});

router.post("/sendOTPforpasswordchange", async (req, res) => {
  const { email } = req.body;

  const user = await users.findOne({ email }).lean();
  try {
    if (user) {
      let OTP = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
          user: "bookitofficialmail@gmail.com",
          pass: "dwcazjzmubagpbtp",
        },
      });

      let mailOptions = {
        from: ' "Verify your email" <bookitofficialmail@gmail.com>',
        to: email,
        subject: "Your OTP",
        html: `Dear ${user.firstname + " " + user.lastname},<br></br><br></br>
                   <b>Your one time password is</b> - <h1>${OTP}</h1>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({ msg: "error" });
        } else {
          passwordchangeOTP = OTP;
          res.json({ msg: "OTP sent to your email" });
        }
      });
    } else res.json({ msg: "No user present with this email" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "error" });
  }
});

router.post("/verifyOTPforpasswordchange", (req, res) => {
  const { OTP } = req.body;

  if (OTP === passwordchangeOTP) {
    res.json({ msg: "OTP verification SuccessFul" });
  } else res.json({ msg: "Invalid OTP" });
});

router.post("/changepassword", async (req, res) => {
  const { email, password, confirmpassword } = req.body;

  try {
    if (password === confirmpassword) {
      const encrypted = await bycrypt.hash(password, 10);
      await users.updateOne({ email }, { $set: { password: encrypted } });

      res.json({ msg: "Password Update SuccessFul" });
    } else {
      res.json({ msg: "password and confirmpassword are not matching" });
    }
  } catch (error) {
    res.json({ msg: "error" });
  }
});

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create a new user profile
 *     description: Create a new user profile with the given details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               gender:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profileimage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile creation successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Profile Creation SuccessFul
 *       400:
 *         description: Bad request. Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Invalid email address
 *       409:
 *         description: Conflict. User exists with this email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: User exists with this email
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Server error occurred
 */

router.post("/signup", async (req, res) => {
  if (finalOTP === req.body.OTP) {
    const {
      firstname,
      lastname,
      gender,
      phone,
      email,
      password,
      profileimage,
    } = req.body.final_user;

    try {
      const encrypted = await bycrypt.hash(password, 10);
      const user = {
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        phone: phone,
        email: email,
        password: encrypted,
        profileimage: profileimage,
      };

      await new users(user).save();
      return res.json({ msg: "Profile Creation SuccessFul" });
    } catch (error) {
      return res.json({ msg: error });
    }
  }

  res.json({ msg: "OTP is not valid" });
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user
 *     description: Login an existing user with their email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: success message
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: error message
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: error message
 */

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email: email });

    if (user) {
      const present = await bycrypt.compare(password, user.password);
      // console.log(user.password);
      console.log(present);
      if (present) {
        if (email == "peramsaicharanyadav99@gmail.com") {
          const admintoken = JWT.sign(
            {
              user: {
                userid: user._id,
              },
            },
            "jwtSecret"
          );
          return res.json({
            msg: "admin login sucessful",
            token: admintoken,
          });
        }
        const token = JWT.sign(
          {
            user: {
              userid: user._id,
            },
          },
          "jwtSecret"
        );
        return res.json({ msg: "Login SuccessFul", token: token });
      }
      //  else return res.json({ msg: "Password incorrect" });
      else return res.json({ msg: "No user present with these credentials" });
    }
  } catch (error) {
    res.json({ msg: "error" });
  }
});

/**
 * @swagger
 * /user/getuser:
 *   get:
 *     summary: Get user information.
 *     description: Retrieves the user information associated with the provided user ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *         description: User information successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   $ref: '#/components/schemas/User'
 *       '404':
 *         description: No user found with the provided user ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: no user found
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: error
 */

router.get("/getuser", AuthorizeUser, async (req, res) => {
  try {
    const user = await users.findById(req.user.userid);
    if (user) res.json({ user: user });
    else res.json({ msg: "no user found" });
  } catch (error) {
    res.json({ msg: "error" });
  }
});

/**
 * @swagger
 * /user/getadmin:
 *   get:
 *     summary: Get admin details
 *     description: Retrieve the details of the authenticated admin user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success message indicating that the admin details were retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     // Add properties of user object here
 *                   example:
 *                     // Add example object of user here
 *       401:
 *         description: Error message indicating that the user is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Unauthorized access.
 *       404:
 *         description: Error message indicating that no admin was found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: No admin found.
 *       500:
 *         description: Internal server error occurred while retrieving the admin details.
 */

router.get("/getadmin", AuthorizeUser, async (req, res) => {
  try {
    const user = await users.findById(req.user.userid);
    if (user) {
      res.json({ user: user });
    } else res.json({ msg: "no admin found" });
  } catch (e) {
    console.log(e);
    res.json({ msg: error });
  }
});

/**
 * @swagger
 * /user/updateuser:
 *   post:
 *     summary: Updates a user's information.
 *     requestBody:
 *       description: User information to be updated.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               id:
 *                 type: string
 *               phone:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Update SuccessFul
 *       400:
 *         description: Error message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: error
 */

router.post("/updateuser", (req, res) => {
  const { firstname, lastname, id, phone, gender } = req.body;
  users.findByIdAndUpdate(
    id,
    { firstname: firstname, lastname: lastname, phone: phone, gender: gender },
    (err) => {
      if (err) {
        res.json({ msg: "error" });
      } else {
        res.json({ msg: "Update SuccessFul" });
      }
    }
  );
});

/**
 * @swagger
 * /user/insertrecentsearches:
 *   post:
 *     summary: Insert recent searches for a user
 *     description: Insert a new search into a user's recent searches list.
 *     tags:
 *       - Recent Searches
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     description: The email of the user whose recent searches will be updated
 *                   recentsearches:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: An array of recent searches for the user
 *                 required:
 *                   - email
 *               travelDetails:
 *                 type: string
 *                 description: The new search to be added to the user's recent searches
 *     responses:
 *       200:
 *         description: Successfully updated the user's recent searches
 *       400:
 *         description: Invalid input data provided
 *       500:
 *         description: An error occurred while updating the user's recent searches
 */

router.post("/insertrecentsearches", async (req, res) => {
  const searches = [req.body.travelDetails, ...req.body.user.recentsearches];
  const email = req.body.user.email;

  try {
    await users.updateOne({ email }, { $set: { recentsearches: searches } });
  } catch (error) {
    console.log(error);
  }
});

/**
 * @swagger
 * /user/uploadprofilepicture:
 *   post:
 *     summary: Upload a user's profile picture.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: profilepicture
 *         in: formData
 *         type: file
 *         description: The profile picture to upload.
 *     responses:
 *       '200':
 *         description: The profile picture was uploaded successfully.
 *       '400':
 *         description: Bad request. The request was malformed or missing parameters.
 *       '500':
 *         description: Internal server error. Something went wrong on the server.
 */

const upload = path.join(__dirname, "..", "..", "Frontend", "public", "Images");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, upload);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageupload = multer({ storage: storage });

router.post(
  "/uploadprofilepicture",
  imageupload.single("file"),
  async (req, res) => {
    const filename = req.file.filename;
    const email = req.body.email;
    await users.updateOne(
      { email },
      { $set: { profileimage: `/Images/${filename}` } }
    );
  }
);

module.exports = router;
