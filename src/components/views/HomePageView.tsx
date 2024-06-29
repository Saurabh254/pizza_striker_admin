import { useEffect, useState } from "react";
import RequestClient from "../../utils/requests_client";

const RecentStrikeUserCard = ({
  setSectionReload,
  id,
  name,
  reason,
  created_at,
  strikes_count,
}) => {
  created_at = new Date(created_at).toDateString();
  const handleRemoveStrike = (id) => {
    return async () => {
      await RequestClient.delete(
        "/admin/delete_strike",
        `strike_id=${id}`,
        true
      );
      setSectionReload(3);
    };
  };
  return (
    <tr key={id} className="text-center">
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img
                src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{name}</div>
          </div>
        </div>
      </td>
      <td>{reason}</td>
      <td>{created_at}</td>
      <td>
        <button className="text-red-600" onClick={handleRemoveStrike(id)}>
          remove
        </button>
      </td>
    </tr>
  );
};

const CreateStrikeUserCard = ({
  id,
  name,
  created_at,
  strikes_count,
  setSectionReload,
}) => {
  created_at = new Date(created_at).toDateString();

  const [strikeReason, setStrikeReason] = useState("");
  const handleCreateStrikeDialog = (id) => {
    return (event) => {
      event.preventDefault();
      const request_body = {
        user_id: id,
        reason: strikeReason,
      };
      RequestClient.post("/admin/create_strike", request_body, true);
      document.getElementById(`dialog-${id}`)!.close();
      setSectionReload(1);
    };
  };

  return (
    <tr key={id} className="text-center">
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img
                src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{name}</div>
          </div>
        </div>
      </td>
      <td>{strikes_count}</td>
      <td>{created_at}</td>
      <th>
        <button
          className="btn"
          onClick={() => document.getElementById(`dialog-${id}`)!.showModal()}
        >
          Create Stike
        </button>
        <dialog id={`dialog-${id}`} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Create Strike for {name}</h3>
            <br />
            <form
              className="space-y-6 text-left"
              autoComplete="false"
              onSubmit={handleCreateStrikeDialog(id)}
            >
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Specify Strike Reason
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="textarea"
                    value={strikeReason}
                    onChange={(e) => setStrikeReason(e.target.value)}
                    autoComplete="off"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 "
                  />
                </div>
              </div>

              <div className="w-full items-center flex justify-center ">
                <button
                  type="submit"
                  className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
                >
                  Create
                </button>
              </div>
            </form>
            <p className="py-4">Press ESC key or click outside to close</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </th>
    </tr>
  );
};

const CreateStrike = ({ setSectionReload }) => {
  const [usersList, setUserList] = useState(null);
  useEffect(() => {
    const userListReq = async () => {
      const response = await RequestClient.get("/admin/users", "", true);
      setUserList(response);
    };
    userListReq();
  }, []);
  if (!usersList) {
    return (
      <div className="w-full flex items-center justify-center ">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  return (
    <>
      <div className="overflow-x-auto border-2 rounded-xl">
        {usersList?.items?.length ? (
          <>
            <table className="table text-center">
              <thead className="">
                <tr>
                  <th>Name</th>
                  <th>strikes Count</th>
                  <th>Created At</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="">
                {usersList?.items.map((e) => {
                  return (
                    <CreateStrikeUserCard
                      setSectionReload={setSectionReload}
                      name={e.name}
                      created_at={e.created_at}
                      id={e.id}
                      key={e.id}
                      strikes_count={e.strike_count}
                    />
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <div className="text-center p-6">No Users</div>
        )}
      </div>
      {usersList?.items?.length > 6 ? (
        <div className=" mt-4 flex items-center justify-center w-full">
          <div className="gap-4 flex ">
            <button className="hover:bg-gray-200 py-2 px-4 rounded-xl shadow-sm border-2 border-gray-200">
              Previous
            </button>
            <button className="hover:bg-gray-200 py-2 px-4 rounded-xl shadow-sm border-2 border-gray-200">
              Next
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

const RecentStrikes = ({ setSectionReload }) => {
  const [recentStrikes, setRecentStrikes] = useState(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setRecentStrikes(null);
    const recentStrikesReq = async () => {
      const response = await RequestClient.get(
        "/admin/recent_strikes",
        `page=${page}&size=6`,
        true
      );
      setRecentStrikes(response);
    };
    recentStrikesReq();
  }, [page]);
  if (!recentStrikes) {
    return (
      <div className="w-full flex items-center justify-center ">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  return (
    <>
      <div className="overflow-x-auto border-2 rounded-xl">
        {recentStrikes?.items?.length ? (
          <>
            <table className="table text-center">
              <thead className="">
                <tr>
                  <th>Name</th>
                  <th>Reason</th>
                  <th>Created At</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="">
                {recentStrikes.items.map((e) => {
                  return (
                    <RecentStrikeUserCard
                      setSectionReload={setSectionReload}
                      name={e.user.name}
                      created_at={e.created_at}
                      strikes_count={e.user.strike_count}
                      reason={e.reason}
                      id={e.id}
                      key={e.id}
                    />
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <div className="text-center p-6">No Strikes</div>
        )}
      </div>
      {recentStrikes?.total >= 6 ? (
        <div className=" mt-4 flex items-center justify-center w-full">
          <div className="gap-4 flex ">
            <button
              className="hover:bg-gray-200 py-2 px-4 rounded-xl shadow-sm border-2 border-gray-200"
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
            >
              Previous
            </button>
            <button
              className="hover:bg-gray-200 py-2 px-4 rounded-xl shadow-sm border-2 border-gray-200"
              onClick={() => {
                if (page < recentStrikes.pages) {
                  setPage(page + 1);
                }
              }}
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

const Main = ({ className = "" }) => {
  const [sectionReload, setSectionReload] = useState(null);
  return (
    <div className={`p-6 bg-white h-full ${className}`}>
      <div className="collapse collapse-arrow  bg-white shadow-sm ring ring-gray-200">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-medium">Create Strike</div>
        <div className="collapse-content">
          <CreateStrike setSectionReload={setSectionReload} />
        </div>
      </div>
      <br />
      <div className="collapse collapse-arrow bg-white shadow-sm ring ring-gray-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">Recent Strikes</div>
        <div className="collapse-content">
          <RecentStrikes setSectionReload={setSectionReload} />
        </div>
      </div>
    </div>
  );
};

const HomePageView = () => {
  return (
    <div className="h-[calc(100%-100px)] relative">
      <Main className="" />
    </div>
  );
};

export default HomePageView;
