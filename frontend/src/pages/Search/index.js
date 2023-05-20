import React, { useEffect, useState } from "react";
import { getBook } from "../../utils/apiCaller";

const Search = () => {

	// useEffect(() => {
	// 	const fetchBook = async () => {
	// 	 await getBook();
	// 	};
	// 	fetchBook();
	// }, []);

	return (
		<div style={{ "background-color": "#bce6ff" }}>
			<h2>Book Search</h2>
            <form>
                <label>Keyword
                    <input
                        type="text"
                    />
                </label>
                <label>
                    Publisher Age
                    <input
                        type="Number"
                    />
                </label>
            </form>
		</div>
	);
};

export default Search;