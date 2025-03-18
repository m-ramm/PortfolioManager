import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
    let {loginUser, signupUser} = useContext(AuthContext)
    return (
        <div className='w-full my-4 mx-2 flex flex-col bg-darker rounded-lg shadow-lg p-2'>
            <div className='text-white text-lg font-bold my-2 ms-2'>Login</div>
            <form onSubmit={loginUser}>
                <div className=' w-100 flex flex-col border border-white rounded-lg shadow-lg p-5 ms-2'>
                    <input type="text" name="username" placeholder='Enter Username' className='text-white border border-grey rounded-lg p-2 my-2 transition-colors duration-300 hover:border-white'/>
                    <input type="password" name="password" placeholder='Enter Password' className='text-white border border-grey rounded-lg p-2 my-2 transition-colors duration-300 hover:border-white'/>
                    <input type="submit" className='text-grey font-bold border border-grey rounded-lg p-2 my-2 transition-colors duration-300 hover:text-white hover:border-white'/>
                </div>
            </form>
            <div className='text-white text-lg font-bold mt-12 mb-2 ms-2'>Signup</div>
            {/* need to add signupUser method in AuthContext */}
            <form onSubmit={signupUser}>
                <div className=' w-100 flex flex-col border border-white rounded-lg shadow-lg p-5 my-2 ms-2'>
                    <input type="text" name="username" placeholder='Enter Username' className='text-white border border-grey rounded-lg p-2 my-2 transition-colors duration-300 hover:border-white'/>
                    <input type="email" name="email" placeholder='Enter Email' className='text-white border border-grey rounded-lg p-2 my-2 transition-colors duration-300 hover:border-white'/>
                    <input type="password" name="password" placeholder='Enter Password' className='text-white border border-grey rounded-lg p-2 my-2 transition-colors duration-300 hover:border-white'/>
                    <input type="submit" className='text-grey font-bold border border-grey rounded-lg p-2 my-2 transition-colors duration-300 hover:text-white hover:border-white'/>
                </div>
            </form>
        </div>
    )
}

export default LoginPage