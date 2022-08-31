import { Router } from "express";

const router = Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send({ error: "Incomplete values" })
        // const user = await userService.findOne({$and:[{email:email},{password:password}]},{name:1,email:1});
        if (email != 'admin@gmail.com' || password != '123') return res.status(400).send({ error: 'User not found' });
        req.session.user = {
            email,
            password
        };
        res.send({ status: "success", payload: user })
    } catch (error) {
        res.status(500).send({ error: error })
    }
})

router.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send("error");
        res.send("ok")
    })
})

export default router;