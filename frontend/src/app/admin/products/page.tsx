import DefaultLayout from '../../components/admin/Layouts/DefaultLayout';
import ProductsTable from "../../components/admin/Tables/products";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const ProjectTable = () => {
  return (

      <DefaultLayout> 
        <Breadcrumb pageName='Products'/>
            <ProductsTable />
      </DefaultLayout>

  );
};

export default ProjectTable;
