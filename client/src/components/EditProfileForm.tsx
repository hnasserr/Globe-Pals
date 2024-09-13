import React, { useState } from "react";
import { baseURL } from "../utils/baseURL";
import { User } from "../@types";
import NavBar from "./NavBar";

type EditProfileProps = {
  user: User;
  token: string;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const EditProfileForm: React.FC<EditProfileProps> = ({
  user,
  token,
  setUser,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  console.log("User in EditProfile:", user);

  const [formData, setFormData] = useState({
    email: user.email,
    username: user.username,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    birthdate: user.birthdate || "",
    bio: user.bio,
    avatar: user.avatar,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("user in function  :>> ", user);
    try {
      if (!user) return;

      // Create a new FormData object
      const updatedData = new FormData();

      // Append text data to FormData
      updatedData.append("email", formData.email);
      updatedData.append("username", formData.username);
      updatedData.append("firstName", formData.firstName);
      updatedData.append("lastName", formData.lastName);
      updatedData.append("birthdate", formData.birthdate);
      updatedData.append("bio", formData.bio);

      // Append file to FormData if there is a selected file
      if (selectedFile) {
        updatedData.append("avatar", selectedFile);
      }

      // Send the form data as a PUT request
      const response = await fetch(`${baseURL}/api/users/update`, {
        method: "PUT",
        headers: {
          // No need to set "Content-Type" here, because the browser will automatically set the correct boundary for the multipart/form-data
          Authorization: `Bearer ${token}`,
        },
        body: updatedData, // Send the FormData object
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
    <>
      <NavBar />
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
                value={formData.birthdate?.substring(0, 10)}
                onChange={handleChange}
              />
            </label>
            <label>
              Bio:
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </label>
            <label>
              Avatar:
              <input type="file" name="avatar" onChange={handleFileChange} />
            </label>
            <button type="submit">Save Changes</button>
          </form>
        </div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        {/* <div className="bubble"></div> */}
      </div>
    </>
  );
};

export default EditProfileForm;
