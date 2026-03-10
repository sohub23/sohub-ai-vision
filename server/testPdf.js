import { createOrderPdf } from './pdfGenerator.js';
import fs from 'fs';

async function test() {
  const dummyOrder = {
    name: 'Jane Smith',
    company: 'Tech Solutions Ltd',
    phone: '+880 1812345678',
    email: 'jane@techsolutions.com',
    location: 'Gulshan 2, Dhaka',
    machineType: 'SOHUB Vision AI Edge Engine (4 Channels)',
    quantity: 1,
    unitPrice: 55000,
    addOns: [
      { name: 'Wall Mount Bracket', price: 1500 },
      { name: 'Professional Setup & Networking', price: 5000 }
    ],
    totalPrice: 61500,
    notes: 'Please ensure setup is done during weekend so as not to interrupt work hours.'
  };

  const pdfBuffer = await createOrderPdf(dummyOrder);
  fs.writeFileSync('test_quotation.pdf', pdfBuffer);
  console.log('PDF generated at test_quotation.pdf');
}

test();
