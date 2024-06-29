import PizzaLogo from "../../assets/favicon.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CleanLogout } from "./logout_manager.";

const Header = ({ className = "" }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div
            className={`h-[70px] items-center gap-8 p-4 w-full flex shadow-lg bg-white text-black rounded-xl ${className}`}
        >
            <img src={PizzaLogo} alt="logo" className="h-full" />
            <span className="font-bold">Pizza Striker - Admin Dashboard</span>
            <div className="flex gap-8 ml-auto items-center">
                <div>
                    <Link
                        to="/"
                        className={location.pathname == "/" ? "text-indigo-800 " : ""}
                    >
                        Home
                    </Link>
                </div>
                <div>
                    <Link
                        to="/leaderboard"
                        className={
                            location.pathname == "/leaderboard" ? "text-indigo-800 " : ""
                        }
                    >
                        Leaderboard
                    </Link>
                </div>
                <button
                    className="ring-offset-2 ring rounded-xl py-2 px-4 bg-indigo-600 text-white"
                    onClick={() => document.getElementById("logout-model").showModal()}
                >
                    Logout
                </button>
                <dialog
                    id="logout-model"
                    className="modal modal-bottom sm:modal-middle"
                >
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Are you sure?</h3>
                        <p className="py-4">
                            Press ESC key or click the button below to close
                        </p>
                        <div className="modal-action">
                            <form method="dialog ">
                                {/* if there is a button in form, it will close the modal */}
                                <div className="flex gap-4">
                                    <button
                                        className="btn"
                                        onClick={() => {
                                            document.getElementById("logout-model")!.close();
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn"
                                        onClick={() => {
                                            CleanLogout();
                                            navigate("/auth/login");
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default Header;
