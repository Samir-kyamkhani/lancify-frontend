import React, { useState } from "react";
import InputField from "../../Ui/InputField";
import BtnField from "../../Ui/BtnField";
import TextareaField from "../../Ui/TextareaField";

export default function ScheduleMeetingModal({ onSubmit, onClose }) {
  const [form, setForm] = useState({
    client: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs h-screen flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full mx-4 sm:w-[460px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-1">Schedule New Meeting</h2>
        <p className="text-sm text-gray-500 mb-4">
          Enter the details for the upcoming meeting.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Client *"
            type="text"
            name="client"
            onChange={handleChange}
            value={form.client}
            required
            placeholder="Client Name"
          />

          <div className="flex space-x-2 mb-4 flex-col sm:flex-row space-y-6">
            <InputField
              label="Date *"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-1/2"
            />
            <InputField
              label="Time (Optional)"
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
              className="w-1/2"
            />
          </div>

          <TextareaField
            label="Notes / Agenda *"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            required
            placeholder="Enter meeting agenda or notes..."
            rows={3}
          />

          <BtnField onClose={onClose} btnName={"Schedule Meeting"} />
        </form>
      </div>
    </div>
  );
}
