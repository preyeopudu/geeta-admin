import { Route, Routes as ReactRoutes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./src/features/app_slice";
import HomePage from "./src/pages/homePage";
import WithdrawalRequestsPage from "./src/pages/withdrawalRequestPage";
import SendFundsToWallet from "./src/pages/sendFundsPage";
import AddPackageForm from "./src/pages/addPackagePage";
import EditPackageForm from "./src/pages/editPackagePage"; // Import EditPackageForm
import SignIn from "./src/pages/SignInPage";

const Routes = () => {
  const isAuthenticated = useSelector((state: RootState) => state.app.auth);

  return (
    <ReactRoutes>
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/"
        element={isAuthenticated ? <HomePage /> : <Navigate to="/signin" />}
      />
      <Route
        path="/withdrawal"
        element={
          isAuthenticated ? (
            <WithdrawalRequestsPage />
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
      <Route
        path="/send"
        element={
          isAuthenticated ? <SendFundsToWallet /> : <Navigate to="/signin" />
        }
      />
      <Route
        path="/add-package"
        element={
          isAuthenticated ? <AddPackageForm /> : <Navigate to="/signin" />
        }
      />
      <Route
        path="/edit-package/:id"
        element={
          isAuthenticated ? <EditPackageForm /> : <Navigate to="/signin" />
        }
      />
    </ReactRoutes>
  );
};

export default Routes;
