function Loader({ text = "Loading..." }) {
  return (
    <div className="loader-overlay">
      <div className="loader-card">
        <div className="spinner-ring" />
        <h4>Please wait</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Loader;
