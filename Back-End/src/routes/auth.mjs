import { Router } from "express";
import passport from "passport";

const router = new Router();

router.post("/api/auth/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json({ message: "Login Successful", user: req.user });
    console.log("Login Successful: " + req.user.userName);
});

router.get("/api/auth/status", (request, response) => {
    console.log(request.user);
    console.log(request.session);
    console.log(request.isAuthenticated());
    return request.user ? response.send(request.user) : response.sendStatus(401);
});

router.post("/api/auth/logout", (req, res) => {
    if (!req.user) return res.sendStatus(401);

    req.logout((err) => {
        if (err) return res.status(400).json({ message: "Logout failed" });

        req.session.destroy((err) => {
            if (err) return res.status(500).json({ message: "Failed to destroy session" });

            console.log("User logged out");
            res.status(200).json({ message: "Logout successful" });
        });
    });
});

export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
};

export default router;