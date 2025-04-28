import { useEffect, useState } from "react";
import { Link } from "react-router";

function Home() {
  const [productList, setProductList] = useState([]);
  const [productToUpdate, setProductToUpdate] = useState({});
  const [productToDelete, setProductToDelete] = useState({});

  const openUpdateModal = (product) => {
    setProductToUpdate(product);
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
  };

  const listProduct = () => {
    const jwtToken = localStorage.getItem("token");

    fetch("http://localhost:3000/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setProductList(response);
      });
  };

  const deleteProduct = () => {
    fetch(`http://localhost:3000/product/${productToUpdate.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        listProduct();
      });
  };

  const updateProduct = () => {
    const form = document.forms[0];
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    fetch(`http://localhost:3000/product/${productToUpdate.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        listProduct();
      });
  };

  useEffect(() => {
    listProduct();
  }, []);

  return (
    <>
      <div
        className="modal fade"
        id="modalDelete"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Deletar produto
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Tem certeza que deseja deletar o produto {productToDelete.name}
              <div className="alert alert-danger">
                Esta operação não poderá ser desfeita
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                onClick={deleteProduct}
                type="button"
                className="btn btn-danger"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="modalUpdate"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {productToUpdate.name}
              <form className="form">
                <div className="form-controll">
                  <label htmlFor="">Nome</label>
                  <input type="text" name="name" className="input" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={updateProduct}
                type="button"
                className="btn btn-primary"
              >
                Atualizar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="table-actions">
        <Link to="/dashboard/create-product">
          <button className="btn btn-info btn-sm me-3">
            Cadastrar produto
          </button>
        </Link>
      </div>
      <table className="table table-sm table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Marca</th>
            <th>Descrição</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productList.length > 0
            ? productList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.brand}</td>
                    <td>{item.description}</td>
                    <td>
                      <div className="d-flex gap-3 justify-content-end">
                        <button
                          onClick={() => openDeleteModal(item)}
                          className="btn btn-danger btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDelete"
                        >
                          Deletar
                        </button>
                        <button
                          onClick={() => openUpdateModal(item)}
                          className="btn btn-info btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#modalUpdate"
                        >
                          Editar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </>
  );
}

export default Home;
