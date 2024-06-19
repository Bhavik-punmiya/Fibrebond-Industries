import DefaultLayout from '../../components/admin/Layouts/DefaultLayout';
import UserTable from "@/components/Tables/UserTable";
import UserPageTab from "@/components/Tabs/UserPageTab";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const ProjectTable = () => {
  return (

      <DefaultLayout> 
        <Breadcrumb pageName='Users'/>
          <UserPageTab />
          <UserTable />
      </DefaultLayout>

  );
};

export default ProjectTable;
