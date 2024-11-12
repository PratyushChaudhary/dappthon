import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/chain.webp'
import { FaFacebook, FaGoogle, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      {/* Upper Part */}
      <div className="flex lg:flex-row flex-col gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto py-14">
        <div className="border-b w-full flex flex-col lg:flex-row pb-5 border-richblack-700">
          {/* Section 1 */}
          <div className="lg:w-1/3 flex flex-col gap-3 mb-7">
          <div className='w-[3rem] h-[3rem] rounded-full overflow-hidden'>
  <img src={Logo} alt="StudySyncLogo" className="object-cover w-full h-full" />
</div>

            <h1 className="text-richblack-50 font-semibold text-[16px]">Company</h1>
            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/about"
                className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
              >
                About
              </Link>
              <Link
                to="/careers"
                className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
              >
                Careers
              </Link>
              <Link
                to="/affiliates"
                className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
              >
                Affiliates
              </Link>
            </div>
            <div className="flex gap-3 text-lg mt-3">
              <FaFacebook />
              <FaGoogle />
              <FaXTwitter />
              <FaYoutube />
            </div>
          </div>

          {/* Section 2 */}
          <div className="lg:w-1/3 flex flex-col gap-3 mb-7">
            <h1 className="text-richblack-50 font-semibold text-[16px]">Resources</h1>
            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/articles"
                className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
              >
                Articles
              </Link>
              <Link
                to="/blog"
                className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
              >
                Blog
              </Link>
              <Link
                to="/docs"
                className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
              >
                Docs
              </Link>
            </div>

            <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">Support</h1>
            <Link
              to="/help-center"
              className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2"
            >
              Help Center
            </Link>
          </div>

          {/* Section 3 */}
          <div className="lg:w-1/3 flex flex-col gap-3 mb-7">
            <h1 className="text-richblack-50 font-semibold text-[16px]">Plans</h1>
            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/paid-memberships"
                className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
              >
                Paid Memberships
              </Link>
              <Link
                to="/business-solutions"
                className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
              >
                Business Solutions
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Part */}
      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm">
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            <Link
              to="/privacy-policy"
              className="px-3 cursor-pointer hover:text-richblack-50 transition-all duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookie-policy"
              className="px-3 cursor-pointer hover:text-richblack-50 transition-all duration-200"
            >
              Cookie Policy
            </Link>
            <Link
              to="/terms"
              className="px-3 cursor-pointer hover:text-richblack-50 transition-all duration-200"
            >
              Terms
            </Link>
          </div>

          <div className="text-center">Made by Aman and Pratyush</div>
        </div>
      </div>
    </div>
  )
}

export default Footer
