const { createBook } = require("../utils");

const bookEntry = async (req, res) => {
    try {
        const {name, pName, pAge, page, date} = req.body;
        const isSuccess = await createBook(name, pName, pAge, page, date);
        if(isSuccess) {
            res.json({
                message: "Successful",
                status: 200
            })
        }
        throw{
            isSuccess
        }
    }
    catch (error){
        console.log(error);
        res.json({
            error,
            status: 400
        })
    }
}

module.exports = {bookEntry};