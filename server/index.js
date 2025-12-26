import express from 'express';
import cors from 'cors';
import { configDotenv } from "dotenv"

configDotenv();

const app = express();

const PORT = process.env.PORT

app.use(cors());

app.get("/test", (req, res) => {
    res.send("Server check")
})


const validateUserInput = async (userInput) => {
    try {
        if (!userInput || userInput.trim().length === 0)
            return { isValid: false, message: "Chutiya samjha hai kya" }

        if (userInput.trim().length < 200)
            return { isValid: false, message: "Itna short resume? Buddy you need to work on your skills" }

        return {
            isValid: true
        }
    } catch (error) {
        return { message: error }
    }
}

app.post("/judge", (req, res) => {
    try {
        const textInput = req.body.inputText;

        const validate = validateUserInput(textInput);

        if (!validate.isValid){
            return res.status(400).json({
                success: false,
                message: validate.message
            })
        }



    } catch (error) {
        return res.send(500).json({
            success: false,
            message: `Internal Server Error: ${error}`
        })
    }

})

app.listen(PORT, () => {
    console.log(`App started on http://localhost:${PORT}`);
})