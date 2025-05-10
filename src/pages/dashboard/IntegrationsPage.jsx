import { useState } from "react";
import { FiCreditCard, FiEdit, FiMail } from "react-icons/fi";
import { IoShareSocial } from "react-icons/io5";

export default function IntegrationsPage() {
  const [connected, setConnected] = useState([]);

  const integrations = [
    // {
    //   title: "Payment Gateways",
    //   icon: <FiCreditCard className="text-2xl text-indigo-500" />,
    //   items: [
    //     { name: "Stripe", desc: "Connect Stripe for card payments." },
    //     { name: "PayPal", desc: "Connect PayPal for global payments." },
    //     { name: "Razorpay", desc: "Connect Razorpay for payments in India." },
    //   ],
    // },
    // {
    //   title: "Document Signing",
    //   icon: <FiEdit className="text-2xl text-green-500" />,
    //   items: [{ name: "PandaDoc", desc: "Connect PandaDoc for e-signatures." }],
    // },
    {
      title: "CRM / Email",
      icon: <FiMail className="text-2xl text-blue-500" />,
      items: [
        { name: "Zoho CRM", desc: "Sync clients with Zoho CRM." },
        { name: "Gmail", desc: "Connect Gmail to sync emails." },
      ],
    },
    // {
    //   title: "Social Media",
    //   icon: <IoShareSocial  className="text-2xl text-pink-500" />,
    //   items: [
    //     { name: "Twitter / X", desc: "Connect to schedule posts." },
    //     { name: "LinkedIn", desc: "Connect to schedule posts." },
    //     { name: "Facebook", desc: "Connect pages to post updates." },
    //     { name: "Instagram", desc: "Connect Instagram Business accounts." },
    //   ],
    // },
  ];

  const toggleConnection = (name) => {
    setConnected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <div className="">
      <div className="mb-6">
        <p className="text-gray-600 mt-1">
          Connect third-party services like payment gateways, CRM, social media,
          and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {integrations.map((group) => (
          <div
            key={group.title}
            className="bg-white border border-gray-100 rounded-lg shadow-sm p-6 hover:shadow-lg transition flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              {group.icon}
              <h2 className="text-xl font-semibold">{group.title}</h2>
            </div>

            <div className="space-y-4 mt-2">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => toggleConnection(item.name)}
                    className={`mt-2 sm:mt-0 px-4 py-1.5 text-sm rounded font-medium transition ${
                      connected.includes(item.name)
                        ? "bg-gray-200 text-gray-800"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {connected.includes(item.name) ? "Connected" : "Connect"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
