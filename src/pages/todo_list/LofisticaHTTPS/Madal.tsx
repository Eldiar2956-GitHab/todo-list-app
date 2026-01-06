import React, { useState } from 'react';
import { useCreatNewTasck } from '../zustand';
import '../LofisticaHTTPS/Modal.css'


interface ModalProps{
    onClose:()=>void
}
export const  Modal:React.FC<ModalProps>=({onClose})=>{
    const [inputText,setInputText]=useState<string>("")
    const addNewtext=useCreatNewTasck((state)=>state.addNewNameText);


  const handleContentClick = (e:any) => {
    e.stopPropagation(); 
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <h2 className='NewModalH1'>+New Task</h2>
        <h5 className='NewModalh5'>Название новой папки</h5>
        <input className='inputAddModal' placeholder='Название' value={inputText}
        type='text' onChange={(e)=>setInputText(e.target.value)}/>
        <div className='BtnModal'>
           <button className='BtnAddModal' onClick={()=>{addNewtext(inputText);setInputText("");onClose()}}
        disabled={!inputText.trim()}>Добавить</button>
        <button className='BtnModalClose' onClick={onClose}>
          Закрыть
        </button>
        </div>
      </div>
    </div>
  );
}

