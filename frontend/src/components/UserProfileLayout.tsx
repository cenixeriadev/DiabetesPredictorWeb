import React, { ReactNode } from "react";
import UserProfileSidebar from "./UserProfileSidebar";

interface UserProfileLayoutProps {
  children: ReactNode;
  activePage: "personal" | "evaluaciones" | "password" | "delete";
  title: string;
  subtitle?: string;
}

const UserProfileLayout: React.FC<UserProfileLayoutProps> = ({
  children,
  activePage,
  title,
  subtitle,
}) => {
  return (
    <div className="profileinfo-container">
      <UserProfileSidebar activePage={activePage} />
      <div className="profileinfo-main-content">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {children}
      </div>
    </div>
  );
};

export default UserProfileLayout;
