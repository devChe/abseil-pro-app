import React, { useState } from "react";

const WeeklyTable = ({ staff, jobs }) => {
  const [startDate, setStartDate] = useState(new Date());

  const handlePrevWeek = () => {
    const prevWeek = new Date(startDate.getTime());
    prevWeek.setDate(prevWeek.getDate() - 7);
    setStartDate(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(startDate.getTime());
    nextWeek.setDate(nextWeek.getDate() + 7);
    setStartDate(nextWeek);
  };

  const calculateWeek = () => {
    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const week = [];
    const currentDate = new Date(startDate.getTime());
    const currentDayOfWeek = currentDate.getDay();
    const daysToAdd = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
    currentDate.setDate(currentDate.getDate() - daysToAdd);

    for (let i = 0; i < 7; i++) {
      const day = new Date(currentDate.getTime());
      day.setDate(day.getDate() + i);
      week.push(day);
    }

    return week;
  };

  const renderTableHeader = (week) => {
    return (
      <thead>
        <tr>
          <th>Staff</th>
          {week.map((day) => (
            <th key={day.toISOString()}>
              <div>
                <span>
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <br />
                <span>
                  {day.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </th>
          ))}
          <th>Total</th>
        </tr>
      </thead>
    );
  };

  const renderTableRows = (week, loginsByStaff) => {
    const tableRows = staff.map((staffMember) => {
      const staffJobs = jobs.filter((job) => job.staff === staffMember.name);

      return (
        <tr key={staffMember.name}>
          <td style={{textAlign:"center",border:"1px solid #dddddd"}}>{staffMember.name}</td>
          {week.map((day) => {
            const dateString = day.toISOString().split("T")[0];
            const jobForDate = staffJobs.find((job) => {
              const jobDate = new Date(job.date.seconds * 1000);
              const jobDateString = jobDate.toISOString().split("T")[0];
              return jobDateString === dateString;
            });
            const midnight = new Date(day).toLocaleString().split(",")[0];
            const midnightEpoch = new Date(midnight).getTime();
            console.log(midnightEpoch);
            const loginTime =
              loginsByStaff[staffMember.name] &&
              loginsByStaff[staffMember.name][midnightEpoch]
                ? loginsByStaff[staffMember.name][midnightEpoch]
                : "-";
            if (loginTime !== "-") {
              if (loginsByStaff[staffMember.name].totalTime)
                loginsByStaff[staffMember.name].totalTime += Number(
                  loginTime.replace(":", ".")
                );
              else
                loginsByStaff[staffMember.name].totalTime = Number(
                  loginTime.replace(":", ".")
                );
            }
            return <td style={{textAlign:"center",border:"1px solid #dddddd"}} key={dateString}>{loginTime}</td>;
          })}
          <td style={{textAlign:"center",border:"1px solid #dddddd"}}>
            {loginsByStaff[staffMember.name]
              ? loginsByStaff[staffMember.name].totalTime
              : "-"}
          </td>
        </tr>
      );
    });

    return tableRows;
  };

  const week = calculateWeek();

  const loginsByStaff = {};

  jobs.forEach((job) => {
    if (job.login) {
      job.login.forEach((login) => {
        if (loginsByStaff[login.staff]) {
          loginsByStaff[login.staff][login.date.seconds * 1000] = login.time;
        } else {
          loginsByStaff[login.staff] = {
            [login.date.seconds * 1000]: login.time,
            getTotalTime: function () {
              return Object.values(this).reduce((a, b) => {
                if (typeof b !== "function") {
                  return a + Number(b.replace(":", "."));
                } else {
                  return a;
                }
              }, 0);
            },
          };
        }
      });
    }
  });

  return (
    <div>
      <button onClick={handlePrevWeek}>Previous Week</button>
      <button onClick={handleNextWeek}>Next Week</button>
      <table style={{borderCollapse: "collapse", width:"100%"}}>
        {renderTableHeader(week)}
        <tbody>{renderTableRows(week, loginsByStaff)}</tbody>
      </table>
      <style jsx>{`
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }

        td {
            text-align: center;
        }

        th {
          border: 1px solid #dddddd;
          padding: 8px;
          white-space: nowrap;
          transition: 0.15s ease;
        }

        tr:hover {
          background-color: lightgrey;
          color: white;
          cursor: pointer;
        }

        tr:active {
          background: darkgrey;
        }
      `}</style>
    </div>
  );
};

export default WeeklyTable;
