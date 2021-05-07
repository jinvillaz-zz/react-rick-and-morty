import React from 'react';
import { css } from '@emotion/core';
import PuffLoader from 'react-spinners/PuffLoader';

const override = css`
  display: block;
  margin: 10% auto auto 5%;
`;

export const Loader = () => {
  return (
    <div>
      <PuffLoader color="#b3ccff" loading css={override} size={250}/>
    </div>
  );
};
