import React, { useEffect, useState } from "react";
import userService from "src/services/userService";

const Profile = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const response = await userService.getProfile();

        setUser(response.data);

      } 
      catch(error) {

        console.log(error);

      }

    };

    fetchProfile();

  }, []);

  if(!user){

    return <h2>Loading...</h2>;

  }

  return (

    <div>

      <h1>Profile</h1>

      <h3>Name: {user.name}</h3>

      <p>Email: {user.email}</p>

      <p>Role: {user.role}</p>

    </div>

  );

};

export default Profile;