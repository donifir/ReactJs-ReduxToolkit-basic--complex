import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { saveSuplier, deleteSuplier } from "../../features/suplierSlice";
// import { saveSuplier } from "../../features/suplierSlice";

export default function Create() {
  const [namaSuplier, setNamaSuplier] = useState("");
  const [alamatSuplier, setAlamatSuplier] = useState("");
  const [telpSuplier, setTelpSuplier] = useState("");
  const [error, setError] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createStatus = useSelector((state) => state.suplier.createStatus);
  const createError = useSelector((state) => state.suplier.createError);

  const createSuplier = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama_suplier", namaSuplier);
    formData.append("alamat_suplier", alamatSuplier);
    formData.append("telp_suplier", telpSuplier);

    await dispatch(saveSuplier(formData));
  };
  useEffect(() => {
    if (createStatus === "succeeded") {
      navigate("/suplier");
    }
    if (createStatus === "error") {
      setError(createError);
    }
  }, [dispatch, createError, createStatus]);

  return (
    <div>
        {console.log(createStatus)}
      <Link to="/suplier" className="btn btn-primary btn-small float-end mb-3">
        Back
      </Link>
      <form className="pt-5" onSubmit={createSuplier}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Nama Suplier
          </label>
          <input
            type="text"
            className="form-control"
            value={namaSuplier}
            onChange={(e) => setNamaSuplier(e.target.value)}
          />
          <span className="text-danger">{error.nama_suplier}</span>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Alamat Suplier
          </label>
          <input
            type="text"
            className="form-control"
            value={alamatSuplier}
            onChange={(e) => setAlamatSuplier(e.target.value)}
          />
          <span className="text-danger">{error.alamat_suplier}</span>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Telp Suplier
          </label>
          <input
            type="text"
            className="form-control"
            value={telpSuplier}
            onChange={(e) => setTelpSuplier(e.target.value)}
          />
          <span className="text-danger">{error.telp_suplier}</span>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
