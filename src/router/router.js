import Express from "express";
import BankAccount from "../controller/Bank";
const router = Express.Router();


//router.get("/", BankAccount.Index);
router.post("/create-bank", BankAccount.createBankAccount);
router.post("/deposit/:AccountId", BankAccount.Deposit);
router.post("/withdraw/:AccountId", BankAccount.withdraw);
router.get("/consult/:AccountId", BankAccount.consult);
router.post("/transfer", BankAccount.transfers);


export default router;