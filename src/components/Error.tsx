import React from 'react';
import { BiError } from 'react-icons/bi';

export default function Error() {
  return (
    <div className='fixed h-screen w-screen bg-primary flex flex-col items-center justify-center'>
      <div className='flex flex-row items-center mb-5'>
        <BiError className='inline w-10 h-10 text-brightAccent mr-2' />
        <h1 className='inline'>There was an error loading the page.</h1>
      </div>
      <p>This might be due to a weak internet connection.</p>
      <p>
        If that's not the case, let me know by emailing me at{' '}
        <a
          href='mailto:contact@ananyalohani.me'
          className='text-brightAccent underline'
        >
          contact@ananyalohani.me.
        </a>
      </p>
    </div>
  );
}
