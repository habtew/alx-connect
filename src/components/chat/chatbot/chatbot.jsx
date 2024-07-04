// import { useState, useRef, useEffect} from "react";
// import './chatbot.css'


// const Chatbot = () => {
//     const [messages, setMessages] = useState([]);
//     const inputRef = useRef(null);

//     const sendMessage = () => {
//         const text1 = inputRef.current.value;
//         if (text1 === "") return;

//         const newMessages = [...messages, { name: "User", message: text1 }];
//         setMessages(newMessages);

//         fetch('https://alx-connect.onrender.com/predict', {
//             method: 'POST',
//             body: JSON.stringify({ message: text1 }),
//             mode: 'cors',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(response => response.json())
//             .then(data => {
//                 setMessages([...newMessages, { name: "Sam", message: data.answer }]);
//                 inputRef.current.value = '';
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//                 inputRef.current.value = '';
//             });
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter') {
//             sendMessage();
//         }
//     };

//     useEffect(() => {
//         if (inputRef.current) {
//             inputRef.current.addEventListener('keyup', handleKeyPress);
//         }
//     }, []);

//     return (
//         <div className="chatbox__support chatbox--active">
//             <div className="chatbox__header">
//                 <div className="chatbox__image--header">
//                     <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image" />
//                 </div>
//                 <div className="chatbox__content--header">
//                     <h4 className="chatbox__heading--header">Chat support</h4>
//                     <p className="chatbox__description--header">Hi. My name is Sam. How can I help you?</p>
//                 </div>
//             </div>
//             <div className="chatbox__messages">
//                 {messages.slice().reverse().map((item, index) => (
//                     <div key={index} className={`messages__item messages__item--${item.name === "Sam" ? 'visitor' : 'operator'}`}>
//                         {item.message}
//                     </div>
//                 ))}
//             </div>
//             <div className="chatbox__footer">
//                 <input type="text" placeholder="Write a message..." ref={inputRef} />
//                 <button className="chatbox__send--footer send__button" onClick={sendMessage}>Send</button>
//             </div>
//         </div>
//     );
// };

// export default Chatbot;


// import { useState, useRef, useEffect } from "react";
// import './chatbot.css';

// const Chatbot = () => {
//     const [messages, setMessages] = useState([]);
//     const inputRef = useRef(null);

//     const sendMessage = async () => {
//         const text1 = inputRef.current.value;
//         if (text1 === "") return;

//         const newMessages = [...messages, { name: "User", message: text1 }];
//         setMessages(newMessages);
//         inputRef.current.value = '';

//         try {
//             const response = await fetch('https://alx-connect.onrender.com/predict', {
//                 method: 'POST',
//                 body: JSON.stringify({ message: text1 }),
//                 mode: 'cors',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             const data = await response.json();
//             setMessages((prevMessages) => [...prevMessages, { name: "Sam", message: data.answer }]);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter') {
//             sendMessage();
//         }
//     };

//     useEffect(() => {
//         if (inputRef.current) {
//             inputRef.current.addEventListener('keydown', handleKeyPress);
//         }
//         return () => {
//             if (inputRef.current) {
//                 inputRef.current.removeEventListener('keydown', handleKeyPress);
//             }
//         };
//     }, []);

//     return (
//         <div className="chatbox__support chatbox--active">
//             <div className="chatbox__header">
//                 <div className="chatbox__image--header">
//                     <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image" />
//                 </div>
//                 <div className="chatbox__content--header">
//                     <h4 className="chatbox__heading--header">Chat support</h4>
//                     <p className="chatbox__description--header">Hi. My name is Sam. How can I help you?</p>
//                 </div>
//             </div>
//             <div className="chatbox__messages">
//                 {messages.slice().reverse().map((item, index) => (
//                     <div key={index} className={`messages__item messages__item--${item.name === "Sam" ? 'visitor' : 'operator'}`}>
//                         {item.message}
//                     </div>
//                 ))}
//             </div>
//             <div className="chatbox__footer">
//                 <input type="text" placeholder="Write a message..." ref={inputRef} />
//                 <button className="chatbox__send--footer send__button" onClick={sendMessage}>Send</button>
//             </div>
//         </div>
//     );
// };

// export default Chatbot;


import { useState, useRef, useEffect } from "react";
import './chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const inputRef = useRef(null);

    const sendMessage = async () => {
        const text1 = inputRef.current.value;
        if (text1 === "") return;

        setMessages((prevMessages) => [...prevMessages, { name: "User", message: text1 }]);
        inputRef.current.value = '';

        try {
            const response = await fetch('https://alx-connect.onrender.com/predict', {
                method: 'POST',
                body: JSON.stringify({ message: text1 }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            setMessages((prevMessages) => [...prevMessages, { name: "Sam", message: data.answer }]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener('keydown', handleKeyPress);
        }
        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('keydown', handleKeyPress);
            }
        };
    }, []);

    return (
        <div className="chatbox__support chatbox--active">
            <div className="chatbox__header">
                <div className="chatbox__image--header">
                    <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png" alt="image" />
                </div>
                <div className="chatbox__content--header">
                    <h4 className="chatbox__heading--header">Chat support</h4>
                    <p className="chatbox__description--header">Hi. My name is Sam. How can I help you?</p>
                </div>
            </div>
            <div className="chatbox__messages">
                {messages.slice().reverse().map((item, index) => (
                    <div key={index} className={`messages__item messages__item--${item.name === "Sam" ? 'visitor' : 'operator'}`}>
                        {item.message}
                    </div>
                ))}
            </div>
            <div className="chatbox__footer">
                <input type="text" placeholder="Write a message..." ref={inputRef} />
                <button className="chatbox__send--footer send__button" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
