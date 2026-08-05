import React, { useEffect, useState } from "react";
import "./WidgetLg.css";
import { userRequest } from "../../requestMethods";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
const WidgetLg = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const TOKEN = useSelector((state) => state.user.currentUser.accessToken);
    useEffect(() => {
        const getOrder = async () => {
            try {
                const res = await userRequest.get("orders", {
                    headers: { token: `Bearer ${TOKEN}` },
                });
                setOrders(res.data);
                // setLoading(true);
            } catch (err) {
                console.log(err);
            }
        };

        getOrder();
    }, []);

    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>;
    };
    return (
        <>
            {/* {loading && ( */}
            <div className="widgetLg">
                <h3 className="widgetLgTitle">Latest Transations</h3>
                <table className="widgetLgTable">
                    <tr className="widgetLgTr">
                        <th className="widgetLgTh">Customer</th>
                        <th className="widgetLgTh">Date</th>
                        <th className="widgetLgTh">Amount</th>
                        <th className="widgetLgTh">Status</th>
                    </tr>
                    {orders.map((order) => (
                        <tr
                            className="widgetLgTr"
                            key={order._id}
                        >
                            <td className="widgetLgUser">
                                <span className="widgetLgName">
                                    {order.userId}
                                </span>
                            </td>
                            <td className="widgetLgDate">
                                {format(order.createdAt)}
                            </td>
                            <td className="widgetLgAmount">${order.amount}</td>
                            <td className="widgetLgStatus">
                                <Button type={order.status} />
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
            {/* )} */}
        </>
    );
};

export default WidgetLg;
