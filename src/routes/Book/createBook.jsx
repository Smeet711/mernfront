import React, { useEffect, useState } from "react";
import NoImageSelected from "../../assets/no-image-selected.jpg";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function createBook() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStars] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState("");
  const [image, setImage] = useState(NoImageSelected);
  const [price, setprice] = useState("");

  const createBook = async (e) => {
    e.preventDefault();
    console.table([title, slug, price]);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", categories);
    formData.append("thumbnail", thumbnail);
    formData.append("price", price);

    try {
      const response = await fetch("http://localhost:8000/api/books", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setTitle("");
        setSlug("");
        setSubmitted(true);
        toast.success("Data Added to Store !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Failed to Submit Data !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (e) => {
    setCategories(e.target.value.split(",").map((category) => category.trim()));
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setThumbnail(e.target.files[0]);
    }
  };

  const toastmsg = () => {
    if (
      title == "" ||
      slug == "" ||
      stars == "" ||
      description == "" ||
      thumbnail == null ||
      price == "" ||
      categories == "" 
     
    )
      toast.warning("Complete all Fields !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
  };

  return (
    <div>
      <h1>Create Book</h1>
      <p>
        This is where we use NodeJs, Express & MongoDB to grab some data. The
        data below is pulled from a MongoDB database.
      </p>

      {submitted ? (
        <p>Data Added</p>
      ) : (
        <form className="bookdetails" onSubmit={createBook}>
          <div className="col-1">
            <label>Upload Thumbnail</label>
            <img src={image} alt="preview image" />
            <input
              onChange={onImageChange}
              type="file"
              accept="image/gif, image/jpeg, image/png"
              required
            />
          </div>
          <div className="col-2">
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Stars</label>
              <input
                type="text"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Description</label>
              <textarea
                rows="4"
                cols="50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Categories (comma-seperated)</label>
              <input
                type="text"
                value={categories}
                onChange={handleCategoryChange}
                required
              />
            </div>

            <div>
              <label>Price</label>
              <input
                type="text"
                value={price}
                required
                onChange={(e) => setprice(e.target.value)}
              
              />
            </div>



            <input type="submit" className="submitbtn" onClick={toastmsg} />
          </div>
        </form>
      )}
    </div>
  );
}

export default createBook;
