import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Book() {
  const baseUrl = "https://mernback-x5e0.onrender.com/api/books";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl;
        if (selectedCategory) {
          url += `?category=${selectedCategory}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError("Error fetching data. Please try again later.");
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedCategory]);

  return (
    <div>
      <h1>Books</h1>
      <p>Real readers would love this</p>

      <Link to="/createbook">+ Add New Book</Link>

      <div className="filters">
        <label>Categories</label>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All</option>
          <option value="romance">Romance</option>
          <option value="science">Science</option>
          <option value="crime">Crime</option>
          <option value="food">Food</option>
          <option value="adventure">Adventure</option>
          <option value="thriller">Thriller</option>
          <option value="fiction">Fiction</option>
          <option value="other">other</option>
        </select>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="books">
          {data.map((item) => (
            <li key={item._id}>
              <Link to={`/books/${item.slug}`}>
                <img
                  src={`https://mernback-x5e0.onrender.com/${item.thumbnail}`}
                  alt={item.title}
                />
                <h3>{item.title}</h3>
                <h4>Rs{item.price}</h4>
              </Link>

              <a href="#" class="btn red hide-text">
                <span>Add to Cart</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Book;
