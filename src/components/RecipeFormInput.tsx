import React from 'react'
import { TextInput, Textarea } from 'flowbite-react';

type RecipeFormInputProps = {
    inputType: string;
    name: string;
    placeholder: string;
    label?: boolean;
    onInputChange: (label: string, inputValue: string) => void;
    value?: string;
  };

const RecipeFormInput: React.FC<RecipeFormInputProps> = ({inputType, name, placeholder, label, onInputChange, value}) => {

    const [input, setInput] = React.useState('');
    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    }

    React.useEffect(() => {
        if(value) {
            setInput(value);
        }
    }, [])

    React.useEffect(() => { 
        onInputChange(name.toLowerCase(), input); 
    }, [input])

  return (
    <div className='mb-6'>
        {label ? <p className='mb-2'>{name}</p> : null}
        {inputType === 'textarea' ? 
        <Textarea
        placeholder={placeholder}
        required
        rows={4}
        onChange={(event) => handleInput(event)}
        value={input}
      /> 
      : 
      <TextInput 
        id="name" 
        placeholder={placeholder}
        sizing="md" 
        type={inputType}
        className="min-w-0" 
        onChange={(event) => handleInput(event)}
        value={input}
        required
      />
    }
    </div>
  )
}

export default RecipeFormInput