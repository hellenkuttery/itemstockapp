import { Grid } from "@mui/material";
import { AreaChart } from "@tremor/react";
import { useSelector } from "react-redux";

const chartdata = [
  {
    date: "Jan 22",
    SolarPanels: 2890,
    Inverters: 2338,
  },
  {
    date: "Feb 22",
    SolarPanels: 2756,
    Inverters: 2103,
  },
  {
    date: "Mar 22",
    SolarPanels: 3322,
    Inverters: 2194,
  },
  {
    date: "Apr 22",
    SolarPanels: 3470,
    Inverters: 2108,
  },
  {
    date: "May 22",
    SolarPanels: 3475,
    Inverters: 1812,
  },
  {
    date: "Jun 22",
    SolarPanels: 3129,
    Inverters: 1726,
  },
  {
    date: "Jul 22",
    SolarPanels: 3490,
    Inverters: 1982,
  },
  {
    date: "Aug 22",
    SolarPanels: 2903,
    Inverters: 2012,
  },
  {
    date: "Sep 22",
    SolarPanels: 2643,
    Inverters: 2342,
  },
  {
    date: "Oct 22",
    SolarPanels: 2837,
    Inverters: 2473,
  },
  {
    date: "Nov 22",
    SolarPanels: 2954,
    Inverters: 3848,
  },
  {
    date: "Dec 22",
    SolarPanels: 3239,
    Inverters: 3736,
  },
];

const dataFormatter = (number) =>
  `€ ${Intl.NumberFormat("us").format(number).toString()}`;

export default function Charts() {
  const { sales, purchases } = useSelector((state) => state.stock);


  const salesUpdatedData= sales.map((item)=>(

    {
        date:new Date(item.createdAt).toLocaleString(),
        amount:item.amount
    }   

  ))


  const purchaseUpdatedData= purchases.map((item)=>(

    {
        date:new Date(item.createdAt).toLocaleString(),
        amount:item.amount
    }   

  ))


  return (
    <Grid container spacing={2} mt={4} justifyContent="center" alignItems="center"  flexWrap="wrap">
      <Grid item sx={12} md={6}>
        <AreaChart
          className="h-80"
          data={salesUpdatedData}
          index="date"
          categories={["amount"]}
          colors={["red"]}
          valueFormatter={dataFormatter}
          yAxisWidth={60}
          onValueChange={(v) => console.log(v)}
          style={{ border:"1px solid #dddd", borderRadius:"10px" ,width:"80%",padding:"1rem" }}
        />
      </Grid>
      <Grid item sx={12} md={6}>
        <AreaChart
          className="h-80"
          data={purchaseUpdatedData}
          index="date"
          categories={["amount"]}
          colors={["indigo"]}
          valueFormatter={dataFormatter}
          yAxisWidth={60}
          onValueChange={(v) => console.log(v)}
          style={{ border:"1px solid #dddd", borderRadius:"10px" ,width:"80%",padding:"1rem" }}
        />
      </Grid>
    </Grid>
  );
}
