interface IDecisionNotification {
  setActiveStage: (value: number) => void;
  setAcceptedPassword: (value: boolean) => void;
}

export default function DecisionNotification({ setActiveStage, setAcceptedPassword }: IDecisionNotification) {
  return (
    <div>
      <div className='text-center text-sm'>
        Daha güçlü bir parola oluşturmak güvenliğinizi artırır. Devam etmek istiyor musunuz?
      </div>

      <div className='align-center mt-8 flex justify-center gap-12'>
        <button
          type='button'
          className='text-[var(--secondary)]'
          onClick={() => {
            setActiveStage(3);
            setAcceptedPassword(true);
          }}
        >
          Hayır
        </button>

        <button type='button' className='text-[var(--success)]' onClick={() => setActiveStage(4)}>
          Evet
        </button>
      </div>
    </div>
  );
}
