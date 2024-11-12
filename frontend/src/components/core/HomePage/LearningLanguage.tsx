import React from 'react';
import HighlightText from './HighlightText';
import compare_with_others from "../../../assets/ban.webp";
import Button from './Button';

const LearningLanguageSection: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col gap-5 mt-20 w-fit items-center">
        <div className="text-4xl font-semibold text-center">
          Discover the Power of
          <HighlightText text={" Aptos Blockchain with Move "} color="#00B2A9" />
        </div>

        <div className="text-center text-richblack-600 mx-auto text-base font-medium w-[70%]">
          Leverage the security and efficiency of the Aptos blockchain with Move language, enabling fast and reliable smart contracts, transparent progress tracking, and decentralized data ownership.
        </div>

        {/* Image Section */}
        <div className="flex flex-row items-start justify-center mt-10  max-w-[100vw] min-w-[79%] gap-5 px-5 rounded-full">
  

  <img
    src={compare_with_others}
    alt="compareWithOthers"
    className="object-contain h-[300px] "
  />

  
</div>


        <div className="text-center text-richblack-600 mx-auto text-base font-medium w-[70%] mt-5">
          By integrating Move on Aptos, we ensure secure interactions and transparent record-keeping. Every achievement is stored immutably, empowering users to track and prove their progress without intermediaries.
        </div>

        <div className="mt-10">
          <Button active={true} linkTo="/about">
            <div>Learn More</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
