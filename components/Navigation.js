"use client"
import { GoGraph } from "react-icons/go";
import { useContext } from "react";
import { authContext } from "@/lib/store/auth-context";

function Nav() {
  const {user, loading, logout} = useContext(authContext);

    return (
        <header className="px-6 py-4 mx-auto bg-stone-600">
        <div className="flex items-center justify-between">
          
          {user && !loading && (
            <div className="flex items-center gap-2">
              <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
                <img
                  className="object-cover w-full h-full"
                  src={user.photoURL}
                  alt={user.displayName}
                  referrerPolicy="no-referrer"
                />
              </div>
              <small>Olá, {user.displayName}</small>
            </div>
          )}
          
          {user && !loading && (
            <nav className="flex items-center gap-2">
            <div>
              <button
                onClick={logout}
                className="btn btn-danger">
                  Sair
              </button>
            </div>
            </nav>
          )}
          
        </div>
      </header>

    )
}

export default Nav;