import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function singleBook() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [bookId, setBookId] = useState("");

  const urlSlug = useParams();
  const baseUrl = `https://mernback-x5e0.onrender.com/api/books/${urlSlug.slug}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function StarRating({ numberOfStars }) {
    const stars = [];

    for (let i = 0; i < numberOfStars; i++) {
      stars.push(<span key={i}>⭐</span>);
    }

    return <div>Rating: {stars}</div>;
  }

  return (
    <div>
      <Link to={"/books"}>🔙 Books</Link>

      <div className="bookdetails">
        <div className="col-1">
          <img
            src={`https://mernback-x5e0.onrender.com/uploads/${data?.thumbnail}`}
            alt={data?.title}
          />
          <Link to={`/editbook/${data.slug}`}>Edit</Link>
        </div>

        <div className="col-2">
          <h1>{data?.title}</h1>
          <p>{data?.description}</p>
          <h3>Rs {data?.price}</h3>
          <StarRating numberOfStars={data?.stars} />

          <p>Category</p>
          <ul>
            {data?.category?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default singleBook;
