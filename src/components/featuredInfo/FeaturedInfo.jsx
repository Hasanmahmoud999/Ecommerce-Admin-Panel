import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import "./FeaturedInfo.css";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";

const FeaturedInfo = () => {
    const [income, setIncome] = useState([]);
    const [perc, setPerc] = useState(0);
    const TOKEN = useSelector((state) => state.user.currentUser.accessToken);

    useEffect(() => {
        const getIncome = async () => {
            try {
                const res = await userRequest.get("orders/income", {
                    headers: { token: `Bearer ${TOKEN}` },
                });
                setIncome(res.data);
                setPerc((res.data[1].total * 100) / res.data[0] - 100);
            } catch {}
        };
        getIncome();
    }, []);
    return (
        <div className="featured">
            <div className="featredItem">
                <span className="featuredTitle">Revenu</span>
                <div className="featuredMonyContainer">
                    <span className="featuredMony">
                        {/* ${income[1]?.total} */}
                        $2.415
                    </span>
                    <span className="featuredMonyRate">
                        {/* %{Math.floor(perc)} */}
                        -11.4 {/* {perc < 0 ? ( */}
                        <ArrowDownward className="featuredIcon negative" />
                        {/* ) : (
                            <ArrowUpward className="featuredIcon" />
                        )} */}
                    </span>
                </div>
                <span className="featuredSub">Compared to last month </span>
            </div>
            <div className="featredItem">
                <span className="featuredTitle">Sales</span>
                <div className="featuredMonyContainer">
                    <span className="featuredMony">$4.415</span>
                    <span className="featuredMonyRate">
                        -1.4 <ArrowDownward className="featuredIcon negative" />
                    </span>
                </div>
                <span className="featuredSub">Compared to last month </span>
            </div>
            <div className="featredItem">
                <span className="featuredTitle">Cost</span>
                <div className="featuredMonyContainer">
                    <span className="featuredMony">$2.225</span>
                    <span className="featuredMonyRate">
                        +2.4 <ArrowUpward className="featuredIcon" />
                    </span>
                </div>
                <span className="featuredSub">Compared to last month </span>
            </div>
        </div>
    );
};

export default FeaturedInfo;
