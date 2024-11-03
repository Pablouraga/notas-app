import './NotesApp.css';
import { useEffect, useState } from 'react';
import './index.css';
import { format } from 'date-fns';


function NotesApp() {

  const [notes, setNotes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  useEffect(() => {
    //dark mode on load
    // if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //   setDarkMode(true);
    //   document.documentElement.classList.add('dark');
    // }
    fetch('http://localhost:8000/notes')
      .then(response => response.json())
      .then(data => setNotes(data))
      .then(() => {
        console.log(notes);
      })
      .catch(error => console.log(error));
  }, []);

  const inputClasses = "block py-2.5 px-0 w-full text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";
  const labelClasses = "absolute text-m text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto";
  const cardClasses = "bg-card shadow-lg rounded-lg p-4";
  const buttonClasses = "mt-3 w-full hover:bg-primary/80 py-2 rounded-lg text-gray-900 dark:text-gray-400";

  const handleCreateNote = () => {
    const newNote = { title, content };
    fetch('http://localhost:8000/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
      .then(response => response.json())
      .then(data => {
        setNotes(prevNotes => [...prevNotes, data]);
        setTitle(''); // Limpiar el título
        setContent(''); // Limpiar el contenido
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='Notes-app'>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-800 text-primary-foreground">
        <form className="max-w-sm w-full bg-card shadow-lg rounded-lg p-6">
          <div className="relative z-0">
            <input type="text" id="floating_title_input" className={inputClasses} placeholder=" " />
            <label htmlFor="floating_title_input" className={labelClasses}>Title</label>
          </div>

          <div className="relative z-0 mt-3">
            <textarea type="text" id="floating_content_input" className={inputClasses} placeholder=" " rows={3} />
            <label htmlFor="floating_content_input" className={labelClasses}>Content</label>
          </div>

          <button type="button" className={buttonClasses} onSubmit={handleCreateNote}>
            Create note
          </button>
        </form>

        <button onClick={toggleDarkMode} className="dark-mode-button text-black dark:text-white mt-4">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <div className="flex justify-center p-4">
          <div className='notes-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4'>
            {notes.map((note) => (
              <div key={note.id} className={cardClasses}>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
                <p>Creation date: {format(new Date(note.created_at), 'dd MMMM yyyy, HH:mm')}</p>
                <p>Updated date: {format(new Date(note.updated_at), 'dd MMMM yyyy, HH:mm')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

}

export default NotesApp;
