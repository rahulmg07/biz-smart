"use client";
import React, { useEffect } from "react";
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
}

export default function ProductList({ data, setData }: ProductListProps) {
    const emptyRow: ProductDetails = {
        slNo: 0,
        description: "",
        hsnCode: "",
        quantity: 0,
        uom: "",
        price: 0,
        total: 0
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
        const parsedValue = (field === "quantity" || field === "price" || field === "total" || field === "slNo")
            ? Number(value) || 0
            : value;
        updatedRows[index] = {
            ...updatedRows[index],
            [field]: parsedValue
        };
        setData(updatedRows);
    };

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
            </tr>
            {data.map((row, index) => (
                <tr key={index}>
                    <td>
                        <input
                            type="number"
                            value={row.slNo}
                            onChange={(e) => handleChange(index, "slNo", e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={row.description}
                            onChange={(e) => handleChange(index, "description", e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={row.hsnCode}
                            onChange={(e) => handleChange(index, "hsnCode", e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            value={row.quantity}
                            onChange={(e) => handleChange(index, "quantity", e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={row.uom}
                            onChange={(e) => handleChange(index, "uom", e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            value={row.price}
                            onChange={(e) => handleChange(index, "price", e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            value={row.total}
                            onChange={(e) => handleChange(index, "total", e.target.value)}
                        />
                    </td>
                    <td>
                        <button onClick={handleAddRow}>+</button>
                        {data.length > 1 && (
                            <button onClick={() => handleRemoveRow(index)}>-</button>
                        )}
                    </td>
                </tr>
            ))}

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
        </>
    );
}
