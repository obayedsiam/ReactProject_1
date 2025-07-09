const DataTable = ({ columns, data, renderRow }) => (
  <table className="table table-striped">
    <thead>
      <tr>
        {columns.map((col, idx) => (
          <th key={idx}>{col}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((item, idx) => (
        <tr key={idx}>{renderRow(item)}</tr>
      ))}
    </tbody>
  </table>
);
