import { Field } from 'formik';
import { useState } from 'react';
import Image from 'next/image';

interface IPasswordInput {
  activeStage: number;
}

export default function PasswordInput({ activeStage }: IPasswordInput) {
  const [showPassword, setShowPassword] = useState(true);

  const placeholder = ['Parola oluştur', 'Parola gereksinimlerine göre oluştur', 'Parola Güçlendir'];
  console.log('activeStage', activeStage);
  return (
    <div className='flex flex-col'>
      <div className='relative flex min-w-[350px] flex-col gap-2'>
        <Field
          name={`password${activeStage}`}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder[activeStage - 1]}
          validate={(value: string) => !value && 'Parola zorunludur.'}
          className='ease h-10 rounded-3xl border border-[var(--accent)] p-3 text-xs outline-none transition delay-150 focus:border-[var(--secondary)]'
        />

        <Image
          alt='eye'
          width={16}
          height={16}
          className='absolute right-4 top-3 cursor-pointer'
          src={`/images/${showPassword ? 'eye' : 'eye-off'}.png`}
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
    </div>
  );
}
