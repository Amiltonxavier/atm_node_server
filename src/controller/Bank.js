import Bank from '../models/account';
import { v4 as uuidv4 } from 'uuid';




const createBankAccount = async (req, res) => {
    const code = uuidv4();
    const { deposit, accounttype } = req.body;
    let countdeposit = 0;
    if (deposit <= 0) return res.status(400).json({ err: "Deposito invalidado" }); 
    
    
    if (deposit > 0) countdeposit += 1;

    const bank = new Bank({
        accounttype: accounttype,
        accountnumber: code,
        balance: deposit, 
        countdeposit: countdeposit
    });

    bank.save((err, data) => {
        if (err) {
            return res.status(400).json({err: err})
        } else {
            return res.status(200).json({data: data})
        }
    }) 
}

const Deposit = async (req, res) => {

    const AccountId = req.params.AccountId;
    //const accountnumber = req.body.accountnumber;
    const { deposit } = req.body;

    
   await Bank.findOne({ accountnumber: AccountId }, async (err, data) => {

       if (deposit <= 0) return res.status(400).json({ err: "Deposito invalidado" })

       data.balance += deposit;
       data.countdeposit += 1; 
       await data.save((err, data) => {
           if (err) {
                return res.status(400).json({err: err})
           } else {
               return res.status(400).json({data: data})
            }
        })
   });
    //if (!findAccount) return res.status(400).json({ err: "Numero de conta não existe!" });
}

const withdraw = async (req, res) => {

    const AccountId = req.params.AccountId;
    const { amount } = req.body;

    
   await Bank.findOne({ accountnumber: AccountId }, async (err, data) => {

       if (data.balance < amount ) return res.status(400).json({ err: "Operação invalida, saldo da conta inferior" })

       data.balance -= amount;
       data.countwithdraw += 1; 
       await data.save((err, data) => {
           if (err) {
                return res.status(400).json({err: err})
           } else {
               return res.status(400).json({data: data})
            }
        })
   });
}

const consult = async (req, res) => {
    const AccountId = req.params.AccountId;

    await Bank.findOne({ accountnumber: AccountId }, (err, data) => {
        if (err) {
            return res.status(400).json({ err: err });
        } else {
            return res.status(200).json({ data: data });
        }
    })
};

const transfers = async (req, res) => {


    const { transfer, AccountId } = req.body;

    if(transfer < 0) return res.status(400).json({ err: "Operação Invalida"})
    await Bank.findOne({ accountnumber: AccountId }, async (err, data) => {
        
        data.balance += transfer;
        await data.save((err, data) => {
            if (err) {
               return res.status(400).json({err: err})
            } else {
                return res.status(200).json({ data: data });
           }
       })
    })
}


export default { consult, createBankAccount, transfers, withdraw, Deposit};