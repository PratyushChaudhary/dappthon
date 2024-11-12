import React from 'react';
import HighlightText from './HighlightText';
import know_your_progress from "../../../assets/download.jpg";
import compare_with_others from "../../../assets/i3.jpg";
import plan_your_lessons from "../../../assets/images.jpg";
import Button from './Button';

const LearningLanguageSection: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col gap-5 mt-20 w-fit items-center">
        <div className="text-4xl font-semibold text-center">
          Your Swiss-Knife for
          <HighlightText text={" learning any language "} color="#00B2A9" />
        </div>

        <div className="text-center text-richblack-600 mx-auto text-base font-medium w-[70%]">
          Using spin making learning multiple languages easy, with 20+ languages realistic voice-over,
          progress-tracking, custom-scheduling, and more ...
        </div>

        {/* Image Section */}
        <div className="flex flex-row items-center justify-between mt-10 w-full max-w-[1200px] px-5">
          <img
            src={know_your_progress}
            alt="KnowYourProgress"
            className="object-contain h-[50%] w-[300px] md:w-[350px] lg:w-[400px]"
          />

          <img
            src={compare_with_others}
            alt="compareWithOthers"
            className="object-contain h-[50%] w-[300px] md:w-[350px] lg:w-[400px]"
          />

          <img
            src={plan_your_lessons}
            alt="planYourLessons"
            className="object-contain h-[50%] w-[300px] md:w-[350px] lg:w-[400px]"
          />
        </div>

        <div className="mt-10">
          <Button active={true} linkTo="/signup">
            <div>Learn More</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
