import DefaultLayout from '../../../components/admin/Layouts/DefaultLayout';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InvoiceTable from "@/components/orders/InvoiceForm";
const  Invoice = () => {
    return (
        <DefaultLayout>
        <Breadcrumb pageName='Orders / FibreBond Invoice' />
        <InvoiceTable />

      </DefaultLayout>
    )
}

export default Invoice;