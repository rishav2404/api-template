import { Router } from "express";
import { UserController } from "../controllers";
import { AuthMiddleware } from "../middlewares";

const userRouter = Router();

userRouter.use("/users", AuthMiddleware.authenticateApiKey);

userRouter.post("/users/create", UserController.createUser);
userRouter.get("/users", UserController.getUser);
userRouter.patch("/users/update", UserController.getUser);
userRouter.delete("/users/delete", UserController.deleteUser);

export default userRouter;
