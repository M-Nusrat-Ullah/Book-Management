const { getBookData } = require("../utils");

const getBook = async (req, res) => {
    try {
        const { keyword, age } = req.body;
        const isSuccess = await getBookData(keyword, age);
        if(isSuccess) {
            res.json({
                isSuccess,
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

module.exports = {getBook};