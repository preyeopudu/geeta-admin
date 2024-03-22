import { useNavigate } from "react-router-dom";
import GoogleIcon from "../assets/google.svg";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, RootState } from "../features/app_slice";
import { auth } from "../firebase";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.app.auth);

  console.log(isAuthenticated);

  const handleLogin = async (): Promise<void> => {
    try {
      // Create a GoogleAuthProvider instance
      const provider = new GoogleAuthProvider();

      // Trigger the Google sign-in popup
      const allowedMail = "geetainvestments5@gmail.com";

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);

      if (user?.email === allowedMail) {
        dispatch(setAuth(true));
        return navigate("/");
      } else {
        alert("user is not allowed");
      }
      // The signed-in user info

      // Redirect to the home page or any other page after successful sign-in
    } catch (error) {
      alert((error as Error).message);
      console.error("Google sign-in error:", (error as Error).message);
      // Handle sign-in error, show a message to the user, etc.
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-120">
        <button
          className="w-full bg-white border border-gray-200 hover:bg-gray-100 text-black font-bold py-2 px-4 rounded flex items-center justify-center"
          onClick={handleLogin}
        >
          <span className="mr-2">
            <img src={GoogleIcon} alt="Google Icon" className="w-6 h-6" />
          </span>
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
