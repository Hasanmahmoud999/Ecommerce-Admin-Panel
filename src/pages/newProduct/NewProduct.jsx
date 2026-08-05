import React, { useRef, useState } from "react";
import "./NewProduct.css";

import app from "../../firebase";
import { addProducts, upload } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { addProductStart } from "../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const [image, setImage] = useState(null);
  const fileRif = useRef(null);
  const [inputs, setInputs] = useState({});
  const [imgFile, setImgFile] = useState(null);
  const [categ, setCateg] = useState([]);
  const { isFetching } = useSelector((state) => state.user);
  const TOKEN = useSelector((state) => state.user.currentUser.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setImgFile(event.target.files[0]);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCateg = (e) => {
    setCateg(e.target.value.split(","));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    dispatch(addProductStart());
    const url = await upload(imgFile);
    console.log(url);
    const product = {
      ...inputs,
      img: url,
      categories: categ,
    };
    try {
      addProducts(product, dispatch, TOKEN);
      navigate("/products");
    } catch (err) {
      console.log(err);
    }

    // const imgFileName = new Date().getTime() + imgFile.name;
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
    //             const product = {
    //                 ...inputs,
    //                 img: downloadURL,
    //                 categories: categ,
    //             };
    //             addProducts(product, dispatch);
    //         });
    //     }
    // );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductFormContainer">
          <div className="addProductFormLeft">
            <div className="addProductItem">
              <label>Title</label>
              <input
                type="text"
                placeholder="Apple Airpods"
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Description</label>
              <input
                type="text"
                placeholder="description..."
                name="desc"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Price</label>
              <input
                type="number"
                placeholder="100"
                name="price"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Categories</label>
              <input
                type="text"
                placeholder="jeans , coat , skirts"
                onChange={handleCateg}
              />
            </div>
            <div className="addProductItem">
              <label>Stock</label>
              <select onChange={handleChange} name="inStock">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div className="addProductFormRight">
            <div className="addProductItem center">
              <label>Upload Image</label>
              <img
                src={
                  image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQTvTcD234f-GRtvhN-xdfrqckgfNZbgS6fRdIeAQ-vBdHlkvqjmM6MZQfmFBHpjxoc1Q&usqp=CAU"
                }
                className="addProductItemImg"
                alt=""
                title="Click To Upload Image"
                onClick={() => fileRif.current.click()}
              />
              <input
                ref={fileRif}
                onChange={onImageChange}
                type="file"
                hidden
                accept="imaage/*"
                id="file"
              />
            </div>
          </div>
        </div>
        <button
          className="addProductButton"
          onClick={handleCreate}
          disabled={isFetching}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
