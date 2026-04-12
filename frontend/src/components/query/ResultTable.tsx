export default function ResultTable({ data }: { data: any }) {
  if (!data || data.length === 0)
    return <p className="text-gray-400">No results</p>;

  const columns = Object.keys(data[0]);

  return (
    <div className="glass p-4 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} className="text-left p-2 text-gray-400">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, i: number) => (
            <tr key={i} className="border-t border-white/10">
              {columns.map((col) => (
                <td key={col} className="p-2">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
