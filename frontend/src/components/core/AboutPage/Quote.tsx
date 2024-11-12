import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote: React.FC = () => {
  return (
    <div className="text-richblack-500 text-2xl mt-4">
      We are passionate about revolutionizing the way digital assets are managed. Our innovative platform
      <HighlightText text={" leverages blockchain technology"} color={'#9000E6'} />
      <span className="bg-gradient-to-b from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb] text-transparent bg-clip-text font-bold">
        {" "}, security
      </span>
       , and decentralization to create an
      <span className="bg-gradient-to-b from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb] text-transparent bg-clip-text font-bold">
        {" "} 
        unparalleled digital experience.
      </span>
    </div>
  )
}

export default Quote;
