export default function ExpenseSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      {[1,2,3].map((i) => (
        <div
          key={i}
          className="h-10 bg-slate-700 rounded"
        />
      ))}
    </div>
  );
}