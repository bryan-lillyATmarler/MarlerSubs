import { useContext, useState } from "react";
import { initializeIcons, Image } from "@fluentui/react";
import { useData } from "@microsoft/teamsfx-react";
import { TeamsFxContext } from "../Context";
import { useEffect } from "react";
import Dashboard from "./Admin/Dashboard";
import SubForm  from "./SubForm";
import SubTable from "./SubTable";

export function Home() {
  const { teamsfx } = useContext(TeamsFxContext);
  const { loading, data, error } = useData(async () => {
    if (teamsfx) {
      const userInfo = await teamsfx.getUserInfo();
      return userInfo;
    }
  });
  const userName = (loading || error) ? "": data.displayName;

  initializeIcons();

  const [subData, setSubData] = useState([]);

  useEffect(() => {
    fetchUserData();
    //eslint-disable-next-line
  }, [loading, subData]);

  //data from DB
  

  const url = 'https://marler-api.herokuapp.com/api/v1/subs';

  //fetch users sub documents
  const fetchUserData = () => {
    if (userName) {
      fetch(`${url}?user=${userName}`, {
        method: 'GET',
        // mode: 'no-cors'
      }).then((res) => res.json())
        .then((data) => {
            if(data.success){
                let sortedData = data.data.sort((a, b) => {
                  return new Date(b.date) - new Date(a.date)
                })
                setSubData(sortedData);
            } else {
                
            }          
        });
    }
  }

  return (
    <>
      <div className="">
        <Image className="mx-auto" src='/marlerTrans.png' alt="Marler Integrity" width={350} />
        <h1 className="text-center">{userName ? userName : "Can't find your username"}</h1>
      </div>
      {userName !== 'Byan Lilly' &&
        <>
          <SubForm data={subData} setData={setSubData} userName={userName} />

          <div className="px-5 mb-10">
            <SubTable data={subData} setData={setSubData} />
          </div>
        </>
      }

      {/* ADMIN STUFF */}
      {userName === 'Byan Lilly' &&
        <>
          <div>
            <h1 className="text-2xl text-center">Sub Administration Dashboard</h1>
          </div>

          <Dashboard />
        </>
      }
      <div className="h-40"></div>
    </>
  );
}