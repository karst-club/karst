export default function TwoColumns({ columnOne, columnTwo }) {
  return (
    <>
      <div className="column-wrapper">
        <div>{columnOne}</div>
        <div className="column-two">{columnTwo}</div>
      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          .column-wrapper {
            display: flex;
            flex-direction: row;
          }

          .column-wrapper div {
            width: 50%;
          }
          .column-two {
            max-width: 25em;
          }
        }
      `}</style>
    </>
  );
}
