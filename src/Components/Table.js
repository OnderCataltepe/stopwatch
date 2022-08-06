import styles from "./Table.module.css";
import { useSelector } from "react-redux";
import { convertTimeFunc } from "../redux/TimeSlice";
import { useState, useEffect } from "react";
const Table = () => {
  const isLap = useSelector((state) => state.timeReducer.isLap);
  const oTimes = useSelector((state) => state.timeReducer.overallTimes);
  const [timeList, setTimeList] = useState([]);
  const [extremum, setExtremum] = useState([]);
  const [extremaIndex, setExtremaIndex] = useState({});

  const findExtremum = (arr) => {
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const maxIndex = arr.indexOf(max);
    const minIndex = arr.indexOf(min);
    setExtremaIndex({ max: maxIndex, min: minIndex });
  };
  useEffect(() => {
    if (oTimes.length > 1) {
      let convLapTime = convertTimeFunc(
        oTimes[oTimes.length - 1] - oTimes[oTimes.length - 2]
      );
      let convOvTime = convertTimeFunc(oTimes[oTimes.length - 1]);
      let newListElement = {
        index: oTimes.length - 1,
        lapTime: convLapTime,
        ovTime: convOvTime,
      };
      setTimeList((prev) => [...prev, newListElement]);
      setExtremum((prev) => [
        ...prev,
        oTimes[oTimes.length - 1] - oTimes[oTimes.length - 2],
      ]);
    }
  }, [oTimes.length]);

  useEffect(() => {
    if (!isLap) {
      setTimeList([]);
      setExtremum([]);
    }
    if (extremum.length > 1) {
      findExtremum(extremum);
    }
  }, [extremum.length, isLap]);

  const classLap = (index) => {
    if (extremum.length > 1) {
      if (index - 1 === extremaIndex.min) {
        return "minPurple";
      } else if (index - 1 === extremaIndex.max) {
        return "maxRed";
      } else {
        return null;
      }
    }
  };

  return (
    isLap && (
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Lap</th>
              <th>Lap Times</th>
              <th>Overall Time</th>
            </tr>
          </thead>
          <tbody>
            {timeList.length > 0 &&
              timeList.map((time, index) => {
                return (
                  <tr key={index}>
                    <td className={styles[classLap(time.index)]}>
                      {time.index}
                    </td>
                    <td>
                      {time.lapTime.hours}:{time.lapTime.minutes}:
                      {time.lapTime.seconds}.{time.lapTime.mSeconds}
                    </td>
                    <td>
                      {time.ovTime.hours}:{time.ovTime.minutes}:
                      {time.ovTime.seconds}.{time.ovTime.mSeconds}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    )
  );
};

export default Table;
