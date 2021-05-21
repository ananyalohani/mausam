import React from 'react';
import { CgSpinner } from 'react-icons/cg';
import logo from '../assets/logos/logo_expanded_nobg.png';

export default function SpinnerPage() {
  return (
    <div className='fixed h-screen w-screen bg-primary flex flex-col items-center justify-center'>
      <img src={logo} alt='mausam logo' className='sm:mb-8' />
      <CgSpinner
        className='text-white animate-spin'
        style={{ height: 40, width: 40 }}
      />
    </div>
  );
}
