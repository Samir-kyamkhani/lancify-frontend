import { FaBolt, FaChartBar } from "react-icons/fa";
import { Title } from "./Title";

const LivePerfomanceSection = () => {
  return (
    <section className="py-20 text-center font-jakarta" id="features">
      <div>
        <div className="mb-14">
          <Title
            topTitle={"Live Perfomance"}
            middleTitle={"Business Perfomance Dashboard"}
            endTitle={"Tracking Monthly Growth to Drive Smarter Decisions"}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 wf">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 py-8 shadow-xl">
            <img
              src="./revenue.jpeg"
              alt="clientChart"
              className="object-cover"
            />
            <div className="mt-6 flex items-start flex-col gap-3 text-left">
              <div className="flex space-x-2 items-center">
                <FaBolt className="text-purple-600 mt-1" />
                <h4 className="font-semibold text-lg">Real-Time Insights</h4>
              </div>
              <p className="text-sm text-gray-800">
                Monitor your campaigns in real time to ensure maximum
                effectiveness and identify areas for improvement.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 py-8 shadow-xl">
            <img
              src="./clientChart.jpeg"
              alt="revenue"
              className="object-contain"
            />
            <div className="mt-6 flex items-start flex-col gap-3 text-left">
              <div className="flex space-x-2 items-center">
                <FaChartBar className="text-purple-600 mt-1" />
                <h4 className="font-semibold text-lg">Actionable Data</h4>
              </div>
              <p className="text-sm text-gray-800">
                Leverage analytics to enhance workflows, boost engagement, and
                make informed marketing decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LivePerfomanceSection;
