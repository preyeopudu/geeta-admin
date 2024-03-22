import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

interface Package {
  id: string; // Change the type of id to string since Firestore generates document IDs as strings
  name: string;
  price: number;
  description: string;
}

const PackageList: React.FC = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "packages"), (snapshot) => {
      const packagesData: Package[] = [];
      snapshot.forEach((doc) => {
        packagesData.push({ id: doc.id, ...doc.data() } as Package);
      });
      setPackages(packagesData);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/edit-package/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this package?"
      );
      if (!isConfirmed) return;
      await deleteDoc(doc(db, "packages", id));
      // If deletion is successful, you might want to display a success message or update state
    } catch (error) {
      console.error("Error deleting package:", error);
      // Handle error (e.g., display error message to the user)
    }
  };

  const handleAdd = () => {
    navigate("/add-package");
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Package List
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mt-6">
        {packages.map((packageItem) => (
          <div
            key={packageItem.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {packageItem.name}
              </h3>
              <p className="text-gray-600 mb-2">₦ {packageItem.price}</p>
              <p className="text-gray-700 mb-4">{packageItem.description}</p>
            </div>
            <div className="bg-gray-100 p-4 flex justify-end">
              <button
                onClick={() => handleEdit(packageItem.id)}
                className="text-blue-600 hover:text-blue-900 font-semibold mr-4 focus:outline-none"
              >
                <FiEdit />
              </button>
              <button
                onClick={() => handleDelete(packageItem.id)}
                className="text-red-600 hover:text-red-900 font-semibold focus:outline-none"
              >
                <FiTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={handleAdd}
          className="flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 focus:outline-none"
        >
          <FiPlus className="text-xl mr-2" />
          <span className="font-semibold">Add Package</span>
        </button>
      </div>
    </div>
  );
};

export default PackageList;
