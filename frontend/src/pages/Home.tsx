import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import Button from '../components/core/HomePage/Button';
import Banner from '../assets/banner.mp4';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguage';
// import Footer from '../components/common/footer1';

const Home: React.FC = () => {
  return (
    <div className="max-w-full h-full">
      
      {/* section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between">
        <Link to="/signup">
          <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900">
              <p>Become a Contributor</p>
              <FaArrowRightLong />
            </div>
          </div>
        </Link>

        <div className="mt-7 text-4xl text-center font-semibold">
          Securely Store and Retrieve Files with
          <HighlightText text=" Blockchain Technology" color="#00FFFF" />
        </div>

        <p className="text-center text-richblack-300 mt-4 w-[90%] text-lg font-bold">
          Our platform leverages blockchain for a secure, decentralized file management solution. Protect your data with client-side encryption, store it on IPFS, and ensure tamper-proof access via blockchain.
        </p>

        <div className="flex flex-row gap-7 mt-8">
          <Button active={true} linkTo="/signup">
            Get Started
          </Button>

          <Button active={false} linkTo="/login">
            Learn More
          </Button>
        </div>

        <div className="shadow-blue-200 w-[90%] max-h-[60%] mx-3 my-12">
          <video className="w-full h-full" muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className='homepage_bg h-[310px]'>
          <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
            <div className='h-[150px]'></div>
            <div className="flex flex-row gap-7 text-white">
              <Button active={true} linkTo="/signup">
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRightLong />
                </div>
              </Button>

              <Button active={false} linkTo="/signup">
                <div>Learn More</div>
              </Button>
            </div>
          </div>
        </div>

        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
          <div className='flex flex-row gap-5 mt-20'>
            <div className="text-2xl font-semibold w-[45%]">
              <p>How Our Blockchain File Management Works</p>
              <HighlightText text=" For Secure Data Storage" color="#0F7A9D" />
            </div>

            <div className="flex flex-col gap-10 w-[40%] items-start">
              <p className="text-[1rem]">
                Ensure confidentiality with client-side encryption, decentralized storage, and secure access via blockchain. Perfect for users who value data security and transparency.
              </p>
              <Button active={true} linkTo="/signup">
                Learn More
              </Button>
            </div>
          </div>

          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* section 3 */}
      <div className="w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <h2 className="text-center text-2xl font-semibold mt-10">Feedback from Our Users</h2>
        {/* Review slider here */}
      </div>

    </div>
  );
};

export default Home;
