const express = require("express");

const app = express()

app.get('/auth', async(req, res, next) => {
    res.status(200).send("Welcome to Auth Service")
})

//apis required for auth service
// 1. User Registration API
// 2. User Login API
// 3. Token Validation API
// 4. Password Reset API
// 5. User Profile API
// 6. Logout API
// 7. Authorization Check API
// 8. Role Management API
// 9. Token Refresh API


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Auth Service running at port ${PORT}`)
})