import React, { useEffect } from "react";
import "./ProductList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, getProducts } from "../../redux/apiCalls";

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const TOKEN = useSelector((state) => state.user.currentUser.accessToken);

    const handleDelete = (id) => {
        deleteProducts(id, dispatch, TOKEN);
    };

    useEffect(() => {
        getProducts(dispatch);
    }, [dispatch]);

    const columns = [
        { field: "_id", headerName: "ID", width: 220 },
        {
            field: "product",
            headerName: "Product",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img
                            className="productListImg"
                            src={params.row.img}
                            alt=""
                        />
                        {params.row.title}
                    </div>
                );
            },
        },
        { field: "inStock", headerName: "Stock", width: 200 },
        {
            field: "price",
            headerName: "Price",
            width: 210,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/product/" + params.row._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="productList">
            <DataGrid
                rows={products}
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={8}
                disableSelectionOnClick
                checkboxSelection
            />
        </div>
    );
};

export default ProductList;
