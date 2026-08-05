import React, { useEffect, useState } from "react";
import "./WidgetSm.css";
import { Visibility } from "@material-ui/icons";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
const WidgetSm = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const TOKEN = useSelector((state) => state.user.currentUser.accessToken);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await userRequest.get("users/?new=true", {
                    headers: { token: `Bearer ${TOKEN}` },
                });
                setUsers(res.data);
                setLoading(true);
            } catch (err) {}
        };
        getUsers();
    }, []);

    return (
        <>
            {loading && (
                <div className="widgetSm">
                    <h3 className="widgetSmTitle">New Join Members</h3>
                    <ul className="widgetSmList">
                        {users.map((user) => (
                            <li
                                className="widgetSmListItem"
                                key={user._id}
                            >
                                <div className="widgetSmUser">
                                    <img
                                        src={
                                            user.img ||
                                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfOc2xqD2qG5m9jhgVOuAzLQj8Yotn8Ydp-Q&s"
                                        }
                                        alt=""
                                        className="widgetSmImg"
                                    />
                                    <span className="widgetSmUserName">
                                        {user.username}
                                    </span>
                                </div>
                                <button className="widgetSmButton">
                                    <Visibility className="widgetSmIcon" />
                                    Dispaly
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default WidgetSm;
