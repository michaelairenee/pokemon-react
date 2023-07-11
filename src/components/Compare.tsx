import { BaseChart, EffortChart } from "./CompareChart";

interface Result {
  data: any;
}

const CompareDefault = () => {
  return (
    <div className="flex items-center justify-center w-full h-60 bg-gray-200">
      <div className="font-semibold">Comparison Result</div>
    </div>
  );
};

const CompareResult = ({ data }: Result) => {
  return (
    <div className="my-4">
      <div>Base Stat</div>
      <BaseChart data={data} />

      <div className="mt-10">Effort</div>
      <EffortChart data={data} />
    </div>
  );
};

export { CompareDefault, CompareResult };
