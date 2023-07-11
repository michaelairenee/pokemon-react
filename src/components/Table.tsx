import { Stat } from "../types/detail";
import { capitalization } from "../utils/utils";

interface Table {
  stats: Stat[];
  width: string;
}
const Table = ({ stats, width }: Table) => {
  return (
    <table className={`table-fixed ${width}`}>
      <thead>
        <tr>
          <th className="border p-1"></th>
          <th className="border p-1">Base Stat</th>
          <th className="border p-1">Effort</th>
        </tr>
      </thead>
      <tbody>
        {stats.map((val, index) => (
          <tr key={index}>
            <td className="border p-1">{capitalization(val.stat.name)}</td>
            <td className="border p-1 text-center">{val.base_stat}</td>
            <td className="border p-1 text-center">{val.effort}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { Table };
