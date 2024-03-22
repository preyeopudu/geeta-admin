import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../features/app_slice";

interface FormData {
  email: string;
  amount: string;
}

const SendFundsToWallet: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    amount: "",
  });
  const dispatch = useDispatch();
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      `You want to send ${formData.amount} funds to ${formData.email} ?`
    );
    if (isConfirmed) {
      try {
        dispatch(setIsLoading(true));
        // Find user by email
        const userQuery = query(
          collection(db, "users"),
          where("email", "==", formData.email)
        );
        const userSnapshot = await getDocs(userQuery);
        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          const userId = userSnapshot.docs[0].id;

          // Find user's wallet
          const walletRef = doc(db, "wallets", userId);
          const walletSnapshot = await getDoc(walletRef);
          console.log(walletSnapshot.data());
          if (walletSnapshot.exists()) {
            const walletData = walletSnapshot.data();
            const currentBalance = walletData.deposit;
            const newBalance = currentBalance + parseFloat(formData.amount);

            await updateDoc(walletRef, { deposit: newBalance });

            console.log(
              "Funding deposit for user:",
              userData.email,
              "Amount:",
              formData.amount
            );
            alert(` Deposited ${formData.amount} for  ${userData.email}`);

            setFormData({
              email: "",
              amount: "",
            });
            setError(""); // Clear any previous errors
          } else {
            setError("User's wallet not found.");
          }
        } else {
          setError("User not found.");
        }
      } catch (error) {
        setError("Error funding deposit: " + (error as Error).message);
      } finally {
        dispatch(setIsLoading(false));
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Send Funds to User's Wallet
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              User Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter user's email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount ($)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter amount"
              required
            />
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 w-full"
          >
            Send Funds
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendFundsToWallet;
