import DefaultLayout from '../../components/admin/Layouts/DefaultLayout';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FileStats from "@/components/FileManager/FileStats";
const ProjectTable = () => {
  return (

    <DefaultLayout>
      <Breadcrumb pageName='FileManager' />
      <FileStats />
    </DefaultLayout>

  );
};

export default ProjectTable;
