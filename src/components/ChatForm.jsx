
import { BiSend } from 'react-icons/bi';

const ChatForm = ({ text, setText, submitHandler, isResponseLoading, errorText }) => {
  return (
    <div className='main-bottom'>
      {errorText && <p className='errorText'>{errorText}</p>}
      <form className='form-container' onSubmit={submitHandler}>
        <input
          type='text'
          placeholder='Send a message.'
          spellCheck='false'
          value={isResponseLoading ? 'Processing...' : text}
          onChange={(e) => setText(e.target.value)}
          readOnly={isResponseLoading}
        />
        {!isResponseLoading && (
          <button type='submit'>
            <BiSend size={20} />
          </button>
        )}
      </form>
      <p>MimirAI can make mistakes. Consider checking important information.</p>
    </div>
  );
};
export default ChatForm;

