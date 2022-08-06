import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getSuplier,
  suplierSelectors,
  deleteSuplier,
} from "../../features/suplierSlice";

export default function SuplierIndex() {
  const dispatch = useDispatch();

  const suplier = useSelector(suplierSelectors.selectAll); //cara ambil data dari store
  const suplierStatus = useSelector((state) => state.suplier.status);
  const suplierError = useSelector((state) => state.suplier.error);

  useEffect(() => {
    dispatch(getSuplier());
  }, [dispatch]);

  const loading = (
    <div className="d-flex align-items-center justify-content-center">
      <div className="spinner-border " role="status">
        <span className="visually-hidden text-center">Loading...</span>
      </div>
    </div>
  );
  const error = (
    <div className="d-flex align-items-center justify-content-center">
      <span className="text-center">Error Status</span>
    </div>
  );

  const data = (
    <table className="table">
      <thead>
        <tr className="table-secondary">
          <th scope="col">No</th>
          <th scope="col">Nama Suplier</th>
          <th scope="col">Alamat Suplier</th>
          <th scope="col">Telp Sulier</th>
          <th scope="col">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {suplier.map((data, index) => (
          // <ListItem key={number.toString()} value={number} />
          <tr key={data.id}>
            <th scope="row">{index + 1}</th>
            <td>{data.nama_suplier}</td>
            <td>{data.alamat_suplier}</td>
            <td>{data.telp_suplier}</td>
            <td>
              <Link to={`/suplier/${data.id}`} className="btn btn-primary btn-sm">
                Edit
              </Link>
              <button onClick={()=>dispatch(deleteSuplier(data.id))} type="button" className="btn btn-danger btn-sm">
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <Link
        to="/suplier/create"
        className="btn btn-primary btn-small float-end mb-3"
      >
        Primary
      </Link>

      {suplierStatus === "loading"
        ? loading
        : suplierStatus === "succeeded"
        ? data
        : suplierStatus === "error"
        ? error
        : ""}
    </div>
  );
}
