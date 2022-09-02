import { useRef, useState } from "react";
import { handleSubmitComment } from "../service";
import Alert from "./Alert";

const CommentForm = ({ slug }) => {
  const rememberUser = useRef();

  const getItemFn = (key) => {
    if (typeof window !== "undefined") {
      return JSON.parse(window.localStorage.getItem(key));
    }

    return "";
  };

  const [alert, setAlert] = useState({
    open: false,
    msg: "",
    variant: "",
    textVariant: "",
  });
  const [formData, setFormData] = useState({
    name: getItemFn("name"),
    email: getItemFn("email"),
    comment: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.comment === ""
    ) {
      setAlert({
        open: true,
        variant: "bg-red-50",
        textVariant: "text-red-500",
        msg: "please complete the fields",
      });
    }

    if (rememberUser.current.checked === true) {
      window.localStorage.setItem("name", JSON.stringify(formData.name));
      window.localStorage.setItem("email", JSON.stringify(formData.email));
    }

    try {
      handleSubmitComment({ ...formData, slug });
      setFormData({ name: "", email: "", comment: "" });
      setAlert({
        open: true,
        variant: "bg-green-50",
        textVariant: "text-green-500",
        msg: "Comment is submitted",
      });
    } catch (err) {
      setAlert({
        open: true,
        variant: "bg-red-50",
        textVariant: "text-red-500",
        msg: "Error creating comments",
      });
    }
  };

  return (
    <div className="w-full bg-white rounded-lg py-5 px-7 mt-8">
      {alert.open && <Alert alert={alert} setAlert={setAlert} />}
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between flex-wrap"
      >
        <div className="w-[49%]">
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            type="text"
            placeholder="Name"
            className="bg-gray-200 outline-none focus:ring-2 focus:ring-pink-400 w-full rounded-md py-2 px-3"
          />
        </div>
        <div className="w-[49%]">
          <input
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            type="email"
            placeholder="Email"
            className="bg-gray-200 focus:ring-2 focus:ring-pink-400 outline-none w-full rounded-md py-2 px-3"
          />
        </div>
        <div className="w-full mt-4">
          <textarea
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            className="w-full h-[210px] bg-gray-200 rounded-md py-3 px-3"
          ></textarea>
        </div>
        <div className="w-full mt-3">
          <input ref={rememberUser} type="checkbox" className="align-middle" />
          <span className="align-middle text-sm text-gray-500 font-medium ml-3">
            Remember Me?
          </span>
        </div>
        <button
          type="submit"
          className="mt-5 text-sm rounded-full outline-none focus:ring-2 focus:ring-pink-400 py-3 px-4 text-white font-semibold hover:bg-pink-600 bg-pink-500"
        >
          Send Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
