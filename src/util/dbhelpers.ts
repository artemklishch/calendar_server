// const Chart = require("../models/Chart");

// exports.getMetricsUpdateMeta = (object) => {
//   const {
//     Price1,
//     PreviosPrice1,
//     month1,
//     Price2,
//     PreviosPrice2,
//     month2,
//     Price3,
//     PreviosPrice3,
//     month3,
//     id,
//   } = object;
//   const sql = `
//         UPDATE metricdata 
//         SET Price1=?, 
//             PreviosPrice1=?,
//             month1=?,
//             Price2=?, 
//             PreviosPrice2=?,
//             month2=?,
//             Price3=?, 
//             PreviosPrice3=?,
//             month3=?
//         WHERE id=?
//       `;
//   const data = [
//     Price1,
//     PreviosPrice1,
//     month1,
//     Price2,
//     PreviosPrice2,
//     month2,
//     Price3,
//     PreviosPrice3,
//     month3,
//     id,
//   ];
//   return { sql, data };
// };

// exports.getSaveNewChartMeta = (chart) => {
//   const {
//     id,
//     name,
//     priceColor,
//     prevPriceColor,
//     description,
//     priceTitle,
//     prevPriceTitle,
//     isReserved,
//     metricDataKey,
//     metricData,
//     createdAt,
//   } = chart;
//   const sql_commondata =
//     "INSERT INTO commondata(id,name,priceColor,prevPriceColor,description,priceTitle,prevPriceTitle,isReserved,metricDataKey,createdAt) VALUES(?,?,?,?,?,?,?,?,?,?)";
//   const commondata = [
//     id,
//     name,
//     priceColor,
//     prevPriceColor,
//     description,
//     priceTitle,
//     prevPriceTitle,
//     isReserved,
//     metricDataKey,
//     createdAt,
//   ];
//   const sql_metricdata =
//     "INSERT INTO metricdata(id,Price1,PreviosPrice1,month1,Price2,PreviosPrice2,month2,Price3,PreviosPrice3,month3) VALUES(?,?,?,?,?,?,?,?,?,?)";
//   const metricdata = [
//     id,
//     metricData[0].Price,
//     0,
//     metricData[0].month,
//     metricData[1].Price,
//     0,
//     metricData[1].month,
//     metricData[2].Price,
//     0,
//     metricData[2].month,
//   ];
//   return { sql_commondata, commondata, sql_metricdata, metricdata };
// };

// exports.getEditChartMeta = (id, updatedChartsData) => {
//   const sql =
//     "UPDATE commondata SET name=?, priceColor=?, prevPriceColor=?, description=? WHERE id=?";
//   const data = [
//     updatedChartsData.name,
//     updatedChartsData.priceColor,
//     updatedChartsData.prevPriceColor,
//     updatedChartsData.description,
//     id,
//   ];
//   return { sql, data };
// };
