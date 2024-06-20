import React from 'react';

interface Props {
  name: string;
  capital: string;
  borders: string[];
  onClick: React.MouseEventHandler;
}

const PostCountries: React.FC<Props> = React.memo(({name, capital, borders,onClick}) => {
  return (
    <article className="PostCountries" onClick={onClick}>
      <h2>{name}</h2>
      <div className="Info">
        <div className="Capital">{capital}</div>
        <div className="Borders">{borders}</div>
      </div>
    </article>
  );
});

export default PostCountries;