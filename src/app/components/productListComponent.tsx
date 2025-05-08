"use client";
import React, { useEffect, useMemo } from "react";
import { numberToWords } from '../utils'
import styles from "./invoiceComponent.module.css";

export interface ProductDetails {
    slNo: number;
    description: string;
    hsnCode: string;
    quantity: number;
    uom: string;
    price: number;
    total: number;
}

interface ProductListProps {
    data: ProductDetails[];
    setData: (updatedData: ProductDetails[]) => void;
    isEditMode: boolean;
}

export default function ProductList({ data, setData, isEditMode }: ProductListProps) {
    const emptyRow: ProductDetails = {
        slNo: 0,
        description: "",
        hsnCode: "",
        quantity: 0,
        uom: "",
        price: 0,
        total: 0,
    };

    useEffect(() => {
        if (data.length === 0) {
            setData([emptyRow]);
        }
    }, [data, setData]);

    const handleAddRow = () => {
        setData([...data, emptyRow]);
    };

    const handleRemoveRow = (index: number) => {
        const updatedRows = data.filter((_, i) => i !== index);
        setData(updatedRows);
    };

    const handleChange = (index: number, field: keyof ProductDetails, value: string) => {
        const updatedRows = [...data];
        const parsedValue =
            field === "quantity" || field === "price" || field === "total" || field === "slNo"
                ? Number(value) || 0
                : value;
        const updatedRow = { ...updatedRows[index], [field]: parsedValue };

        // Recalculate total for row
        if (field === "quantity" || field === "price") {
            updatedRow.total = updatedRow.quantity * updatedRow.price;
        }

        updatedRows[index] = updatedRow;
        setData(updatedRows);
    };

    // Derived calculations using useMemo
    const totalAmount = useMemo(
        () => data.reduce((sum, row) => sum + (row.quantity * row.price), 0),
        [data]
    );

    const cgst = parseFloat((totalAmount * 0.09).toFixed(2));
    const sgst = parseFloat((totalAmount * 0.09).toFixed(2));
    const grandTotal = totalAmount + cgst + sgst;
    const amountInWords = numberToWords(Math.round(grandTotal));

    return (
        <>
            <tr className={styles.tableHeaderRow}>
                <th className={styles.colSlno}>SL.NO</th>
                <th className={styles.colDesc}>Description</th>
                <th className={styles.colHsn}>HSN Code</th>
                <th className={styles.colQty}>Qty</th>
                <th className={styles.colUdm}>UDM</th>
                <th className={styles.colRate}>Rate</th>
                <th className={styles.colTotal}>Total</th>
                <th></th>
            </tr>

            {data.map((row, index) => (
                <tr key={index}
                    className={styles.tableHeaderRow}>
                    <td>
                        {isEditMode ? (
                        <input
                            type="number"
                            value={row.slNo}
                            onChange={(e) => handleChange(index, "slNo", e.target.value)}
                        />
                        ) : (
                            <span>{row.slNo || "-"}</span>
                        )}
                    </td>
                    <td>
                        {isEditMode ? (
                        <input
                            type="text"
                            value={row.description}
                            onChange={(e) => handleChange(index, "description", e.target.value)}
                        />
                        ) : (
                            <span>{row.description || "-"}</span>
                        )}
                    </td>
                    <td>
                        {isEditMode ? (
                        <input
                            type="text"
                            value={row.hsnCode}
                            onChange={(e) => handleChange(index, "hsnCode", e.target.value)}
                        />
                        ) : (
                            <span>{row.hsnCode || "-"}</span>
                        )}
                    </td>
                    <td>
                        {isEditMode ? (
                        <input
                            type="number"
                            value={row.quantity}
                            onChange={(e) => handleChange(index, "quantity", e.target.value)}
                        />
                        ) : (
                            <span>{row.quantity || "-"}</span>
                        )}
                    </td>
                    <td>
                        {isEditMode ? (
                            <input
                                type="text"
                                value={row.uom}
                                onChange={(e) => handleChange(index, "uom", e.target.value)}
                            />
                        ) : (
                            <span>{row.uom || "-"}</span>
                        )}
                    </td>
                    <td>
                        {isEditMode ? (
                        <input
                            type="number"
                            value={row.price}
                            onChange={(e) => handleChange(index, "price", e.target.value)}
                        />
                        ) : (
                            <span>{row.price || "-"}</span>
                        )}
                    </td>
                    <td>
                        {isEditMode ? (
                        <input type="number" value={row.total} readOnly />
                        ) : (
                            <span>{row.total || "-"}</span>
                        )}
                    </td>
                    <td>
                        <button onClick={handleAddRow}>+</button>
                        {data.length > 1 && <button onClick={() => handleRemoveRow(index)}>-</button>}
                    </td>
                </tr>
            ))}

            <tr>
                <td colSpan={6} className={styles.rightAlign}>TOTAL</td>
                <td>{totalAmount.toLocaleString("en-IN")}</td>
            </tr>
            <tr>
                <td colSpan={6} className={styles.rightAlign}>CGST 9%</td>
                <td>{cgst.toLocaleString("en-IN")}</td>
            </tr>
            <tr>
                <td colSpan={6} className={styles.rightAlign}>SGST 9%</td>
                <td>{sgst.toLocaleString("en-IN")}</td>
            </tr>
            <tr>
                <td colSpan={6} className={styles.rightAlign}>GRAND TOTAL</td>
                <td>{grandTotal.toLocaleString("en-IN")}</td>
            </tr>
            <tr>
                <td colSpan={7}><strong>Amount in Words: </strong>{amountInWords}</td>
            </tr>
        </>
    );
}
