import React from 'react';

const FormInput = ({handleCahnge,Label, ...otherProprs}) => {
  return (
      <div className="formRow">
          {Label &&(
              <label>
                  {Label}
              </label>
          )}
          <input className='formInput' onChange={handleCahnge} {...otherProprs}/>
      </div>
  );
}

export default FormInput;
