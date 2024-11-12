import React from 'react';
import Logo1 from "../../../assets/Logo1.svg";  // Blockchain-related logos/icons
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

// Array of timeline data with blockchain themes
const timeline: TimelineItem[] = [
  {
    Logo: Logo1,
    heading: "Decentralization",
    Description: "Empowering users by decentralizing file storage and management."
  },
  {
    Logo: Logo2,
    heading: "Blockchain Security",
    Description: "Ensuring data integrity and preventing tampering with encrypted files."
  },
  {
    Logo: Logo3,
    heading: "Smart Contracts",
    Description: "Automating file management processes using secure, trustless smart contracts."
  },
  {
    Logo: Logo4,
    heading: "Immutable Storage",
    Description: "Storing files in a way that ensures immutability and transparency."
  },
];

const TimelineSection: React.FC = () => {
  return (
    <div>
      <div className="flex flex-row gap-15 items-center">
        {/* Left part: Timeline items */}
        <div className="w-[45%] flex flex-col gap-5">
          {timeline.map((element, index) => (
            <div className="flex flex-row gap-6" key={index} items-baseline>
              <div className="w-[50px] h-[50px]  flex items-center bg-richblack-900">
                <img src={element.Logo} alt={element.heading} />
              </div>

              <div className="flex flex-col">
                <h2 className="font-semibold text-[1.2rem]">{element.heading}</h2>
                <p>{element.Description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right part: Timeline image */}
        <div className="relative shadow-lg">
          <img
            src={TimelineImage}
            alt="Blockchain Web Storage"
            className="rounded-md object-cover h-fit"
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
