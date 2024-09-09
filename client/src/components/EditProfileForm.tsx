import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { baseURL } from "../utils/baseURL";

const EditProfileForm: React.FC = () => {
  const { user, token, setUser } = useContext(AuthContext);

  console.log("User in EditProfile:", user);

  const [formData, setFormData] = useState({
    email: user?.email || "",
    username: user?.username || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    birthdate: user?.birthdate || "",
    bio: user?.bio || "",
    avatar: user?.avatar || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("user in function  :>> ", user);
    try {
      if (!user) return;
      const response = await fetch(`${baseURL}/api/users/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log(user);
        setUser(updatedUser);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
          <label>
            Birthdate:
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
            />
          </label>
          <label>
            Bio:
            <textarea name="bio" value={formData.bio} onChange={handleChange} />
          </label>
          <label>
            Avatar URL:
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      </div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      {/* <div className="bubble"></div> */}
    </div>
  );
};

export default EditProfileForm;
