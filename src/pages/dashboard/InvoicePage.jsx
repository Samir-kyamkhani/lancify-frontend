import { useEffect, useState, useCallback } from "react";
import WalletSection from "../../components/dashboard/WalletSection";
import HeaderSection from "../../components/dashboard/HeaderSection";
import { StatsCard } from "../../components/dashboard/StatsCard";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInvoices, deleteInvoice } from "../../slices/paymentSlice";
import AddInvoiceModal from "../../components/dashboard/Form/AddInvoiceModal";
import EmptyState from "./EmptyState";

const statusConfig = {
  Paid: {
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: "✅",
  },
  Pending: {
    color: "bg-amber-100 text-amber-700 border-amber-200",
    icon: "⏳",
  },
  Overdue: { color: "bg-red-100 text-red-700 border-red-200", icon: "⚠️" },
  Draft: { color: "bg-slate-100 text-slate-700 border-slate-200", icon: "📝" },
};

export default function InvoicesPage() {
  const dispatch = useDispatch();
  const { invoices } = useSelector((state) => state.paymentData);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [menuIndex, setMenuIndex] = useState(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [editInvoiceData, setEditInvoiceData] = useState(null);
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  useEffect(() => {
    dispatch(fetchAllInvoices());
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const normalizedSearch = searchTerm?.toLowerCase() || "";
      const filtered = invoices.filter((inv) => {
        const matchesSearch =
          inv.client?.toLowerCase().includes(normalizedSearch) ||
          inv.invid?.toLowerCase().includes(normalizedSearch);
        const matchesStatus =
          filterStatus === "All" || inv.status === filterStatus;
        return matchesSearch && matchesStatus;
      });
      setFilteredInvoices(filtered);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm, filterStatus, invoices]);

  const handleSelectAll = (checked) =>
    setSelectedInvoices(checked ? filteredInvoices.map((inv) => inv.id) : []);

  const handleSelectInvoice = (id, checked) =>
    setSelectedInvoices((prev) =>
      checked ? [...prev, id] : prev.filter((invId) => invId !== id)
    );

  const confirmDeleteInvoice = () => {
    if (selectedInvoiceId) {
      dispatch(deleteInvoice(selectedInvoiceId));
    }
    setShowDeleteConfirm(false);
    setSelectedInvoiceId(null);
  };

  const handleEditInvoice = useCallback((invoice) => {
    setEditInvoiceData(invoice);
    setShowInvoiceModal(true);
    setMenuIndex(null);
  }, []);

  const ActionMenu = ({ invoice, index }) => (
    <div className="inline-block relative">
      <button
        onClick={() => setMenuIndex(menuIndex === index ? null : index)}
        className="p-2 hover:bg-slate-100 rounded-lg"
      >
        <span className="text-slate-400 hover:text-slate-600 cursor-pointer">
          •••
        </span>
      </button>
      {menuIndex === index && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 z-20">
          <div className="py-2 space-y-1">
            <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2">
              👁️ View Details
            </button>
            <button
              onClick={() => handleEditInvoice(invoice)}
              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2"
            >
              ✏️ Edit Invoice
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2">
              📧 Send Invoice
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2">
              📄 Download PDF
            </button>
            {invoice.status !== "Paid" && (
              <button className="w-full text-left px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 flex items-center gap-2">
                ✅ Mark as Paid
              </button>
            )}
            <button
              onClick={() => {
                setSelectedInvoiceId(invoice.id);
                setShowDeleteConfirm(true);
                setMenuIndex(null);
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-8 mb-8">
        <HeaderSection
          title="Payment Management"
          subtitle="Manage and track all your Payments"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mt-6 mb-10">
          {[
            {
              title: "Total Invoices",
              value: invoices.length,
              icon: () => <span className="text-indigo-600">📊</span>,
              color: "text-slate-800",
              bgColor: "bg-indigo-100",
            },
            {
              title: "Paid",
              value: invoices.filter((inv) => inv.status === "Paid").length,
              icon: () => <span className="text-emerald-600">✅</span>,
              color: "text-emerald-600",
              bgColor: "bg-emerald-100",
            },
            {
              title: "Pending",
              value: invoices.filter((inv) => inv.status === "Pending").length,
              icon: () => <span className="text-amber-600">⏳</span>,
              color: "text-amber-600",
              bgColor: "bg-amber-100",
            },
            {
              title: "Total Revenue",
              value: `$${invoices
                .reduce(
                  (sum, inv) =>
                    inv.status === "Paid"
                      ? sum + parseFloat(inv.total.replace(",", ""))
                      : sum,
                  0
                )
                .toLocaleString()}`,
              icon: () => <span className="text-green-600">💰</span>,
              color: "text-green-600",
              bgColor: "bg-green-100",
            },
          ].map((stat, i) => (
            <StatsCard key={i} {...stat} />
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow border border-white/20 mb-10">
          {filteredInvoices.length === 0 ? (
            <EmptyState
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setShowClientModal={setShowInvoiceModal}
              noClientsTitle="No invoices yet"
              noClientsMessage="Get started by adding your first invoice to begin tracking your payments."
              noMatchTitle="No invoices found"
              noMatchMessage="No invoices match your search criteria. Try adjusting your search."
              addClientButtonText="Add Your First Invoice"
              clearSearchText="Clear search"
            />
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr className="text-left text-slate-700 font-semibold">
                  <th className="p-4">
                    <input
                      type="checkbox"
                      checked={
                        selectedInvoices.length === filteredInvoices.length &&
                        filteredInvoices.length > 0
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th className="p-4">Invoice ID</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Issue Date</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInvoices.map((invoice, i) => (
                  <tr key={invoice.id} className="hover:bg-slate-50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedInvoices.includes(invoice.id)}
                        onChange={(e) =>
                          handleSelectInvoice(invoice.id, e.target.checked)
                        }
                      />
                    </td>
                    <td className="p-4 font-semibold">{invoice.invid}</td>
                    <td className="p-4">{invoice.client}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs border font-medium ${
                          statusConfig[invoice.status]?.color
                        }`}
                      >
                        {statusConfig[invoice.status]?.icon} {invoice.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {new Date(invoice.issueDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-bold">${invoice.total}</td>
                    <td className="p-4 text-right">
                      <ActionMenu invoice={invoice} index={i} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>

      <WalletSection />

      {selectedInvoices.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white shadow rounded-xl px-4 py-3 flex flex-wrap gap-4 text-sm z-50">
          <span>{selectedInvoices.length} selected</span>
          {/* Add more bulk actions if needed */}
        </div>
      )}

      {showDeleteConfirm && (
        <DeleteConfirmModal
          show={showDeleteConfirm}
          setShow={setShowDeleteConfirm}
          onConfirm={confirmDeleteInvoice}
        />
      )}

      {showInvoiceModal && (
        <AddInvoiceModal
          isEdit={true}
          invoiceData={editInvoiceData}
          onClose={() => {
            setShowInvoiceModal(false);
            setEditInvoiceData(null);
          }}
        />
      )}
    </>
  );
}
