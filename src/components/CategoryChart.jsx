import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

export default function CategoryChart({
  categories,
}) {
  const data = Object.entries(categories || {}).map(
    ([name, value]) => ({
      name,
      value: Number(value),
    })
  );

  if (!data.length) {
    return (
      <div className="bg-slate-800 rounded-xl p-8 text-center text-gray-400 border border-slate-700">
        No chart data yet
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl p-5 shadow-lg border border-slate-700">
      <h2 className="text-2xl font-bold mb-4">
        Spending by Category
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}