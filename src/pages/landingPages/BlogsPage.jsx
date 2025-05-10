import { useState } from "react";
import { motion } from "framer-motion";
import { posts, tabs } from "../../index";


export default function BlogsPage() {
  const [selectedTab, setSelectedTab] = useState("changelog");

  const filteredPosts =
    selectedTab === "all"
      ? posts
      : posts.filter((post) => post.type === selectedTab);

  return (
    <div className="flex flex-col items-center py-16 px-4 sm:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <button className="mb-3 text-sm text-blue-500 hover:underline transition">
          Our Sayings
        </button>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3">
          Fresh Takes & Updates
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
          Stay informed with the latest feature rollouts and insightful AI advancements.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full max-w-2xl mb-15"
      >
        <div className="flex bg-white rounded-xl shadow-lg border border-gray-100 p-1 justify-evenly">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedTab(tab.value)}
              className={`py-3 px-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 rounded-lg  ${
                selectedTab === tab.value
                  ? "bg-blue-100 text-blue-600 shadow-inner w-fit"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Posts Loop */}
      <div className="w-full max-w-4xl grid gap-8 sm:grid-cols-2">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden transition transform hover:-translate-y-1 hover:shadow-2xl duration-300"
          >
            <img
              src={post.coverImg}
              alt="Post cover"
              className="w-full h-48 object-cover"
            />
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={post.authorImg}
                  alt="Author"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800 capitalize">{post.type}</p>
                  <p className="text-xs text-gray-500">{post.date}</p>
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{post.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
