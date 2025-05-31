import { useState } from "react";

const balance = 2847.50;
const transactions = [
  { id: 1, type: "Earnings", date: "2024-05-29", amount: "125.00" },
  { id: 2, type: "Withdrawal", date: "2024-05-28", amount: "500.00" },
  { id: 3, type: "Earnings", date: "2024-05-27", amount: "89.50" },
  { id: 4, type: "Earnings", date: "2024-05-26", amount: "234.75" },
];

const methods = [
  { value: "bank", name: "Bank Transfer", icon: "🏦" },
  { value: "upi", name: "UPI Payment", icon: "📱" },
  { value: "paypal", name: "PayPal", icon: "💳" },
  { value: "stripe", name: "Stripe", icon: "⚡" },
  { value: "other", name: "Other Method", icon: "⚙️" },
];

const WalletSection = () => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawMethod, setWithdrawMethod] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const Field = ({ label, placeholder, icon, type = "text" }) => (
    <div className="group">
      <label className="block text-sm font-semibold text-slate-700 mb-2 transition-colors group-focus-within:text-indigo-600">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </label>
      <input
        type={type}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm text-slate-800 placeholder-slate-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white hover:bg-white/90"
        placeholder={placeholder}
        required
      />
    </div>
  );

  return (
    <>
      {/* Wallet Card */}
      <div className="relative max-w-4xl sm:px-6 lg:px-8">
        {/* Background blur */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-20"></div>

        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl mb-8 p-6 sm:p-8 hover:shadow-2xl transition-all duration-500">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-0">
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-white text-xl">💰</span>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent truncate">
                  Your Balance
                </h2>
              </div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  ${balance.toLocaleString()}
                </p>
                <span className="text-lg text-slate-500 font-medium">
                  .{(balance % 1).toFixed(2).slice(2)}
                </span>
              </div>
              <p className="text-slate-500 font-medium">Available for withdrawal</p>
            </div>

            <button
              onClick={() => setShowWithdrawModal(true)}
              className="mt-4 lg:mt-0 group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                <span>💸</span> Request Withdrawal
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Transactions */}
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <span className="text-slate-600">📊</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Recent Transactions</h3>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {transactions.map((tx, index) => (
                <div
                  key={tx.id}
                  className="group flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-100 hover:bg-white/80 hover:shadow-md transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        tx.type === "Withdrawal" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      {tx.type === "Withdrawal" ? "📤" : "📥"}
                    </div>
                    <div className="truncate">
                      <p className="font-semibold text-slate-800 truncate">{tx.type}</p>
                      <p className="text-sm text-slate-500 truncate">
                        {new Date(tx.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-right font-bold text-lg flex-shrink-0 ${
                      tx.type === "Withdrawal" ? "text-red-500" : "text-emerald-600"
                    }`}
                  >
                    {tx.type === "Withdrawal" ? "-" : "+"}${tx.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="relative w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-30"></div>

            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white">💸</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 truncate">Withdraw Funds</h3>
                </div>
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <span className="text-slate-600">✕</span>
                </button>
              </div>

              <div className="space-y-6">
                {/* Dropdown */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    💳 Withdrawal Method
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl text-left flex items-center justify-between transition-all duration-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    >
                      <span className="flex items-center gap-2 truncate">
                        {methods.find((m) => m.value === withdrawMethod)?.icon || "🔽"}
                        {methods.find((m) => m.value === withdrawMethod)?.name || "Select withdrawal method"}
                      </span>
                      <span className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}>
                        ▼
                      </span>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute z-20 w-full mt-2 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                        {methods.map((method) => (
                          <button
                            key={method.value}
                            type="button"
                            onClick={() => {
                              setWithdrawMethod(method.value);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-indigo-50 flex items-center gap-3 transition-colors duration-200 border-b border-slate-100 last:border-b-0 truncate"
                          >
                            <span className="text-lg">{method.icon}</span>
                            <span className="font-medium text-slate-800 truncate">{method.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Field label="Amount" placeholder="Enter withdrawal amount" icon="💰" type="number" />

                {/* Conditional Fields */}
                {withdrawMethod === "bank" && (
                  <div className="space-y-4 p-4 bg-slate-50/80 rounded-xl">
                    <p className="text-sm font-semibold text-slate-600 mb-3 truncate">🏦 Bank Details</p>
                    <Field label="Account Holder Name" placeholder="e.g. Rahul Sharma" icon="👤" />
                    <Field label="Bank Name" placeholder="e.g. HDFC Bank" icon="🏦" />
                    <Field label="Account Number" placeholder="e.g. 1234567890" icon="🔢" />
                    <Field label="IFSC Code" placeholder="e.g. HDFC0001234" icon="🔤" />
                  </div>
                )}

                {withdrawMethod === "upi" && (
                  <div className="p-4 bg-slate-50/80 rounded-xl">
                    <Field label="UPI ID" placeholder="e.g. yourname@upi" icon="📱" />
                  </div>
                )}

                {withdrawMethod === "paypal" && (
                  <div className="p-4 bg-slate-50/80 rounded-xl">
                    <Field label="PayPal Email" placeholder="e.g. you@example.com" icon="💳" />
                  </div>
                )}

                {withdrawMethod === "stripe" && (
                  <div className="p-4 bg-slate-50/80 rounded-xl">
                    <Field label="Stripe Account ID" placeholder="e.g. acct_1K..." icon="⚡" />
                  </div>
                )}

                {withdrawMethod === "other" && (
                  <div className="p-4 bg-slate-50/80 rounded-xl">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      ⚙️ Custom Details
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm text-slate-800 placeholder-slate-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white resize-none"
                      placeholder="Provide details for your preferred withdrawal method"
                      rows={4}
                      required
                    />
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowWithdrawModal(false)}
                    className="flex-1 px-6 py-3 text-slate-600 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={() => {
                      alert("Withdrawal request submitted successfully! 🎉");
                      setShowWithdrawModal(false);
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletSection;
