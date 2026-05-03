import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './AdminDashboard.css';

<Link to="/admin/add-place">
  <button>Add New Place</button>
</Link>

const AdminAddPlace = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    image: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/places/add", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      alert("Place Added Successfully");

      setFormData({
        name: "",
        location: "",
        price: "",
        image: "",
        description: ""
      });

    } catch (err) {
      console.log(err);
      alert("Error adding place");
    }
  };

  return (
    <div className="admin-form">
      <h2>Add New Place</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Place Name" value={formData.name} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <input name="price" placeholder="Price" type="number" value={formData.price} onChange={handleChange} required />
        <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />

        <button type="submit">Add Place</button>
      </form>
    </div>
  );
};

export default AdminAddPlace;