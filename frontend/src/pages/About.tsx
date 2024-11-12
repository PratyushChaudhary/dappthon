import React from 'react';
import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/b4.jpg";
import BannerImage2 from "../assets/b2.jpg";
import BannerImage3 from "../assets/b3.jpg";
import Quote from '../components/core/AboutPage/Quote';
import FoundingStory from "../assets/b1.jpg";

const About: React.FC = () => {
  return (
    <div>
      <div className="">
        {/* section1 */}
        <section className="bg-richblack-800">
          <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
            <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
              Driving Innovation in Blockchain Technology for Secure File Upload and Retrieval
              <HighlightText text={" with CipherChain"} color="#B3F4FF" />
              <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
                CipherChain is leading the way in utilizing blockchain for secure, decentralized file storage and retrieval. We're dedicated to making file management more transparent, secure, and accessible to everyone.
              </p>
            </header>
            <div className="sm:h-[70px] lg:h-[150px]"></div>
            <div className="absolute bottom-0 left-[50%] grid w-[90%] translate-x-[-50%] translate-y-[30%] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
  <img
    src={BannerImage1}
    alt="img1"
    className="h-[16rem]  object-cover rounded-lg shadow-lg "
  />
  <img
    src={BannerImage2}
    alt="img2"
    className="h-[16rem]  object-cover rounded-lg shadow-lg "
  />
  <img
    src={BannerImage3}
    alt="img3"
    className=" h-[16rem] object-cover rounded-lg shadow-lg "
  />
</div>


          </div>
        </section>

        {/* Section 2: Quote */}
        <section className="border-b border-richblack-700">
          <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500'>
            <div className="lg:h-100px h-[6.2875rem]"></div>
            <Quote />
          </div>
        </section>

        {/* Section 3: Our Founding Story */}
        <section>
          <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500'>
            <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
              <div className="flex my-24 lg:w-[50%] flex-col gap-10">
                <h1 className="bg-gradient-to-br from-[#833AB4] via-[#fd1d1d] to-[#fcb045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]">
                  Our Founding Story
                </h1>
                <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
                  CipherChain was born out of a vision to bring enhanced security and privacy to online file storage. With the rise in cyber threats and the limitations of traditional file storage, we saw the potential of blockchain to provide a decentralized, transparent, and secure solution for managing digital assets.
                </p>
              </div>
              <div>
                <img src={FoundingStory} alt='foundingStoryPage' className="shadow-[0_0_20px_0] shadow-[#fc6767] h-[16rem]" />
              </div>
            </div>

            {/* Mission and Vision */}
            <div className="flex flex-row items-center lg:gap-10 lg:flex-row justify-between -mt-[7rem]">
              <div className='my-24 flex lg:w-[40%] flex-col gap-10'>
                <h1 className='bg-gradient-to-b from-[#ff512f] to-[#f09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]'>
                  Our Mission
                </h1>
                <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
                  Our mission at CipherChain is to provide a decentralized solution for secure file upload, retrieval, and storage. By leveraging blockchain technology, we ensure that files remain tamper-proof, accessible only to authorized users, and are stored in a way that is transparent and immutable.
                </p>
                <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
                  In the context of India, blockchain technology can empower individuals and businesses by offering secure alternatives to traditional methods. For instance, in cyber cafes, where users often face risks of data theft or loss, CipherChain provides a secure way to upload and retrieve sensitive files.
                </p>
              </div>
              <div className='my-24 flex lg:w-[40%] flex-col gap-10'>
                <h1 className='bg-gradient-to-b from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%]'>
                  Our Vision
                </h1>
                <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
                  Our vision is to revolutionize the way individuals and organizations manage digital content through blockchain technology. We aim to foster trust in online file storage by offering a platform where data is securely encrypted, verifiably stored, and easily accessible, ensuring privacy and transparency.
                </p>
                <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
                  In the future, CipherChain envisions partnerships with the Indian government to integrate blockchain for file management in public services. This would help secure sensitive citizen data, simplify document verification, and foster a more transparent and efficient digital infrastructure.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default About;
