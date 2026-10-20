import React from "react";

/*
function loadDashboard()
{
   return import("./views/dashboard/Dashboard");
}
const Dashboard = React.lazy(loadDashboard);*/

const Dashboard = React.lazy(() =>
  import("./views/dashboard/Dashboard")
);


const ResidentDashboard = React.lazy(() =>
  import("./views/resident/ResidentDashboard")
);


const Apartments = React.lazy(() =>
  import("./views/apartments/Apartments")
);


const MyApartment = React.lazy(() =>
  import("./views/apartments/MyApartment")
);


const Residents = React.lazy(() =>
  import("./views/residents/Residents")
);


const Complaints = React.lazy(() =>
  import("./views/complaints/Complaints")
);


const MyComplaints = React.lazy(() =>
  import("./views/resident/MyComplaints")
);


const Notices = React.lazy(() =>
  import("./views/notices/Notices")
);


// ADD THIS
const MyNotices = React.lazy(() =>
  import("./views/resident/MyNotices")
);


const Profile = React.lazy(() =>
  import("./views/profile/Profile")
);



export const routes = [


  {
    path:"/dashboard",
    name:"Dashboard",
    element:Dashboard
  },


  {
    path:"/resident-dashboard",
    name:"Resident Dashboard",
    element:ResidentDashboard
  },


  {
    path:"/apartments",
    name:"Apartments",
    element:Apartments
  },


  {
    path:"/my-apartment",
    name:"My Apartment",
    element:MyApartment
  },


  {
    path:"/residents",
    name:"Residents",
    element:Residents
  },


  {
    path:"/complaints",
    name:"Complaints",
    element:Complaints
  },


  {
    path:"/my-complaints",
    name:"My Complaints",
    element:MyComplaints
  },


  {
    path:"/notices",
    name:"Notices",
    element:Notices
  },


  {
    path:"/my-notices",
    name:"My Notices",
    element:MyNotices
  },


  {
    path:"/profile",
    name:"Profile",
    element:Profile
  }


];


export default routes;