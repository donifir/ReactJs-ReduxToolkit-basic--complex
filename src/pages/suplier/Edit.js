import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { saveSuplier, getSuplier, suplierSelectors, editSuplier } from "../../features/suplierSlice";
// import { saveSuplier } from "../../features/suplierSlice";

export default function Edit() {
  const [namaSuplier, setNamaSuplier] = useState("");
  const [alamatSuplier, setAlamatSuplier] = useState("");
  const [telpSuplier, setTelpSuplier] = useState("");
  const [error, setError] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  const suplier = useSelector((state)=>suplierSelectors.selectById(state, id)); 
  const editStatus = useSelector((state) => state.suplier.editStatus);
  const editError = useSelector((state) => state.suplier.editError);

  const formEditSuplier = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama_suplier", namaSuplier);
    formData.append("alamat_suplier", alamatSuplier);
    formData.append("telp_suplier", telpSuplier);
    await dispatch(editSuplier({formData,id}));//kalu kirim id dan form data harus di kurung kurawa kusus wdit
  };

  useEffect(() => {
    dispatch(getSuplier())
  }, [dispatch])

  useEffect(() => {
    if (suplier) {
        setNamaSuplier(suplier.nama_suplier)
        setAlamatSuplier(suplier.alamat_suplier)
        setTelpSuplier(suplier.telp_suplier)
    }
  }, [suplier])


  useEffect(() => {
    if (editStatus === "succeeded") {
      navigate("/suplier");
    }
    if (editStatus === "error") {
      setError(editError);
    }
  }, [dispatch, editError, editStatus]);

  return (
    <div>
      <Link to="/suplier" className="btn btn-primary btn-small float-end mb-3">
        Back
      </Link>
      <form className="pt-5" onSubmit={formEditSuplier}>
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
