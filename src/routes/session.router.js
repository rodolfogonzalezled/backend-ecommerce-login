import { Router } from "express";
import passport from 'passport';

const router = Router();

router.post('/login',passport.authenticate('login',{failureRedirect:'/api/session/loginfail'}),async(req,res)=>{
    req.session.user = {
        name:req.user.name,
        email:req.user.email,
        id:req.user._id
    }
    res.send({status:"success", payload:req.user._id});
});

router.get('/loginfail', (req,res)=>{
    console.log("login failed");
    res.status(500).send({status:"error", error:"Login failed"});
})

router.get('/logout', async (req, res) => {
    req.session.destroy(error => {
        if (error) return res.status(500).send({status:"error", error:"Logout error"});
        res.status(200).send("ok");
    })
});

router.post('/register', passport.authenticate('register', {failureRedirect:'/api/session/registerFail'}), async (req, res) => {
    console.log(req.user)
    res.send({status: "success", payload: req.user.id});
});

router.get('/registerFail', async(req,res) => {
    console.log("Register Failed");
    res.status(500).send({status: "error", error: "Register failed"});
});

export default router;