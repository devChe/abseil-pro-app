/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import {
  collection,
  doc,
  docs,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../src/config/firebase.config";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const NewQuoteCosts = ({
  newCostDesc,
  setNewCostDesc,
  newQty,
  setNewQty,
  newUnitCost,
  setNewUnitCost,
  newUnitPrice,
  setNewUnitPrice,
  newSupplier,
  setNewSupplier,
  newCode,
  setNewCode,
  newTax,
  setNewTax,
  newNotes,
  setNewNotes,
  addQuoteCost
}) => {
  const [suppliers, setSuppliers] = useState([]);

  const suppliersCollectionRef = collection(db, "suppliers");

  useEffect(() => {
    const getSuppliers = async () => {
      const q = query(suppliersCollectionRef, orderBy("supplierName"));
      const data = await getDocs(q);
      const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setSuppliers(res);
    };
    getSuppliers();
  }, []);

  return (
    <div>
      <h1>Cost Information</h1>
      <div>
        <table>
          <tr>
            <td>
              <label>Description:</label>
            </td>
            <td colSpan={3}>
              <input
                type="text"
                value={newCostDesc}
                onChange={(e) => setNewCostDesc(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Quantity:</label>
            </td>
            <td>
              <input
                type="number"
                value={newQty}
                onChange={(e) => setNewQty(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Unit Cost:</label>
            </td>
            <td>
              <input
                type="number"
                value={newUnitCost}
                onChange={(e) => setNewUnitCost(e.target.value)}
              />
            </td>
            <td>
              <label>Unit Price:</label>
            </td>
            <td>
              <input
                type="number"
                value={newUnitPrice}
                onChange={(e) => setNewUnitPrice(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Supplier:</label>
            </td>
            <td>
              <select
                value={newSupplier}
                onChange={(e) => setNewSupplier(e.target.value)}
              >
                <option>Choose Supplier...</option>
                {suppliers.map((supplier) => (
                  <option value={supplier.supplierName}>
                    {supplier.supplierName}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <label>Code:</label>
            </td>
            <td>
              <input
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Tax:</label>
            </td>
            <td>
              <select
                value={newTax}
                onChange={(e) => setNewTax(e.target.value)}
              >
                <option value="10.0%">GST (10.0%)</option>
                <option value="0.0%">None (0.0%)</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>Notes:</label>
            </td>
            <td colSpan={3}>
              <ReactQuill value={newNotes} onChange={setNewNotes} />
            </td>
          </tr>
        </table>
        <button type="submit" onClick={addQuoteCost}>Save</button>
      </div>
    </div>
  );
};

export default NewQuoteCosts;
