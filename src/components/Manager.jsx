import React, { use, useEffect } from 'react'
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {v4 as uuidv4} from 'uuid';

const Manager = () => {
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        } else {
            setPasswordArray([]);
        }
    }, []);

    const ref = useRef();
    const passRef = useRef();
    const [form, setForm] = useState({
        website: '',
        username: '',
        password: ''
    });
    const [passwordArray, setPasswordArray] = useState([]);
    const showPassword = () => {
        if (ref.current.src.includes("eye-slash")) {
            ref.current.src = "src/svgs/eye.svg";
            ref.current.alt = "Show";
            passRef.current.type = "text";
            return;
        }
        ref.current.src = "src/svgs/eye-slash.svg";
        ref.current.alt = "Hide";
        passRef.current.type = "password";
    }
    const savePassword = () => {
        if (form.website.length >= 5 && form.username.length >= 3 && form.password.length >= 6) {
    console.log(form);
    const newEntry = { ...form, id: uuidv4() };

    setPasswordArray([...passwordArray, newEntry]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, newEntry]));

    toast('Password Saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    console.log(passwordArray);
} else {
    toast.error("Please fill all fields correctly!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
}

}
    const deletePassword = (id)=>{
       console.log("Deleting Password with id:",id);
       if(confirm("Are you sure you want to delete this password?")){
          passwordArray.splice(passwordArray.findIndex(item=>item.id===id),1);
       setPasswordArray([...passwordArray]);
       localStorage.setItem("passwords", JSON.stringify([...passwordArray]));
        toast('Password Deleted Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
       }
    }
    const editPassword = (id)=>{
       console.log("Editing pasword with id:",id);
       if(confirm("Are you sure you want to edit this password?")){
      setForm(passwordArray.find(item=>item.id===id));
      setPasswordArray(passwordArray.filter(item=>item.id!==id));
       }
    }
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.placeholder.toLowerCase()]: e.target.value
        });

    }
    const copyText = (text) => {
        return () => {
            navigator.clipboard.writeText(text);
            toast('Copied to clipboard!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    return (

        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className='min-h-[80vh] relative overflow-hidden'>
                {/* Background effect */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
                </div>

                {/* Container */}
                <div className="md:container py-2 mx-auto">
                    {/* Header */}
                    <div className="py-4">
                        <div className="text-3xl font-bold text-center">
                            <span className="text-green-600">&lt;</span>
                            Pass
                            <span className="text-green-600">OP/&gt;</span>
                        </div>
                        <p className="text-center text-green-800 text-lg">
                            Your Own Password Manager
                        </p>
                    </div>

                    {/* Form */}
                    <div className="flex flex-col px-6 md:px-40 gap-4 items-center">
                        <input
                            value={form.website}
                            onChange={handleChange}
                            className="rounded-full border border-green-500 w-full px-4 py-1"
                            type="text"
                            placeholder="Website"
                        />
                        <div className="flex justify-between gap-8 w-full">
                            <input
                                value={form.username}
                                onChange={handleChange}
                                className="rounded-full border border-green-500 w-full px-4 py-1"
                                type="text"
                                placeholder="Username"
                            />
                            <div className='relative w-full'>
                                <input
                                    ref={passRef}
                                    value={form.password}
                                    onChange={handleChange}
                                    className="rounded-full border border-green-500 w-full px-4 py-1"
                                    type="password"
                                    placeholder="Password"
                                />
                                <span className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer' onClick={showPassword}>
                                    <img ref={ref} src="src/svgs/eye.svg" width="24" height="24" alt="Show" /></span>
                            </div>
                        </div>

                        {/* Button with LordIcon */}
                        <button onClick={savePassword} className="flex text-md font-bold md:justify-center gap-1 bg-green-500 px-24 md:px-6 py-1 w-fit rounded-full items-center hover:bg-green-300">
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover"
                                style={{ width: "30px", height: "30px" }}
                            ></lord-icon>
                            Save
                        </button>

                       <div className="w-full overflow-x-auto">
  {passwordArray.length === 0 && <div>No Password to display</div>}
  {passwordArray.length !== 0 && (
    <table className="w-full rounded-xl border border-green-500">
      <thead className="bg-green-700 text-white text-sm sm:text-base">
        <tr>
          <th className="px-2 py-2">Website</th>
          <th className="px-2 py-2">Username</th>
          <th className="px-2 py-2">Password</th>
          <th className="px-2 py-2">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-green-100 text-sm sm:text-base">
        {passwordArray.map((item, index) => (
          <tr key={index} className="text-center border-t border-green-500">
            <td className="px-2 py-2">
              <div
                className="flex gap-2 justify-center items-center"
                onClick={() => copyText(item.website)}
              >
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate max-w-[120px] sm:max-w-none"
                >
                  {item.website}
                </a>
                <lord-icon
                  src="https://cdn.lordicon.com/jgnvfzqg.json"
                  trigger="hover"
                  style={{ width: "20px", height: "20px" }}
                ></lord-icon>
              </div>
            </td>
            <td className="px-2 py-2">
              <div
                className="flex gap-2 justify-center items-center"
                onClick={() => copyText(item.username)}
              >
                <span className="truncate max-w-[120px] sm:max-w-none">
                  {item.username}
                </span>
                <lord-icon
                  src="https://cdn.lordicon.com/jgnvfzqg.json"
                  trigger="hover"
                  style={{ width: "20px", height: "20px" }}
                ></lord-icon>
              </div>
            </td>
            <td className="px-2 py-2">
              <div
                className="flex gap-2 justify-center items-center"
                onClick={() => copyText(item.password)}
              >
                <span className="truncate max-w-[120px] sm:max-w-none">
                  {item.password}
                </span>
                <lord-icon
                  src="https://cdn.lordicon.com/jgnvfzqg.json"
                  trigger="hover"
                  style={{ width: "20px", height: "20px" }}
                ></lord-icon>
              </div>
            </td>
            <td className="px-2 py-2 flex justify-center gap-3">
              <div className="edit" onClick={() => editPassword(item.id)}>
                <lord-icon
                  src="https://cdn.lordicon.com/exymduqj.json"
                  trigger="hover"
                  stroke="bold"
                  style={{ width: "22px", height: "22px" }}
                ></lord-icon>
              </div>
              <div className="delete" onClick={() => deletePassword(item.id)}>
                <lord-icon
                  src="https://cdn.lordicon.com/jzinekkv.json"
                  trigger="hover"
                  stroke="bold"
                  style={{ width: "22px", height: "22px" }}
                ></lord-icon>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

                    </div>


                </div>
            </div>
        </>
    )
}

export default Manager
