function TextPill({ text, width, height, isHeading }) {
  return (
    <div className="text-pill" style={{ width: width, height: height }}>
      {isHeading ? (
        <>
          <span style={{ marginLeft: 5 }}>{text}</span>
          <div
            className="text-pill-checkbox"
            style={{ width: height - 10, height: height - 10 }}
          ></div>
        </>
      ) : (
        <>
          <div
            className="text-pill-checkbox"
            style={{ width: height - 10, height: height - 10 }}
          ></div>
          <span>{text}</span>
        </>
      )}
    </div>
  );
}

export default TextPill;
