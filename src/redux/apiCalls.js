import axios from "axios";
import { publicRequest, userRequest } from "../requestMethods";
import {
  addProductStart,
  addProductSuccess,
  addProductfailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductfailure,
  getProductStart,
  getProductSuccess,
  getProductfailure,
  updateProductStart,
  updateProductSuccess,
  updateProductfailure,
} from "./slices/productSlice";
import {
  addUserFailure,
  addUserStart,
  addUserSuccess,
  deleteUsersFailure,
  deleteUsersStart,
  deleteUsersSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  updateUsersFailure,
  updateUsersStart,
  updateUsersSuccess,
} from "./slices/userSlice";
export const login = async (dispatch, user, navigate) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    console.log("Login successful:", res.data); // Debugging line
    setTimeout(() => {
      console.log("Navigating to /home"); // Debugging line

      // navigate("/");
    }, 1000);
  } catch (err) {
    console.error("Login error:", err); // Debugging line

    // console.log(err)
    dispatch(loginFailure());
  }
};
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductfailure());
  }
};
export const deleteProducts = async (id, dispatch, TOKEN) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`, {
      headers: { token: `Bearer ${TOKEN}` },
    });
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductfailure());
  }
};

export const updateProducts = async (id, updatedProduct, dispatch, TOKEN) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, updatedProduct, {
      headers: { token: `Bearer ${TOKEN}` },
    });
    dispatch(updateProductSuccess({ id, updatedProduct }));
  } catch (err) {
    dispatch(updateProductfailure());
  }
};
export const addProducts = async (product, dispatch, TOKEN) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product, {
      headers: { token: `Bearer ${TOKEN}` },
    });
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductfailure());
  }
};

export const getUsers = async (dispatch, TOKEN) => {
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get("/users", {
      headers: { token: `Bearer ${TOKEN}` },
    });
    dispatch(getUsersSuccess(res.data));
    console.log(res.data);
  } catch (err) {
    dispatch(getUsersFailure());
    console.log(err);
  }
};

export const deleteUsers = async (id, dispatch, TOKEN) => {
  dispatch(deleteUsersStart());
  try {
    const res = await userRequest.delete(`/users/${id}`, {
      headers: { token: `Bearer ${TOKEN}` },
    });
    dispatch(deleteUsersSuccess(id));
  } catch (err) {
    dispatch(deleteUsersFailure());
  }
};

export const updateUser = async (id, updatedUser, dispatch, TOKEN) => {
  // dispatch(updateUsersStart());
  try {
    const res = await userRequest.put(`/users/${id}`, updatedUser, {
      headers: { token: `Bearer ${TOKEN}` },
    });
    dispatch(updateUsersSuccess({ id, updatedUser }));
  } catch (err) {
    dispatch(updateUsersFailure());
  }
};

// ***********************************************************
export const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "LUXESHOP");
  console.log(data);
  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/hasoun/image/upload",
      data,
    );

    const { url } = res.data;
    console.log(url);
    return url;
  } catch (err) {
    console.log(err);
  }
};

// **********************************************************

export const addUser = async (newUser, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest.post("/users/create", newUser, {
      headers: { token: `Bearer ${TOKEN}` },
    });
    dispatch(addUserSuccess(res.data));
    console.log(res.data);
  } catch (err) {
    console.log(err);
    dispatch(addUserFailure());
  }
};
