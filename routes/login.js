import { Router } from "express";
import Login from "../model/login.js";

const router = new Router();

//Check connection
// router.get("/", (req, res) => {
//   res.send("Login Info");
// });

/**
 * POST /api/login
 */

router.post("/register", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Login.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = new Login({ email, password });

    await newUser.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const newLogin = await Login.findOne({ email });
    if (!newLogin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Check if password matches
    if (password !== newLogin.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // If login is successful, send user data or token
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/login
 */
router.get("/", async (req, res, next) => {
  try {
    const userLogin = await Login.find();
    res.json(userLogin);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/login/:id
 */
router.get("/:id", async (req, res, next) => {
  try {
    const loginById = await Login.findById(req.params.id);
    if (loginById) {
      res.json(loginById);
    } else {
      res.status(404).json(`${req.params.id} not found`);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE by id - api/login/:id
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const deleteLoginById = await Login.findByIdAndDelete(req.params.id);
    if (deleteLoginById) {
      res.json({
        message: `Login deleted: ${req.params.id}`,
        deleteLoginById,
      });
    } else {
      res.json({ message: "Error in deleting the login by ID" });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/login/:id
 */
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updateLoginById = await Login.findByIdAndUpdate(id, body);
    if (updateLoginById) {
      res.json({ message: `Updated Login: ${req.params.id}`, updateLoginById });
    } else {
      res.status(404).json(`Cannot update login: ${id}`);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
