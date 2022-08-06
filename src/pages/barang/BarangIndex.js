import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { barangSelectors, getBarang } from "../../features/barangSlice";

export default function Barang() {

  const barang = useSelector(barangSelectors.selectAll); //cara ambil data dari store
  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(getBarang());
  }, [dispatch]);

  const data = (
    <table className="table">
      <thead>
        <tr className="table-secondary">
          <th scope="col">No</th>
          <th scope="col">Nama Barang</th>
          <th scope="col">Nama Suplier</th>
          <th scope="col">Harga</th>
          <th scope="col">Stok</th>
          <th scope="col">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {barang.map((data, index) => (
          // <ListItem key={number.toString()} value={number} />
          <tr key={data.id}>
            <th scope="row">{index + 1}</th>
            <td>{data.nama_barang}</td>
            <td>{data.nama_suplier}</td>
            <td>{data.harga}</td>
            <td>{data.stok}</td>
            <td>
              <Link to={`/barang/${data.id}`} className="btn btn-primary btn-sm">
                Detail
              </Link>
              {/* <button onClick={()=>dispatch(deleteSuplier(data.id))} type="button" className="btn btn-danger btn-sm">
                Hapus
              </button> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      {console.log(barang)}
      <Link
        to="/barang/create"
        className="btn btn-primary btn-small float-end mb-3"
      >
        Create
      </Link>
      {data}
      barang index
    </div>
  );
}
