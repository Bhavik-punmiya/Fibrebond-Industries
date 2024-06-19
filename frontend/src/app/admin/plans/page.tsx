import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Family from "@/components/plans/family";

const plans = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 min-h-full">
        <div className="flex flex-col gap-9" >
          <Family />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default plans;
