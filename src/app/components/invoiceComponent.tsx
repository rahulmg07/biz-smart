// InvoiceComponent.tsx
"use client";

import React from "react";
import styles from "./invoiceComponent.module.css";

export default function InvoiceComponent() {
    return (
        <div className={styles.invoiceContainer}>
            <table className={styles.invoiceTable}>
                <thead>
                <tr>
                        <td colSpan={7} className={styles.invoiceGST}>GSTIN:29ANOPH7514D1ZW</td>
                    </tr>
                    <tr>
                        
                        <td colSpan={3} className={styles.logoPlaceholder}>LOGO</td>
                        <td colSpan={4} className={styles.companyInfo}>
                            <strong>UNIVERSAL POWER SOLUTIONS</strong><br />
                            All types of transformer sales & services, power & distribution transformer manufacturing.<br />
                            Govt. Licensed Class 1 Electrical contractor<br />
                            #No.11, Suvarna Nagara Near Bus Stop, Doddabidrekallu,<br />
                            Nagasandra Post Bangalore-560073.<br />
                            Contact: NAGARAJU M S | Email: ups73.2024@gmail.com<br />
                            9902282519 / 7975299735<br />
                            GSTN: 29ANOPH7514D1ZW
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={7} className={styles.invoiceTitle}>TAX INVOICE</td>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td colSpan={3}>
                            <strong>Buyer (Bill to):</strong><br />
                            Mr. SANDEEP<br />
                            No 289, KPC Layout, Junnasandra<br />
                            Sarjapura Road, Kasavanahalli,<br />
                            Bangalore 560035
                        </td>
                        <td colSpan={4}>
                            <strong>Invoice no:</strong> 084<br />
                            <strong>Date:</strong> 12-03-2025<br />
                            <strong>P.O no:</strong> xxxxx<br />
                            <strong>P.O date:</strong> dd/mm/yyyy<br />
                            <strong>Vehicle No:</strong> KA52A7574
                        </td>
                    </tr>

                    <tr className={styles.tableHeaderRow}>
                     <th className={styles.colSlno}>SL.NO</th>
                     <th className={styles.colDesc}>Description</th>
                     <th className={styles.colHsn}>HSN Code</th>
                     <th className={styles.colQty}>Qty</th>
                     <th className={styles.colUdm}>UDM</th>
                     <th className={styles.colRate}>Rate</th>
                     <th className={styles.colTotal}>Total</th>

                    </tr>

                    <tr>
                        <td>1</td>
                        <td>Supplying of 63 KVA Copper Wounded Dry Type Transformer</td>
                        <td>8504</td>
                        <td>1</td>
                        <td>Nos</td>
                        <td>350000</td>
                        <td>3,55,000</td>
                    </tr>

                    <tr>
                        <td colSpan={6} className={styles.rightAlign}>TOTAL</td>
                        <td>3,55,000</td>
                    </tr>
                    <tr>
                        <td colSpan={6} className={styles.rightAlign}>CGST 9%</td>
                        <td>31,500</td>
                    </tr>
                    <tr>
                        <td colSpan={6} className={styles.rightAlign}>SGST 9%</td>
                        <td>31,500</td>
                    </tr>
                    <tr>
                        <td colSpan={6} className={styles.rightAlign}>GRAND TOTAL</td>
                        <td>4,13,000</td>
                    </tr>

                    <tr>
                        <td colSpan={7}>
                            <strong>Bank Details:</strong><br />
                            Bank: KARNATAKA BANK<br />
                            Name: UNIVERSAL POWER SOLUTIONS<br />
                            Account No: 0968202400000801<br />
                            IFSC Code: KARB0000968
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={7}>
                            <strong>Amount in Words:</strong> Four lakhs thirteen thousand rupees only.
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={7}>
                            <strong>Declaration:</strong> We declare that this invoice shows the actual price of the goods described and that all materials are true and correct.
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={4}>Customer signature:</td>
                        <td colSpan={3} className={styles.rightAlign}>For, UNIVERSAL POWER SOLUTIONS<br /><br /><br /><br /><br />Authorized Signature</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
