import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Product.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateProducts, upload } from "../../redux/apiCalls";
import { updateProductStart } from "../../redux/slices/productSlice";
const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const { isFetching } = useSelector((state) => state.product);
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId),
  );
  const TOKEN = useSelector((state) => state.user.currentUser.accessToken);

  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(product);
  console.log(inputs);
  const FileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imgFile, setImgFile] = useState(null);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setImgFile(e.target.files[0]);
    }
  };
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    [],
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            {
              name: MONTHS[item._id - 1],
              Salse: item.total,
            },
          ]),
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateProductStart());
    const url = await upload(imgFile);
    console.log(url);
    const updatedProduct = {
      ...inputs,
      img: url,
    };
    try {
      updateProducts(productId, updatedProduct, dispatch, TOKEN);
      navigate("/products");
    } catch (err) {
      console.log(err);
    }

    // dispatch(updateProductStart());
    // const imgFileName = product.img
    //     ? product.img
    //     : new Date().getTime() + imgFile.name;
    // const storage = getStorage(app);
    // const storageRef = ref(storage, imgFileName);

    // const uploadTask = uploadBytesResumable(storageRef, imgFile);

    // // Register three observers:
    // // 1. 'state_changed' observer, called any time the state changes
    // // 2. Error observer, called on failure
    // // 3. Completion observer, called on successful completion
    // uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //         // Observe state change events such as progress, pause, and resume
    //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //         const progress =
    //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //         console.log("Upload is " + progress + "% done");
    //         switch (snapshot.state) {
    //             case "paused":
    //                 console.log("Upload is paused");
    //                 break;
    //             case "running":
    //                 console.log("Upload is running");
    //                 break;
    //         }
    //     },
    //     (error) => {
    //         // Handle unsuccessful uploads
    //     },
    //     () => {
    //         // Handle successful uploads on complete
    //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //             const updatedProduct = {
    //                 ...inputs,
    //                 img: downloadURL,
    //             };
    //             updateProducts(productId, updatedProduct, dispatch, TOKEN);
    //             navigate("/products");
    //         });
    //     }
    // );
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newProduct">
          <button className="producctAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart
            data={
              // {pStats}
              productData
            }
            dataKey="Sales"
            title="Sales Performance"
          />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productInfoName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">In Stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              onChange={handleChange}
              name="title"
              placeholder={product.title}
            />
            <label>Product Description</label>
            <input
              type="text"
              name="desc"
              onChange={handleChange}
              placeholder={product.desc}
            />
            <label>Price</label>
            <input
              type="text"
              name="price"
              onChange={handleChange}
              placeholder={product.price}
            />
            <label>In Stock</label>
            <select name="inStock" onChange={handleChange} id="idStock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={image ? image : product.img}
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                ref={FileRef}
                onChange={onImageChange}
                accept="image/*"
              />
            </div>
            <button
              className="productButton"
              onClick={handleUpdate}
              disabled={isFetching}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
