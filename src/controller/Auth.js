import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const login = async (req, res) => {
    const { phone, password } = req.body;

    User.findOne({ phone }, async (error, user) =>{
        if(error || !user) {
            return res.status(400).json({ error: "Verifique por favor o seu número de telefone"})
        } 

        const comparePassword = await bcrypt.compare(password, user.password);

        if(!comparePassword) {
            return res.status(401).json({ error: "Verifique por favor a sua Senha" })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        res.cookie("t", token, { expire: new Date() + 999 });

        const { _id, username, isActived, phone } = user;
        return res.json({ token, user: { _id, username, isActived, phone } });
    })
}

export default { login }