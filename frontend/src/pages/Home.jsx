import axios from "axios";
import { useEffect, useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import reactDom from "react-dom";
import SERVER_URL from "../ServerURL";
import Spinner from "../components/Spinner";
const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchBook = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(`${SERVER_URL}/book`);
      console.log(resp.data);
      setBooks(resp.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBook();
  }, []);
  return (
    <>
      <h1 className="text-3xl bg-sky-700 text-white p-4 text-center">
        CRM Application
      </h1>

      <div className="p-4">
        <Link to="/books/create">
          <IoMdAdd className="text-4xl text-blue-800" />
        </Link>
        <div className="flex justify-between items-center">
          {loading ? (
            <Spinner></Spinner>
          ) : (
            <table className="w-full border-separate border-spacing-2">
              <thead>
                <tr>
                  <th className="border border-slate-500 rounded-md">Sno</th>
                  <th className="border border-slate-500 rounded-md">Name</th>
                  <th className="border border-slate-500 rounded-md">Money</th>
                  <th className="border border-slate-500 rounded-md">
                    Days
                  </th>
                  <th className="border border-slate-500 rounded-md">Options</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => {
                  return (
                    <tr key={book._id}>
                      <td className="border border-slate-500 rounded-md text-center">
                        {index + 1}
                      </td>
                      <td className="border border-slate-500 rounded-md text-center">
                        {book.Name}
                      </td>
                      <td className="border border-slate-500 rounded-md text-center">
                        {book.Money}
                      </td>
                      <td className="border border-slate-500 rounded-md text-center">
                        {book.Day}
                      </td>
                      <td className="border border-slate-500 rounded-md text-center">
                        {/* todo */}
                        <div className="flex justify-center gap-x-4"></div>
                        <Link to={`/books/${book._id}`}>
                          <MdInfoOutline className="text-2xl text-green-800" />
                        </Link>
                        <Link to={`/books/edit/${book._id}`}>
                          <FaEdit className="text-2xl text-yellow-800" />
                        </Link>
                        <Link to={`/books/delete/${book._id}`}>
                          <MdDelete className="text-2xl text-red-800" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
