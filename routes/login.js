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

router.post("/", async (req, res, next) => {
  try {
    const newLogin = await Login.create(req.body);
    if (newLogin) {
      res.json(newLogin);
    } else {
      res.status(404).json({ message: "Error creating a new login" });
    }
  } catch (error) {
    next(error);
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
