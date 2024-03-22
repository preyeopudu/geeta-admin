import React, { useState, ChangeEvent, FormEvent } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../features/app_slice";
import { useNavigate } from "react-router";

interface NewPackage {
  name: string;
  price: number;
  description: string;
  month: number;
  returns: number;
  percentage: number; // Add percentage property
}

const AddPackage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [newPackage, setNewPackage] = useState<NewPackage>({
    name: "",
    price: 0,
    description: "",
    month: 0,
    returns: 0,
    percentage: 0, // Initialize percentage to 0
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue = ["month", "price", "percentage"].includes(name)
      ? parseInt(value, 10)
      : value;
    setNewPackage({
      ...newPackage,
      [name]: parsedValue,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(setIsLoading(true));

      // Check if a package with the same name exists
      const querySnapshot = await getDocs(
        query(collection(db, "packages"), where("name", "==", newPackage.name))
      );
      if (!querySnapshot.empty) {
        setError("A package with the same name already exists.");
        return;
      }

      // Ensure price, month, and percentage values are not zero
      if (
        newPackage.price === 0 ||
        newPackage.month === 0 ||
        newPackage.percentage === 0
      ) {
        setError("Price, month, and percentage values cannot be zero.");
        return;
      }

      // Calculate returns based on package price and duration
      const returns = newPackage.percentage;

      // Add returns to the package data
      const packageData = {
        ...newPackage,
        returns,
      };

      // Add new package details to Firestore
      const docRef = await addDoc(collection(db, "packages"), packageData);
      console.log("New package added with ID: ", docRef.id);
      setError("");
      navigate("/");
      alert("successfully added package");
    } catch (error) {
      console.error("Error adding new package: ", error);
      setError((error as Error).message);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Package</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Package Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newPackage.name}
            onChange={handleChange}
            className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter package name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price (₦)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newPackage.price}
            onChange={handleChange}
            className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter price"
            required
          />
        </div>
        <div>
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Duration (in months)
          </label>
          <input
            type="number"
            id="duration"
            name="month" // Changed from "duration" to "month"
            value={newPackage.month}
            onChange={handleChange}
            className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter duration"
            required
          />
        </div>
        <div>
          <label
            htmlFor="percentage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Percentage Return
          </label>
          <input
            type="number"
            id="percentage"
            name="percentage"
            value={newPackage.percentage}
            onChange={handleChange}
            className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter percentage return"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newPackage.description}
            onChange={handleChange}
            className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter description"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 w-full"
        >
          Add Package
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
