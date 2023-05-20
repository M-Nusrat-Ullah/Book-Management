import React, { useEffect, useState } from "react";
import { newBook } from "../../utils/apiCaller";

const Home = () => {
	const [name, setName] = useState();
	const [pName, setPName] = useState();
	const [pAge, setPAge] = useState();
	const [page, setPage] = useState();
	const [date, setDate] = useState();

	// useEffect(() => {
	// 	const bookData = async () => {
	// 		await newBook();
	// 	};
	// 	bookData();
	// }, []);

	return (
		<div style={{ "background-color": "#bce6ff" }}>
			<h2>Book Entry</h2>
            <form>
                <label>Book name
                    <input
                        type="text"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    />
                </label>
                <label>
                    Publisher Name
                    <input
                        type="text"
                        value={pName}
                        onChange={(e)=> setPName(e.target.value)}
                    />
                </label>
                <label>
                    Publisher Age
                    <input
                        type="text"
                        value={pAge}
                        onChange={(e)=> setPAge(e.target.value)}
                    />
                </label>
                <label>
                    Page No.
                    <input
                        type="text"
                        value={page}
                        onChange={(e)=> setPage(e.target.value)}
                    />
                </label>
                <label>
                    Book name
                    <input
                        type="text"
                        value={date}
                        onChange={(e)=> setDate(e.target.value)}
                    />
                </label>
            </form>
		</div>
	);
};

export default Home;