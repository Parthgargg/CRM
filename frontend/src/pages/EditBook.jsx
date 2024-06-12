import { useEffect, useState } from "react";
import axios from "axios";
import SERVER_URL from "../ServerURL";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
const EditBook = () => {
  const [loading, setLoading] = useState(false);
  const [Name, setName] = useState("");
  const [Money, setMoney] = useState("");
  const [Day, setDay] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const fetchBook = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(`${SERVER_URL}/book/${id}`);
      setMoney(resp.data.data.Money);
      setName(resp.data.data.Name);
      setDay(resp.data.data.Day);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBook();
  }, []);
  const handleUpdate = async () => {
    try {
      const data = { Name, Money, Day };
      setLoading(true);
      const resp = await axios.put(`${SERVER_URL}/book/${id}`, data);
      console.log(resp.data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl bg-sky-700 text-white p-4 text-center">
        Update Booking
      </h1>
      <BackButton />
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-300 rounded-sm w-[600px] p-4 mx-auto my-4">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-600">Name</label>
          <input
            type="text"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-600">Money</label>
          <input
            type="text"
            value={Money}
            onChange={(e) => setMoney(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-600">Publish Day</label>
          <input
            type="text"
            value={Day}
            onChange={(e) => setDay(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          />
        </div>
        <button
          className="p-2 bg-sky-600 m-8 text-white rounded-sm"
          onClick={handleUpdate}
        >
          Update
        </button>
        {/* <BackButton /> */}
      </div>
    </>
  );
};
export default EditBook;
