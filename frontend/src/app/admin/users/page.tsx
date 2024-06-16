"use client"
import DefaultLayout from '../../components/admin/Layouts/DefaultLayout';
import UserTable from "@/components/Tables/UserTable";
import UserPageTab from "@/components/Tabs/UserPageTab";


const ProjectTable = () => {
  return (

      <DefaultLayout> 
          <UserPageTab />
          <UserTable />
      </DefaultLayout>

  );
};

export default ProjectTable;
