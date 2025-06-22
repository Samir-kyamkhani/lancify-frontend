import { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentUser } from "../../settings";
import { baseURL } from "../../baseURL";

const WalletSection = () => {
  const [balance, setBalance] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState("");
  const [withdrawDetails, setWithdrawDetails] = useState("");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // For handling submit button state

  const { id } = getCurrentUser();

  const methods = [
    { value: "bank", name: "Bank Transfer", icon: "🏦" },
    { value: "upi", name: "UPI Payment", icon: "📱" },
    { value: "paypal", name: "PayPal", icon: "💳" },
    { value: "stripe", name: "Stripe", icon: "⚡" },
    { value: "razorpay", name: "Razorpay", icon: "💳" },
    { value: "other", name: "Other Method", icon: "⚙️" },
  ];

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(`${baseURL}/payment/wallet/${id}`);
        let balanceInRupees = response.data.data.balance;
        let balanceInRupeesFormatted = (balanceInRupees / 100).toFixed(2);
        setBalance(balanceInRupeesFormatted);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setError("Failed to fetch balance");
      } finally {
        setLoading(false);
      }
    };

    const fetchTransactionHistory = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/payment/transaction-history/${id}`
        );
        setTransactionHistory(response.data.data.transactions);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
        setError("Failed to fetch transaction history");
      }
    };

    fetchBalance();
    fetchTransactionHistory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!withdrawAmount || !withdrawMethod) {
      setError("Please fill in all required fields.");
      return;
    }

    if (parseFloat(withdrawAmount) > parseFloat(balance)) {
      setError("Withdrawal amount exceeds wallet balance.");
      return;
    }

    setIsSubmitting(true); // Disable submit button while submitting
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      setWithdrawAmount(value);
    } else if (name === "details") {
      setWithdrawDetails(value);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 rounded-xl shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="flex items-baseline gap-2 flex-wrap">
              <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-teal-500 to-green-500 bg-clip-text text-transparent">
                ₹{balance ? balance.toLocaleString() : "0"}
              </p>
              <span className="text-lg text-slate-500 font-medium">
                .{(balance % 1).toFixed(2).slice(2)}
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowWithdrawModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-teal-400 to-green-400 text-white font-semibold rounded-xl shadow-md transition-all duration-300 hover:scale-105"
        >
          Withdraw Funds
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-white p-4 rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Transaction History
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Method</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory?.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    ₹{(transaction.amount / 100).toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    {transaction.invoice?.id || "Not Available"}
                  </td>
                  <td className="py-4 px-6">{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="relative w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-800">
                  Withdraw Funds
                </h3>
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center"
                  aria-label="Close modal"
                >
                  <span className="text-slate-600">✕</span>
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 text-red-500 text-sm">{error}</div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Withdrawal Method Dropdown */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    💳 Withdrawal Method
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl text-left flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        {methods.find((m) => m.value === withdrawMethod)
                          ?.icon || "🔽"}
                        {methods.find((m) => m.value === withdrawMethod)
                          ?.name || "Select withdrawal method"}
                      </span>
                      <span
                        className={`transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute z-20 w-full mt-2 bg-white/95 border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                        {methods.map((method) => (
                          <button
                            key={method.value}
                            type="button"
                            onClick={() => {
                              setWithdrawMethod(method.value);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-indigo-50 flex items-center gap-3"
                          >
                            <span>{method.icon}</span>
                            <span className="font-medium text-slate-800">
                              {method.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Amount Input Field */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    💰 Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Enter withdrawal amount"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/70 text-slate-800"
                    value={withdrawAmount}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Additional Fields for Bank and Other Methods */}
                {withdrawMethod === "bank" && (
                  <div className="space-y-4 p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm font-semibold text-slate-600">
                      🏦 Bank Details
                    </p>
                    <input
                      type="text"
                      placeholder="Account Holder Name"
                      className="w-full px-4 py-3 rounded-xl border"
                    />
                    <input
                      type="text"
                      placeholder="Bank Name"
                      className="w-full px-4 py-3 rounded-xl border"
                    />
                    <input
                      type="text"
                      placeholder="Account Number"
                      className="w-full px-4 py-3 rounded-xl border"
                    />
                    <input
                      type="text"
                      placeholder="IFSC Code"
                      className="w-full px-4 py-3 rounded-xl border"
                    />
                  </div>
                )}

                {withdrawMethod === "razorpay" && (
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm font-semibold text-slate-600">
                      🤑 Razorpay Withdrawal
                    </p>
                    <p className="text-sm text-gray-600">
                      You will be redirected to Razorpay to complete the
                      payment.
                    </p>
                  </div>
                )}

                {withdrawMethod === "other" && (
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <textarea
                      name="details"
                      placeholder="Provide custom withdrawal details"
                      className="w-full px-4 py-3 rounded-xl border"
                      rows="4"
                      value={withdrawDetails}
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowWithdrawModal(false)}
                    className="flex-1 px-6 py-3 text-slate-600 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting} // Disable submit button while submitting
                    className={`flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg transform ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:scale-105"
                    } transition-all duration-300`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletSection;
