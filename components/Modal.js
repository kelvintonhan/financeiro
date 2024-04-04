function Modal({show, onClose, children}){
    return (
      <div style={{
        transform: show ? "translateX(0%)" : "translateX(-200%)",
    }}
        className="absolute top-0 left-0 w-full h-full z-10 transition-all duration-500 bg-black bg-opacity-80">
        <div className="container mx-auto max-w-2xl rounded-3xl bg-stone-800 py-6 px-4 mt-10 min-h-[50vh] relative">
            <button onClick={()=>{onClose(false);}}
                className="absolute top-0 right-0 mt-2 mr-2 w-10 h-10 font-bold rounded-full bg-stone-600">
                X
            </button>
            {children}
        </div>
    </div>
    
          
    )
}

export default Modal;