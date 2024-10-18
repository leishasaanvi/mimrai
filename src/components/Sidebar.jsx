
import { BiPlus, BiSolidUserCircle } from 'react-icons/bi';
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md';

const Sidebar = ({ createNewChat, backToHistoryPrompt, isShowSidebar, toggleSidebar, previousChats, localChats }) => {
  const uniqueTitles = Array.from(new Set(previousChats.map((prevChat) => prevChat.title).reverse()));
  const localUniqueTitles = Array.from(new Set(localChats.map((prevChat) => prevChat.title).reverse())).filter(
    (title) => !uniqueTitles.includes(title)
  );

  return (
    <section className={`sidebar ${isShowSidebar ? 'open' : ''}`}>
      <div className='sidebar-header' onClick={createNewChat} role='button'>
        <BiPlus size={20} />
        <button>New Chat</button>
      </div>

      <div className='sidebar-history'>
        {uniqueTitles.length > 0 && previousChats.length !== 0 && (
          <>
            <p>Ongoing</p>
            <ul>
              {uniqueTitles.map((uniqueTitle, idx) => (
                <li key={idx} onClick={() => backToHistoryPrompt(uniqueTitle)}>
                  {uniqueTitle}
                </li>
              ))}
            </ul>
          </>
        )}
        {localUniqueTitles.length > 0 && localChats.length !== 0 && (
          <>
            <p>Previous</p>
            <ul>
              {localUniqueTitles.map((uniqueTitle, idx) => (
                <li key={idx} onClick={() => backToHistoryPrompt(uniqueTitle)}>
                  {uniqueTitle}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className='sidebar-info'>
       
        <div className='sidebar-info-user'>
          <BiSolidUserCircle size={20} />
          <p>User</p>
        </div>
      </div>

      {isShowSidebar ? (
        <MdOutlineArrowRight className='burger' size={28.8} onClick={toggleSidebar} />
      ) : (
        <MdOutlineArrowLeft className='burger' size={28.8} onClick={toggleSidebar} />
      )}
    </section>
  );
};

export default Sidebar;
