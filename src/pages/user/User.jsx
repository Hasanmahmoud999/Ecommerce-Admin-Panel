import React, { useRef, useState } from "react";
import "./User.css";
import {
  CalendarToday,
  EmailOutlined,
  LocationSearching,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateUser, upload } from "../../redux/apiCalls";
import { updateUsersStart } from "../../redux/slices/userSlice";

const User = () => {
  const [image, setImage] = useState(null);
  const TOKEN = useSelector((state) => state.user.currentUser.accessToken);

  const FileRef = useRef(null);
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const user = useSelector((state) =>
    state.user.allUsers.find((user) => user._id === userId),
  );
  const { isFetching } = useSelector((state) => state.user);
  const [inputs, setInputs] = useState(user);
  const [imgFile, setImgFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setImgFile(e.target.files[0]);
    }
  };
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateUsersStart());

    const url = await upload(imgFile);
    console.log(url);
    const updatedUser = {
      ...inputs,
      img: url,
    };
    try {
      updateUser(userId, updatedUser, dispatch, TOKEN);

      navigate("/users");
    } catch (err) {
      console.log(err);
    }

    // const imgFileName = imgFile
    //     ? new Date().getTime() + imgFile.name
    //     : user.img;
    // console.log(imgFileName);
    // const storage = getStorage(app);
    // const storageRef = ref(storage, imgFileName);
    // console.log("heloooooooooo");

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
    //         console.log(error);
    //     },
    //     () => {
    //         // Handle successful uploads on complete
    //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //             console.log(downloadURL);
    //             const updatedUser = {
    //                 ...inputs,
    //                 img: downloadURL,
    //             };
    //             updateUser(userId, updatedUser, dispatch, TOKEN);
    //             navigate("/users");
    //         });
    //     }
    // );
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={
                user.img ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScwlFdK4Fmpad8A_e9TgXmNnb0wP1IwU6x1w&s"
              }
              alt=""
              className="userShowTopImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowTopUsername">{user.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Delails</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.fullName}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">8.3.1999</span>
            </div>
            <span className="userShowTitle"> Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone}</span>
            </div>

            <div className="userShowInfo">
              <EmailOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user.username}
                  className="userUpdateInput"
                  onChange={handleChange}
                  name="username"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={user.fullName}
                  className="userUpdateInput"
                  onChange={handleChange}
                  name="fullName"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                  name="email"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder={user.phone}
                  className="userUpdateInput"
                  onChange={handleChange}
                  name="phone"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder={user.address}
                  className="userUpdateInput"
                  onChange={handleChange}
                  name="address"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  src={image ? image : user.img}
                  alt=""
                  className="userUpdateImg"
                />
                <label for="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  ref={FileRef}
                  onChange={onImageChange}
                  accept="image/*"
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                />
              </div>
              <button
                className="userUpdateButton"
                disabled={isFetching}
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
