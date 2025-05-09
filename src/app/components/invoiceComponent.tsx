"use client";

import React, { useState } from "react";
import styles from "./invoiceComponent.module.css";
import ProductList, { ProductDetails } from "./productListComponent";
import { useRef } from "react";

interface InvoiceData {
    company: {
        name: string;
        description1: string;
        description2: string;
        address1: string;
        address2: string;
        contact: string;
        email: string;
        phoneNumbers: Array<string>;
        GSTIN: string;
    },
    taxInvoice: {
        billTo: string;
        invoiceNumber: string;
        invoiceDate: string;
        poNumber: string;
        poDate: string;
        vehicleNumber: string;
    },
    productDetails: Array<ProductDetails>
    bankDetails: object;
}

const defaultValues = {
    company: {
        name: "UNIVERSAL POWER SOLUTIONS (Testing! auto deployment)",
        description1: "All types of transformer sales & services, power & distribution transformer manufacturing.",
        description2: "GOVT. LICENCED CLASS 1 ELECTRICAL CONTRACTOR",
        address1: "#No.11, Suvarna Nagara Near Bus Stop, Doddabidrekallu,",
        address2: "Nagasandra Post Bangalore-560073.",
        contact: "CONTACT: NAGARAJU M S.",
        email: "EMAIL: ups73.2024@gmail.com",
        phoneNumbers: ["PHONE NO:9902282519", " ", "7975299735"],
        GSTIN: "29ANOPH7514D1ZW",
    },
    taxInvoice: {
        billTo: "",
        invoiceNumber: "",
        invoiceDate: "",
        poNumber: "",
        poDate: "",
        vehicleNumber: "",
    },
    productDetails: [],
    bankDetails: {

    }
}

export default function InvoiceComponent() {
    // state
    const [invoiceData, setInvoiceData] = useState<InvoiceData>(defaultValues);
    const [isEditMode, setIsEditMode] = useState(true);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        nestedKey?: keyof InvoiceData
    ) => {
        const { name, value } = e.target;

        if (nestedKey && typeof invoiceData[nestedKey] === "object") {
            setInvoiceData((prev) => ({
                ...prev,
                [nestedKey]: {
                    ...(prev[nestedKey] as object),
                    [name]: value,
                },
            }));
        } else {
            setInvoiceData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = () => {
        // log to console
        console.log(JSON.stringify(invoiceData, null, 2));
        alert(JSON.stringify(invoiceData, null, 2));
    };

    const updateProductDetails = (updatedProducts: ProductDetails[]) => {
        setInvoiceData(prev => ({
            ...prev,
            productDetails: updatedProducts
        }));
    };

    const invoiceRef = useRef<HTMLDivElement>(null);



    return (
        <>
            <label style={{ display: "block", marginBottom: "1rem" }}>
                <input
                    type="checkbox"
                    checked={isEditMode}
                    onChange={() => setIsEditMode(!isEditMode)}
                />
                {" "}Edit Mode
            </label>

            <div className={styles.invoiceContainer} ref={invoiceRef}>
                <table className={styles.invoiceTable}>
                    <thead>
                        <tr>
                            <td colSpan={7} className={styles.invoiceGST}>GSTIN:29ANOPH7514D1ZW</td>
                        </tr>
                        <tr>

                            <td colSpan={2} className={styles.logoPlaceholder}>
                                <img src="/UPSlogo.jpg" alt="Logo" />
                            </td>
                            <td colSpan={5} className={styles.companyInfo}>
                                <strong>{invoiceData.company.name}</strong><br />
                                {invoiceData.company.description1}<br />
                                {invoiceData.company.description2}<br />
                                {invoiceData.company.address1}<br />
                                {invoiceData.company.address2}<br />
                                {invoiceData.company.contact}<br />
                                {invoiceData.company.email}<br />
                                {invoiceData.company.phoneNumbers}<br />
                                {invoiceData.company.GSTIN}<br />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={7} className={styles.invoiceTitle}>TAX INVOICE</td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td colSpan={3}>
                                <strong>Buyer (Bill to):</strong>&nbsp;<br />
                                {isEditMode ? (
                                    <input
                                        type="text"
                                        name="billTo"
                                        value={invoiceData.taxInvoice.billTo}
                                        onChange={(e) => handleChange(e, "taxInvoice")}
                                    />
                                ) : (
                                    <span>{invoiceData.taxInvoice.billTo || "-"}</span>
                                )}
                                <br />

                            </td>
                            <td colSpan={4} >
                                <strong>Invoice no:</strong>&nbsp;
                                {isEditMode ? (
                                    <input
                                        type="text"
                                        name="invoiceNumber"
                                        value={invoiceData.taxInvoice.invoiceNumber}
                                        onChange={(e) => handleChange(e, "taxInvoice")}
                                    />
                                ) : (
                                    <span>{invoiceData.taxInvoice.invoiceNumber || "-"}</span>
                                )}
                                <br />
                                <strong>Date:</strong>&nbsp;
                                {isEditMode ? (
                                    <input
                                        type="date"
                                        name="invoiceDate"
                                        value={invoiceData.taxInvoice.invoiceDate}
                                        onChange={(e) => handleChange(e, "taxInvoice")}
                                    />
                                ) : (
                                    <span>{invoiceData.taxInvoice.invoiceDate || "-"}</span>
                                )}
                                <br />
                                <strong>P.O no:</strong>&nbsp;
                                {isEditMode ? (
                                    <input type="text"
                                        name="poNumber"
                                        value={invoiceData.taxInvoice.poNumber}
                                        onChange={(e) => handleChange(e, "taxInvoice")}
                                    />
                                ) : (
                                    <span>{invoiceData.taxInvoice.poNumber || "-"}</span>
                                )}
                                <br />
                                <strong>P.O date:</strong>&nbsp;
                                {isEditMode ? (
                                    <input type="date"
                                        name="poDate"
                                        value={invoiceData.taxInvoice.poDate}
                                        onChange={(e) => handleChange(e, "taxInvoice")}
                                    />
                                ) : (
                                    <span>{invoiceData.taxInvoice.poDate || "-"}</span>
                                )}
                                <br />
                                <strong>Vehicle No:</strong>&nbsp;
                                {isEditMode ? (
                                    <input type="text"
                                        name="vehicleNumber"
                                        value={invoiceData.taxInvoice.vehicleNumber}
                                        onChange={(e) => handleChange(e, "taxInvoice")}
                                    />
                                ) : (
                                    <span>{invoiceData.taxInvoice.vehicleNumber || "-"}</span>
                                )}
                                <br />
                            </td>
                        </tr>
                        <ProductList data={invoiceData.productDetails} setData={updateProductDetails} isEditMode={isEditMode} />
                        {/* <tr className={styles.tableHeaderRow}>
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
                            <td><input type="text" /></td>
                            <td>8504</td>
                            <td><input type="number" /></td>
                            <td><input type="number" /></td>
                            <td>350000</td>
                            <td>3,55,000</td>
                        </tr> */}

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

            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => window.print()}>Export to PDF</button>
        </>

    );
}
