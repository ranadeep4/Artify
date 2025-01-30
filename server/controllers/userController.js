import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import razorpay from 'razorpay'
import transactionModel from "../models/transactionModel.js";

const registerUser = async (req,res)=>{
    try {

        const {name, email, password} = req.body

        if(!name || !email || !password){
            return res.status(400).json({success:false, message: "All fields are required"})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false, message: "Invalid email format"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password:hashedPassword
        }
        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id }, process.env.JWT_SECRET )

        res.json({success:true,token, user:{name: user.name}})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body
        
        if(!email ||!password){
            return res.json({success:false, message: "All fields are required"})
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false, message: "User not found! please enter valid email and password"})
        }
        
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success: false, message:"User not found! please enter valid email and password"})
        }else{
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            return res.json({success:true,token, user:{name: user.name}})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

// 

const userCredits = async (req, res) => {
    try {

        const {userId} = req.body

        const user = await userModel.findById(userId)
        res.json({success:true,credits:user.creditBalance, user:{name:user.name}})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}



const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async(req,res)=>{
    try {

        const {userId, planId} = req.body
        
        const userData = await userModel.findById(userId)
        if(!userId || !planId){
            return res.json({success:false, message: "All fields are required! missing details"})
        }
        if(!userData){
            return res.json({success:false, message: "User not found"})
        }

        let credits, plan , amount, date
        switch(planId){
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 10
                break
            case 'Advanced':
                plan = 'Advanced'
                credits = 500
                amount = 50
                break
            case 'Bussiness':
                plan = 'Bussiness'
                credits = 5000
                amount = 250
                break
            default:
                return res.json({success:false, message: "Invalid plan"})
        }

        date = Date.now();
        const transactionData ={
            userId,plan, amount, credits, date,
        }
        const newTransaction = await transactionModel.create(transactionData)
        
        const options = {
            amount : amount*100,
            currency : process.env.CURRENCY,
            receipt : newTransaction._id,
            // payment_capture : 1,

        }
        await razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                console.log(error);
                return res.json({success:false, message: error.message})
            }
            return res.json({success:true, order})
        })
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}


const verifyRazorpay = async(req,res)=>{
    try {

        const {razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid'){
            const transactionData = await transactionModel.findById(orderInfo.receipt)

            if(transactionData.payment){
                return res.json({success:false, message: "Payment already processed"})
            }
            const userData = await userModel.findById(transactionData.userId)

            const creditBalance = userData.creditBalance + transactionData.credits
            await userModel.findByIdAndUpdate(userData._id,{creditBalance})
            await  transactionModel.findByIdAndUpdate(transactionData._id,{payment:true})
            return res.json({success:true, message: "Payment successful! credits added", creditBalance})
        }else{
            return res.json({success:false, message: "Payment failed"})
        }

        
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}


export {registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay}