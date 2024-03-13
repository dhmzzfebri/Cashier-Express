'use client';
import Sidebar from '@/components/Sidebar';
import Wrapper from '@/components/Wrapper';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Setting() {
  //Pemeriksaan autentikasi login
  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (!authToken) {
      // Jika tidak ada token autentikasi, redirect ke halaman login
      window.location.href = '/login';
    }
  }, []);
  return (
    <>
      <Sidebar />
      <Wrapper
        childrenElement={
          <>
            <h2>Setting Page</h2>
          </>
        }
      />
    </>
  );
}
