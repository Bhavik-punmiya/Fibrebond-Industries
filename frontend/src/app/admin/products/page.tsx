import DefaultLayout from '../../components/admin/Layouts/DefaultLayout';
import ProductsTable from '@/components/Products/productsTable';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ProductPageCards from "@/components/Products/cards/productpageCards"; // Corrected import statement
const ProjectTable = () => {
  return (

    <DefaultLayout>
      <Breadcrumb pageName='Products' />
      <ProductPageCards />

      <ProductsTable />
    </DefaultLayout>

  );
};

export default ProjectTable;
