import { useContext } from "react";
import EditProfileForm from "../components/EditProfileForm";
import { AuthContext } from "../context/AuthContext";

const EditProfilePage: React.FC = () => {
  const { user, token, setUser } = useContext(AuthContext);
  return (
    <div>
      {user && token ? (
        <EditProfileForm user={user} token={token} setUser={setUser} />
      ) : (
        <p>Authenticate please</p>
      )}
    </div>
  );
};

export default EditProfilePage;
