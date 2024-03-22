import { useState, useEffect } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

interface WithdrawalRequest {
  id: string;
  accountNumber: string;
  price: number;
  bankName: string;
}

const WithdrawalRequestList = () => {
  const [withdrawalRequests, setWithdrawalRequests] = useState<
    WithdrawalRequest[]
  >([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "withdrawRequests"),
      (snapshot) => {
        const requestsData: WithdrawalRequest[] = [];
        snapshot.forEach((doc) => {
          requestsData.push({
            id: doc.id,
            accountNumber: doc.data().accountNumber,
            price: doc.data().price,
            bankName: doc.data().bankName,
          });
        });
        setWithdrawalRequests(requestsData);
      }
    );

    return () => unsubscribe();
  }, []);

  const markAsPaid = async (id: string) => {
    try {
      const paymentConfirmed = window.confirm(
        "Have you made payment to this account?"
      );
      if (paymentConfirmed) {
        // Delete the withdrawal request from Firestore
        await deleteDoc(doc(db, "withdrawRequests", id));
        console.log("Withdrawal request deleted:", id);
      }
    } catch (error) {
      console.error("Error marking withdrawal request as paid:", error);
      // Handle error (e.g., display error message to the user)
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md h-screen">
      <h2 className="text-2xl font-bold mb-4">Withdrawal Requests</h2>
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Account Number
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Bank Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {withdrawalRequests.map((request) => (
              <tr
                key={request.id}
                className="transition-colors duration-300 hover:bg-gray-100"
              >
                <td className="px-6 py-8 whitespace-nowrap">
                  {request.accountNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.bankName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${request.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-green-600 hover:text-green-900 mr-2"
                    onClick={() => markAsPaid(request.id)}
                  >
                    Paid
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawalRequestList;
