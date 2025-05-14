import { Link } from '@tanstack/react-router'
import { useAuth } from '@/store/auth.store'
import { useLogout } from '@/hooks/auth.hooks'


const Navbar = () => {
    const {isAuthenticated} = useAuth()
    const {isPending, isError, error, mutate, reset} = useLogout()
    
    const handleLogout = () =>{
        mutate()
        reset()
    }
    const token = sessionStorage.getItem("USER_TOKEN")
    
    if(isPending) return (<span>Logging out...</span>)
    if(isError) return (<span>{error.message}</span>)
  return (
    <div className='w-full absolute bg-blue-400 grid grid-cols-2 p-5'>
        <div className = "flex justify-start items-center">
            <Link to='/' className='text-2xl font-semibold text-white'>BlogSansar</Link>
        </div>
            { isAuthenticated || token!.length > 0 ?
                (
                    <div className='flex justify-end text-xl gap-8 pr-10 text-white'>
                        <Link to="/" className="[&.active]:font-bold">Home</Link>
                        <Link to="/profile" className = "[&.active]:font-bold">Profile</Link>
                        <h1 onClick={()=>handleLogout()} className = "[&.active]:font-bold hover:cursor-pointer">Logout</h1>
                    </div>)
                :
                (
                    <div className='flex justify-end text-xl gap-8 pr-10 text-white'>
                        <Link to="/login" className="[&.active]:font-bold">Login</Link>
                    </div>
                )
        }
    </div>
  )
}

export default Navbar