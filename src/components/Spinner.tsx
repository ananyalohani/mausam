import * as React from 'react';
import { CgSpinner } from 'react-icons/cg';

export default function Spinner(props: { size?: number }) {
  return (
    <div>
      <CgSpinner
        className='text-white animate-spin'
        style={{
          width: props ? props.size : 20,
          height: props ? props.size : 20,
        }}
      />
    </div>
  );
}
