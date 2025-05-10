import { useState } from "react";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    invoiceDueReminderDays: 3,
    invoiceDueReminder: false,
    invoiceOverdue: false,
    proposalAccepted: false,
    taskAssigned: false,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleChangeDays = (e) => {
    setSettings((prev) => ({
      ...prev,
      invoiceDueReminderDays: e.target.value,
    }));
  };

  const handleSave = () => {
    console.log("Saved Settings:", settings);
    alert("Notification settings saved!");
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl mt-8 shadow-md w-full ">
      <h2 className="text-xl font-semibold mb-1">🔔 Notification Settings</h2>
      <p className="text-sm text-gray-500 mb-2">
        Manage automatic email and in-app notifications.
      </p>
      <p className="text-sm text-gray-400 italic mb-6">
        Configure which events trigger automatic notifications to you or your clients.
      </p>

      <div className="space-y-4">
        {/* Invoice Due Reminder */}
        <div className="border border-gray-200 p-4 rounded flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <p className="font-medium">Invoice Due Reminder</p>
            <p className="text-sm text-gray-500">Send email reminder to client X days before due date.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="number"
              min="1"
              className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
              value={settings.invoiceDueReminderDays}
              onChange={handleChangeDays}
            />
            <button
              className={`px-3 py-1 text-sm rounded ${
                settings.invoiceDueReminder
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => toggleSetting("invoiceDueReminder")}
            >
              {settings.invoiceDueReminder ? "Enabled" : "Enable"}
            </button>
          </div>
        </div>

        {/* Reusable Notification Rows */}
        {[
          {
            key: "invoiceOverdue",
            title: "Invoice Overdue Notification",
            desc: "Notify me and client when an invoice is overdue.",
          },
          {
            key: "proposalAccepted",
            title: "Proposal Accepted",
            desc: "Notify me when a client accepts a proposal.",
          },
          {
            key: "taskAssigned",
            title: "Task Assigned",
            desc: "Notify user when a task is assigned to them.",
          },
        ].map((item) => (
          <div
            key={item.key}
            className="border border-gray-200 p-4 rounded flex flex-col sm:flex-row justify-between sm:items-center gap-4"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
            <button
              className={`px-3 py-1 text-sm rounded ${
                settings[item.key]
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => toggleSetting(item.key)}
            >
              {settings[item.key] ? "Enabled" : "Enable"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 text-sm"
          onClick={handleSave}
        >
          Save Notification Settings
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
