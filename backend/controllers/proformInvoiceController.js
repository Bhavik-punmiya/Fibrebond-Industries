const ProformaInvoice = require('../models/ProformaInvoice');

const createProformaInvoice = async (req, res) => {
  try {
    const proformaInvoiceData = req.body;

    let invoice = await ProformaInvoice.findOne();

    if (invoice) {
      // Save current proforma invoice to history
      invoice.history.push({
        ...invoice.toObject(),
        createdAt: invoice.updatedAt // Use the last updated date as the created date for the history
      });

      // Update latest proforma invoice
      Object.assign(invoice, proformaInvoiceData);
    } else {
      // Create new proforma invoice document if it doesn't exist
      invoice = new ProformaInvoice(proformaInvoiceData);
    }

    await invoice.save();
    res.status(200).json({ message: 'Proforma Invoice created/updated successfully', invoice });
  } catch (error) {
    console.error('Error creating/updating Proforma Invoice:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProformaInvoice = async (req, res) => {
  try {
    const invoice = await ProformaInvoice.findOne();
    console.log(invoice)
    if (!invoice) {
      return res.status(404).json({ error: 'Proforma Invoice not found' });
    }

    // Return only the latest proforma invoice
    res.status(200).json(invoice);
  } catch (error) {
    console.error('Error fetching Proforma Invoice:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createProformaInvoice,
  getProformaInvoice
};
