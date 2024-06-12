import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-sky-400 text-white px-4 py-1 rounded-lg w-fit"
      ></Link>
    </div>
  );
};
export default BackButton;
