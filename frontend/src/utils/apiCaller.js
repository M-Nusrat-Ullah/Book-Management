import axios from "axios";

const config = {
	headers: {
		"Content-Type": "application/json",
	},
};

export const getBook = async () => {
	try {
		const res = await axios.get('mongodb://localhost:27017/bookdata/getbook', config);
		return res;
	} catch (error) {
		return error;
	}
};


export const newBook = async () => {
	try {
		const res = await axios.post('mongodb://localhost:27017/bookdata/adddata', config);
		return res;
	} catch (error) {
		return error;
	}
};