import { useAppSelector } from '@/shared/hooks/reduxHooks';
import React, { ReactNode, useEffect } from 'react'
import { Navigate } from 'react-router-dom';

type ProtectedRouterProps = {
    children: ReactNode;
}

export const ProtectedRouter: React.FC<ProtectedRouterProps> = ({children}) => {
  const { lyricFile } = useAppSelector((state) => state.lyricFile);
  const { user } = useAppSelector((state) => state.user);

  

  return user?.isAdmin || lyricFile?.public || lyricFile?.userId === user?.id ? children : <Navigate to={"/"}/>
}

export default ProtectedRouter