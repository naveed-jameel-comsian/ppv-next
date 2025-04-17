"use client";
import React, { useState } from "react";
import ProducerHeader from "@/components/Header/producer";
import Api from "@/components/api";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const breadcrumb = {
  title: "My Account",
  links: [
    { name: "Home", href: "/" },
    { name: "Register", href: "#" },
  ],
};

export default function UploadMovie() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    movie: null,
    trailer: null,
    thumbnail: null,
    poster: null,
  });
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleKeyDown = (e, state, setState) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      if (!state.includes(e.target.value.trim())) {
        setState([...state, e.target.value.trim()]);
      }
      e.target.value = "";
    }
  };

  const removeItem = (index, state, setState) => {
    setState(state.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Movie Name is required";
    }
    if (!formData.movie) {
      newErrors.movie = "Movie file is required";
    }
    if (!formData.trailer) {
      newErrors.trailer = "Trailer file is required";
    }
    if (!formData.thumbnail) {
      newErrors.thumbnail = "Thumbnail file is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true)

    const uploadData = new FormData();
    uploadData.append("name", formData.name);
    uploadData.append("description", formData.description);
    uploadData.append("movie", formData.movie);
    uploadData.append("trailer", formData.trailer);
    uploadData.append("thumbnail", formData.thumbnail);
    uploadData.append("poster", formData.poster);
    uploadData.append("cast", JSON.stringify(tags));
    uploadData.append("categories", JSON.stringify(categories));

    try {
      await Api.post("/producer/upload", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false)
      toast.success("Movie uploaded successfully!", "success");
      router.push("/production");
    } catch (err) {
      toast.error("Please try again!", "error");
      console.log("Upload error:", err?.response?.data?.message);
    }
    setLoading(false)
  };

  return (
    <>
      <ProducerHeader data={{ breadcrumb }} />
      <main className="main">
        <div className="registration-area my-80">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-6">
                <div className="registration-wrap holaa-form-wrapper">
                  <h5 className="inner-small-title mb-0">Upload Movie</h5>
                  <form onSubmit={handleSubmit}>
                    <div className="col-md-12">
                      <label className="single-input-field style-border">
                        <span>Movie Name</span>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter Movie Name"
                        />
                        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                      </label>
                    </div>

                    <div className="col-md-12">
                      <label className="single-input-field style-border">
                        <span>Description</span>
                        <textarea
                          type="text"
                          name="description"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Description"
                          style={{paddingLeft:"20px"}}
                        />
                      </label>
                    </div>

                    <label className="single-input-field style-border">
                      <span>Select Movie</span>
                      <input
                        type="file"
                        name="movie"
                        accept="video/*"
                        onChange={handleFileChange}
                        style={{ padding:"unset", height:"unset"}}

                      />
                      {errors.movie && <p style={{ color: "red" }}>{errors.movie}</p>}
                    </label>

                    <label className="single-input-field style-border">
                      <span>Select Trailer</span>
                      <input
                        type="file"
                        name="trailer"
                        accept="video/*"
                        onChange={handleFileChange}
                        style={{ padding:"unset", height:"unset"}}
                      />
                      {errors.trailer && <p style={{ color: "red" }}>{errors.trailer}</p>}
                    </label>

                    <label className="single-input-field style-border">
                      <span>Select Thumbnail</span>
                      <input
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ padding:"unset", height:"unset"}}
                      />
                      {errors.thumbnail && <p style={{ color: "red" }}>{errors.thumbnail}</p>}
                    </label>

                    <label className="single-input-field style-border">
                      <span>Poster</span>
                      <input
                        type="file"
                        name="poster"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ padding:"unset", height:"unset"}}
                      />
                    </label>

                    <label className="single-input-field style-border">
                      <span>Cast</span>
                      <input
                        type="text"
                        placeholder="Type and press Enter"
                        onKeyDown={(e) => handleKeyDown(e, tags, setTags)}
                      />
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px" }}>
                        {tags.map((tag, index) => (
                          <span
                            key={index}
                            style={{
                              background: "#007bff",
                              color: "#fff",
                              padding: "5px 10px",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => removeItem(index, tags, setTags)}
                          >
                            {tag} ✖
                          </span>
                        ))}
                      </div>
                    </label>

                    <label className="single-input-field style-border">
                      <span>Categories</span>
                      <input
                        type="text"
                        placeholder="Type and press Enter"
                        onKeyDown={(e) => handleKeyDown(e, categories, setCategories)}
                      />
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px" }}>
                        {categories.map((category, index) => (
                          <span
                            key={index}
                            style={{
                              background: "#28a745",
                              color: "#fff",
                              padding: "5px 10px",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => removeItem(index, categories, setCategories)}
                          >
                            {category} ✖
                          </span>
                        ))}
                      </div>
                    </label>

                    <div className="check-btn">
                      <div className="btn-wrap mt-sm-4 pt-lg-3 mt-4">
                        <button type="submit" className="hl-btn medium-btn btn-base text-uppercase lh-1">
                          {!loading ?
                            <span className="pt-0">Save</span> :
                            <span className="spinner-border spinner-border-sm"></span>
                          }
                        </button>
                      </div>
                    </div>
                  </form>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
