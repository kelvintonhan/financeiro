function Modal({show, onClose, children}){
    return (
    <div style={{ transform: show ? "translateX(0%)" : "translateX(-200%)", }}
        className="absolute top-0 left-0 w-full h-full pb-20 z-10 transition-all duration-500 bg-stone-900 bg-opacity-95">
        <div className="lg:mx-auto max-w-2xl rounded-3xl bg-stone-800 py-6 px-4 mt-10 h-full max-h-[90vh] relative mx-4 shadow_box">
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