import User from '../models/User';
import bcrypt from "bcrypt";



//Register User
//Create a new bank account

const createUserAccount = async (req, res) => {
    
    const { username, genero, phone, email, password } = req.body;

    const existEmail = await User.findOne({ email: email });
    if (existEmail) return res.status(400).json({ err: "Email já está a user usado!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        username: username,
        genero: genero,
        email: email,
        phone: phone,
        password: hashedPassword
    });

    user.save((err, data) => {
        if (err) {
            return res.status(400).json({ error: "Ocorreu um erro inesperado ao armazena os seus dados" });
        } else {
            return res.status(200).json({ data: "Sua conta foi criada com sucesso" });
        }
    })

}

export default { createUserAccount };