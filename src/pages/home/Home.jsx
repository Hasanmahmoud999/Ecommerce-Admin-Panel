import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./Home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
const Home = () => {
    const [userStats, setUserStats] = useState([]);
    const TOKEN = useSelector((state) => state.user.currentUser.accessToken);

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
        []
    );
    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("/users/stats", {
                    headers: { token: `Bearer ${TOKEN}` },
                });
                res.data.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        {
                            name: MONTHS[item._id - 1],
                            "Active User": item.total,
                        },
                    ])
                );
            } catch {}
        };
        getStats();
    }, [MONTHS]);
    return (
        <div className="home">
            <FeaturedInfo />
            <Chart
                data={userData}
                title="User Analytics"
                grid
                dataKey="Active Users"
            />
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    );
};

export default Home;
