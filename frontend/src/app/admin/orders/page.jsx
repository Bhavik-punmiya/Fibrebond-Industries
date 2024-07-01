import DefaultLayout from '../../components/admin/Layouts/DefaultLayout';
import OrdersTable from '@/components/orders/ordersTable';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ProductPageCards from "@/components/Products/cards/productpageCards";
const  OrdersPage = () => {
    return (
        <DefaultLayout>
        <Breadcrumb pageName='Products' />
        <ProductPageCards />
        <OrdersTable />
      </DefaultLayout>
    )
}

export default OrdersPage;