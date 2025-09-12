import styled from 'styled-components';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'password' | 'email' | 'number' | 'date';
  maxLength?: number;
  inputMode?: 'text' | 'numeric' | 'email';
  pattern?: string;
  className?: string;
}

export default function Input({ 
  placeholder,
  value, 
  onChange,
  type = 'text',
  maxLength,
  inputMode,
  pattern,
  className
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange?.(inputValue);
  };

  return (
    <StyledInput
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      type={type}
      maxLength={maxLength}
      inputMode={inputMode}
      pattern={pattern}
      className={className}
    />
  );
}

const StyledInput = styled.input`
  width: 100%;
  height: 50px;
  background-color: #E8F1FF;
  border-radius: 10px;
  padding: 0 15px;
  font-size: 1rem;
  font-family: 'nanum-square';
  color: #000000;
  outline: none;
  border: none;
  box-sizing: border-box;
  
  &::placeholder {
    color: #999;
  }
  
  &:focus {
    outline: 2px solid #6787CE;
    outline-offset: 2px;
  }
`;
