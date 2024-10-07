// pages/search.js
import { useState } from "react";
import axios from "axios";

const Search = () => {
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const response = await axios.get(`http://localhost:5000/phrase/search`, {
            params: {
                query,
                status,
                sort,
            },
        });
        setResults(response.data);
    };

    return (
        <div>
            <h1>Search Phrases</h1>
            <input
                type="text"
                placeholder="Search term"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <select onChange={(e) => setStatus(e.target.value)}>
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="spam">Spam</option>
                <option value="deleted">Deleted</option>
            </select>
            <select onChange={(e) => setSort(e.target.value)}>
                <option value="">Sort By</option>
                <option value="phrase:ASC">Phrase Ascending</option>
                <option value="phrase:DESC">Phrase Descending</option>
            </select>
            <button onClick={handleSearch}>Search</button>

            <ul>
                {results.map((result) => (
                    <li key={result.id}>
                        {result.phrase} (Status: {result.status})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
