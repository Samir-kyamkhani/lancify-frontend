import { useState } from "react";
import HeaderSection from "../../components/dashboard/HeaderSection";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SocialMediaManagementPage() {
  const [activeTab, setActiveTab] = useState("scheduled");

  const scheduledPosts = [
    {
      platform: "Instagram",
      handle: "freelanceflow_official",
      content:
        "Behind the scenes look at our new dashboard! ✨ #uidesign #devlife #saas",
      date: "May 8, 2025 at 3:47 PM",
      media: {
        image:
          "data:image/jpeg;base64,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",
        video: "",
      },
    },
    {
      platform: "Twitter",
      handle: "@lancify",
      content:
        "Did you know you can manage invoices directly within Freelance Flow? #invoicing #freelancetools",
      date: "May 7, 2025 at 3:47 PM",
      media: {
        image: "",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    },
    {
      platform: "Twitter",
      handle: "@lancify",
      content:
        "Exciting new features coming soon to Freelance Flow! Stay tuned. #freelance #productivity",
      date: "May 5, 2025 at 5:47 PM",
      media: {
        image:
          "data:image/jpeg;base64,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",
        video: "",
      },
    },
  ];

 

  return (
    <div className="space-y-6">
      <HeaderSection />

      <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex border-b border-gray-200 space-x-4 mb-4 pb-2">
          <button
            onClick={() => setActiveTab("scheduled")}
            className={`pb-2 font-medium cursor-pointer ${
              activeTab === "scheduled"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Scheduled Posts
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`pb-2 font-medium cursor-pointer ${
              activeTab === "calendar"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Calendar View
          </button>
        </div>

        {/* Scheduled Posts (Bento Layout) */}
        {activeTab === "scheduled" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {scheduledPosts.map((post, i) => (
              <div
                key={i}
                className={`border border-gray-200  rounded-xl p-4 bg-gray-50 space-y-3 ${
                  i % 3 === 0 ? "row-span-2" : "row-span-1"
                }`}
              >
                <div className="text-sm font-semibold">{post.handle}</div>
                <p>{post.content}</p>

                {post.media.image && (
                  <img
                    src={post.media.image}
                    alt="Post preview"
                    className="rounded-lg w-full max-h-48 object-cover"
                  />
                )}

                {post.media.video && (
                  <video controls className="w-full rounded-lg max-h-48">
                    <source src={post.media.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}

                <div className="text-xs text-gray-500">
                  Scheduled for: {post.date}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Calendar View */}
        {activeTab === "calendar" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-gray-200 border-r p-6">
              <div className="text-lg font-semibold mb-2">May 2025</div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <div key={d} className="font-semibold">
                    {d}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 2;
                  return (
                    <div
                      key={i}
                      className={`p-2 rounded-full ${
                        day === 5 ? "bg-blue-200 font-bold" : "text-gray-700"
                      }`}
                    >
                      {day > 0 && day <= 31 ? day : ""}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full">
              <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3 border border-gray-100">
                <div className="text-sm font-semibold text-gray-800">
                  @lancify
                </div>
                <p className="text-sm text-gray-700">
                  Exciting new features coming soon to Freelance Flow! Stay
                  tuned.{" "}
                  <span className="text-blue-600">
                    #freelance #productivity
                  </span>
                </p>
                <img
                  src="https://i.pravatar.cc/40"
                  alt="Scheduled Post"
                  className="w-full rounded-lg max-h-48 object-cover"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
