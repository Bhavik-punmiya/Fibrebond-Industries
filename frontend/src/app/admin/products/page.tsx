import DefaultLayout from '../../components/admin/Layouts/DefaultLayout';
import ProductsTable from '@/components/Products/productsTable';
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
