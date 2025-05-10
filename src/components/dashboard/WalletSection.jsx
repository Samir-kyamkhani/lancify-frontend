import { useState } from "react";
import {
  FaWallet,
  FaPaypal,
  FaStripe,
  FaRupeeSign,
} from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";
import { FiSettings } from "react-icons/fi";
import { Listbox } from "@headlessui/react";
import { balance, methods, transactions } from "../..";



const WalletSection = () => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawMethod, setWithdrawMethod] = useState("");

 

  const Field = ({ label, placeholder, Icon, type = "text" }) => (
    <div>
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        {Icon && <Icon className="text-gray-500" />} {label}
      </label>
      <input
        type={type}
        className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm"
        placeholder={placeholder}
        required
      />
    </div>
  );

  return (
    <>
      {/* Wallet Box */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FaWallet className="text-blue-600" /> Wallet Balance
            </h2>
            <p className="text-2xl font-bold text-green-600 mt-1">
              ${balance.toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => setShowWithdrawModal(true)}
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-medium px-4 py-2 rounded-md"
          >
            Request Withdrawal
          </button>
        </div>

        {/* Transactions */}
        <div className="mt-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Transaction History
          </h3>
          <div className="overflow-x-auto rounded-md">
            <table className="w-full text-sm text-left border border-gray-100">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-800">{tx.type}</td>
                    <td className="px-4 py-3 text-gray-600">{tx.date}</td>
                    <td
                      className={`px-4 py-3 text-right font-medium ${
                        tx.type === "Withdrawal"
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {tx.type === "Withdrawal" ? "-" : "+"}${tx.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full mx-4 sm:w-[460px] max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Request Withdrawal
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Withdrawal Requested!");
                setShowWithdrawModal(false);
              }}
              className="space-y-4"
            >
              {/* Custom Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Withdrawal Method
                </label>
                <Listbox value={withdrawMethod} onChange={setWithdrawMethod}>
                  <div className="relative">
                    <Listbox.Button className="w-full border border-gray-300 rounded-md p-2 text-sm flex items-center justify-between">
                      {methods.find((m) => m.value === withdrawMethod)?.name ||
                        "Select Method"}
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-md">
                      {methods.map((method) => (
                        <Listbox.Option
                          key={method.value}
                          value={method.value}
                          className="p-2 hover:bg-gray-100 flex items-center gap-2 text-sm cursor-pointer"
                        >
                          <method.icon className="text-blue-600" />
                          {method.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>

              <Field
                label="Amount"
                placeholder="Enter amount"
                Icon={FaRupeeSign}
                type="number"
              />

              {/* Conditional Fields */}
              {withdrawMethod === "bank" && (
                <>
                  <Field label="Account Holder Name" placeholder="e.g. Rahul Sharma" />
                  <Field label="Bank Name" placeholder="e.g. HDFC Bank" />
                  <Field label="Account Number" placeholder="e.g. 1234567890" />
                  <Field label="IFSC Code" placeholder="e.g. HDFC0001234" />
                </>
              )}

              {withdrawMethod === "upi" && (
                <Field label="UPI ID" placeholder="e.g. yourname@upi" Icon={SiPhonepe} />
              )}

              {withdrawMethod === "paypal" && (
                <Field label="PayPal Email" placeholder="e.g. you@example.com" Icon={FaPaypal} />
              )}

              {withdrawMethod === "stripe" && (
                <Field
                  label="Stripe Account ID / Email"
                  placeholder="e.g. acct_1K..."
                  Icon={FaStripe}
                />
              )}

              {withdrawMethod === "other" && (
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FiSettings /> Enter Details
                  </label>
                  <textarea
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm"
                    placeholder="Provide details for your preferred withdrawal method"
                    rows={3}
                    required
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="text-gray-600 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 transition"
                >
                  Withdraw
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletSection;
