import {
  InputBox,
  ItemInput,
  ItemLabel,
  ItemWrapper,
  RedText,
} from '../../pages/objet/ObjetStyles'

interface ItemProps {
  label: string
  className?: string
  longtext?: boolean
  img?: boolean
  input: JSX.Element
  helperText?: string
}

export function InputItem({
  label,
  className,
  longtext,
  img,
  input,
  helperText,
}: ItemProps) {
  return (
    <ItemWrapper>
      <ItemLabel>
        {label}
        <RedText>*</RedText>
      </ItemLabel>
      <ItemInput>
        <InputBox className={className} longtext={longtext} img={img}>
          {input}
        </InputBox>
        <RedText
          style={{
            marginTop: '10px',
            width: '218px',
            height: className === 'name' ? '23px' : '12px',
          }}
        >
          {helperText}
        </RedText>
      </ItemInput>
    </ItemWrapper>
  )
}
