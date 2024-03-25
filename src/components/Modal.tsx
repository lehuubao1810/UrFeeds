
import React from 'react';

type Props = {
    // Define your props here
    title: string;
    isShow: boolean;
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
};

const Modal: React.FC<Props> = (props) => {
    // Component logic goes here
    console.log(props);
    return (
        <div className='fixed top-0 left-0 h-screen w-screen bg-opacity-50 bg-black z-50 flex justify-center items-center'
            onClick={() => props.setIsShow(false)}
        >
            <div
                className='bg-white min-w-96 w-auto min-h-96 m-auto rounded-lg'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex justify-between p-4 border-b'>
                    <h1 className='text-lg font-bold'>{props.title}</h1>
                    <button type='button' onClick={() => props.setIsShow(false)}>X</button>
                </div>
                <div className='p-4'>
                    {props.children}
                </div>  
            </div>
        </div>
    );
};

export default Modal;