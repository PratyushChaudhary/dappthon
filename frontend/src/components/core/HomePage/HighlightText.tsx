import React from 'react';

interface HighlightTextProps {
  text: string;
  color: string;
}

const HighlightText: React.FC<HighlightTextProps> = ({ text, color }) => {
  return (
    <span className="font-bold" style={{ color }}>
      {text}
    </span>
  );
};

export default HighlightText;
