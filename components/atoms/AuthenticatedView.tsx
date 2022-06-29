import React from 'react';
import { useAccount } from "@/hooks/useAccount";

export interface IAuthenticatedViewProps {
  children?: React.ReactNode
}

export const AuthenticatedView = ({children}: IAuthenticatedViewProps) => {
  const {isAuthenticated, user} = useAccount();
  
  if(!(isAuthenticated && user)) {
    return null;
  }

  return <>{children}</>;
}

export const UnAuthenticatedView = ({children}: IAuthenticatedViewProps) => {
  const {isAuthenticated, user} = useAccount();

  if(isAuthenticated && user) {
    return null;
  }

  return <>{children}</>;
}