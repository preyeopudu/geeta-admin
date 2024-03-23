import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../features/app_slice";

interface Package {
  name: string;
  price: number;
  description: string;
  month: number;
  returns: number;
  [key: string]: string | number;
}

const EditPackage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Package>({
    name: "",
    price: 0,
    description: "",
    month: 0,
    returns: 0,
  });

  const fetchPackageDetails = useCallback(
    async (id: string) => {
      try {
        dispatch(setIsLoading(true));

        const packageDoc = await getDoc(doc(db, "packages", id));
        if (packageDoc.exists()) {
          const data = packageDoc.data() as Package;
          setFormData(data);
        } else {
          console.error("Package not found");
        }
      } catch (error) {
        console.error("Error fetching package details:", error);
        // Handle error (e.g., display error message to the user)
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (id) {
      fetchPackageDetails(id);
    } else {
      console.error("Package ID is undefined");
    }
  }, [fetchPackageDetails, id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) {
      console.error("Package ID is undefined");
      return;
    }
    try {
      dispatch(setIsLoading(true));

      await updateDoc(doc(db, "packages", id), formData as Package);
      // Redirect user to package list or another page after successful update
      navigate("/");
    } catch (error) {
      console.error("Error updating package:", error);
      // Handle error (e.g., display error message to the user)
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Package</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Package Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter package name"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="text-sm font-medium text-gray-700">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter price"
            required
          />
        </div>
        <div>
          <label
            htmlFor="returns"
            className="text-sm font-medium text-gray-700"
          >
            Return
          </label>
          <input
            type="number"
            id="returns"
            name="returns"
            value={formData.returns}
            onChange={handleChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter returns"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter description"
            required
          />
        </div>
        <div>
          <label htmlFor="month" className="text-sm font-medium text-gray-700">
            Month
          </label>
          <input
            type="number"
            id="month"
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter month"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPackage;
