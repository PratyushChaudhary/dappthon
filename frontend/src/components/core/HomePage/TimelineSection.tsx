import React from 'react';
import Logo1 from "../../../assets/Logo1.svg";
import Logo2 from "../../../assets/Logo2.svg";
import Logo3 from "../../../assets/Logo3.svg";
import Logo4 from "../../../assets/Logo4.svg";
import TimelineImage from "../../../assets/TimelineImage.png";

// Define the type for each timeline element
interface TimelineItem {
  Logo: string;
  heading: string;
  Description: string;
}

// Array of timeline data with defined types
const timeline: TimelineItem[] = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success of the company"
  },
  {
    Logo: Logo2,
    heading: "Leadership",
    Description: "Fully committed to the success of the company"
  },
  {
    Logo: Logo3,
    heading: "Leadership",
    Description: "Fully committed to the success of the company"
  },
  {
    Logo: Logo4,
    heading: "Leadership",
    Description: "Fully committed to the success of the company"
  },
];

const TimelineSection: React.FC = () => {
  return (
    <div>
      <div className="flex flex-row gap-15 items-center">
        {/* Left part */}
        <div className="w-[45%] flex flex-col gap-5">
          {timeline.map((element, index) => (
            <div className="flex flex-row gap-6" key={index} items-baseline>
              <div className="w-[50px] h-[50px] bg-white flex items-center">
                <img src={element.Logo} alt={element.heading} />
              </div>

              <div className="flex flex-col">
                <h2 className="font-semibold text-[1.2rem]">{element.heading}</h2>
                <p>{element.Description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right part */}
        <div className="relative shadow-blue-500">
          <img
            src={TimelineImage}
            alt="timelineImage"
            className="rounded-md object-cover h-fit"
          />

          <div className="absolute bg-caribbeangreen-700 flex flex-row text-white py-10 uppercase translate-x-16 -translate-y-16">
            <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-500 px-7">
              <p className="text-xl font-bold">10</p>
              <p className="text-caribbeangreen-300 text-sm">Years of experience</p>
            </div>

            <div className="flex items-center gap-5 px-7">
              <p className="text-xl font-bold">250</p>
              <p className="text-caribbeangreen-300 text-sm">Type of Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;