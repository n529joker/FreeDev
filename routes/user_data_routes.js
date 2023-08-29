const {Router} = require("express")
const userController = require("../controllers/userController")
const itemController = require("../controllers/itemController")
const router = Router()

router.route("/signup")
.get(userController.signup_get)
.post(userController.signup_post)

router.route("/login")
.get(userController.login_get)
.post(userController.login_post)

router.get("/data", itemController.data_get)
//router.get("/data/:tag", itemController.data_tag_get)


module.exports = router

