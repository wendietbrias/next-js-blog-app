const Alert = ({ alert, setAlert }) => {
  return (
    <div
      className={`w-full py-2 mb-4 px-3 rounded-md shadow-md ${alert?.variant} flex items-center justify-between`}
    >
      <span className={`${alert.textVariant} text-sm font-semibold`}>
        {alert?.msg}
      </span>
      <button
        onClick={() => setAlert({ open: false })}
        className={`${alert?.textVariant} font-bold text-sm`}
      >
        x
      </button>
    </div>
  );
};

export default Alert;
