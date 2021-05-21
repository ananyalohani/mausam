import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div
        style={{ height: '0.5px', width: '100%' }}
        className='bg-white opacity-20 mx-auto mt-3 sm:hidden'
      ></div>
      <p className='sm:text-base text-center font-light opacity-50 mb-5 mt-3 sm:mt-0 sm:mb-3 '>
        Made by{' '}
        <a href='https://ananyalohani.me/' className='font-medium opacity-100'>
          Ananya Lohani
        </a>{' '}
        -{' '}
        <a href='https://devchallenges.io/' className='font-medium underline'>
          devChallenges.io
        </a>
      </p>
    </footer>
  );
}
