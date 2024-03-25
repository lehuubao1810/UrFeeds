import React from "react";

type Props = {
  html: string;
};

const TextOnlyComponent: React.FC<Props> = (props) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = props.html;

  // Lấy nội dung văn bản từ thẻ div ẩn
  const text = tempDiv.textContent || tempDiv.innerText || "";

  return (
    <div className="text-gray-900 dark:text-gray-100 truncate">{text}</div>
  );
};

export default TextOnlyComponent;
