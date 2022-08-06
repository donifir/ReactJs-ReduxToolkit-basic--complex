import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { barangSelectors, deleteBarang, getBarang } from "../../features/barangSlice";

export default function DetailBarang() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [namaBarang, setNamaBarang] = useState("");
  const [suplier, setSuplier] = useState("");
  const [harga, setHarga] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [gambar, setGambar] = useState("");
  const [stok, setStok] = useState("");
  const [namaSuplier, setNamaSuplier] = useState("");
  const navigate = useNavigate();

  const barang = useSelector((state) => barangSelectors.selectById(state, id)); //cara ambil data dari store
  const deleteBarangStatus = useSelector((state) => state.barang.updateBarangStatus);

  useEffect(() => {
    if (barang) {
      setNamaBarang(barang.nama_barang);
      setSuplier(barang.suplier_id);
      setHarga(barang.harga);
      setStok(barang.stok);
      setKeterangan(barang.keterangan);
      setGambar(barang.gambar);
      setNamaSuplier(barang.nama_suplier);
    }
  }, [barang]);

  useEffect(() => {
    if (deleteBarangStatus==="succeeded") {
      navigate('/barang')
    }
  }, [deleteBarangStatus])
  

  useEffect(() => {
    dispatch(getBarang());
  }, [dispatch]);

  const card1 = (
    <div className="card">
      <div className="card-body">
        <img
          src={`http://localhost:8000/image/${gambar}`}
          class="img-thumbnail"
          alt="..."
        />
      </div>
    </div>
  );

  const card2 = (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-3">nama barang</div>
          <div className="col-1">:</div>
          <div className="col-3">{namaBarang}</div>
        </div>

        <div className="row">
          <div className="col-3">harga</div>
          <div className="col-1">:</div>
          <div className="col-3">{harga}</div>
        </div>

        <div className="row">
          <div className="col-3">stok</div>
          <div className="col-1">:</div>
          <div className="col-3">{stok}</div>
        </div>

        <div className="row">
          <div className="col-3">keterangan</div>
          <div className="col-1">:</div>
          <div className="col-3">{keterangan}</div>
        </div>

        <div className="row">
          <div className="col-3">nama_suplier</div>
          <div className="col-1">:</div>
          <div className="col-3">{namaSuplier}</div>
        </div>

        <div className="row">
          <div className="col-3">alamat_suplier</div>
          <div className="col-1">:</div>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div>
        <Link to="/barang" className="btn btn-primary btn-small float-end mb-3">
          Back
        </Link>
      </div>
      <div className="row pt-5">
        <div className="col-md-4">{card1}</div>
        <div className="col">
          {card2}
          <div className="button">
            <Link to={`/barang/${id}/edit`} class="btn btn-primary">
              Primary
            </Link>
            <button
              onClick={() => dispatch(deleteBarang(id))}
              type="button"
              class="btn btn-danger"
            >
              Primary
            </button>
          </div>
        </div>
      </div>

      {console.log(barang)}
    </div>
  );
}
