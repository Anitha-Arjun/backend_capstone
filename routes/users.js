import { Router } from "express";
import User from "../model/user.js";

const router = new Router();

// router.get('/', (req, res) => {
//     res.send('User Details')
// } )

/**
 * GET api/users/
 */
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/products/:id
 */
router.get("/:id", async (req, res, next) => {
  try {
    const userById = await User.findById(req.params.id);
    if (userById) {
      res.json(userById);
    } else {
      res.status(404).json(`${req.params.id} not found`);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/users
 */
router.post("/", async (req, res, next) => {
  try {
    const createUser = await User.create(req.body);
    if (createUser) {
      res.json({ message: "Created new user", createUser });
    } else {
      res.status(404).json({ message: "Cannot create a new user" });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/products/:id
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const deleteUserById = await User.findByIdAndDelete(req.params.id);
    if (deleteUserById) {
      res.json({
        message: `Deleted User: ${req.params.id}`,
        deleteUserById,
      });
    } else {
      res.json({ message: "Error in deleting the user by ID" });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/products/:id
 */
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updateUserById = await User.findByIdAndUpdate(id, body);
    if (updateUserById) {
      res.json({
        message: `Updated User Details: ${req.params.id}`,
        updateUserById,
      });
    } else {
      res.status(404).json(`Cannot update:${id} `);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
