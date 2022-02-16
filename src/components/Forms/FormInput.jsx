import React from 'react';

const FormInput = ({handleChange,Label, ...otherProprs}) => {
  return (
      <div className="formRow">
          {Label &&(
              <label>
                  {Label}
              </label>
          )}
          <input className='formInput' onChange={handleChange} {...otherProprs}/>
      </div>
  );
}

export default FormInput;
