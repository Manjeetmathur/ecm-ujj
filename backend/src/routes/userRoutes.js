import {Router} from "express"
import { getUserDetails, login, logout, registerUser ,makeUserAdmin, addAddress} from "../controller/userController.js"
import {upload} from "../middleware/multerMiddleware.js"
import { verifyJwt } from "../middleware/authMiddleware.js";

const router = Router();


router.route("/register").post( upload.single("profile") ,registerUser)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/get-user-details").get( verifyJwt ,getUserDetails)
router.route("/make-user-admin").post( verifyJwt ,makeUserAdmin)
router.route("/add-address").patch( verifyJwt ,addAddress)

export default router
