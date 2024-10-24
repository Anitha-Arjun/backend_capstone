import { Router } from "express";
import Review from "../model/review.js";

const router = new Router();

// router.get("/", (req, res) => {
//   res.send("Review");
// });

/**
 * GET /api/reviews
 */
router.get("/", async (req, res, next) => {
  try {
    const review = await Review.find();
    if (review) {
      res.json(review);
    } else {
      res.json({ message: "Reviews not found" });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/reviews
 */

router.post("/", async (req, res, next) => {
  try {
    const review = await Review.create(req.body);

    if (review) {
      res.json({ message: "New review posted", review });
    } else {
      res.status(404).json({ message: "Error creating a new review" });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/reviews/:id
 */
router.get("/:id", async (req, res, next) => {
  try {
    const reviewById = await Review.findById(req.params.id);
    if (reviewById) {
      res.json({
        message: `Get the review by id: ${req.params.id}`,
        reviewById,
      });
    } else {
      res.json({ message: `${req.params.id} not found` });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/reviews/:id
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const deleteById = await Review.findByIdAndDelete(req.params.id);
    if (deleteById) {
      res.json({
        message: `Deleted review by ID: ${req.params.id}`,
        deleteById,
      });
    } else {
      res.json({ message: "Error deleting the review" });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * PUT api/review/:id
 */
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const updateById = await Review.findByIdAndUpdate(id, body);
    if (updateById) {
      res.json({ message: `Update the review: ${id}`, updateById });
    } else {
      res.json(`Cannot update:${id}`);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
