import React from "react";
import ProjectAnchor from "../components/ProjectAnchor";

import ProfileForm from "../components/ProfileStep/ProfileForm";
import RoleSelection from "../components/RoleSelection";

const Home = () => {
  return (
    <div>
      <RoleSelection />
      <ProjectAnchor />
      <ProfileForm />
    </div>
  );
};

export default Home;
