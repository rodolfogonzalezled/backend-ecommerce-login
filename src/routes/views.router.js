import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    if (!req.session?.user) return res.redirect('/login');
    res.render("pages/index", {user:req.session.user});
});

router.get('/carrito', (req, res) => {
    if (!req.session?.user) return res.redirect('/login');
    res.render('pages/carrito')
});

router.get('/login', (req, res) => {
    if (req.session?.user) return res.redirect('/');
    res.render('pages/login');
})

export default router;