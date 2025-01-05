import { usePasswordWizard } from '@/context/PasswordWizardContextProvider';

export default function PasswordAnalysis() {
  const { stages } = usePasswordWizard();

  return (
    <div className='mb-12 rounded-md border p-4 shadow-md'>
      <h2 className='mb-4 text-lg font-bold'>Kullanıcı Parola Analizi:</h2>
      <ul className='space-y-2'>
        {stages.map((stage, index) => (
          <li key={stage.id} className='mb-4'>
            <h3 className='text-md mb-3 font-semibold text-[var(--primary)]'>Aşama {index + 1}</h3>
            <ul className='list-inside list-disc space-y-1'>
              <li className='text-[var(--secondary)]'>
                Şifre: <span className='text-[var(--primary)]'>{stage.password}</span>
              </li>
              <li className='text-[var(--secondary)]'>
                Güç: <span className='text-[var(--primary)]'>{stage.strength} {stage.value}</span>
              </li>
              <li className='text-[var(--secondary)]'>
                Uzunluk: <span className='text-[var(--primary)]'>{stage.length} karakter</span>
              </li>
              <li className='text-[var(--secondary)]'>
                Küçük Harf: <span className='text-[var(--primary)]'>{stage.hasLowerCase ? 'Evet' : 'Hayır'}</span>
              </li>
              <li className='text-[var(--secondary)]'>
                Büyük Harf: <span className='text-[var(--primary)]'>{stage.hasUpperCase ? 'Evet' : 'Hayır'}</span>
              </li>
              <li className='text-[var(--secondary)]'>
                Özel Karakter: <span className='text-[var(--primary)]'>{stage.hasSpecialChars ? 'Evet' : 'Hayır'}</span>
              </li>
              <li className='text-[var(--secondary)]'>
                Ortak Şifre: <span className='text-[var(--primary)]'>{stage.is_common_password ? 'Evet' : 'Hayır'}</span>
              </li>
              <li className='text-[var(--secondary)]'>
                Sözlük Kelimesi İçeriyor:{' '}
                <span className='text-[var(--primary)]'>{stage.contains_dictionary_word ? 'Evet' : 'Hayır'}</span>
              </li>
              <li className='text-[var(--secondary)]'>
                Entropi: <span className='text-[var(--primary)]'>{stage.entropy}</span>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
