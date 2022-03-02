import React from 'react';
import "./Form.scss"
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
