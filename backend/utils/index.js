const User = require("../models/User");

const createBook = async (name, pName, pAge, page, date) => {
	return await User.create({ bookName: name, publisherName: pName, publisherAge: pAge, pageNumber: page, publishDate: date });
};

const getBookData = async (keyword, age) => {
	const result = await User.findOne({
		$or: [{ bookName: keyword },
			{ publisherAge: age }]
	}).exec();
	return result;
};



module.exports = {
    createBook,
    getBookData,
}