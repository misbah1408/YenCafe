import React from 'react'
import logo from "../images/logo.png"
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const Navigate = useNavigate()
    const handelLogin = () => {
        Navigate("/login")
    }
  return (
    <div className="h-lvh w-[100%] bg-gradient-to-r from-[#44bd76] to-[#61cbcf]">
      <div className="absolute h-[40rem] w-[30rem] bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl">
        <div className="flex flex-col align-middle gap-3">
          <div className="flex flex-col items-center mt-6">
            <img className="h-[8rem]" src={logo} alt="" />
            <p className="flex flex-col items-center">
              <span className="font-bold text-xl">YENEPOYA</span>
              <span className="font-semibold">(Deemed to be University)</span>
            </p>
          </div>
          <div className="mt-5">
            <form
              className="flex flex-col items-center gap-3"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                className="h-12 w-1/2 @layer base outline-none px-6 py-2 bg-gray-100 rounded-md"
                type="number"
                placeholder="Campus ID"
              />
              <span className='font-semibold text-lg mt-1'>Create Password</span>
              <input
                className="h-12 w-1/2 outline-none px-6 py-2 bg-gray-100 rounded-md"
                type="password"
                placeholder="Password"
              />
              <input
                className="h-12 w-1/2 outline-none px-6 py-2 bg-gray-100 rounded-md"
                type="password"
                placeholder="Confirm Password"
              />
              <button
                className="h-12 w-1/2 bg-blue-600 text-white rounded-lg"
                type="submit"
              >
                Register
              </button>
            </form>
          </div>
          <div className="flex flex-col items-center gap-1 mt-2">
              <button
                className="h-12 w-1/2 bg-blue-600 text-white rounded-lg"
                onClick={handelLogin}
              >
                Login
              </button>
            </div>
        </div>
      </div>
    </div>
  )
}
